<?php
namespace App\Model;
use App\Service\Config;
use PDO;

class Film
{
    private $id;
    private $title = '';
    private $description = '';
    private $year = 0;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): void
    {
        $this->id = $id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function getYear(): int
    {
        return $this->year;
    }

    public static function findAll()
    {
        $db = self::getDB();
        $stmt = $db->query('SELECT * FROM films');
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function find($id)
    {
        $db = self::getDB();
        $stmt = $db->prepare('SELECT * FROM films WHERE id = :id');
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        $data = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($data) {
            $film = new self();
            $film->fill($data);
            return $film;
        }

        return null;
    }

    public static function fromArray(array $data)
    {
        $film = new self();
        $film->fill($data);
        return $film;
    }

    public function save(): void
    {
        $pdo = new \PDO(Config::get('film_db_dsn'), Config::get('film_db_user'), Config::get('film_db_pass'));
        echo "<script>console.log('Film ID before save: " . $this->getId() . "');</script>";
        if (! $this->getId()) {
            $sql = "INSERT INTO films (title, description, year) VALUES (:title, :description, :year)";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                'title' => $this->getTitle(),
                'description' => $this->getDescription(),
                'year' => $this->getYear(),
            ]);

            $this->setId($pdo->lastInsertId());
            echo "<script>console.log('New Film ID after insert: " . $this->getId() . "');</script>";
        } else {
            $sql = "UPDATE films SET title = :title, description = :description, year = :year WHERE id = :id";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                ':title' => $this->getTitle(),
                ':description' => $this->getDescription(),
                ':year' => $this->getYear(),
                ':id' => $this->getId(),
            ]);
            echo "<script>console.log('Film ID after update: " . $this->getId() . "');</script>";
        }
    }
    public function fill(array $data)
    {
        $this->id = $data['id'] ?? null;
        $this->title = $data['title'] ?? '';
        $this->description = $data['description'] ?? '';
        $this->year = $data['year'] ?? 0;
    }

    public function delete()
    {
        $db = self::getDB();
        $stmt = $db->prepare('DELETE FROM films WHERE id = :id');
        $stmt->bindParam(':id', $this->id, PDO::PARAM_INT);
        $stmt->execute();
    }

    private static function getDB()
    {
        $config = require __DIR__ . '/../../config/config.php';
        if (!is_array($config) || !isset($config['film_db_dsn'], $config['film_db_user'], $config['film_db_pass'])) {
            throw new \Exception('Film database configuration is not set correctly.');
        }
        return new PDO($config['film_db_dsn'], $config['film_db_user'], $config['film_db_pass']);
    }
}