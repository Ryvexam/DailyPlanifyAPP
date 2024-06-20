<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use App\Controller\MeController;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Lexik\Bundle\JWTAuthenticationBundle\Security\User\JWTUserInterface;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Attribute\Groups;



#[ORM\Entity(repositoryClass: UserRepository::class)]
#[UniqueEntity('email', 'Cet email existe déja.')]
class User implements UserInterface,PasswordAuthenticatedUserInterface, JWTUserInterface
{
    #[Groups(['read:User'])]
    #[ORM\Id]
    #[ORM\GeneratedValue("CUSTOM")]
    #[ORM\Column(type: 'uuid', unique: true)]
    #[ORM\CustomIdGenerator("doctrine.uuid_generator")]
    private ?string $uuid = null;

    #[ORM\Column]
    #[Groups(['read:User'])]
    private array $roles = ['ROLE_USER'];

    #[Groups(['read:User'])]
    #[ORM\Column(length: 180, unique: true)]
    private ?string $email = null;

    #[ORM\Column]
    private ?string $password = null;


    #[ORM\OneToMany(targetEntity: Event::class, mappedBy: 'userUuid')]
    private Collection $events;

    #[ORM\OneToMany(targetEntity: Todo::class, mappedBy: 'userUuid')]
    private Collection $todos;

    #[ORM\OneToMany(targetEntity: Note::class, mappedBy: 'userUuid')]
    private Collection $note;

    public function __construct()
    {
        $this->events = new ArrayCollection();
        $this->todos = new ArrayCollection();
    }

    public function getUuid(): ?string
    {
        return $this->uuid;
    }

    private function setUuid(string $uuid): static
    {
        $this->uuid = $uuid;

        return $this;
    }


    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string)$this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $hashedPassword): self
    {
        $this->password = $hashedPassword;

        return $this;
    }


    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public static function createFromPayload($username, array $payload): User|JWTUserInterface
    {
        $user = new User();

        $user->setEmail($username);

        $user->setUuid($payload['uuid'] ?? '');

        $user->setRoles($payload['roles'] ?? ['ROLE_USER']);

        return $user;
    }

    /**
     * @return Collection<int, Event>
     */
    public function getEvents(): Collection
    {
        return $this->events;
    }

    public function addEvent(Event $event): static
    {
        if (!$this->events->contains($event)) {
            $this->events->add($event);
            $event->setUserUuid($this->getUuid());
        }

        return $this;
    }

    public function removeEvent(Event $event): static
    {
        $this->events->removeElement($event);
    }

    /**
     * @return Collection<int, Todo>
     */
    public function getTodos(): Collection
    {
        return $this->todos;
    }

    public function addTodo(Todo $todo): static
    {
        if (!$this->todos->contains($todo)) {
            $this->todos->add($todo);
            $todo->setUserUuid($this->getUuid());
        }

        return $this;
    }

    public function removeTodo(Todo $todo): static
    {
        $this->todos->removeElement($todo);
    }
}