<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Bundle\SecurityBundle\Security;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Serializer\SerializerInterface;
use Psr\Log\LoggerInterface;

class MeController extends AbstractController
{
    private Security $security;
    private JWTEncoderInterface $jwtEncoder;
    private SerializerInterface $serializer;
    private LoggerInterface $logger;

    public function __construct(Security $security, JWTEncoderInterface $jwtEncoder, SerializerInterface $serializer, LoggerInterface $logger)
    {
        $this->security = $security;
        $this->jwtEncoder = $jwtEncoder;
        $this->serializer = $serializer;
        $this->logger = $logger;
    }

    #[Route('/api/me', name: 'api_me', methods: ['GET'])]
    public function __invoke(Request $request): JsonResponse
    {
        try {
            $user = $this->security->getUser();
            if (!$user) {
                throw new AccessDeniedException('User not found.');
            }

            $jwtToken = $request->headers->get('Authorization');
            if (!$jwtToken) {
                throw new BadRequestHttpException('Authorization header not found.');
            }

            $jwtToken = str_replace('Bearer ', '', $jwtToken);
            $decodedJwt = $this->jwtEncoder->decode($jwtToken);
            if (!$decodedJwt) {
                throw new BadRequestHttpException('Invalid JWT token.');
            }

            if ($decodedJwt['email'] !== $user->getEmail()) {
                throw new AccessDeniedException('This user does not have access to this section.');
            }

            $uuid = $user->getUuid();
            $email = $user->getEmail();

            return new JsonResponse(['uuid' => $uuid, 'email' => $email], JsonResponse::HTTP_OK);
        } catch (AccessDeniedException $e) {
            $this->logger->error('Access denied: ' . $e->getMessage());
            return new JsonResponse(['error' => $e->getMessage()], JsonResponse::HTTP_FORBIDDEN);
        } catch (BadRequestHttpException $e) {
            $this->logger->error('Bad request: ' . $e->getMessage());
            return new JsonResponse(['error' => $e->getMessage()], JsonResponse::HTTP_BAD_REQUEST);
        } catch (\Exception $e) {
            $this->logger->error('Internal server error: ' . $e->getMessage());
            return new JsonResponse(['error' => 'Internal server error'], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
