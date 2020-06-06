<?php

namespace Drupal\pro_core\Plugin\rest\resource;

use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\Core\StringTranslation\TranslatableMarkup;
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
    $language =  \Drupal::languageManager()->getCurrentLanguage()->getId();
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

    if ($entity->hasTranslation($language)) {
      $entity = $entity->getTranslation($language);
    }

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
                'label' => $this->getTranslateLabel($field_definition->getLabel()),
                'value' => $entity_reference_value,
              ];
            }
            else {
              $formulation[$field] = [
                'label' => $this->getTranslateLabel($field_definition->getLabel()),
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
                'label' => $this->getTranslateLabel($field_definition->getLabel()),
                'value' => $entity_reference_value,
              ];
            }
            elseif ($field_definition->getType() === 'entity_reference') {
              switch ($field) {
                case 'field_formulation_industry':
                  $value = $this->processTerm($field_item_list);

                  $formulation[$field] = [
                    'label' => $this->getTranslateLabel($field_definition->getLabel()),
                    'value' => is_array($value) ? implode(', ', $value) : $value,
                  ];
                  break;

                default:
                  $entity_reference_value = [];
                  foreach ($field_item_list as $para) {
                    if ($para->entity) {
                      if ($para->entity->hasTranslation($language)) {
                        $para->entity = $para->entity->getTranslation($language);
                      }

                      $entity_reference_value[] = $this->getFields($para->entity->getFields());
                    }
                  }
                  $formulation[$field] = [
                    'label' => $this->getTranslateLabel($field_definition->getLabel()),
                    'value' => $entity_reference_value,
                  ];
                  break;
              }
            }
            else {
              $formulation[$field] = [
                'label' => $this->getTranslateLabel($field_definition->getLabel()),
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

    foreach ($formulation['field_formula_composition']['value'] as &$item) {
      if (strpos($item['field_proportion_char']['value'], '~') !== false) {
        continue;
      } else {
        if (!empty($item['field_proportion_char']['value'])) {
          if ((int) $item['field_proportion_char']['value'] > 1) {
            $item['field_proportion_char']['value'] = $item['field_proportion_char']['value'] . '%';
          } else {
            $item['field_proportion_char']['value'] = ($item['field_proportion_char']['value'] * 100) . '%';
          }

        } else {
          $item['field_proportion_char']['value'] = '';
        }

      }

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
            if ($field_item_list[0]->entity) {
              $field_product_type = $field_item_list[0]->entity->field_product_type->getValue();
              $field_product_brand = $field_item_list[0]->entity->field_product_brand->getValue();
              $type_Id = reset($field_product_type);
              $brand_id = reset($field_product_brand);
              $productType = Term::load($type_Id['target_id']);

              $brand = Term::load($brand_id['target_id']);

              $return[$field] = [
                'label' => $this->getTranslateLabel($field_definition->getLabel()),
                'value' => $field_item_list[0]->entity->field_product_name->value,
                'uuid' => $field_item_list[0]->entity->uuid->value,
                'termId' => $type_Id['target_id'],
                'brandName' => $brand->getName(),
              ];
            }
          }
          elseif ($field_definition->getType() === 'file') {
            $return[$field] = [
              'label' => $this->getTranslateLabel($field_definition->getLabel()),
              'value' => count($field_item_list) > 0 ? $field_item_list[0]->entity->url() : null,
              'changed' => date('c', $field_item_list[0]->entity->changed->value),
            ];
          }
          else {
            $return[$field] = [
              'label' => $this->getTranslateLabel($field_definition->getLabel()),
              'value' => $field_item_list[0]->value,
            ];
          }
        }
      }
    }

    return $return;
  }

  protected function processTerm($field_item_list) {
    $value = [];
    $language =  \Drupal::languageManager()->getCurrentLanguage()->getId();
    foreach ($field_item_list as $term_filed) {
      $filed_value = $term_filed->getValue();
      $term = Term::load($filed_value['target_id']);
      if ($term->hasTranslation($language)) {
        $value[] = $term->getTranslation($language)->getName();
      }
      else {
        $value[] = $term->getName();
      }

    }

    return $value;
  }

  protected function getTranslateLabel($label) {
    $language =  \Drupal::languageManager()->getCurrentLanguage()->getId();
    $translatedLabel = '没有翻译';
    if ($label instanceof TranslatableMarkup) {
      $translatedLabel = $label->render();
    } elseif (is_string($label)) {
      $translatableMarkup = t($label, [], ['langcode' => $language]);
      //optionally, render to string
      $translatedLabel = $translatableMarkup->render();
    }

    return $translatedLabel;
  }

  public function permissions() {
    return [];
  }
}
