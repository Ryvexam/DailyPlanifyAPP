<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\todo;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;

class UserTodosController extends AbstractController
{
    #[Route('/api/user/{uuid}/todos/', name: 'api_user_todos_by_uuid', methods: ['GET'])]
    public function index(string $uuid, EntityManagerInterface $entityManager, Request $request): JsonResponse
    {
        $user = $entityManager->getRepository(User::class)->findOneBy(['uuid' => $uuid]);

        if (!$user) {
            return new JsonResponse(['error' => 'User not found'], JsonResponse::HTTP_NOT_FOUND);
        }
        $todos = $entityManager->getRepository(Todo::class)->findBy(['userUuid' => $user->getUuid()]);

        $todoData = [];
        foreach ($todos as $todo) {
            $todoData[] = [
                "todo_uuid" => $todo->getUuid(),
                "todo_name" => $todo->getName(),
                "todo_completed" => $todo->isCompleted(),
                "todo_priority" => $todo->isPriority(),
            ];
        }

        return new JsonResponse($todoData);
    }
}
