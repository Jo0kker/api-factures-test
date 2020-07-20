<?php

namespace App\Events;

use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedSubscriber {
    /**
     *
     * @param JWTCreatedEvent $event
     */
    public function updateJwtData(JWTCreatedEvent $event)
    {
        /** @var User $user */
        $user = $event->getUser();
        $data = $event->getData();
        $data['firstName'] = $user->getFirstName();
        $data['lastName'] = $user->getLastName();
        $event->setData($data);
    }
}