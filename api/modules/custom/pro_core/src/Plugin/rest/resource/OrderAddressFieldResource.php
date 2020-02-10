<?php

namespace Drupal\pro_core\Plugin\rest\resource;

use Drupal\Core\Session\AccountInterface;
use Drupal\rest\Plugin\ResourceBase;
use Drupal\Core\Field\FieldItemList;
use Drupal\rest\ResourceResponse;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use CommerceGuys\Addressing\Subdivision\SubdivisionRepository;
use CommerceGuys\Addressing\Subdivision\Subdivision;

/**
 * Provides a formulation detail Resource
 *
 * @RestResource(
 *   id = "order_address_field_resource",
 *   label = @Translation("获取drupal地址详细信息"),
 *   uri_paths = {
 *     "canonical" = "/api/order_address_field/resource/{contryCode}/{stateCode}/{citycode}"
 *   }
 * )
 */
class OrderAddressFieldResource extends ResourceBase {

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
   * Responds to entity GET requests.
   * @return \Drupal\rest\ResourceResponse
   */
  public function get($contry_code_default, $state_code_default, $city_code_default) {
    $return = [];
    if ($contry_code_default === 'default' && $state_code_default === 'default' && $city_code_default === 'default') {
      $countries = \Drupal\Core\Locale\CountryManager::getStandardList();
      foreach ($countries as $contry_code => $contry) {
        $return[] = [
          'code' => $contry_code,
          'name' => $contry->render(),
        ];
      }
    }

    if ($contry_code_default !== 'default' && $state_code_default === 'default' && $city_code_default === 'default') {
      $sub = new SubdivisionRepository();
      $states = $sub->getAll([$contry_code_default]);
      foreach ($states as $state_code => $state) {
        $return[] = [
          'code' => $state_code,
          'name' => $state->getLocalName(),
        ];
      }
    }

    if ($contry_code_default !== 'default' && $state_code_default !== 'default' && $city_code_default === 'default') {
      $sub = new SubdivisionRepository();
      $states = $sub->getAll([$contry_code_default]);
      $states_city = $states[$state_code_default];

      if ($states_city instanceof Subdivision) {
        $cities = $states_city->getChildren()->toArray();
        foreach ($cities as $city_code => $city) {
          $return[] = [
            'code' => $city_code,
            'name' => $city->getLocalName(),
          ];
        }
      }
    }

    if ($contry_code_default !== 'default' && $state_code_default !== 'default' && $city_code_default !== 'default') {
      $sub = new SubdivisionRepository();
      $states = $sub->getAll([$contry_code_default]);
      $states_city = $states[$state_code_default];
      $cities = $states_city->getChildren()->toArray();
      $cities_local = $cities[$city_code_default];

      if ($cities_local instanceof Subdivision) {
        $locals = $cities_local->getChildren()->toArray();
        foreach ($locals as $local_code => $local) {
          $return[] = [
            'code' => $local_code,
            'name' => $local->getLocalName(),
          ];
        }
      }
    }

    return new ResourceResponse($return);
  }

  public function permissions() {
    return [];
  }
}
