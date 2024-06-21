<?php

namespace App\Controller;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use App\Entity\User;
use App\Entity\note;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Psr\Log\LoggerInterface;

class UserNotesController extends AbstractController
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

    #[Route('/api/user/{uuid}/notes/', name: 'api_user_notes_by_uuid', methods: ['GET'])]
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

            $notes = $this->entityManager->getRepository(note::class)->findBy(['userUuid' => $user->getUuid()]);

            $noteData = [];
            foreach ($notes as $note) {
                $noteData[] = [
                    "note_uuid" => $note->getUuid(),
                    "note_date" => $note->getDate(),
                    "note_content" => $note->getNoteContent(),
                ];
            }

            return new JsonResponse($noteData, JsonResponse::HTTP_OK);
        } catch (BadRequestHttpException $e) {
            $this->logger->error('Bad request: ' . $e->getMessage());
            return new JsonResponse(['error' => $e->getMessage()], JsonResponse::HTTP_BAD_REQUEST);
        } catch (\Exception $e) {
            $this->logger->error('Internal server error: ' . $e->getMessage());
            return new JsonResponse(['error' => 'Internal server error'], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
