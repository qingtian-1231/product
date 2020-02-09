<?php

namespace Drupal\pro_core\Plugin\rest\resource;

use Drupal\rest\Plugin\ResourceBase;
use Drupal\rest\ResourceResponse;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\field\Entity\FieldConfig;

/**
 * Provides a Demo Resource
 *
 * @RestResource(
 *   id = "demo_resource",
 *   label = @Translation("Demo Resource"),
 *   uri_paths = {
 *     "canonical" = "/demo_rest_api/demo_resource"
 *   }
 * )
 */
class ProCoreResource extends ResourceBase {

  /**
   * Responds to entity GET requests.
   * @return \Drupal\rest\ResourceResponse
   */
  public function get() {
    $entityManager = \Drupal::service('entity.manager');
    $field_definition = [];
    $formulation_fields = array_filter(
      $entityManager->getFieldDefinitions('node', 'formulation'),
      function ($field_definition) {
        return $field_definition instanceof FieldConfig;
      }
    );
    foreach ($formulation_fields as $field => $field_config) {
      $field_definition['formulation'][$field] = $field_config->getLabel();
    }

    $product_fields = array_filter(
      $entityManager->getFieldDefinitions('commerce_product', 'default'),
      function ($field_definition) {
        return $field_definition instanceof FieldConfig;
      }
    );
    foreach ($product_fields as $field => $field_config) {
      $field_definition['product'][$field] = $field_config->getLabel();
    }

    $response = $field_definition;
    return new ResourceResponse($response);
  }

  public function permissions() {
    return [];
  }
}
