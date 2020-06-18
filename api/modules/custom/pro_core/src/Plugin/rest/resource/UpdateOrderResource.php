<?php

namespace Drupal\pro_core\Plugin\rest\resource;

use Drupal\Core\Session\AccountInterface;
use Drupal\rest\Plugin\ResourceBase;
use Drupal\rest\ResourceResponse;
use \Drupal\profile\Entity\Profile;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use CommerceGuys\Addressing\Country\CountryRepository;
use CommerceGuys\Addressing\Subdivision\SubdivisionRepository;

/**
 * Provides a formulation detail Resource
 *
 * @RestResource(
 *   id = "order_rest_submit",
 *   label = @Translation("更新订单地址信息"),
 *   uri_paths = {
 *     "canonical" = "/api/order_rest/submit",
 *     "https://www.drupal.org/link-relations/create" = "/api/order_rest/submit"
 *   }
 * )
 */
class UpdateOrderResource extends ResourceBase {

  /**
   * The current user.
   *
   * @var \Drupal\Core\Session\AccountInterface
   */
  protected $currentUser;

  /**
   * Constructs a Drupal\rest\Plugin\ResourceBase object.
   *
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin_id for the plugin instance.
   * @param mixed $plugin_definition
   *   The plugin implementation definition.
   * @param array $serializer_formats
   *   The available serialization formats.
   * @param \Psr\Log\LoggerInterface $logger
   *   A logger instance.
   * @param \Drupal\Core\Session\AccountInterface $current_user
   * The current user.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, array $serializer_formats, LoggerInterface $logger, AccountInterface $current_user) {
    parent::__construct($configuration, $plugin_id, $plugin_definition, $serializer_formats, $logger);
    $this->currentUser = $current_user;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->getParameter('serializer.formats'),
      $container->get('logger.factory')->get('rest'),
      $container->get('current_user')
    );
  }

  /**
   * Responds to entity POST requests and saves the new entity.commerce order
   *
   * @param array $address_data
   *
   * @return \Drupal\rest\ResourceResponse
   * address field data and Order ID.
   *
   * @throws \Symfony\Component\HttpKernel\Exception\HttpException
   * Throws HttpException in case of error.
   */
  public function post(array $address_data) {
    $orderId = $address_data['order_id'];
    $order = \Drupal\commerce_order\Entity\Order::load($orderId);
    $profile = $order->getBillingProfile();
//    $profileStorage = \Drupal::entityTypeManager()->getStorage('profile');
//    $storage = \Drupal::entityTypeManager()->getStorage('commerce_order');
//    $list = \Drupal::entityTypeManager()
//      ->getStorage('profile')
//      ->loadByProperties([
//        'uid' => $this->currentUser->id(),
//        'type' => 'customer',
//      ]);
////    $profile = reset($list);
    $languageCode = \Drupal::languageManager()->getCurrentLanguage()->getId();
    $return = [];

    if (empty($profile)) {
      $profile = Profile::create([
        'type' => 'customer',
        'uid' => $this->currentUser->id()
      ]);
    }

    $profile->field_display_name = isset($address_data['displayName']) ? $address_data['displayName'] : null;
    $profile->field_sample_application = isset($address_data['sample_application']) ? $address_data['sample_application'] : null;
    $profile->field_company_industry = isset($address_data['company_industry']) ? $address_data['company_industry']['code'] : null;
    $profile->address->given_name = isset($address_data['given_name']) ? $address_data['given_name'] : null;
    $profile->address->family_name = isset($address_data['family_name']) ? $address_data['family_name'] : null;
    $profile->address->organization = isset($address_data['organization']) ? $address_data['organization'] : null;
    $profile->address->country_code = isset($address_data['country_code']) ? $address_data['country_code'] : null;
    $profile->address->administrative_area = isset($address_data['administrative_area']) ? $address_data['administrative_area'] : null;
    $profile->address->locality = isset($address_data['locality']) ?  $address_data['locality']: null;
    $profile->address->dependent_locality = isset($address_data['dependent_locality']) ? $address_data['dependent_locality'] : null;
    $profile->address->postal_code = isset($address_data['postal_code']) ? $address_data['postal_code'] : null;
    $profile->address->address_line1 = isset($address_data['address_line1']) ? $address_data['address_line1'] :null;
    $profile->address->address_line2 = isset($address_data['address_line2']) ? $address_data['address_line2'] : null;
//    $profile->copy_to_address_book = 1;
    $profile->setDefault(TRUE);
//    $profile->setData('address_book_profile_id', $profile->id());
//    $profile->setData('copy_to_address_book', TRUE);
    $profile->setOwnerId($this->currentUser->id());
//    $profile->postSave($profileStorage, TRUE);
    $profile->save();

//    $order->setBillingProfile($profile)->postSave($storage, TRUE);
//    $order->save();

    $return['order_total_price'] = $order->getTotalPrice()->toArray();
    foreach ($order->getItems() as $order_item) {
      $return['order_items'][] = $order_item->toArray();
    }

    $country = new CountryRepository();
    $sub = new SubdivisionRepository();
    $address_return = [];
    foreach ($profile->address as $index => $address) {
      $address_data = $address->toArray();
      foreach ($address_data as $field => $value) {
        switch ($field) {
          case 'country_code':
            $address_return[$index][$field] = $country->get($value, $languageCode)->getName();
            break;

          case 'administrative_area':
            if ($value) {
              $address_return[$index][$field] = $sub
                ->get($value, [
                  $address_data['country_code']
                ])
                ->getLocalName();
            }
            else {
              $address_return[$index][$field] = $value;
            }

            break;

          case 'locality':
            if ($value) {
              $address_return[$index][$field] = $sub
                ->get($value, [
                  $address_data['country_code'],
                  $address_data['administrative_area']
                ])
                ->getLocalName();
            }
            else {
              $address_return[$index][$field] = $value;
            }
            break;

          case 'dependent_locality':
            if ($value) {
              $address_return[$index][$field] = $sub
                ->get($value, [
                  $address_data['country_code'],
                  $address_data['administrative_area'],
                  $address_data['locality']
                ])
                ->getLocalName();
            }
            else {
              $address_return[$index][$field] = $value;
            }
            break;

          default:
            $address_return[$index][$field] = $value;
        }
      }
    }

    $address_return[0]['field_display_name'] = $profile->field_display_name->getValue()[0]['value'];
    $address_return[0]['field_sample_application'] = $profile->field_sample_application->getValue()[0]['value'];
    $address_return[0]['company_industry'] = $profile->field_company_industry->getValue()[0]['value'];

    $return['order_address'] = $address_return;

    return new ResourceResponse($return);
  }

  public function permissions() {
    return [];
  }
}
