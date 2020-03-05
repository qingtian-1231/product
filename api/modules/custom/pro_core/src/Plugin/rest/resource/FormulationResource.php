<?php

namespace Drupal\pro_core\Plugin\rest\resource;

use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\rest\Plugin\ResourceBase;
use Drupal\rest\ResourceResponse;
use Drupal\node\Entity\Node;
use Drupal\Core\Field\FieldItemList;
use Drupal\field\Entity\FieldConfig;
use Drupal\taxonomy\Entity\Term;

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
    $filter_fields = [
      'type',
      'stores',
      'uid',
      'path',
      'created',
      'changed',
      'content_translation_source',
      'content_translation_outdated',
      'field_is_public',
      'field_is_feature',
      'langcode',
      'vid',
      'revision_timestamp',
      'revision_uid',
      'revision_log',
      'default_langcode',
      'revision_default',
      'revision_translation_affected',
      'nid'
    ];

    if ($entity) {
      foreach ($entity->getFields() as $field => $field_item_list) {
        // 过滤掉不返回给客户端的字段数据

        if (in_array($field, $filter_fields)) {
          continue;
        }

        if ($field_item_list instanceof FieldItemList) {
          $field_definition = $field_item_list->getFieldDefinition();

          if ($field_definition instanceof BaseFieldDefinition) {
            if ($field_definition->getType() === 'entity_reference') {
              $entity_reference_value = [];
              foreach ($field_item_list as $para) {
                if (method_exists($para->entity, 'getFields')) {
                  $entity_reference_value[] = $this->getFields($para->entity->getFields());
                }
                else {
                  $entity_reference_value[] = $para->getValue();
                }
              }

              $formulation[$field] = [
                'label' => is_string($field_definition->getLabel()) ? $field_definition->getLabel() : (string) $field_definition->getLabel(),
                'value' => $entity_reference_value,
              ];
            }
            else {
              $formulation[$field] = [
                'label' => is_string($field_definition->getLabel()) ? $field_definition->getLabel() : (string) $field_definition->getLabel(),
                'value' => $field_item_list->value,
              ];
            }
          }

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
            $type_Id = array_pop($field_item_list[0]->entity->field_product_type->getValue());
            $brand_id = array_pop($field_item_list[0]->entity->field_product_brand->getValue());
            $productType = Term::load($type_Id['target_id']);

            $brand = Term::load($brand_id['target_id']);

            $return[$field] = [
              'label' => $field_definition->getLabel(),
              'value' => $field_item_list[0]->entity->field_product_name->value,
              'uuid' => $field_item_list[0]->entity->uuid->value,
              'termId' => $type_Id['target_id'],
              'brandName' => $brand->getName(),
            ];
          }
          elseif ($field_definition->getType() === 'file') {
            $return[$field] = [
              'label' => $field_definition->getLabel(),
              'value' => count($field_item_list) > 0 ? $field_item_list[0]->entity->url() : null,
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
