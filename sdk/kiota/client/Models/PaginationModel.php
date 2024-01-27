<?php

namespace KiotaMarvelClient\Models;

use Microsoft\Kiota\Abstractions\Serialization\AdditionalDataHolder;
use Microsoft\Kiota\Abstractions\Serialization\Parsable;
use Microsoft\Kiota\Abstractions\Serialization\ParseNode;
use Microsoft\Kiota\Abstractions\Serialization\SerializationWriter;

/**
 * Pagination information.
*/
class PaginationModel implements AdditionalDataHolder, Parsable 
{
    /**
     * @var array<string, mixed>|null $additionalData Stores additional data not described in the OpenAPI description found when deserializing. Can be used for serialization as well.
    */
    private ?array $additionalData = null;
    
    /**
     * @var PaginationModel_pagination|null $pagination The pagination property
    */
    private ?PaginationModel_pagination $pagination = null;
    
    /**
     * Instantiates a new PaginationModel and sets the default values.
    */
    public function __construct() {
        $this->setAdditionalData([]);
    }

    /**
     * Creates a new instance of the appropriate class based on discriminator value
     * @param ParseNode $parseNode The parse node to use to read the discriminator value and create the object
     * @return PaginationModel
    */
    public static function createFromDiscriminatorValue(ParseNode $parseNode): PaginationModel {
        return new PaginationModel();
    }

    /**
     * Gets the AdditionalData property value. Stores additional data not described in the OpenAPI description found when deserializing. Can be used for serialization as well.
     * @return array<string, mixed>|null
    */
    public function getAdditionalData(): ?array {
        return $this->additionalData;
    }

    /**
     * The deserialization information for the current model
     * @return array<string, callable(ParseNode): void>
    */
    public function getFieldDeserializers(): array {
        $o = $this;
        return  [
            'pagination' => fn(ParseNode $n) => $o->setPagination($n->getObjectValue([PaginationModel_pagination::class, 'createFromDiscriminatorValue'])),
        ];
    }

    /**
     * Gets the pagination property value. The pagination property
     * @return PaginationModel_pagination|null
    */
    public function getPagination(): ?PaginationModel_pagination {
        return $this->pagination;
    }

    /**
     * Serializes information the current object
     * @param SerializationWriter $writer Serialization writer to use to serialize this model
    */
    public function serialize(SerializationWriter $writer): void {
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
     * Sets the pagination property value. The pagination property
     * @param PaginationModel_pagination|null $value Value to set for the pagination property.
    */
    public function setPagination(?PaginationModel_pagination $value): void {
        $this->pagination = $value;
    }

}
