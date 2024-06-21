<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\NotesRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: NotesRepository::class)]
#[ApiResource(
    operations: [
        'get' => new Get(),
        'post' => new Post(),
        'put' => new Put(),
    ]
)]
class Note
{
    #[Groups(['read:Note'])]
    #[ORM\Id]
    #[ORM\GeneratedValue("CUSTOM")]
    #[ORM\Column(type: 'uuid', unique: true)]
    #[ORM\CustomIdGenerator("doctrine.uuid_generator")]
    private ?string $uuid = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $NoteContent = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $Date = null;

    #[ORM\Column(type: 'uuid')]
    private ?string $userUuid = null;

    public function getUuid(): ?string
    {
        return $this->uuid;
    }


    public function getNoteContent(): ?string
    {
        return $this->NoteContent;
    }

    public function setNoteContent(?string $NoteContent): static
    {
        $this->NoteContent = $NoteContent;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->Date;
    }

    public function setDate(\DateTimeInterface $Date): static
    {
        $this->Date = $Date;

        return $this;
    }

    public function getUserUuid(): ?string
    {
        return $this->userUuid;
    }

    public function setUserUuid(string $uuid): static
    {
        $this->userUuid = $uuid;

        return $this;
    }
}
