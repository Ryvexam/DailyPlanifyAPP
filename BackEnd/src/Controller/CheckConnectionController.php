<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Gesdinet\JWTRefreshTokenBundle\Entity\RefreshToken;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CheckConnectionController extends AbstractController
{
    #[Route('/api/check/connection', name: 'api_check_connection', methods: ['POST','GET'])]
    public function index(Request $request, JWTEncoderInterface $jwtEncoder, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);
        $jwtToken = $data['token'] ?? null;
        $refreshTokenValue = $data['refresh_token'] ?? null;

        if (!$jwtToken || !$refreshTokenValue) {
            return new Response('JWT ou refresh token manquant.', Response::HTTP_BAD_REQUEST);
        }

        try {
            $decodedJwt = $jwtEncoder->decode($jwtToken);
            if (!$decodedJwt) {
                throw new \Exception('Token JWT invalide.');
            }

            $userIdentifier = $decodedJwt['email'];
            $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $userIdentifier]); // ou 'email'
            if (!$user) {
                throw new \Exception('Utilisateur non trouvé.');
            }


            return new Response('Validation réussie.', Response::HTTP_OK);
        } catch (\Exception $e) {
            return new Response($e->getMessage(), Response::HTTP_UNAUTHORIZED);
        }
    }
}
