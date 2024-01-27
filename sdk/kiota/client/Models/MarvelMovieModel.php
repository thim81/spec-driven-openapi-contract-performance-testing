<?php

namespace KiotaMarvelClient\Models;

use Microsoft\Kiota\Abstractions\Serialization\Parsable;
use Microsoft\Kiota\Abstractions\Serialization\ParseNode;
use Microsoft\Kiota\Abstractions\Serialization\SerializationWriter;
use Microsoft\Kiota\Abstractions\Types\Date;

/**
 * A Marvel movie.
*/
class MarvelMovieModel implements Parsable 
{
    /**
     * @var string|null $description A brief description of the Marvel movie.
    */
    private ?string $description = null;
    
    /**
     * @var string|null $director The director of the Marvel movie.
    */
    private ?string $director = null;
    
    /**
     * @var int|null $id ID of the Marvel movie
    */
    private ?int $id = null;
    
    /**
     * @var Date|null $release_date The release date of the Marvel movie.
    */
    private ?Date $release_date = null;
    
    /**
     * @var string|null $title The title of the Marvel movie.
    */
    private ?string $title = null;
    
    /**
     * Creates a new instance of the appropriate class based on discriminator value
     * @param ParseNode $parseNode The parse node to use to read the discriminator value and create the object
     * @return MarvelMovieModel
    */
    public static function createFromDiscriminatorValue(ParseNode $parseNode): MarvelMovieModel {
        return new MarvelMovieModel();
    }

    /**
     * Gets the description property value. A brief description of the Marvel movie.
     * @return string|null
    */
    public function getDescription(): ?string {
        return $this->description;
    }

    /**
     * Gets the director property value. The director of the Marvel movie.
     * @return string|null
    */
    public function getDirector(): ?string {
        return $this->director;
    }

    /**
     * The deserialization information for the current model
     * @return array<string, callable(ParseNode): void>
    */
    public function getFieldDeserializers(): array {
        $o = $this;
        return  [
            'description' => fn(ParseNode $n) => $o->setDescription($n->getStringValue()),
            'director' => fn(ParseNode $n) => $o->setDirector($n->getStringValue()),
            'id' => fn(ParseNode $n) => $o->setId($n->getIntegerValue()),
            'release_date' => fn(ParseNode $n) => $o->setReleaseDate($n->getDateValue()),
            'title' => fn(ParseNode $n) => $o->setTitle($n->getStringValue()),
        ];
    }

    /**
     * Gets the id property value. ID of the Marvel movie
     * @return int|null
    */
    public function getId(): ?int {
        return $this->id;
    }

    /**
     * Gets the release_date property value. The release date of the Marvel movie.
     * @return Date|null
    */
    public function getReleaseDate(): ?Date {
        return $this->release_date;
    }

    /**
     * Gets the title property value. The title of the Marvel movie.
     * @return string|null
    */
    public function getTitle(): ?string {
        return $this->title;
    }

    /**
     * Serializes information the current object
     * @param SerializationWriter $writer Serialization writer to use to serialize this model
    */
    public function serialize(SerializationWriter $writer): void {
        $writer->writeStringValue('description', $this->getDescription());
        $writer->writeStringValue('director', $this->getDirector());
        $writer->writeDateValue('release_date', $this->getReleaseDate());
        $writer->writeStringValue('title', $this->getTitle());
    }

    /**
     * Sets the description property value. A brief description of the Marvel movie.
     * @param string|null $value Value to set for the description property.
    */
    public function setDescription(?string $value): void {
        $this->description = $value;
    }

    /**
     * Sets the director property value. The director of the Marvel movie.
     * @param string|null $value Value to set for the director property.
    */
    public function setDirector(?string $value): void {
        $this->director = $value;
    }

    /**
     * Sets the id property value. ID of the Marvel movie
     * @param int|null $value Value to set for the id property.
    */
    public function setId(?int $value): void {
        $this->id = $value;
    }

    /**
     * Sets the release_date property value. The release date of the Marvel movie.
     * @param Date|null $value Value to set for the release_date property.
    */
    public function setReleaseDate(?Date $value): void {
        $this->release_date = $value;
    }

    /**
     * Sets the title property value. The title of the Marvel movie.
     * @param string|null $value Value to set for the title property.
    */
    public function setTitle(?string $value): void {
        $this->title = $value;
    }

}
