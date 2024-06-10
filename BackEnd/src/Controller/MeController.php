<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Bundle\SecurityBundle\Security;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;

class MeController extends AbstractController
{
    private $security;
    private $jwtEncoder;
    private $serializer;

    public function __construct(Security $security, JWTEncoderInterface $jwtEncoder, SerializerInterface $serializer)
    {
        $this->security = $security;
        $this->jwtEncoder = $jwtEncoder;
        $this->serializer = $serializer;
    }

    #[Route('/api/me', name: 'api_me', methods: ['GET'])]
public function __invoke(): JsonResponse
{
    $user = $this->security->getUser();

    $request = $this->container->get('request_stack')->getCurrentRequest();
    $jwtToken = $request->headers->get('Authorization');

    $jwtToken = str_replace('Bearer ', '', $jwtToken);

    $decodedJwt = $this->jwtEncoder->decode($jwtToken);

    if ($decodedJwt['email'] !== $user->getEmail()) {
        throw new AccessDeniedException('This user does not have access to this section.');
    }

    $uuid = $user->getUuid();
    $email = $user->getEmail();

    return new JsonResponse(['uuid' => $uuid, 'email' => $email]);
    }
}