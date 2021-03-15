<?php

namespace Drupal\toolbar_language_switcher;

use Drupal\Component\Utility\NestedArray;
use Drupal\Core\Language\LanguageManagerInterface;
use Drupal\Core\Path\PathMatcherInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\Core\Url;

/**
 * Class RenderBuilder.
 */
class RenderBuilder {

  use StringTranslationTrait;

  /**
   * Language manager.
   *
   * @var \Drupal\Core\Language\LanguageManagerInterface
   */
  protected $languageManager;

  /**
   * Path matcher service.
   *
   * @var \Drupal\Core\Path\PathMatcherInterface
   */
  protected $pathMatcher;

  /**
   * Id of the current language.
   *
   * @var \Drupal\Core\Language\LanguageInterface
   */
  protected $currentLanguage;

  /**
   * List of the available languages.
   *
   * @var \Drupal\Core\Language\LanguageInterface[]
   */
  protected $languages;

  /**
   * Current route name.
   *
   * @var string
   */
  protected $route;

  /**
   * RenderBuilder constructor.
   *
   * @param \Drupal\Core\Language\LanguageManagerInterface $language_manager
   *   Language manager.
   * @param \Drupal\Core\Path\PathMatcherInterface $path_matcher
   *   Path builder.
   */
  public function __construct(LanguageManagerInterface $language_manager, PathMatcherInterface $path_matcher) {
    $this->languageManager = $language_manager;
    $this->pathMatcher = $path_matcher;
    // Get languages, get current route.
    $this->currentLanguage = $this->languageManager->getCurrentLanguage();
    $this->languages = $this->languageManager->getLanguages();
    $this->route = $this->pathMatcher->isFrontPage() ? '<front>' : '<current>';
  }

  /**
   * Main build method.
   *
   * @return array
   *   Render array for the toolbar items.
   */
  public function build() {
    $languages_count = count($this->languages);
    if ($languages_count < 2) {
      return [];
    }
    // Set cache.
    $items['admin_toolbar_langswitch'] = [
      '#cache' => [
        'contexts' => [
          'languages:language_interface',
          'url',
        ],
      ],
    ];

    // Build toolbar item and tray.
    $items['admin_toolbar_langswitch'] += [
      '#type' => 'toolbar_item',
      '#weight' => 999,
      'tab' => [
        '#type' => 'html_tag',
        '#tag' => 'a',
        '#attributes' => [
          'class' => [
            'toolbar-icon',
            'toolbar-icon-language',
            // @ToDo: Remove following class before the beta release.
            'toolbar-item-admin-toolbar-langswitch',
          ],
        ],
        '#attached' => [
          'library' => [
            'toolbar_language_switcher/toolbar',
          ],
        ],
      ],
    ];
    $current_language_name = $this->currentLanguage->getName();
    $current_language_id = $this->currentLanguage->getId();
    if ($languages_count > 2) {
      // Get links.
      $links = [];
      foreach ($this->languages as $language) {
        $link = [];
        $link_title = $language->getName();
        $url_options = ['language' => $language];
        if ($language->getId() === $current_language_id) {
          $link['attributes']['class'][] = 'is-active';
          $link['attributes']['title'] = $this->t(
            'Current active @current language',
            ['@current' => $link_title]
          );
          $url_options['fragment'] = '!';
        }
        else {
          $link['attributes']['title'] = $this->t(
            'Change @current language to @another',
            [
              '@current' => $current_language_name,
              '@another' => $link_title,
            ]
          );
        }
        $link['title'] = $link_title;
        $link['url'] = new Url($this->route, [], $url_options);
        $links[] = $link;
      }
      // Build toolbar item and tray.
      $items['admin_toolbar_langswitch'] = NestedArray::mergeDeep(
        $items['admin_toolbar_langswitch'],
        [
          'tab' => [
            '#value' => $current_language_name,
            '#attributes' => [
              'href' => '#',
              'title' => $this->t('Selected language: @lang', ['@lang' => $current_language_name]),
            ],
          ],
          'tray' => [
            '#heading' => $this->t('Admin Toolbar Language Switcher'),
            'content' => [
              '#theme' => 'links',
              '#links' => $links,
              '#attributes' => [
                'class' => ['toolbar-menu'],
              ],
            ],
          ],
        ]
      );
    }
    else {
      unset($this->languages[$current_language_id]);
      $another_language = reset($this->languages);
      $another_language_name = $another_language->getName();
      // Build toolbar item.
      $items['admin_toolbar_langswitch'] = NestedArray::mergeDeep(
        $items['admin_toolbar_langswitch'],
        [
          'tab' => [
            '#value' => $this->t(
              'Switch to @another',
              ['@another' => $another_language_name]
            ),
            '#attributes' => [
              'href' => (new Url($this->route, [], ['language' => $another_language]))->toString(),
              'title' => $this->t(
                'Switch @current language to @another',
                [
                  '@current' => $current_language_name,
                  '@another' => $another_language_name,
                ]
              ),
            ],
          ],
        ]
      );
    }

    return $items;
  }

}
