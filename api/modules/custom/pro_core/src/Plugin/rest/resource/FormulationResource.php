<?php

namespace Drupal\pro_core\Plugin\rest\resource;

use Drupal\rest\Plugin\ResourceBase;
use Drupal\rest\ResourceResponse;
use Drupal\node\Entity\Node;
use Drupal\Core\Field\FieldItemList;
use Drupal\field\Entity\FieldConfig;

/**
 * Provides a formulation detail Resource
 *
 * @RestResource(
 *   id = "formulation_detail_resource",
 *   label = @Translation("配方详细数据"),
 *   uri_paths = {
 *     "canonical" = "/api/formulation_detail_resource/{id}"
 *   }
 * )
 */
class FormulationResource extends ResourceBase {

  /**
   * Responds to entity GET requests.
   * @return \Drupal\rest\ResourceResponse
   */
  public function get($id = NULL) {
    $entity_manager = \Drupal::entityManager();
    $entity = $entity_manager->loadEntityByUuid('node', $id);
    $formulation = [];

    if ($entity) {
      foreach ($entity->getFields() as $field => $field_item_list) {
        if ($field_item_list instanceof FieldItemList) {

          $field_definition = $field_item_list->getFieldDefinition();
          if ($field_definition instanceof FieldConfig) {
            if ($field_definition->getType() === 'entity_reference_revisions') {
              $entity_reference_value = [];
              foreach ($field_item_list as $para) {
                $entity_reference_value[] = $this->getFields($para->entity->getFields());
              }

              $formulation[$field] = [
                'label' => $field_definition->getLabel(),
                'value' => $entity_reference_value,
              ];
            }
            else {
              $formulation[$field] = [
                'label' => $field_definition->getLabel(),
                'value' => $entity->get($field)->value,
              ];
            }
          }
        }
      }
    } else {
      $formulation = [
        'error' => '不能获取到正确配方信息',
      ];
    }
    return new ResourceResponse($formulation);
  }

  protected function getFields($fields) {
    $return = [];
    foreach ($fields as $field => $field_item_list) {
      if ($field_item_list instanceof FieldItemList) {
        $field_definition = $field_item_list->getFieldDefinition();
        if ($field_definition instanceof FieldConfig) {
          if ($field_definition->getType() === 'entity_reference') {
            $return[$field] = [
              'label' => $field_definition->getLabel(),
              'value' => $field_item_list[0]->entity->field_product_name->value,
              'uuid' => $field_item_list[0]->entity->uuid->value,
            ];
          }
          elseif ($field_definition->getType() === 'file') {
            $return[$field] = [
              'label' => $field_definition->getLabel(),
              'value' => $field_item_list[0]->entity->url(),
              'changed' => date('c', $field_item_list[0]->entity->changed->value),
            ];
          }
          else {
            $return[$field] = [
              'label' => $field_definition->getLabel(),
              'value' => $field_item_list[0]->value,
            ];
          }
        }
      }
    }

    return $return;
  }

  public function permissions() {
    return [];
  }
}