<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Event;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Psr\Log\LoggerInterface;

class UserEventsController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private ValidatorInterface $validator;
    private LoggerInterface $logger;

    public function __construct(EntityManagerInterface $entityManager, ValidatorInterface $validator, LoggerInterface $logger)
    {
        $this->entityManager = $entityManager;
        $this->validator = $validator;
        $this->logger = $logger;
    }

    #[Route('/api/user/{uuid}/events/', name: 'api_user_events_by_uuid', methods: ['GET'])]
    public function index(string $uuid, Request $request): JsonResponse
    {
        try {
            $errors = $this->validator->validate($uuid, new \Symfony\Component\Validator\Constraints\Uuid());
            if (count($errors) > 0) {
                throw new BadRequestHttpException('Invalid UUID format.');
            }

            $user = $this->entityManager->getRepository(User::class)->findOneBy(['uuid' => $uuid]);

            if (!$user) {
                return new JsonResponse(['error' => 'User not found'], JsonResponse::HTTP_NOT_FOUND);
            }

            $events = $this->entityManager->getRepository(Event::class)->findBy(['userUuid' => $user->getUuid()]);

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

            return new JsonResponse($eventData, JsonResponse::HTTP_OK);
        } catch (BadRequestHttpException $e) {
            $this->logger->error('Bad request: ' . $e->getMessage());
            return new JsonResponse(['error' => $e->getMessage()], JsonResponse::HTTP_BAD_REQUEST);
        } catch (\Exception $e) {
            $this->logger->error('Internal server error: ' . $e->getMessage());
            return new JsonResponse(['error' => 'Internal server error'], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
