<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Psr\Log\LoggerInterface;

class CheckConnectionController extends AbstractController
{
    private JWTEncoderInterface $jwtEncoder;
    private EntityManagerInterface $entityManager;
    private LoggerInterface $logger;

    public function __construct(JWTEncoderInterface $jwtEncoder, EntityManagerInterface $entityManager, LoggerInterface $logger)
    {
        $this->jwtEncoder = $jwtEncoder;
        $this->entityManager = $entityManager;
        $this->logger = $logger;
    }

    #[Route('/api/check/connection', name: 'api_check_connection', methods: ['POST', 'GET'])]
    public function index(Request $request): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);
            if (!$data) {
                throw new BadRequestHttpException('Invalid JSON.');
            }

            $jwtToken = $data['token'] ?? null;
            $refreshTokenValue = $data['refresh_token'] ?? null;

            if (!$jwtToken || !$refreshTokenValue) {
                throw new BadRequestHttpException('JWT or refresh token missing.');
            }

            $decodedJwt = $this->jwtEncoder->decode($jwtToken);
            if (!$decodedJwt) {
                throw new BadRequestHttpException('Invalid JWT token.');
            }

            $userIdentifier = $decodedJwt['email'];
            $user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $userIdentifier]);
            if (!$user) {
                throw new BadRequestHttpException('User not found.');
            }

            return new JsonResponse(['message' => 'Validation successful.'], JsonResponse::HTTP_OK);
        } catch (BadRequestHttpException $e) {
            $this->logger->error('Bad request: ' . $e->getMessage());
            return new JsonResponse(['error' => $e->getMessage()], JsonResponse::HTTP_BAD_REQUEST);
        } catch (\Exception $e) {
            $this->logger->error('Unauthorized: ' . $e->getMessage());
            return new JsonResponse(['error' => $e->getMessage()], JsonResponse::HTTP_UNAUTHORIZED);
        }
    }
}
