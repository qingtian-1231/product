<?php

namespace Drupal\pro_core\Plugin\rest\resource;

use Drupal\Core\Session\AccountInterface;
use Drupal\rest\Plugin\ResourceBase;
use Drupal\rest\ResourceResponse;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides a formulation detail Resource
 *
 * @RestResource(
 *   id = "user_favorite_submit",
 *   label = @Translation("更新user信息，收藏产品和配方列表"),
 *   uri_paths = {
 *     "canonical" = "/api/user_favorite/submit",
 *     "https://www.drupal.org/link-relations/create" = "/api/user_favorite/submit"
 *   }
 * )
 */
class UpdateUserInfoResource extends ResourceBase {

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
   * @param array $data
   *
   * @return \Drupal\rest\ResourceResponse
   * address field data and Order ID.
   *
   * @throws \Symfony\Component\HttpKernel\Exception\HttpException
   * Throws HttpException in case of error.
   */
  public function post(array $data) {
    $return = [];
    $user = \Drupal\user\Entity\User::load($this->currentUser->id());

    if ($data['type'] === 'product') {
      $exiValue = $user->field_product_list->getValue();
    } else {
      $exiValue = $user->field_formulation_list->getValue();
    }

    if ($data['action'] === 'delete') {
      foreach ($exiValue as $key => $item) {
        if ($item['value'] === $data['id']) {
          unset($exiValue[$key]);
        }
      }
      $exiValue = array_merge($exiValue);
    } elseif ($data['action'] === 'add') {
      $value = [
        'value' => $data['id'],
      ];
      array_push($exiValue, $value);
    }

    if ($data['type'] === 'product') {
      $user->field_product_list->setValue($exiValue);
    } else {
      $user->field_formulation_list->setValue($exiValue);
    }

    $user->save();

    return new ResourceResponse($exiValue);
  }

  public function permissions() {
    return [];
  }
}
