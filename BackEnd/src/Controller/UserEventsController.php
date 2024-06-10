<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Event;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;

class UserEventsController extends AbstractController
{
    #[Route('/api/user/{uuid}/events/', name: 'api_user_events_by_uuid', methods: ['GET'])]
    public function index(string $uuid, EntityManagerInterface $entityManager, Request $request): JsonResponse
    {
        $user = $entityManager->getRepository(User::class)->findOneBy(['uuid' => $uuid]);

        if (!$user) {
            return new JsonResponse(['error' => 'User not found'], JsonResponse::HTTP_NOT_FOUND);
        }
        $events = $entityManager->getRepository(Event::class)->findBy(['userUuid' => $user->getUuid()]);

        $eventData = [];
        foreach ($events as $event) {
            $eventData[] = [
                "event_uuid" => $event->getUuid(),
                "event_name" => $event->getName(),
                "event_date_start" => $event->getDateStart(),
                "event_date_end" => $event->getDateEnd(),
                "event_description" => $event->getDescription(),
                "event_color" => $event->getColor(),
            ];
        }

        return new JsonResponse($eventData);
    }
}
