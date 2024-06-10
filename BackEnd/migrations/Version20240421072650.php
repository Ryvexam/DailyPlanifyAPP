<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240421072650 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE event DROP FOREIGN KEY FK_3BAE0AA7ABFE1C6F');
        $this->addSql('DROP INDEX IDX_3BAE0AA7ABFE1C6F ON event');
        $this->addSql('ALTER TABLE todo DROP FOREIGN KEY FK_5A0EB6A0ABFE1C6F');
        $this->addSql('DROP INDEX IDX_5A0EB6A0ABFE1C6F ON todo');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE event ADD CONSTRAINT FK_3BAE0AA7ABFE1C6F FOREIGN KEY (user_uuid) REFERENCES user (uuid)');
        $this->addSql('CREATE INDEX IDX_3BAE0AA7ABFE1C6F ON event (user_uuid)');
        $this->addSql('ALTER TABLE todo ADD CONSTRAINT FK_5A0EB6A0ABFE1C6F FOREIGN KEY (user_uuid) REFERENCES user (uuid)');
        $this->addSql('CREATE INDEX IDX_5A0EB6A0ABFE1C6F ON todo (user_uuid)');
    }
}
