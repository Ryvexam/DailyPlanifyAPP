<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Todo;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Psr\Log\LoggerInterface;

class UserTodosController extends AbstractController
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

    #[Route('/api/user/{uuid}/todos/', name: 'api_user_todos_by_uuid', methods: ['GET'])]
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

            $todos = $this->entityManager->getRepository(Todo::class)->findBy(['userUuid' => $user->getUuid()]);

            $todoData = [];
            foreach ($todos as $todo) {
                $todoData[] = [
                    "todo_uuid" => $todo->getUuid(),
                    "todo_name" => $todo->getName(),
                    "todo_completed" => $todo->isCompleted(),
                    "todo_priority" => $todo->isPriority(),
                ];
            }

            return new JsonResponse($todoData, JsonResponse::HTTP_OK);
        } catch (BadRequestHttpException $e) {
            $this->logger->error('Bad request: ' . $e->getMessage());
            return new JsonResponse(['error' => $e->getMessage()], JsonResponse::HTTP_BAD_REQUEST);
        } catch (\Exception $e) {
            $this->logger->error('Internal server error: ' . $e->getMessage());
            return new JsonResponse(['error' => 'Internal server error'], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
