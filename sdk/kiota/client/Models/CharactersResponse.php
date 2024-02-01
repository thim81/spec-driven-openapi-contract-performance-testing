<?php

namespace KiotaMarvelClient\Models;

use Microsoft\Kiota\Abstractions\Serialization\AdditionalDataHolder;
use Microsoft\Kiota\Abstractions\Serialization\Parsable;
use Microsoft\Kiota\Abstractions\Serialization\ParseNode;
use Microsoft\Kiota\Abstractions\Serialization\SerializationWriter;

class CharactersResponse implements AdditionalDataHolder, Parsable 
{
    /**
     * @var array<string, mixed>|null $additionalData Stores additional data not described in the OpenAPI description found when deserializing. Can be used for serialization as well.
    */
    private ?array $additionalData = null;
    
    /**
     * @var array<MarvelCharacterModel>|null $characters List of Marvel characters.
    */
    private ?array $characters = null;
    
    /**
     * @var PaginationModel|null $pagination Pagination information.
    */
    private ?PaginationModel $pagination = null;
    
    /**
     * Instantiates a new CharactersResponse and sets the default values.
    */
    public function __construct() {
        $this->setAdditionalData([]);
    }

    /**
     * Creates a new instance of the appropriate class based on discriminator value
     * @param ParseNode $parseNode The parse node to use to read the discriminator value and create the object
     * @return CharactersResponse
    */
    public static function createFromDiscriminatorValue(ParseNode $parseNode): CharactersResponse {
        return new CharactersResponse();
    }

    /**
     * Gets the AdditionalData property value. Stores additional data not described in the OpenAPI description found when deserializing. Can be used for serialization as well.
     * @return array<string, mixed>|null
    */
    public function getAdditionalData(): ?array {
        return $this->additionalData;
    }

    /**
     * Gets the characters property value. List of Marvel characters.
     * @return array<MarvelCharacterModel>|null
    */
    public function getCharacters(): ?array {
        return $this->characters;
    }

    /**
     * The deserialization information for the current model
     * @return array<string, callable(ParseNode): void>
    */
    public function getFieldDeserializers(): array {
        $o = $this;
        return  [
            'characters' => fn(ParseNode $n) => $o->setCharacters($n->getCollectionOfObjectValues([MarvelCharacterModel::class, 'createFromDiscriminatorValue'])),
            'pagination' => fn(ParseNode $n) => $o->setPagination($n->getObjectValue([PaginationModel::class, 'createFromDiscriminatorValue'])),
        ];
    }

    /**
     * Gets the pagination property value. Pagination information.
     * @return PaginationModel|null
    */
    public function getPagination(): ?PaginationModel {
        return $this->pagination;
    }

    /**
     * Serializes information the current object
     * @param SerializationWriter $writer Serialization writer to use to serialize this model
    */
    public function serialize(SerializationWriter $writer): void {
        $writer->writeCollectionOfObjectValues('characters', $this->getCharacters());
        $writer->writeObjectValue('pagination', $this->getPagination());
        $writer->writeAdditionalData($this->getAdditionalData());
    }

    /**
     * Sets the AdditionalData property value. Stores additional data not described in the OpenAPI description found when deserializing. Can be used for serialization as well.
     * @param array<string,mixed> $value Value to set for the AdditionalData property.
    */
    public function setAdditionalData(?array $value): void {
        $this->additionalData = $value;
    }

    /**
     * Sets the characters property value. List of Marvel characters.
     * @param array<MarvelCharacterModel>|null $value Value to set for the characters property.
    */
    public function setCharacters(?array $value): void {
        $this->characters = $value;
    }

    /**
     * Sets the pagination property value. Pagination information.
     * @param PaginationModel|null $value Value to set for the pagination property.
    */
    public function setPagination(?PaginationModel $value): void {
        $this->pagination = $value;
    }

}
