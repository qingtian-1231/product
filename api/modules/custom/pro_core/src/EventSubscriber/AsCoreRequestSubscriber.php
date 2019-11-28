<?php

declare(strict_types = 1);

namespace Drupal\as_core\EventSubscriber;

use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Drupal\Core\Routing\TrustedRedirectResponse;
use Drupal\Core\Url;
use Drupal\Core\Cache\CacheBackendInterface;
use Drupal\Component\Datetime\TimeInterface;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ConnectException;

/**
 * Request subscriber.
 */
class AsCoreRequestSubscriber implements EventSubscriberInterface {

  protected const HTTP_CLIENT_TIMEOUT = 3;

  protected const SECURE_URL_AVAILABLE_STATUS_AVAILABLE = 1;
  protected const SECURE_URL_AVAILABLE_STATUS_NOT_AVAILABLE = 0;
  protected const SECURE_URL_AVAILABLE_STATUS_TIMED_OUT = -1;

  protected const SECURE_URL_AVAILABLE_CACHE_TTL = 3600;
  protected const SECURE_URL_NOT_AVAILABLE_CACHE_TTL = 300;

  /**
   * Cache service.
   *
   * @var \Drupal\Core\Cache\CacheBackendInterface
   */
  protected $cache;

  /**
   * HTTP client.
   *
   * @var \GuzzleHttp\Client
   */
  protected $httpClient;

  /**
   * Time.
   *
   * @var \Drupal\Component\Datetime\TimeInterface
   */
  protected $time;

  /**
   * Constructor.
   *
   * @param \Drupal\Core\Cache\CacheBackendInterface $cache
   *   Cache service.
   * @param \GuzzleHttp\Client $httpClient
   *   HTTP client.
   * @param \Drupal\Component\Datetime\TimeInterface $time
   *   Time.
   */
  public function __construct(CacheBackendInterface $cache, Client $httpClient, TimeInterface $time) {
    $this->cache = $cache;
    $this->httpClient = $httpClient;
    $this->time = $time;
  }

  /**
   * Request callback.
   *
   * @param \Symfony\Component\HttpKernel\Event\GetResponseEvent $event
   *   Event.
   */
  public function onKernelRequest(GetResponseEvent $event): void {
    $request = $event->getRequest();

    //if ($request->getMethod() !== 'HEAD' && !$request->isSecure()) {
    /**
     * The isSecure() method requires a list of trusted reverse proxy IP
     * addresses which is not feasible given the current load-balancing setup.
     * The solution below requires the following back-end configuration in
     * HAProxy:
     *
     * @code
     * http-request set-header X-Forwarded-Proto https if { ssl_fc }
     * @endcode
     */
    if (
      $request->getMethod() !== 'HEAD' &&
      $request->server->get('HTTP_X_FORWARDED_PROTO') !== 'https' &&
      (
        empty($request->server->get('HTTPS')) ||
        \strtolower($request->server->get('HTTPS')) === 'off'
      )
    ) {
      $url = NULL;
      try {
        $url = Url::createFromRequest($request)
          ->setOptions(
            [
              'query' => $request->query->all(),
              'https' => TRUE,
            ]
          )
          ->setAbsolute()
          ->toString();
      }
      catch (\Exception $exception) {
        TRUE;
      }

      if ($url) {
        $key = 'as.secure_url_available';

        $available = NULL;
        $cached = $this->cache->get($key);
        if ($cached instanceof \stdClass) {
          $available = (int) $cached->data;
        }
        if ($cached === FALSE || $available === self::SECURE_URL_AVAILABLE_STATUS_TIMED_OUT) {
          try {
            $response = $this->httpClient->head(
              $url,
              [
                'timeout' => self::HTTP_CLIENT_TIMEOUT * ($available === self::SECURE_URL_AVAILABLE_STATUS_TIMED_OUT ? 2 : 1),
                'headers' => [
                  'User-Agent' => 'Sledge Hammer v1.0',
                ],
              ]
            );
            $statusCode = $response->getStatusCode();
            if ($statusCode >= 200 && $statusCode < 400) {
              $available = self::SECURE_URL_AVAILABLE_STATUS_AVAILABLE;
            }
          }
          catch (ConnectException $exception) {
            $available = self::SECURE_URL_AVAILABLE_STATUS_TIMED_OUT;
          }
          catch (\Exception $exception) {
            $available = self::SECURE_URL_AVAILABLE_STATUS_NOT_AVAILABLE;
          }
          $this->cache->set(
            $key,
            $available,
            $this->time->getCurrentTime() + ($available === self::SECURE_URL_AVAILABLE_STATUS_AVAILABLE ? self::SECURE_URL_AVAILABLE_CACHE_TTL : self::SECURE_URL_NOT_AVAILABLE_CACHE_TTL)
          );
        }
        if ($available === self::SECURE_URL_AVAILABLE_STATUS_AVAILABLE) {
          $response = new TrustedRedirectResponse($url, TrustedRedirectResponse::HTTP_MOVED_PERMANENTLY);
          //$event->setResponse($response);
          /**
           * Use "Location" header-based redirect instead of the HTML-based because of the pipeline crawler.
           *
           * @link https://jira.proquest.com/browse/MIGWOT-664
           */
          $response->send();
        }
      }
    }
  }

  /**
   * {@inheritdoc}
   *
   * EventSubscriberInterface::getSubscribedEvents()
   */
  public static function getSubscribedEvents(): array {
    return [
      KernelEvents::REQUEST => [
        [
          /**
           * @see onKernelRequest()
           */
          'onKernelRequest',
          33,
        ],
      ],
    ];
  }

}
