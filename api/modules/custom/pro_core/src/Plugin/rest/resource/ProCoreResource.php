<?php

namespace Drupal\pro_core\Plugin\rest\resource;

use Drupal\rest\Plugin\ResourceBase;
use Drupal\rest\ResourceResponse;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\field\Entity\FieldConfig;
use Drupal\taxonomy\Entity\Term;
use Drupal\Component\Utility\Environment;
use Drupal\paragraphs\Entity\Paragraph;
use \Drupal\node\Entity\Node;

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

  function pro_core_update_8002() {
    $entity_manager = \Drupal::entityManager();
    $source_file = drupal_get_path('module', 'pro_core') . '/example_data/product_input.csv';
    $handle = fopen($source_file, "r");

    $jump = 0;
    while (($data = fgetcsv($handle)) !== false) {
      //下面这行代码可以解决中文字符乱码问题
      $jump++;
      foreach ($data as $index => $term) {
        $data[$index] = iconv('gbk', 'utf-8', $term);
      }

      // 跳过前两行标题
      if ($jump == 1 || $jump == 2) {
        continue;
      }

      $data[4] = str_replace(['?', '？'], "®", $data[4]);
      $data[5] = str_replace(['?', '？'], "®", $data[5]);
      $data[6] = str_replace(['?', '？'], "®", $data[6]);


      if (!empty($data[46])) {
        $entity = \Drupal::entityTypeManager()->getStorage('commerce_product')->load($data[46]);
        $field_buy_link = [];
        if (!empty($data[8])) {
          $field_buy_link = [
            'title' => '购买链接',
            'uri' => $data[8],
          ];
        }

        $product_variation = [];
        if (!empty($data[45])) {
          $variation_array = explode('#', $data[45]);
          foreach ($variation_array as $item) {
            $arr = explode(',', $item);
            // The price of the variation.
            $price = new \Drupal\commerce_price\Price($arr[1], 'CNY');
            $variation = \Drupal\commerce_product\Entity\ProductVariation::create([
              'type' => 'default', // The default variation type is 'default'.
              'sku' => $arr[0], // The variation sku.
              'status' => 1, // The product status. 0 for disabled, 1 for enabled.
              'price' => $price,
              'attribute_product_amount' => $arr[2]
            ]);
            $variation->save();
            array_push($product_variation, $variation);
          }
        }

        $entity->field_freeze_thaw_stability->value = $data[34];
        $entity->field_buy_link->value = $field_buy_link;
        $entity->field__nco->value = $data[25];
        $entity->field__oh->value = $data[31];
        $entity->field_hazen_chroma->value = $data[41];
        $entity->field_molecular_weight->value = $data[22];
        $entity->field_solid_content->value = $data[18];
        $entity->field_physical_form->value = $data[13];
        $entity->field_benefits->value = $data[15];
        $entity->field_functional_group->value = $data[24];
        $entity->field_calculated_value->value = $data[21];
        $entity->field_density->value = $data[29];
        $entity->field_average_particle->value = $data[39];
        $entity->field_total_voc->value = $data[38];
        $entity->field_product_package->value = $data[43];
        $entity->field_minimum_film_forming_tempe->value = $data[33];
        $entity->field_molar_mass->value = $data[26];
        $entity->field_boiling_point->value = $data[27];
        $entity->field_free_formaldehyde_content->value = $data[20];
        $entity->field_solvent->value = $data[42];
        $entity->field_melting_point->value = $data[40];
        $entity->field_glass_transition_temperatu->value = $data[30];
        $entity->field_thinner->value = $data[19];
        $entity->field_viscosity->value = $data[23];
        $entity->field_qiangzhidangliang->value = $data[36];
        $entity->field_hydroxyl_value->value = $data[35];
        $entity->field_softening_point->value = $data[37];
        $entity->field_acid_value->value = $data[28];
        $entity->field_product_sbu->value = $data[2];
        $entity->field_product_prd->value = $data[3];
        $entity->save();
      }
      else {
        $field_buy_link = [];
        if (!empty($data[8])) {
          $field_buy_link = [
            'title' => '购买链接',
            'uri' => $data[8],
          ];
        }

        $store = \Drupal\commerce_store\Entity\Store::load(1);
        $field_country_registration_group = [];
        if (!empty($data[17])) {
          $country_array = explode(',', $data[17]);
          foreach ($country_array as $item) {
            $paragraph = Paragraph::create([
              'type' => 'country_registration_group',
              'field_country_registration' => [$item],
              'field_country_registration_descr' => ''
            ]);
            $paragraph->save();

            array_push($field_country_registration_group, [
              'target_id' => $paragraph->id(),
              'target_revision_id' => $paragraph->getRevisionId(),
            ]);
          }
        }

        $product_variation = [];
        $art = [];
        if (!empty($data[45])) {
          $variation_array = explode('#', $data[45]);
          foreach ($variation_array as $item) {
            $arr = explode(',', $item);
            // The price of the variation.
            $price = new \Drupal\commerce_price\Price($arr[1], 'CNY');
            $variation = \Drupal\commerce_product\Entity\ProductVariation::create([
              'type' => 'default', // The default variation type is 'default'.
              'sku' => $arr[0], // The variation sku.
              'status' => 1, // The product status. 0 for disabled, 1 for enabled.
              'price' => $price,
              'attribute_product_amount' => $arr[2]
            ]);
            $variation->save();

            array_push($art, $arr[0]);
            array_push($product_variation, $variation);
          }
        }

        $field_product_brand = '';
        if (!empty($data[9])) {
          $field_product_brand = Term::load($data[9]);
        }

        $field_product_type = '';
        if (!empty($data[11])) {
          $field_product_type = Term::load($data[11]);
        }

        $field_suitable_application = [];
        if (!empty($data[14])) {
          $suitable_application_array = explode(',', $data[14]);
          foreach ($suitable_application_array as $item) {
            array_push($field_suitable_application, Term::load($item));
          }
        }

        $field_recommended_application = [];
        if (!empty($data[16])) {
          $recommended_application = explode('#', $data[16]);
          foreach ($recommended_application as $item) {
            array_push($field_recommended_application, $item);
          }
        }

        $field_product_origin = 'CN';
        if (!empty($data[44])) {
          $product_origin_country_array = explode(',', $data[44]);
          $field_product_origin = $product_origin_country_array[0];
        }

        $product = \Drupal\commerce_product\Entity\Product::create([
          'uid' => 1, // The user id that created the product.
          'type' => 'default', // Just like variation, the default product type is 'default'.
          'title' => $data[4],
          'stores' => [$store], // The store we created/loaded above.
          'variations' => $product_variation, // The variation we created above.
          'field__nco' => $data[25],
          'field__oh' => $data[31],
          'field_cas_number' => '',
          'field_hazen_chroma' => $data[41],
          'field_ph' => $data[32],
          'field_product_prd' => $data[3],
          'field_product_sbu' => $data[2],
          'field_product_type' => $field_product_type,
          'field_other_names' => $data[5],
          'field_product_brand' => $field_product_brand,
          'body' => $data[10],
          'field_product_origin' => $field_product_origin,
          'field_formulation' => [],
          'field_freeze_thaw_stability' => $data[34],
          'field_molecular_weight' => $data[22],
          'field_spray_viscosity' => '',
          'field_solid_content' => $data[18],
          'field_physical_form' => $data[13],
          'field_benefits' => $data[15],
          'field_functional_group' => $data[24],
          'field_calculated_value' => $data[21],
          'field_density' => $data[29],
          'field_product_name' => $data[6],
          'field_average_particle' => $data[39],
          'field_total_voc' => $data[38],
          'field_product_package' => $data[43],
          'field_is_public' => '1',
          'field_is_feature' => '0',
          'field_minimum_film_forming_tempe' => $data[33],
          'field_ingredient_content' => '',
          'field_recommended_application' => $field_recommended_application,
          'field_molar_mass' => $data[26],
          'field_product_art' => implode($art, '|'),
          'field_boiling_point' => $data[27],
          'field_country_registration_group' => $field_country_registration_group,
          'field_free_formaldehyde_content' => $data[20],
          'field_solvent' => $data[42],
          'field_melting_point' => $data[40],
          'field_glass_transition_temperatu' => $data[30],
          'field_thinner' => $data[19],
          'field_viscosity' => $data[23],
          'field_buy_link' => [$field_buy_link],
          'field_qiangzhidangliang' => $data[36],
          'field_hydroxyl_value' => $data[35],
          'field_softening_point' => $data[37],
          'field_suitable_application' => $field_suitable_application,
          'field_generic_chemical_name' => $data[12],
          'field_acid_value' => $data[28],
          'field_front_image' => null,
          'field_front_product_color' => '_none',
          'field_front_product_description' => 'safds',
        ]);
        $product->save();
      }

    }

    fclose($handle);
  }

  function pro_core_update_8003() {
    $entity_type_manager = \Drupal::service('entity_type.manager');
    $storageCommerceProduct = $entity_type_manager->getStorage('commerce_product');

    $entity_manager = \Drupal::entityManager();
    $source_file = drupal_get_path('module', 'pro_core') . '/example_data/product_input_EN.csv';
    $handle = fopen($source_file, "r");

    $jump = 0;

    while (($data = fgetcsv($handle)) !== false) {
      //下面这行代码可以解决中文字符乱码问题
      $jump++;
      foreach ($data as $index => $term) {
        $data[$index] = iconv('gbk', 'utf-8', $term);
      }

      // 跳过前两行标题
      if ($jump == 1 || $jump == 2) {
        continue;
      }

      $data[4] = str_replace(['?', '？'], "®", $data[4]);
      $data[5] = str_replace(['?', '？'], "®", $data[5]);
      $data[6] = str_replace(['?', '？'], "®", $data[6]);
      $field_recommended_application = [];

      if (!empty($data[16])) {
        $recommended_application = explode('#', $data[16]);
        foreach ($recommended_application as $item) {
          array_push($field_recommended_application, $item);
        }
      }
      $commerceProduct = $storageCommerceProduct->loadByProperties(['title' => $data[4]]);
      $commerceProduct = reset($commerceProduct);

      if ($commerceProduct && !$commerceProduct->hasTranslation('en')) {
        $entity_array = $commerceProduct->toArray();
        $translated_fields = [];
        $translated_fields['title'] = $data[4];
        $translated_fields['body'] = $data[10];
        $translated_fields['field__nco'] = $data[25];
        $translated_fields['field__oh'] = $data[31];
        $translated_fields['field_hazen_chroma'] = $data[41];
        $translated_fields['field_ph'] = $data[32];
        $translated_fields['field_other_names'] = $data[5];
        $translated_fields['field_freeze_thaw_stability'] = $data[34];
        $translated_fields['field_molecular_weight'] = $data[22];
        $translated_fields['field_solid_content'] = $data[18];
        $translated_fields['field_physical_form'] = $data[13];
        $translated_fields['field_benefits'] = $data[15];
        $translated_fields['field_functional_group'] = $data[24];
        $translated_fields['field_calculated_value'] = $data[21];
        $translated_fields['field_density'] = $data[29];
        $translated_fields['field_product_name'] = $data[6];
        $translated_fields['field_average_particle'] = $data[39];
        $translated_fields['field_total_voc'] = $data[38];
        $translated_fields['field_product_package'] = $data[43];
        $translated_fields['field_minimum_film_forming_tempe'] = $data[33];
        $translated_fields['field_molar_mass'] = $data[26];
        $translated_fields['field_boiling_point'] = $data[27];
        $translated_fields['field_free_formaldehyde_content'] = $data[20];
        $translated_fields['field_solvent'] = $data[42];
        $translated_fields['field_melting_point'] = $data[40];
        $translated_fields['field_glass_transition_temperatu'] = $data[30];
        $translated_fields['field_thinner'] = $data[19];
        $translated_fields['field_viscosity'] = $data[23];
        $translated_fields['field_buy_link'] = [
          'title' => 'Purchase link',
          'uri' => $data[8],
        ];
        $translated_fields['field_qiangzhidangliang'] = $data[36];
        $translated_fields['field_hydroxyl_value'] = $data[35];
        $translated_fields['field_softening_point'] = $data[37];
        $translated_fields['field_generic_chemical_name'] = $data[12];
        $translated_fields['field_acid_value'] = $data[28];
        $translated_fields['field_recommended_application'] = $field_recommended_application;

        $translated_entity_array = array_merge($entity_array, $translated_fields);
        $commerceProduct->addTranslation('en', $translated_entity_array)->save();
      }
    }

    fclose($handle);
  }

  function pro_core_update_8004() {
    Environment::setTimeLimit(1000);
    $entity_type_manager = \Drupal::service('entity_type.manager');
    $storageCommerceProduct = $entity_type_manager->getStorage('commerce_product');
    $targetDirectory = 'public://product-introduce-files/';
    $source_file = drupal_get_path('module', 'pro_core') . '/example_data/product_files.csv';
    $handle = fopen($source_file, "r");

    if (!is_dir($targetDirectory)) {
      /** @var \Drupal\Core\File\FileSystemInterface $file_system */
      $file_system = \Drupal::service('file_system');
      $file_system->mkdir($targetDirectory);
    }

    $jump = 0;

    while (($data = fgetcsv($handle)) !== false) {
      //下面这行代码可以解决中文字符乱码问题
      $jump++;

      // 跳过前两行标题
      if ($jump == 1) {
        continue;
      }

      $commerceProduct = $storageCommerceProduct->loadByProperties(['title' => $data[3]]);
      if (count($commerceProduct) > 0) {
        $commerceProduct = reset($commerceProduct);
        $source_file = drupal_get_path('module', 'pro_core') . '/product_files/' . $data[5];
        if (file_exists($source_file)) {
          $file_data = file_get_contents($source_file);
          $file = file_save_data($file_data, 'public://product-introduce-files/' . $data[5], FILE_EXISTS_REPLACE);

          $commerceProduct->field_product_file = [
            'target_id' => $file->id(),
            'display' => 1,
            'description' => $data[4] . '#' . $data[6],
          ];

          $commerceProduct->save();
        }
        else {
          \Drupal::logger('pro_core')->notice($data[3] . '中文文件不存在');
        }

        if ($commerceProduct->hasTranslation('en')) {
          $transCommerceProduct = $commerceProduct->getTranslation('en');
          $source_file = drupal_get_path('module', 'pro_core') . '/product_files/' . $data[8];
          if (file_exists($source_file)) {
            $file_data = file_get_contents($source_file);
            $file = file_save_data($file_data, 'public://product-introduce-files/' . $data[8], FILE_EXISTS_REPLACE);
            $transCommerceProduct->field_product_file = [
              'target_id' => $file->id(),
              'display' => 1,
              'description' => $data[7] . '#' . $data[9],
            ];
            $transCommerceProduct->save();
          }
          else {
            \Drupal::logger('pro_core')->notice($data[3] . '英文文件不存在');
          }
        }
      }
    }

    fclose($handle);
  }

  function pro_core_update_8005() {
    Environment::setTimeLimit(1000);
    $entity_type_manager = \Drupal::service('entity_type.manager');
    $storageCommerceProduct = $entity_type_manager->getStorage('commerce_product');
    $source_file = drupal_get_path('module', 'pro_core') . '/example_data/formulation.csv';
    $handle = fopen($source_file, "r");

    $jump = 0;
    while (($data = fgetcsv($handle)) !== false) {
      //下面这行代码可以解决中文字符乱码问题
      $jump++;

      // 跳过前两行标题
      if ($jump == 1 || $jump == 2) {
        continue;
      }

      $field_formulation_industry = [];
      if (!empty($data[4])) {
        $formulation_industry_array = explode('#', $data[4]);
        foreach ($formulation_industry_array as $item) {
          array_push($field_formulation_industry, Term::load($item));
        }
      }

      $field_formula_composition = [];
      if (!empty($data[7])) {
        $formulation_array = explode('#', $data[7]);
        foreach ($formulation_array as $item) {
          if (strpos($item, '总计') !== false) {
            continue;
          }
          else {
            $formulations = explode(';', $item);
            $commerceProduct = $storageCommerceProduct->loadByProperties(['title' => $formulations[0]]);

            if (count($commerceProduct) > 0) {
              // basf 产品
              $commerceProduct = reset($commerceProduct);

              $paragraph = Paragraph::create([
                'type' => 'basf_product',
                'field_part_basf_product' => [
                  'target_id' => $commerceProduct->product_id->getValue()[0]['value'],
                ],
                'field_basf_work' => isset($formulations[1]) ? $formulations[1] : '',
                'field_proportion_char' => isset($formulations[2]) ? $formulations[2] : ''
              ]);

            } else {
              $paragraph = Paragraph::create([
                'type' => 'normal_product',
                'field_part_normal_product' => [
                  $formulations[0],
                ],
                'field_work' => isset($formulations[1]) ? $formulations[1] : '',
                'field_proportion_char' => isset($formulations[2]) ? $formulations[2] : ''
              ]);
            }

            $paragraph->save();

            array_push($field_formula_composition, [
              'target_id' => $paragraph->id(),
              'target_revision_id' => $paragraph->getRevisionId(),
            ]);
          }
        }
      }

      $node = Node::create([
        'type' => 'formulation',
        'uid' => 1,
        'title' => $data[0],
        'field_formulation_number' => [$data[0]],
        'field_formulation_name' => [$data[1]],
        'field_formula_composition' => $field_formula_composition,
        'field_formulationbenefits' => !empty($data[6]) ? $data[6] : '',
        'field_formulation_industry' => $field_formulation_industry,
      ]);

      $node->save();
    }

    fclose($handle);
  }

  function pro_core_update_8006() {
    Environment::setTimeLimit(1000);
    $entity_type_manager = \Drupal::service('entity_type.manager');
    $storageCommerceProduct = $entity_type_manager->getStorage('commerce_product');
    $storageFormulation = $entity_type_manager->getStorage('node');
    $source_file = drupal_get_path('module', 'pro_core') . '/example_data/formulation_en.csv';
    $handle = fopen($source_file, "r");

    $jump = 0;
    while (($data = fgetcsv($handle)) !== false) {
      //下面这行代码可以解决中文字符乱码问题
      $jump++;

      // 跳过前两行标题
      if ($jump == 1 || $jump == 2) {
        continue;
      }

      $field_formulation_industry = [];
      if (!empty($data[4])) {
        $formulation_industry_array = explode('#', $data[4]);
        foreach ($formulation_industry_array as $item) {
          array_push($field_formulation_industry, Term::load($item));
        }
      }

      $field_formula_composition = [];
      if (!empty($data[7])) {
        $formulation_array = explode('#', $data[7]);
        foreach ($formulation_array as $item) {
          if (strpos($item, 'Total') !== false) {
            continue;
          }
          else {
            $formulations = explode(';', $item);
            $commerceProduct = $storageCommerceProduct->loadByProperties(['title' => $formulations[0]]);

            if (count($commerceProduct) > 0) {
              // basf 产品
              $commerceProduct = reset($commerceProduct);

              $paragraph = Paragraph::create([
                'type' => 'basf_product',
                'field_part_basf_product' => [
                  'target_id' => $commerceProduct->product_id->getValue()[0]['value'],
                ],
                'field_basf_work' => isset($formulations[1]) ? $formulations[1] : '',
                'field_proportion_char' => isset($formulations[2]) ? $formulations[2] : ''
              ]);

            } else {
              $paragraph = Paragraph::create([
                'type' => 'normal_product',
                'field_part_normal_product' => [
                  $formulations[0],
                ],
                'field_work' => isset($formulations[1]) ? $formulations[1] : '',
                'field_proportion_char' => isset($formulations[2]) ? $formulations[2] : ''
              ]);
            }

            $paragraph->save();

            array_push($field_formula_composition, [
              'target_id' => $paragraph->id(),
              'target_revision_id' => $paragraph->getRevisionId(),
            ]);
          }
        }
      }

      $formulation = $storageFormulation->loadByProperties(['title' => $data[0]]);
      $formulation = reset($formulation);

      if ($formulation && !$formulation->hasTranslation('en')) {
        $entity_array = $formulation->toArray();
        $translated_fields = [];
        $translated_fields['title'] = $data[0];
        $translated_fields['field_formulation_number'] = $data[0];
        $translated_fields['field_formulation_name'] = $data[1];
        $translated_fields['field_formulationbenefits'] = !empty($data[6]) ? $data[6] : '';
        $translated_fields['field_formulation_industry'] = $field_formulation_industry;
        $translated_fields['field_formula_composition'] = $field_formula_composition;

        $translated_entity_array = array_merge($entity_array, $translated_fields);
        $formulation->addTranslation('en', $translated_entity_array)->save();
      }
    }

    fclose($handle);
  }

  function pro_core_update_8007() {
    Environment::setTimeLimit(1000);
    $entity_type_manager = \Drupal::service('entity_type.manager');
    $storageCommerceProduct = $entity_type_manager->getStorage('commerce_product');
    $targetDirectory = 'public://product-introduce-files/';
    $source_file = drupal_get_path('module', 'pro_core') . '/example_data/product_files_zh.csv';
    $handle = fopen($source_file, "r");

    if (!is_dir($targetDirectory)) {
      /** @var \Drupal\Core\File\FileSystemInterface $file_system */
      $file_system = \Drupal::service('file_system');
      $file_system->mkdir($targetDirectory);
    }

    $jump = 0;

    while (($data = fgetcsv($handle)) !== false) {
      //下面这行代码可以解决中文字符乱码问题
      $jump++;

      // 跳过前两行标题
      if ($jump == 1) {
        continue;
      }

      $commerceProduct = $storageCommerceProduct->loadByProperties(['title' => $data[3]]);
      if (count($commerceProduct) > 0) {
        $commerceProduct = reset($commerceProduct);
        $source_file = '';
        if (!empty($data[5])) {
          $source_file = drupal_get_path('module', 'pro_core') . '/product_files/' . $data[5];
        }

        if (file_exists($source_file)) {
          $file_data = file_get_contents($source_file);
          $file = file_save_data($file_data, 'public://product-introduce-files/' . $data[5], FILE_EXISTS_REPLACE);

          $commerceProduct->field_product_file[] = [
            'target_id' => $file->id(),
            'display' => 1,
            'description' => $data[4] . '#' . $data[6],
          ];

          $commerceProduct->save();
        }
        else {
          \Drupal::logger('pro_core')->notice($data[3] . '中文文件不存在');
        }

        if ($commerceProduct->hasTranslation('en')) {
          $transCommerceProduct = $commerceProduct->getTranslation('en');
          $source_file = '';
          if (!empty($data[8])) {
            $source_file = drupal_get_path('module', 'pro_core') . '/product_files/' . $data[8];
          }

          if (file_exists($source_file)) {
            $file_data = file_get_contents($source_file);
            $file = file_save_data($file_data, 'public://product-introduce-files/' . $data[8], FILE_EXISTS_REPLACE);
            $transCommerceProduct->field_product_file[] = [
              'target_id' => $file->id(),
              'display' => 1,
              'description' => $data[7] . '#' . $data[9],
            ];
            $transCommerceProduct->save();
          }
          else {
            \Drupal::logger('pro_core')->notice($data[3] . '英文文件不存在');
          }
        }
      }
    }

    fclose($handle);
  }

  function pro_core_update_8008() {
    $entity_manager = \Drupal::entityManager();
    $source_file = drupal_get_path('module', 'pro_core') . '/example_data/product_input.csv';
    $handle = fopen($source_file, "r");

    $jump = 0;
    while (($data = fgetcsv($handle)) !== false) {
      //下面这行代码可以解决中文字符乱码问题
      $jump++;
      foreach ($data as $index => $term) {
        $data[$index] = iconv('gbk', 'utf-8', $term);
      }

      // 跳过前两行标题
      if ($jump == 1 || $jump == 2) {
        continue;
      }

      $data[4] = str_replace(['?', '？'], "®", $data[4]);
      $data[5] = str_replace(['?', '？'], "®", $data[5]);
      $data[6] = str_replace(['?', '？'], "®", $data[6]);

      if (!empty($data[46])) {
        $entity = \Drupal::entityTypeManager()->getStorage('commerce_product')->load($data[46]);

        $field_buy_link = [];
        if (!empty($data[8])) {
          $field_buy_link = [
            'title' => '购买链接',
            'uri' => $data[8],
          ];
        }

        $field_country_registration_group = [];
        if (!empty($data[17])) {
          $country_array = explode(',', $data[17]);
          foreach ($country_array as $item) {
            $paragraph = Paragraph::create([
              'type' => 'country_registration_group',
              'field_country_registration' => [$item],
              'field_country_registration_descr' => ''
            ]);
            $paragraph->save();

            array_push($field_country_registration_group, [
              'target_id' => $paragraph->id(),
              'target_revision_id' => $paragraph->getRevisionId(),
            ]);
          }
        }

        $product_variation = [];
        $art = [];
        if (!empty($data[45])) {
          $variation_array = explode('#', $data[45]);
          foreach ($variation_array as $item) {
            $arr = explode(',', $item);
            // The price of the variation.
            $price = new \Drupal\commerce_price\Price($arr[1], 'CNY');
            $variation = \Drupal\commerce_product\Entity\ProductVariation::create([
              'type' => 'default', // The default variation type is 'default'.
              'sku' => $arr[0], // The variation sku.
              'status' => 1, // The product status. 0 for disabled, 1 for enabled.
              'price' => $price,
              'attribute_product_amount' => $arr[2]
            ]);
            $variation->save();

            array_push($art, $arr[0]);
            array_push($product_variation, ['target_id' => $variation->id()]);
          }
        }

        $field_product_brand = '';
        if (!empty($data[9])) {
          $field_product_brand = Term::load($data[9]);
        }

        $field_product_type = '';
        if (!empty($data[11])) {
          $field_product_type = Term::load($data[11]);
        }

        $field_suitable_application = [];
        if (!empty($data[14])) {
          $suitable_application_array = explode(',', $data[14]);
          foreach ($suitable_application_array as $item) {
            array_push($field_suitable_application, Term::load($item));
          }
        }

        $field_recommended_application = [];
        if (!empty($data[16])) {
          $recommended_application = explode('#', $data[16]);
          foreach ($recommended_application as $item) {
            array_push($field_recommended_application, $item);
          }
        }

        $field_product_origin = 'CN';
        if (!empty($data[44])) {
          $product_origin_country_array = explode(',', $data[44]);
          $field_product_origin = $product_origin_country_array[0];
        }

        $entity->field_freeze_thaw_stability->value = $data[34];
        $entity->field_buy_link->value = $field_buy_link;
        $entity->field__nco->value = $data[25];
        $entity->field__oh->value = $data[31];
        $entity->field_hazen_chroma->value = $data[41];
        $entity->field_molecular_weight->value = $data[22];
        $entity->field_solid_content->value = $data[18];
        $entity->field_physical_form->value = $data[13];
        $entity->field_benefits->value = $data[15];
        $entity->field_functional_group->value = $data[24];
        $entity->field_calculated_value->value = $data[21];
        $entity->field_density->value = $data[29];
        $entity->field_average_particle->value = $data[39];
        $entity->field_total_voc->value = $data[38];
        $entity->field_product_package->value = $data[43];
        $entity->field_minimum_film_forming_tempe->value = $data[33];
        $entity->field_molar_mass->value = $data[26];
        $entity->field_boiling_point->value = $data[27];
        $entity->field_free_formaldehyde_content->value = $data[20];
        $entity->field_solvent->value = $data[42];
        $entity->field_melting_point->value = $data[40];
        $entity->field_glass_transition_temperatu->value = $data[30];
        $entity->field_thinner->value = $data[19];
        $entity->field_viscosity->value = $data[23];
        $entity->field_qiangzhidangliang->value = $data[36];
        $entity->field_hydroxyl_value->value = $data[35];
        $entity->field_softening_point->value = $data[37];
        $entity->field_acid_value->value = $data[28];
        $entity->field_product_sbu->value = $data[2];
        $entity->field_product_prd->value = $data[3];
        $entity->field_product_art->value = implode($art, '|');
        $entity->field_product_brand->value = $field_product_brand;
        $entity->field_product_type->value = $field_product_type;
        $entity->field_product_origin->value = $field_product_origin;

        $entity->variations = $product_variation;

        $entity->save();
      }

    }
    fclose($handle);
  }

  function pro_core_update_8009() {
    $entity_type_manager = \Drupal::service('entity_type.manager');
    $storageCommerceProduct = $entity_type_manager->getStorage('commerce_product');

    $entity_manager = \Drupal::entityManager();
    $source_file = drupal_get_path('module', 'pro_core') . '/example_data/product_input_EN.csv';
    $handle = fopen($source_file, "r");

    $translate_title = [
      'Basonat® HW 3280 MBA',
      'Joncryl® HYB 6345 ap',
      'Joncryl® 7256',
      'Joncryl® 7168',
      'Foamaster® WO 2360',
      'Dispex® ULTRA PX 4585',
    ];
    $jump = 0;

    while (($data = fgetcsv($handle)) !== false) {
      //下面这行代码可以解决中文字符乱码问题
      $jump++;
      foreach ($data as $index => $term) {
        $data[$index] = iconv('gbk', 'utf-8', $term);
      }

      // 跳过前两行标题
      if ($jump == 1 || $jump == 2) {
        continue;
      }

      $data[4] = str_replace(['?', '？'], "®", $data[4]);
      $data[5] = str_replace(['?', '？'], "®", $data[5]);
      $data[6] = str_replace(['?', '？'], "®", $data[6]);

      if (in_array($data[4], $translate_title)) {
        $field_recommended_application = [];

        if (!empty($data[16])) {
          $recommended_application = explode('#', $data[16]);
          foreach ($recommended_application as $item) {
            array_push($field_recommended_application, $item);
          }
        }

        $art = [];
        if (!empty($data[45])) {
          $variation_array = explode('#', $data[45]);
          foreach ($variation_array as $item) {
            $arr = explode(',', $item);
            array_push($art, $arr[0]);
          }
        }
        $commerceProduct = $storageCommerceProduct->loadByProperties(['title' => $data[4]]);
        $commerceProduct = reset($commerceProduct);

        if ($commerceProduct->hasTranslation('en')) {
          $transCommerceProduct = $commerceProduct->getTranslation('en');

          $transCommerceProduct->body->value = $data[10];
          $transCommerceProduct->field__nco->value = $data[25];
          $transCommerceProduct->field__oh->value = $data[31];
          $transCommerceProduct->field_buy_link->value = [
            'title' => 'Purchase link',
            'uri' => $data[8],
          ];
          $transCommerceProduct->field_hazen_chroma->value = $data[41];
          $transCommerceProduct->field_ph->value = $data[32];
          $transCommerceProduct->field_other_names->value = $data[5];
          $transCommerceProduct->field_freeze_thaw_stability->value = $data[34];
          $transCommerceProduct->field_molecular_weight->value = $data[22];
          $transCommerceProduct->field_solid_content->value = $data[18];
          $transCommerceProduct->field_physical_form->value = $data[13];
          $transCommerceProduct->field_benefits->value = $data[15];
          $transCommerceProduct->field_functional_group->value = $data[24];
          $transCommerceProduct->field_calculated_value->value = $data[21];
          $transCommerceProduct->field_density->value = $data[29];
          $transCommerceProduct->field_product_name->value = $data[6];
          $transCommerceProduct->field_average_particle->value = $data[39];
          $transCommerceProduct->field_total_voc->value = $data[38];
          $transCommerceProduct->field_product_package->value = $data[43];
          $transCommerceProduct->field_minimum_film_forming_tempe->value = $data[33];
          $transCommerceProduct->field_molar_mass->value = $data[26];
          $transCommerceProduct->field_boiling_point->value = $data[27];
          $transCommerceProduct->field_free_formaldehyde_content->value = $data[20];
          $transCommerceProduct->field_solvent->value = $data[42];
          $transCommerceProduct->field_melting_point->value = $data[40];
          $transCommerceProduct->field_glass_transition_temperatu->value = $data[30];
          $transCommerceProduct->field_thinner->value = $data[19];
          $transCommerceProduct->field_viscosity->value = $data[23];
          $transCommerceProduct->field_qiangzhidangliang->value = $data[36];
          $transCommerceProduct->field_hydroxyl_value->value = $data[35];
          $transCommerceProduct->field_softening_point->value = $data[37];
          $transCommerceProduct->field_generic_chemical_name->value = $data[12];
          $transCommerceProduct->field_acid_value->value = $data[28];
          $transCommerceProduct->field_recommended_application->value = $data[10];
          $transCommerceProduct->field_product_sbu->value = $data[2];
          $transCommerceProduct->field_product_prd->value = $data[3];
          $transCommerceProduct->field_product_art->value = implode($art, '|');

          $transCommerceProduct->save();
        }
      }
    }

    fclose($handle);
  }

  function pro_core_update_8010() {
    Environment::setTimeLimit(1000);
    $entity_type_manager = \Drupal::service('entity_type.manager');
    $storageCommerceProduct = $entity_type_manager->getStorage('commerce_product');
    $storageFormulation = $entity_type_manager->getStorage('node');
    $source_file = drupal_get_path('module', 'pro_core') . '/example_data/formulation_en.csv';
    $handle = fopen($source_file, "r");

    $jump = 0;
    while (($data = fgetcsv($handle)) !== false) {
      //下面这行代码可以解决中文字符乱码问题
      $jump++;

      // 跳过前两行标题
      if ($jump == 1 || $jump == 2) {
        continue;
      }

      $field_formulation_industry = [];
      if (!empty($data[4])) {
        $formulation_industry_array = explode('#', $data[4]);
        foreach ($formulation_industry_array as $item) {
          array_push($field_formulation_industry, Term::load($item));
        }
      }

      $field_formula_composition = [];
      if (!empty($data[7])) {
        $formulation_array = explode('#', $data[7]);
        foreach ($formulation_array as $item) {
          if (strpos($item, 'Total') !== false) {
            continue;
          }
          else {
            $formulations = explode(';', $item);
            $commerceProduct = $storageCommerceProduct->loadByProperties(['title' => $formulations[0]]);

            if (count($commerceProduct) > 0) {
              // basf 产品
              $commerceProduct = reset($commerceProduct);

              $paragraph = Paragraph::create([
                'type' => 'basf_product',
                'field_part_basf_product' => [
                  'target_id' => $commerceProduct->product_id->getValue()[0]['value'],
                ],
                'field_basf_work' => isset($formulations[1]) ? $formulations[1] : '',
                'field_proportion_char' => isset($formulations[2]) ? $formulations[2] : ''
              ]);

            } else {
              $paragraph = Paragraph::create([
                'type' => 'normal_product',
                'field_part_normal_product' => [
                  $formulations[0],
                ],
                'field_work' => isset($formulations[1]) ? $formulations[1] : '',
                'field_proportion_char' => isset($formulations[2]) ? $formulations[2] : ''
              ]);
            }

            $paragraph->save();

            array_push($field_formula_composition, [
              'target_id' => $paragraph->id(),
              'target_revision_id' => $paragraph->getRevisionId(),
            ]);
          }
        }
      }

      $formulation = $storageFormulation->loadByProperties(['title' => $data[0]]);
      $formulation = reset($formulation);

      if ($formulation && method_exists($formulation, 'hasTranslation') && !!$formulation->hasTranslation('en')) {
        $transFormulation = $formulation->getTranslation('en');

        $transFormulation->title->value = $data[0];
        $transFormulation->field_formulation_number->value = $data[0];
        $transFormulation->field_formulation_name->value = $data[1];
        $transFormulation->field_formulationbenefits->value = !empty($data[6]) ? $data[6] : '';
        $transFormulation->field_formulation_industry->value = $field_formulation_industry;
        $transFormulation->field_formula_composition = $field_formula_composition;

        $transFormulation->save();
      }
    }

    fclose($handle);
  }

  public function permissions() {
    return [];
  }
}
