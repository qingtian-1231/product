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

//  function pro_core_update_8002() {
//    global $base_url;
//
//    $entity_manager = \Drupal::entityManager();
//    $file = $base_url . '/sites/default/files/product_inpu.csv';
//    $source_file = drupal_get_path('module', 'pro_core') . '/example_data/product_input.csv';
//
//    $handle = fopen($source_file, "r");
//
//    $jump = 0;
//    while (($data = fgetcsv($handle)) !== false) {
//      //下面这行代码可以解决中文字符乱码问题
//      $jump++;
//      foreach ($data as $index => $term) {
//        $data[$index] = iconv('gbk', 'utf-8', $term);
//      }
//
//      // 跳过前两行标题
//      if ($jump == 1 || $jump == 2) {
//        continue;
//      }
//
//      $data[4] = str_replace(['?', '？'], "®", $data[4]);
//      $data[5] = str_replace(['?', '？'], "®", $data[5]);
//      $data[6] = str_replace(['?', '？'], "®", $data[6]);
//
//
//      if (!empty($data[46])) {
//        $entity = \Drupal::entityTypeManager()->getStorage('commerce_product')->load($data[46]);
//        $field_buy_link = [];
//        if (!empty($data[8])) {
//          $field_buy_link = [
//            'title' => '购买链接',
//            'uri' => $data[8],
//          ];
//        }
//
//        $product_variation = [];
//        if (!empty($data[45])) {
//          $variation_array = explode('#', $data[45]);
//          foreach ($variation_array as $item) {
//            $arr = explode(',', $item);
//            // The price of the variation.
//            $price = new \Drupal\commerce_price\Price($arr[1], 'CNY');
//            $variation = \Drupal\commerce_product\Entity\ProductVariation::create([
//              'type' => 'default', // The default variation type is 'default'.
//              'sku' => $arr[0], // The variation sku.
//              'status' => 1, // The product status. 0 for disabled, 1 for enabled.
//              'price' => $price,
//              'attribute_product_amount' => $arr[2]
//            ]);
//            $variation->save();
//            array_push($product_variation, $variation);
//          }
//        }
//
//        $entity->field_freeze_thaw_stability->value = $data[34];
//        $entity->field_buy_link->value = $field_buy_link;
//        $entity->field__nco->value = $data[25];
//        $entity->field__oh->value = $data[31];
//        $entity->field_hazen_chroma->value = $data[41];
//        $entity->field_molecular_weight->value = $data[22];
//        $entity->field_solid_content->value = $data[18];
//        $entity->field_physical_form->value = $data[13];
//        $entity->field_benefits->value = $data[15];
//        $entity->field_functional_group->value = $data[24];
//        $entity->field_calculated_value->value = $data[21];
//        $entity->field_density->value = $data[29];
//        $entity->field_average_particle->value = $data[39];
//        $entity->field_total_voc->value = $data[38];
//        $entity->field_product_package->value = $data[43];
//        $entity->field_minimum_film_forming_tempe->value = $data[33];
//        $entity->field_molar_mass->value = $data[26];
//        $entity->field_boiling_point->value = $data[27];
//        $entity->field_free_formaldehyde_content->value = $data[20];
//        $entity->field_solvent->value = $data[42];
//        $entity->field_melting_point->value = $data[40];
//        $entity->field_glass_transition_temperatu->value = $data[30];
//        $entity->field_thinner->value = $data[19];
//        $entity->field_viscosity->value = $data[23];
//        $entity->field_qiangzhidangliang->value = $data[36];
//        $entity->field_hydroxyl_value->value = $data[35];
//        $entity->field_softening_point->value = $data[37];
//        $entity->field_acid_value->value = $data[28];
//        $entity->field_product_sbu->value = $data[2];
//        $entity->field_product_prd->value = $data[3];
//        $entity->save();
//      }
//      else {
//        $field_buy_link = [];
//        if (!empty($data[8])) {
//          $field_buy_link = [
//            'title' => '购买链接',
//            'url' => $data[8],
//          ];
//        }
//
//        $store = \Drupal\commerce_store\Entity\Store::load(1);
//        $field_country_registration_group = [];
//        if (!empty($data[17])) {
//          $country_array = explode(',', $data[17]);
//          foreach ($country_array as $item) {
//            $paragraph = Paragraph::create([
//              'type' => 'country_registration_group',
//              'field_country_registration' => [$item],
//              'field_country_registration_descr' => ''
//            ]);
//            $paragraph->save();
//
//            array_push($field_country_registration_group, [
//              'target_id' => $paragraph->id(),
//              'target_revision_id' => $paragraph->getRevisionId(),
//            ]);
//          }
//        }
//
//        $product_variation = [];
//        if (!empty($data[45])) {
//          $variation_array = explode('#', $data[45]);
//          foreach ($variation_array as $item) {
//            $arr = explode(',', $item);
//            // The price of the variation.
//            $price = new \Drupal\commerce_price\Price($arr[1], 'CNY');
//            $variation = \Drupal\commerce_product\Entity\ProductVariation::create([
//              'type' => 'default', // The default variation type is 'default'.
//              'sku' => $arr[0], // The variation sku.
//              'status' => 1, // The product status. 0 for disabled, 1 for enabled.
//              'price' => $price,
//              'attribute_product_amount' => $arr[2]
//            ]);
//            $variation->save();
//
//            array_push($product_variation, $variation);
//          }
//        }
//
//        $field_product_brand = '';
//        if (!empty($data[9])) {
//          $field_product_brand = Term::load($data[9]);
//        }
//
//        $field_product_type = '';
//        if (!empty($data[11])) {
//          $field_product_type = Term::load($data[11]);
//        }
//
//        $field_suitable_application = [];
//        if (!empty($data[14])) {
//          $suitable_application_array = explode(',', $data[14]);
//          foreach ($suitable_application_array as $item) {
//            array_push($field_suitable_application, Term::load($item));
//          }
//        }
//
//        $field_recommended_application = [];
//        if (!empty($data[16])) {
//          $recommended_application = explode('#', $data[16]);
//          foreach ($recommended_application as $item) {
//            array_push($field_recommended_application, $item);
//          }
//        }
//
//        $field_product_origin = 'CN';
//        if (!empty($data[44])) {
//          $product_origin_country_array = explode(',', $data[44]);
//          $field_product_origin = $product_origin_country_array[0];
//        }
//
//        $product = \Drupal\commerce_product\Entity\Product::create([
//          'uid' => 1, // The user id that created the product.
//          'type' => 'default', // Just like variation, the default product type is 'default'.
//          'title' => $data[4],
//          'stores' => [$store], // The store we created/loaded above.
//          'variations' => $product_variation, // The variation we created above.
//          'field__nco' => $data[25],
//          'field__oh' => $data[31],
//          'field_cas_number' => '',
//          'field_hazen_chroma' => $data[41],
//          'field_ph' => $data[32],
//          'field_product_prd' => $data[3],
//          'field_product_sbu' => $data[2],
//          'field_product_type' => $field_product_type,
//          'field_other_names' => $data[5],
//          'field_product_brand' => $field_product_brand,
//          'body' => $data[10],
//          'field_product_origin' => $field_product_origin,
//          'field_formulation' => [],
//          'field_freeze_thaw_stability' => $data[34],
//          'field_molecular_weight' => $data[22],
//          'field_spray_viscosity' => '',
//          'field_solid_content' => $data[18],
//          'field_physical_form' => $data[13],
//          'field_benefits' => $data[15],
//          'field_functional_group' => $data[24],
//          'field_calculated_value' => $data[21],
//          'field_density' => $data[29],
//          'field_product_name' => $data[6],
//          'field_average_particle' => $data[39],
//          'field_total_voc' => $data[38],
//          'field_product_package' => $data[43],
//          'field_is_public' => '1',
//          'field_is_feature' => '0',
//          'field_minimum_film_forming_tempe' => $data[33],
//          'field_ingredient_content' => '',
//          'field_recommended_application' => $field_recommended_application,
//          'field_molar_mass' => $data[26],
//          'field_product_art' => '',
//          'field_boiling_point' => $data[27],
//          'field_country_registration_group' => $field_country_registration_group,
//          'field_free_formaldehyde_content' => $data[20],
//          'field_solvent' => $data[42],
//          'field_melting_point' => $data[40],
//          'field_glass_transition_temperatu' => $data[30],
//          'field_thinner' => $data[19],
//          'field_viscosity' => $data[23],
//          'field_buy_link' => [$field_buy_link],
//          'field_qiangzhidangliang' => $data[36],
//          'field_hydroxyl_value' => $data[35],
//          'field_softening_point' => $data[37],
//          'field_suitable_application' => $field_suitable_application,
//          'field_generic_chemical_name' => $data[12],
//          'field_acid_value' => $data[28],
//          'field_front_image' => null,
//          'field_front_product_color' => '_none',
//          'field_front_product_description' => 'safds',
//        ]);
//        $product->save();
//      }
//
//    }
//
//    fclose($handle);
//  }

  public function permissions() {
    return [];
  }
}
