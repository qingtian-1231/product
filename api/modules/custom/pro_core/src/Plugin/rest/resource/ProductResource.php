<?php

namespace Drupal\pro_core\Plugin\rest\resource;

use Drupal\rest\Plugin\ResourceBase;
use Drupal\rest\ResourceResponse;
use Drupal\node\Entity\Node;
use Drupal\Core\Field\FieldItemList;
use Drupal\field\Entity\FieldConfig;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\taxonomy\Entity\Term;

/**
 * Provides a product detail Resource
 *
 * @RestResource(
 *   id = "product_detail_resource",
 *   label = @Translation("产品详细数据"),
 *   uri_paths = {
 *     "canonical" = "/api/product_detail_resource/{id}"
 *   }
 * )
 */
class ProductResource extends ResourceBase {

  /**
   * Responds to entity GET requests.
   * @return \Drupal\rest\ResourceResponse
   */
  public function get($id = NULL) {
    $entity_manager = \Drupal::entityManager();
    $entity = $entity_manager->loadEntityByUuid('commerce_product', $id);
    $product = [];
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
      'field_is_feature'
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

              $product[$field] = [
                'label' => is_string($field_definition->getLabel()) ? $field_definition->getLabel() : (string) $field_definition->getLabel(),
                'value' => $entity_reference_value,
              ];
            }
            else {
              $product[$field] = [
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

              $product[$field] = [
                'label' => $field_definition->getLabel(),
                'value' => $entity_reference_value,
              ];
            }
            elseif ($field_definition->getType() === 'entity_reference') {
              switch ($field) {
                case 'field_suitable_application':
                  $value = $this->processTerm($field_item_list);

                  $product[$field] = [
                    'label' => $field_definition->getLabel(),
                    'value' => $value,
                  ];
                  break;

//                case 'field_product_type':
//                  $value = $this->processTerm($field_item_list);
//
//                  $product[$field] = [
//                    'label' => $field_definition->getLabel(),
//                    'value' => $value,
//                  ];
//                  break;

                default:
                  $entity_reference_value = [];
                  foreach ($field_item_list as $para) {
                    $entity_reference_value[] = $this->getFields($para->entity->getFields());
                  }
                  $product[$field] = [
                    'label' => $field_definition->getLabel(),
                    'value' => $entity_reference_value,
                  ];
                  break;
              }
            }
            elseif ($field_definition->getType() === 'file') {
              $value = [];
              $host = \Drupal::request()->getSchemeAndHttpHost();
              foreach ($field_item_list as $field_item) {
                $value[] = [
                  'url' => $host . '/file-download/download/public/' . $field_item->entity->fid->value,
                  'changed' => date('c', $field_item->entity->changed->value),
                ];
              }

              $product[$field] = [
                'label' => $field_definition->getLabel(),
                'value' => $value,
              ];
            }
            elseif ($field_definition->getType() === 'link') {
              $valuesArr = $field_item_list->getValue();
              $value = count($field_item_list) === 1 ? array_pop($valuesArr) : $valuesArr;
              $product[$field] = [
                'label' => $field_definition->getLabel(),
                'value' => !empty($value) ? $value: '',
              ];
            }
            else {
              if ($field === 'field_recommended_application') {
                $product[$field] = [
                  'label' => $field_definition->getLabel(),
                  'value' => $field_item_list->getValue(),
                ];
              }
              else {
                $product[$field] = [
                  'label' => $field_definition->getLabel(),
                  'value' => count($field_item_list) === 1 ? $field_item_list->value : $field_item_list->getValue(),
                ];
              }
            }
          }
        }
      }
    } else {
      $product = [
        'error' => '不能获取到正确配方信息',
      ];
    }
    $product = array_map(function ($item) {
      if (isset($item['value']) && empty($item['value'])) {
        $item['value'] = '';
      }
      return $item;
    }, $product);

    return new ResourceResponse($product);
  }

  protected function getFields($fields) {
    $return = [];
    $countries = \Drupal::service('country_manager')->getList();
    foreach ($fields as $field => $field_item_list) {
      if ($field_item_list instanceof FieldItemList) {
        $field_definition = $field_item_list->getFieldDefinition();

        if ($field_definition instanceof BaseFieldDefinition) {
          $return[$field] = [
            'label' => is_string($field_definition->getLabel()) ? $field_definition->getLabel() : (string) $field_definition->getLabel(),
            'value' => $field_item_list->value,
          ];
        }

        if ($field_definition instanceof FieldConfig) {
          if ($field_definition->getType() === 'entity_reference') {

            if ($field === 'attribute_product_amount') {
              $return[$field] = [
                'label' => $field_definition->getLabel(),
                'value' => $field_item_list[0]->entity->name->value
              ];
            }
            elseif($field === 'field_formulation_industry') {
              $return[$field] = [
                'label' => $field_definition->getLabel(),
                'value' => $field_item_list->getValue(),
              ];
            }
            else {
              $return[$field] = [
                'label' => $field_definition->getLabel(),
                'value' => $field_item_list[0]->entity->attribute->getValue(),
                'uuid' => $field_item_list[0]->entity->uuid->value,
              ];
            }
          }
          elseif ($field_definition->getType() === 'address_country') {
            $country = $countries[$field_item_list->value];
            $return[$field] = [
              'label' => $field_definition->getLabel(),
              'value' => $country->render() . '[' . $field_item_list->value . ']'
            ];
          }
          elseif ($field_definition->getType() === 'entity_reference_revisions') {
            $return[$field] = [
              'label' => $field_definition->getLabel(),
              'value' => isset($field_item_list[0]) ? $field_item_list[0]->value : $field_item_list->getValue(),
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
              'value' => isset($field_item_list[0]) ? $field_item_list[0]->value : $field_item_list->getValue(),
            ];
          }
        }
      }
    }
    return $return;
  }

  protected function processTerm($field_item_list) {
    $value = [];
    foreach ($field_item_list as $term_filed) {
      $filed_value = $term_filed->getValue();
      $term = Term::load($filed_value['target_id']);
      $value[] = $term->getName();
    }

    return $value;
  }

  public function permissions() {
    return [];
  }
}
