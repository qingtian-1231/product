<?php
// thanks Dan - http://www.mediacurrent.com/blog/eight-insights-and-useful-snippets-d8-rest-module

/** @file
 * Contains \Drupal\views_ext\Plugin\views\style\SerializerCount.
 */

namespace Drupal\pro_core\Plugin\views\style;

use Drupal\Core\Cache\Cache;
use Drupal\Core\Cache\CacheableDependencyInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\views\Plugin\views\style\StylePluginBase;
use Drupal\rest\Plugin\views\style\Serializer;

/** The style plugin for serialized output formats.
 *
 * @ingroup views_style_plugins
 *
 * @ViewsStyle(
 *   id = "serializer_count",
 *   title = @Translation("Serializer with count"),
 *   help = @Translation("Serializes views row data using the Serializer component and adds a count."),
 *   display_types = {"data"}
 * )
 */

class SerializerCount extends Serializer {
  /**
   * {@inheritdoc}
   */
  public function render() {
    $rows = array();
    // !!! Enable some Exposed options in Pager settings.
    $count = $this->view->pager->getTotalItems();
    $items_per_page = $this -> view -> pager -> options['items_per_page'];
    $pages = ceil($count / $items_per_page);
    $current_page = $this->view->pager->getCurrentPage();

    // If the Data Entity row plugin is used, this will be an array of entities
    // which will pass through Serializer to one of the registered Normalizers,
    // which will transform it to arrays/scalars. If the Data field row plugin
    // is used, $rows will not contain objects and will pass directly to the
    // Encoder.
    foreach ($this->view->result as $row_index => $row) {
      $this->view->row_index = $row_index;
      $rows[] = $this->view->rowPlugin->render($row);
    }

    unset($this->view->row_index);

    // Get the content type configured in the display or fallback to the
    // default.
    if ((empty($this->view->live_preview))) {
      $content_type = $this->displayHandler->getContentType();
    }
    else {
      $content_type = !empty($this->options['formats']) ? reset($this->options['formats']) : 'json';
    }

//    // 数组去重
//    $serializeArrs = array_map('serialize', $rows);
//    $uniqueArrs = array_unique($serializeArrs);
//
//    // 获得重复的数量
//    $repeatCount =  count($serializeArrs) - count($uniqueArrs);
//    $unserializeArrs = array_map('unserialize', $uniqueArrs);

    $ret = $this->serializer->serialize(
      [
        'results' => $rows,
        'pager' => [
          'count' => (int) $count,
          'pages' => $pages,
          'items_per_page' => (int) $items_per_page,
          'current_page' => $current_page + 1,
        ]
      ],
      $content_type
    );

    return $ret;
  }
}
