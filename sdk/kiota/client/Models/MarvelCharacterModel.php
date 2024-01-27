<?php

namespace KiotaMarvelClient\Models;

use Microsoft\Kiota\Abstractions\Serialization\Parsable;
use Microsoft\Kiota\Abstractions\Serialization\ParseNode;
use Microsoft\Kiota\Abstractions\Serialization\SerializationWriter;
use Microsoft\Kiota\Abstractions\Types\TypeUtils;

/**
 * A Marvel character.
*/
class MarvelCharacterModel implements Parsable 
{
    /**
     * @var string|null $description A brief description of the Marvel character.
    */
    private ?string $description = null;
    
    /**
     * @var string|null $first_name The first name of the Marvel character.
    */
    private ?string $first_name = null;
    
    /**
     * @var int|null $id ID of the Marvel character
    */
    private ?int $id = null;
    
    /**
     * @var string|null $last_name The last name of the Marvel character.
    */
    private ?string $last_name = null;
    
    /**
     * @var string|null $name The full name of the Marvel character.
    */
    private ?string $name = null;
    
    /**
     * @var array<string>|null $powers List of superpowers possessed by the Marvel character.
    */
    private ?array $powers = null;
    
    /**
     * Creates a new instance of the appropriate class based on discriminator value
     * @param ParseNode $parseNode The parse node to use to read the discriminator value and create the object
     * @return MarvelCharacterModel
    */
    public static function createFromDiscriminatorValue(ParseNode $parseNode): MarvelCharacterModel {
        return new MarvelCharacterModel();
    }

    /**
     * Gets the description property value. A brief description of the Marvel character.
     * @return string|null
    */
    public function getDescription(): ?string {
        return $this->description;
    }

    /**
     * The deserialization information for the current model
     * @return array<string, callable(ParseNode): void>
    */
    public function getFieldDeserializers(): array {
        $o = $this;
        return  [
            'description' => fn(ParseNode $n) => $o->setDescription($n->getStringValue()),
            'first_name' => fn(ParseNode $n) => $o->setFirstName($n->getStringValue()),
            'id' => fn(ParseNode $n) => $o->setId($n->getIntegerValue()),
            'last_name' => fn(ParseNode $n) => $o->setLastName($n->getStringValue()),
            'name' => fn(ParseNode $n) => $o->setName($n->getStringValue()),
            'powers' => function (ParseNode $n) {
                $val = $n->getCollectionOfPrimitiveValues();
                if (is_array($val)) {
                    TypeUtils::validateCollectionValues($val, 'string');
                }
                /** @var array<string>|null $val */
                $this->setPowers($val);
            },
        ];
    }

    /**
     * Gets the first_name property value. The first name of the Marvel character.
     * @return string|null
    */
    public function getFirstName(): ?string {
        return $this->first_name;
    }

    /**
     * Gets the id property value. ID of the Marvel character
     * @return int|null
    */
    public function getId(): ?int {
        return $this->id;
    }

    /**
     * Gets the last_name property value. The last name of the Marvel character.
     * @return string|null
    */
    public function getLastName(): ?string {
        return $this->last_name;
    }

    /**
     * Gets the name property value. The full name of the Marvel character.
     * @return string|null
    */
    public function getName(): ?string {
        return $this->name;
    }

    /**
     * Gets the powers property value. List of superpowers possessed by the Marvel character.
     * @return array<string>|null
    */
    public function getPowers(): ?array {
        return $this->powers;
    }

    /**
     * Serializes information the current object
     * @param SerializationWriter $writer Serialization writer to use to serialize this model
    */
    public function serialize(SerializationWriter $writer): void {
        $writer->writeStringValue('description', $this->getDescription());
        $writer->writeStringValue('first_name', $this->getFirstName());
        $writer->writeStringValue('last_name', $this->getLastName());
        $writer->writeStringValue('name', $this->getName());
        $writer->writeCollectionOfPrimitiveValues('powers', $this->getPowers());
    }

    /**
     * Sets the description property value. A brief description of the Marvel character.
     * @param string|null $value Value to set for the description property.
    */
    public function setDescription(?string $value): void {
        $this->description = $value;
    }

    /**
     * Sets the first_name property value. The first name of the Marvel character.
     * @param string|null $value Value to set for the first_name property.
    */
    public function setFirstName(?string $value): void {
        $this->first_name = $value;
    }

    /**
     * Sets the id property value. ID of the Marvel character
     * @param int|null $value Value to set for the id property.
    */
    public function setId(?int $value): void {
        $this->id = $value;
    }

    /**
     * Sets the last_name property value. The last name of the Marvel character.
     * @param string|null $value Value to set for the last_name property.
    */
    public function setLastName(?string $value): void {
        $this->last_name = $value;
    }

    /**
     * Sets the name property value. The full name of the Marvel character.
     * @param string|null $value Value to set for the name property.
    */
    public function setName(?string $value): void {
        $this->name = $value;
    }

    /**
     * Sets the powers property value. List of superpowers possessed by the Marvel character.
     * @param array<string>|null $value Value to set for the powers property.
    */
    public function setPowers(?array $value): void {
        $this->powers = $value;
    }

}
