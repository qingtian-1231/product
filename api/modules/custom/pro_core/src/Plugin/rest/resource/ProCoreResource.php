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

      // 排序
      $new_tree = [];
      foreach ($tree as $term) {
        $new_children = $this->arraySort($term['children'], 'weight');
        $term['children'] = $new_children;

        foreach ($term['children'] as &$second_child) {
          if (count($second_child['children']) > 0) {
            $second_child['children'] = $this->arraySort($second_child['children'], 'weight');
          }
        }

        $new_tree[] = $term;
      }

      $tree = $new_tree;
      /**
       * TODO
       * 每个对象获得所有层级的子tid
       */
      $result[$vocabulary] = $tree;
    }

    return new ResourceResponse($result);
  }

  protected function buildTree(&$tree, $object, $vocabulary) {
    $manager = \Drupal::entityTypeManager()->getStorage('taxonomy_term');

    $language =  \Drupal::languageManager()->getCurrentLanguage()->getId();
    $term = \Drupal\taxonomy\Entity\Term::load($object['tid']);
    if ($term->hasTranslation($language)) {
      $object['name'] = $term->getTranslation($language)->getName();
    }

    if ($object['depth'] != 0) {
      return;
    }
    $tree[$object['tid']] = $object;
    $tree[$object['tid']]['children'] = [];
    $tree[$object['tid']]['children_ids'] = [];
    $object_children = &$tree[$object['tid']]['children'];
    $children_ids = &$tree[$object['tid']]['children_ids'];

    $children = $manager->loadChildren($object['tid']);
    if (!$children) {
      return;
    }

    $child_tree_objects = $manager->loadTree($vocabulary, $object['tid']);

    foreach ($children as $child) {
      foreach ($child_tree_objects as $child_tree_object) {
        if ($child_tree_object->tid == $child->id()) {
          $children_ids[]= $child_tree_object->tid;
          $this->buildTree($object_children, (array) $child_tree_object, $vocabulary);
        }
      }
    }
  }

  protected function arraySort($array, $keys, $sort='asc') {
    $newArr = $valArr = array();
    foreach ($array as $key => $value) {
      $valArr[$key] = $value[$keys];
    }
    ($sort == 'asc') ?  asort($valArr) : arsort($valArr);
    reset($valArr);
    foreach($valArr as $key => $value) {
      $newArr[] = $array[$key];
    }
    return $newArr;
  }

  public function permissions() {
    return [];
  }
}
