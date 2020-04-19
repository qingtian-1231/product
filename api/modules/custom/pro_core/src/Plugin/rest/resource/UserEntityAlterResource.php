<?php

namespace Drupal\pro_core\Plugin\rest\resource;

use Drupal\rest\Plugin\rest\resource\EntityResource;
use Drupal\Core\Entity\EntityInterface;
use Drupal\rest\ResourceResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * Customizes the entity REST Resource plugin for user entity.
 *
 */
class UserEntityAlterResource extends EntityResource {

  /**
   * Responds to entity GET requests.
   * @return \Drupal\rest\ResourceResponse
   */
  public function get(EntityInterface $entity, Request $request) {
    $response = parent::get($entity, $request);
    $userEntity = $response->getResponseData();
    $entity_manager = \Drupal::entityManager();
    $userResponse = [];

    foreach ($userEntity->getFields() as $field => $field_item_list) {
      $value = $field_item_list->getValue();

      if ($field === 'field_product_list') {
        if (is_array($value) && count($value) > 0) {
          foreach ($value as $key => $uuid) {
            $entity = $entity_manager->loadEntityByUuid('commerce_product', $uuid);
            $value[$key]['title'] = $entity->title->getValue()[0]['value'];
          }
        }
      }

      if ($field === 'field_formulation_list') {
        if (is_array($value) && count($value) > 0) {
          foreach ($value as $key => $uuid) {
            $entity = $entity_manager->loadEntityByUuid('node', $uuid);
            $value[$key]['title'] = $entity->title->getValue()[0]['value'];
          }
        }
      }

      $userResponse[$field] = $value;

    }

    return new ResourceResponse($userResponse);
  }
}
