<?php

declare(strict_types = 1);

namespace Drupal\as_core;

use Symfony\Component\HttpFoundation\Request as DocumentsRequest;
use Symfony\Component\HttpFoundation\RequestStack;

/**
 * HTTP request wrapper.
 */
class Request extends DocumentsRequest {

  /**
   * Query string parameters ($_GET).
   *
   * @var array
   */
  public $query = [];

  /**
   * Request body parameters ($_POST).
   *
   * @var array
   */
  public $request = [];

  /**
   * Cookies ($_COOKIE).
   *
   * @var array
   */
  public $cookies = [];

  /**
   * Server and execution environment parameters ($_SERVER).
   *
   * @var array
   */
  public $server = [];

  /**
   * HTTP method.
   *
   * @var string
   */
  public $method = self::METHOD_GET;

  /**
   * Constructor.
   *
   * @param \Symfony\Component\HttpFoundation\RequestStack $request_stack
   *   Request service.
   */
  public function __construct(RequestStack $request_stack) {
    parent::__construct();

    if ($request = $request_stack->getCurrentRequest()) {
      $this->query = $request->query->all();
      $this->request = $request->request->all();
      $this->cookies = $request->cookies->all();
      $this->server = $request->server->all();
    }

    // PHP only parses a POST payload automatically when it has a content type
    // of application/x-www-form-urlencoded or multipart/form-data. The reasons
    // for this are historical — these two content types were essentially the
    // only ones used years ago when PHP’s $_POST was implemented.
    if (
      (!\is_array($this->request) || empty($this->request)) && $this->isAjax()
    ) {
      if ($streamInput = file_get_contents('php://input')) {
        $this->request = \json_decode($streamInput, TRUE);
        if (!\is_array($this->request)) {
          $this->request = [];
        }
      }
    }

    $method = NULL;

    if (\is_array($this->server) && !empty($this->server)) {
      if (array_key_exists('REQUEST_METHOD', $this->server)) {
        $method = strtoupper(trim($this->server['REQUEST_METHOD']));
      }
      foreach ($this->server as $key => $value) {
        $key = str_replace(['-', 'X_'], ['_', ''], strtoupper($key));
        if (FALSE !== strpos($key, 'HTTP_METHOD_OVERRIDE')) {
          $method = strtoupper(trim($value));
          break;
        }
      }
    }
    if (\is_array($this->query) && !empty($this->query)) {
      foreach ($this->query as $key => $value) {
        $key = str_replace(['-', 'X_'], ['_', ''], strtoupper($key));
        if (FALSE !== strpos($key, 'HTTP_METHOD_OVERRIDE')) {
          $method = strtoupper(trim($value));
          break;
        }
      }
    }

    if (
      !empty($method) &&
      \in_array(
        $method,
        [
          self::METHOD_GET,
          self::METHOD_POST,
          self::METHOD_PUT,
          self::METHOD_DELETE,
        ],
        TRUE
      )
    ) {
      $this->method = $method;
    }
  }

  /**
   * Retrieve request headers.
   *
   * @return array
   *   Request headers.
   */
  public function getHeaders(): array {
    $headers = [];

    if (\is_array($this->server) && !empty($this->server)) {
      $regexp = '/\AHTTP_/';
      foreach ($this->server as $key => $value) {
        if (preg_match($regexp, $key)) {
          $key = strtoupper(preg_replace($regexp, '', $key));
          if (!\in_array($key, ['DNT'])) {
            // Do some nasty string manipulations to restore the original letter
            // case. This should work in most cases.
            $key = FALSE !== strpos($key, '_') ?
              implode(
                '-',
                array_map(
                  'ucfirst',
                  array_map(
                    'strtolower',
                    explode(
                      '_',
                      $key
                    )
                  )
                )
              ) :
              ucfirst(strtolower($key));
          }
          $headers[$key] = $value;
        }
      }
    }

    return $headers;
  }

  /**
   * Determine whether request is AJAX.
   *
   * @return bool
   *   Whether request is AJAX.
   */
  public function isAjax(): bool {
    $server = &$this->server;

    return (
      \is_array($server) &&
      (
        (
          array_key_exists('HTTP_X_REQUESTED_WITH', $server) &&
          strtolower($server['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest'
        ) ||
        (
          array_key_exists('HTTP_ACCEPT', $server) &&
          FALSE !== stripos($server['HTTP_ACCEPT'], 'application/json')
        )
      )
    ) ||
    $this->isTruthyValue($this->getValue('json'));
  }

  /**
   * Retrieve a query parameter value.
   *
   * @param mixed|null $property
   *   Property name.
   * @param mixed|null $defaultValue
   *   Default property value.
   *
   * @return mixed
   *   Query parameter value.
   */
  protected function getValue($property, $defaultValue = NULL) {
    $value = NULL;

    $property = trim($property);

    if (array_key_exists($property, $this->query)) {
      $value = $this->query[$property];
    }
    else {
      if (array_key_exists($property, $this->request)) {
        $value = $this->request[$property];
      }
    }

    return $value ?? $defaultValue;
  }

  /**
   * Determine whether a value is truthy.
   *
   * @param mixed $value
   *   Value.
   *
   * @return bool
   *   Whether a value is truthy.
   */
  protected function isTruthyValue($value): bool {
    return (bool) $value === TRUE &&
      !\in_array(strtolower($value), ['false', 'no'], TRUE);
  }

}
