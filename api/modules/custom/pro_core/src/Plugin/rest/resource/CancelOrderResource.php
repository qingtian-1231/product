<?php

namespace Drupal\pro_core\Plugin\rest\resource;

use Drupal\rest\ModifiedResourceResponse;
use Drupal\rest\Plugin\ResourceBase;
use Drupal\rest\ResourceResponse;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Provides a formulation detail Resource
 *
 * @RestResource(
 *   id = "cancel_order_resource",
 *   label = @Translation("取消订单状态"),
 *   uri_paths = {
 *     "canonical" = "/api/cancel_order/{order_id}"
 *   }
 * )
 */
class CancelOrderResource extends ResourceBase {

  /**
   * Responds to entity GET requests.
   * @return \Drupal\rest\ResourceResponse
   */
  public function get($order_id) {
    if (empty($order_id)) {
      throw new BadRequestHttpException(t('没有提供订单ID'));
    }

    try {
      $order = \Drupal\commerce_order\Entity\Order::load($order_id);
      $order_status = $order->getState();
      $order_state_transitions = $order_status->getTransitions();

      if ($order_state_transitions) {
        $order_status->applyTransition($order_state_transitions['cancel']);

        $order->save();
      }
    } catch ( \Exception $e) {
      watchdog_exception('cancel_order_resource', $e, '取消表单时产生一个未知错误.');
      throw new UnprocessableEntityHttpException(sprintf('产生一个未知错误，无法更新订单状态'));
    }


    return new ModifiedResourceResponse($order->toArray());
  }

  public function permissions() {
    return [];
  }
}
