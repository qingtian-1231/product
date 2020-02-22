<?php

namespace Drupal\pro_core\Plugin\rest\resource;

use Drupal\rest\Plugin\ResourceBase;
use Drupal\rest\ResourceResponse;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\field\Entity\FieldConfig;
use Drupal\taxonomy\Entity\Term;

/**
 * Provides a Demo Resource
 *
 * @RestResource(
 *   id = "demo_resource",
 *   label = @Translation("产品和配方的关联分类列表"),
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
    $vocabularies = ['product_type', 'prduct_brand', 'applacation'];
    $manager = \Drupal::entityTypeManager()->getStorage('taxonomy_term');
    // Load the taxonomy tree with special parameters.
    $result = [];
    foreach ($vocabularies as $vocabulary) {
      $terms = $manager->loadTree($vocabulary);
      $tree = [];
      foreach ($terms as $tree_object) {
        $this->buildTree($tree, (array) $tree_object, $vocabulary);
      }

      $result[$vocabulary] = $tree;
    }

    return new ResourceResponse($result);
  }

  protected function buildTree(&$tree, $object, $vocabulary) {
    $manager = \Drupal::entityTypeManager()->getStorage('taxonomy_term');

    if ($object['depth'] != 0) {
      return;
    }
    $tree[$object['tid']] = $object;
    $tree[$object['tid']]['children'] = [];
    $object_children = &$tree[$object['tid']]['children'];

    $children = $manager->loadChildren($object['tid']);
    if (!$children) {
      return;
    }

    $child_tree_objects = $manager->loadTree($vocabulary, $object['tid']);

    foreach ($children as $child) {
      foreach ($child_tree_objects as $child_tree_object) {
        if ($child_tree_object->tid == $child->id()) {
          $this->buildTree($object_children, (array) $child_tree_object, $vocabulary);
        }
      }
    }
  }

  public function permissions() {
    return [];
  }
}
