<?php

namespace Drupal\pro_core\Plugin\rest\resource;

use Drupal\Core\Session\AccountInterface;
use Drupal\rest\Plugin\ResourceBase;
use Drupal\rest\ResourceResponse;
use \Drupal\profile\Entity\Profile;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use CommerceGuys\Addressing\Country\CountryRepository;
use CommerceGuys\Addressing\Subdivision\SubdivisionRepository;

/**
 * Provides a formulation detail Resource
 *
 * @RestResource(
 *   id = "user_profile",
 *   label = @Translation("获得用户顾客地址信息"),
 *   uri_paths = {
 *     "canonical" = "/api/getProfile/{order_id}",
 *     "https://www.drupal.org/link-relations/create" = "/api/getProfile"
 *   }
 * )
 */
class UserProfileResource extends ResourceBase {

  /**
   * The current user.
   *
   * @var \Drupal\Core\Session\AccountInterface
   */
  protected $currentUser;

  /**
   * Constructs a Drupal\rest\Plugin\ResourceBase object.
   *
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin_id for the plugin instance.
   * @param mixed $plugin_definition
   *   The plugin implementation definition.
   * @param array $serializer_formats
   *   The available serialization formats.
   * @param \Psr\Log\LoggerInterface $logger
   *   A logger instance.
   * @param \Drupal\Core\Session\AccountInterface $current_user
   * The current user.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, array $serializer_formats, LoggerInterface $logger, AccountInterface $current_user) {
    parent::__construct($configuration, $plugin_id, $plugin_definition, $serializer_formats, $logger);
    $this->currentUser = $current_user;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->getParameter('serializer.formats'),
      $container->get('logger.factory')->get('rest'),
      $container->get('current_user')
    );
  }

  /**
   * Responds to entity POST requests and saves the new entity.commerce order
   *
   * @return \Drupal\rest\ResourceResponse
   * address field data and Order ID.
   *
   * @throws \Symfony\Component\HttpKernel\Exception\HttpException
   * Throws HttpException in case of error.
   */
  public function get($order_id) {
    $list = \Drupal::entityTypeManager()
      ->getStorage('profile')
      ->loadByProperties([
        'uid' => $this->currentUser->id(),
        'type' => 'customer',
        'is_default' => 1,
      ]);
    $return = [];

    if (count($list) > 0) {
      $profile_data = reset($list);
      if ($profile_data) {
        $profile_arr = $profile_data->toArray();

        $return = $profile_arr['address'][0];
        $return['field_company_industry'] = $profile_arr['field_company_industry'][0]['value'];
        $return['field_display_name'] = $profile_arr['field_display_name'][0]['value'];
        $return['field_sample_application'] = $profile_arr['field_sample_application'][0]['value'];
      }
    }

    return new ResourceResponse($return);
  }

  public function permissions() {
    return [];
  }
}
