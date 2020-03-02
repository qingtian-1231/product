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
 *   id = "term_details_resource",
 *   label = @Translation("获得具体分类的详细信息"),
 *   uri_paths = {
 *     "canonical" = "/api/term_details/resource/{term_type}/{term_id}"
 *   }
 * )
 */
class TermDetailsResource extends ResourceBase {

  /**
   * Responds to entity GET requests.
   * @return \Drupal\rest\ResourceResponse
   */
  public function get($term_type, $term_id) {
    $vocabularies = ['product_type', 'prduct_brand', 'applacation'];

    if (!in_array($term_type, $vocabularies)) {
      return new ResourceResponse(['error' => '当前类别不存在'], 500);
    }


    $term = Term::load($term_id);

    $result = [];
    foreach ($term as $name => $field) {
      if ($term->{$name}->value) {
        if ($name === 'field_application_description') {
          $renderer = \Drupal::service('renderer');
          $term->{$name}->value = $this->get_absolute_url($term->{$name}->value);
        }
        $result[$name] = $term->{$name}->value;
      }
    }

    return new ResourceResponse($result);
  }

  function get_absolute_url($content) {
    $host = \Drupal::request()->getSchemeAndHttpHost();
    $pregRule = '/(<img.+?.+)(src=\"\/)(.+\.(jpg|gif|bmp|bnp|png|jpeg)\"?.+>)/i';
    $content = preg_replace($pregRule, "\${1}src=\"" . $host ."/\${3}", $content);

    return $content;
  }

  public function permissions() {
    return [];
  }
}
