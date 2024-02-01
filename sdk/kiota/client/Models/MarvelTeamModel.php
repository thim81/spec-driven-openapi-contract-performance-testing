<?php

namespace KiotaMarvelClient\Models;

use Microsoft\Kiota\Abstractions\Serialization\Parsable;
use Microsoft\Kiota\Abstractions\Serialization\ParseNode;
use Microsoft\Kiota\Abstractions\Serialization\SerializationWriter;

/**
 * A Marvel team.
*/
class MarvelTeamModel implements Parsable 
{
    /**
     * @var string|null $description A brief description of the Marvel character.
    */
    private ?string $description = null;
    
    /**
     * @var int|null $id ID of the Marvel team
    */
    private ?int $id = null;
    
    /**
     * @var string|null $name The full name of the Marvel character.
    */
    private ?string $name = null;
    
    /**
     * Creates a new instance of the appropriate class based on discriminator value
     * @param ParseNode $parseNode The parse node to use to read the discriminator value and create the object
     * @return MarvelTeamModel
    */
    public static function createFromDiscriminatorValue(ParseNode $parseNode): MarvelTeamModel {
        return new MarvelTeamModel();
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
            'id' => fn(ParseNode $n) => $o->setId($n->getIntegerValue()),
            'name' => fn(ParseNode $n) => $o->setName($n->getStringValue()),
        ];
    }

    /**
     * Gets the id property value. ID of the Marvel team
     * @return int|null
    */
    public function getId(): ?int {
        return $this->id;
    }

    /**
     * Gets the name property value. The full name of the Marvel character.
     * @return string|null
    */
    public function getName(): ?string {
        return $this->name;
    }

    /**
     * Serializes information the current object
     * @param SerializationWriter $writer Serialization writer to use to serialize this model
    */
    public function serialize(SerializationWriter $writer): void {
        $writer->writeStringValue('description', $this->getDescription());
        $writer->writeStringValue('name', $this->getName());
    }

    /**
     * Sets the description property value. A brief description of the Marvel character.
     * @param string|null $value Value to set for the description property.
    */
    public function setDescription(?string $value): void {
        $this->description = $value;
    }

    /**
     * Sets the id property value. ID of the Marvel team
     * @param int|null $value Value to set for the id property.
    */
    public function setId(?int $value): void {
        $this->id = $value;
    }

    /**
     * Sets the name property value. The full name of the Marvel character.
     * @param string|null $value Value to set for the name property.
    */
    public function setName(?string $value): void {
        $this->name = $value;
    }

}
