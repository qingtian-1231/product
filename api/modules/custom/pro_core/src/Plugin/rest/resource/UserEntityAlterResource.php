<?php

namespace Drupal\pro_core\Plugin\rest\resource;

use Drupal\rest\Plugin\rest\resource\EntityResource;
use Drupal\Core\Entity\EntityInterface;
use Drupal\rest\ResourceResponse;
use Drupal\taxonomy\Entity\Term;
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
            if ($entity) {
              $language =  \Drupal::languageManager()->getCurrentLanguage()->getId();

              if ($entity->hasTranslation($language)) {
                $entity = $entity->getTranslation($language);
              }

              $targetId = $entity->field_product_brand->getValue()[0]['target_id'];
              if ($targetId) {
                $term = Term::load($targetId);
                $value[$key]['brand'] = $term->getName();
              }

              $value[$key]['title'] = $entity->title->getValue()[0]['value'];
              $value[$key]['description'] = $entity->body->getValue()[0]['value'];
              $value[$key]['type'] = $entity->field_product_type->getValue()[0]['target_id'];
              $value[$key]['benefits'] = $entity->field_benefits->getValue()[0]['value'];
            }
          }
        }
      }

      if ($field === 'field_formulation_list') {
        if (is_array($value) && count($value) > 0) {
          foreach ($value as $key => $uuid) {
            $entity = $entity_manager->loadEntityByUuid('node', $uuid);
            if ($entity) {
              $language =  \Drupal::languageManager()->getCurrentLanguage()->getId();

              if ($entity->hasTranslation($language)) {
                $entity = $entity->getTranslation($language);
              }
              $value[$key]['title'] = $value[$key]['formulation_name'] = $entity->field_formulation_name->getValue()[0]['value'];
              $value[$key]['formulationbenefits'] = $entity->field_formulationbenefits->getValue()[0]['value'];
            }
          }
        }
      }

      $userResponse[$field] = $value;

    }

    // 禁用缓存
    $build = array(
      '#cache' => array(
        'max-age' => 0,
      ),
    );
    return (new ResourceResponse($userResponse))->addCacheableDependency($build);
//    return new ResourceResponse($userResponse);
  }
}
