<?php

namespace KiotaMarvelClient\Models;

use Microsoft\Kiota\Abstractions\Serialization\AdditionalDataHolder;
use Microsoft\Kiota\Abstractions\Serialization\Parsable;
use Microsoft\Kiota\Abstractions\Serialization\ParseNode;
use Microsoft\Kiota\Abstractions\Serialization\SerializationWriter;

class PaginationModel_pagination implements AdditionalDataHolder, Parsable 
{
    /**
     * @var array<string, mixed>|null $additionalData Stores additional data not described in the OpenAPI description found when deserializing. Can be used for serialization as well.
    */
    private ?array $additionalData = null;
    
    /**
     * @var int|null $current_page The current page number.
    */
    private ?int $current_page = null;
    
    /**
     * @var int|null $next_page The next page number. Null if there is no next page.
    */
    private ?int $next_page = null;
    
    /**
     * @var int|null $per_page The number of items to return per page.
    */
    private ?int $per_page = null;
    
    /**
     * @var int|null $prev_page The previous page number. Null if there is no previous page.
    */
    private ?int $prev_page = null;
    
    /**
     * @var int|null $total The total number of items for the requested resource.
    */
    private ?int $total = null;
    
    /**
     * @var int|null $total_pages The total number of pages.
    */
    private ?int $total_pages = null;
    
    /**
     * Instantiates a new PaginationModel_pagination and sets the default values.
    */
    public function __construct() {
        $this->setAdditionalData([]);
    }

    /**
     * Creates a new instance of the appropriate class based on discriminator value
     * @param ParseNode $parseNode The parse node to use to read the discriminator value and create the object
     * @return PaginationModel_pagination
    */
    public static function createFromDiscriminatorValue(ParseNode $parseNode): PaginationModel_pagination {
        return new PaginationModel_pagination();
    }

    /**
     * Gets the AdditionalData property value. Stores additional data not described in the OpenAPI description found when deserializing. Can be used for serialization as well.
     * @return array<string, mixed>|null
    */
    public function getAdditionalData(): ?array {
        return $this->additionalData;
    }

    /**
     * Gets the current_page property value. The current page number.
     * @return int|null
    */
    public function getCurrentPage(): ?int {
        return $this->current_page;
    }

    /**
     * The deserialization information for the current model
     * @return array<string, callable(ParseNode): void>
    */
    public function getFieldDeserializers(): array {
        $o = $this;
        return  [
            'current_page' => fn(ParseNode $n) => $o->setCurrentPage($n->getIntegerValue()),
            'next_page' => fn(ParseNode $n) => $o->setNextPage($n->getIntegerValue()),
            'per_page' => fn(ParseNode $n) => $o->setPerPage($n->getIntegerValue()),
            'prev_page' => fn(ParseNode $n) => $o->setPrevPage($n->getIntegerValue()),
            'total' => fn(ParseNode $n) => $o->setTotal($n->getIntegerValue()),
            'total_pages' => fn(ParseNode $n) => $o->setTotalPages($n->getIntegerValue()),
        ];
    }

    /**
     * Gets the next_page property value. The next page number. Null if there is no next page.
     * @return int|null
    */
    public function getNextPage(): ?int {
        return $this->next_page;
    }

    /**
     * Gets the per_page property value. The number of items to return per page.
     * @return int|null
    */
    public function getPerPage(): ?int {
        return $this->per_page;
    }

    /**
     * Gets the prev_page property value. The previous page number. Null if there is no previous page.
     * @return int|null
    */
    public function getPrevPage(): ?int {
        return $this->prev_page;
    }

    /**
     * Gets the total property value. The total number of items for the requested resource.
     * @return int|null
    */
    public function getTotal(): ?int {
        return $this->total;
    }

    /**
     * Gets the total_pages property value. The total number of pages.
     * @return int|null
    */
    public function getTotalPages(): ?int {
        return $this->total_pages;
    }

    /**
     * Serializes information the current object
     * @param SerializationWriter $writer Serialization writer to use to serialize this model
    */
    public function serialize(SerializationWriter $writer): void {
        $writer->writeIntegerValue('current_page', $this->getCurrentPage());
        $writer->writeIntegerValue('next_page', $this->getNextPage());
        $writer->writeIntegerValue('per_page', $this->getPerPage());
        $writer->writeIntegerValue('prev_page', $this->getPrevPage());
        $writer->writeIntegerValue('total', $this->getTotal());
        $writer->writeIntegerValue('total_pages', $this->getTotalPages());
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
     * Sets the current_page property value. The current page number.
     * @param int|null $value Value to set for the current_page property.
    */
    public function setCurrentPage(?int $value): void {
        $this->current_page = $value;
    }

    /**
     * Sets the next_page property value. The next page number. Null if there is no next page.
     * @param int|null $value Value to set for the next_page property.
    */
    public function setNextPage(?int $value): void {
        $this->next_page = $value;
    }

    /**
     * Sets the per_page property value. The number of items to return per page.
     * @param int|null $value Value to set for the per_page property.
    */
    public function setPerPage(?int $value): void {
        $this->per_page = $value;
    }

    /**
     * Sets the prev_page property value. The previous page number. Null if there is no previous page.
     * @param int|null $value Value to set for the prev_page property.
    */
    public function setPrevPage(?int $value): void {
        $this->prev_page = $value;
    }

    /**
     * Sets the total property value. The total number of items for the requested resource.
     * @param int|null $value Value to set for the total property.
    */
    public function setTotal(?int $value): void {
        $this->total = $value;
    }

    /**
     * Sets the total_pages property value. The total number of pages.
     * @param int|null $value Value to set for the total_pages property.
    */
    public function setTotalPages(?int $value): void {
        $this->total_pages = $value;
    }

}
