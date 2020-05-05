<?php

namespace Drupal\pro_core\EventSubscriber;

use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class ProCoreSubscriber implements EventSubscriberInterface {

  public function checkForRedirection(GetResponseEvent $event) {
    if ($event->getRequest()->query->get('redirect-me')) {
      $event->setResponse(new RedirectResponse('http://example.com/'));
    }
  }

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents() {
    $events[KernelEvents::REQUEST][] = array('checkForRedirection');
    return $events;
  }

}
