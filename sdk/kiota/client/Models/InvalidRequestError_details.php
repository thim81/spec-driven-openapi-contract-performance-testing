<?php

namespace KiotaMarvelClient\Models;

use Microsoft\Kiota\Abstractions\Serialization\AdditionalDataHolder;
use Microsoft\Kiota\Abstractions\Serialization\Parsable;
use Microsoft\Kiota\Abstractions\Serialization\ParseNode;
use Microsoft\Kiota\Abstractions\Serialization\SerializationWriter;

class InvalidRequestError_details implements AdditionalDataHolder, Parsable 
{
    /**
     * @var array<string, mixed>|null $additionalData Stores additional data not described in the OpenAPI description found when deserializing. Can be used for serialization as well.
    */
    private ?array $additionalData = null;
    
    /**
     * @var string|null $field The field causing the validation error.
    */
    private ?string $field = null;
    
    /**
     * @var string|null $message Details about the validation error.
    */
    private ?string $message = null;
    
    /**
     * Instantiates a new InvalidRequestError_details and sets the default values.
    */
    public function __construct() {
        $this->setAdditionalData([]);
    }

    /**
     * Creates a new instance of the appropriate class based on discriminator value
     * @param ParseNode $parseNode The parse node to use to read the discriminator value and create the object
     * @return InvalidRequestError_details
    */
    public static function createFromDiscriminatorValue(ParseNode $parseNode): InvalidRequestError_details {
        return new InvalidRequestError_details();
    }

    /**
     * Gets the AdditionalData property value. Stores additional data not described in the OpenAPI description found when deserializing. Can be used for serialization as well.
     * @return array<string, mixed>|null
    */
    public function getAdditionalData(): ?array {
        return $this->additionalData;
    }

    /**
     * Gets the field property value. The field causing the validation error.
     * @return string|null
    */
    public function getField(): ?string {
        return $this->field;
    }

    /**
     * The deserialization information for the current model
     * @return array<string, callable(ParseNode): void>
    */
    public function getFieldDeserializers(): array {
        $o = $this;
        return  [
            'field' => fn(ParseNode $n) => $o->setField($n->getStringValue()),
            'message' => fn(ParseNode $n) => $o->setMessage($n->getStringValue()),
        ];
    }

    /**
     * Gets the message property value. Details about the validation error.
     * @return string|null
    */
    public function getMessage(): ?string {
        return $this->message;
    }

    /**
     * Serializes information the current object
     * @param SerializationWriter $writer Serialization writer to use to serialize this model
    */
    public function serialize(SerializationWriter $writer): void {
        $writer->writeStringValue('field', $this->getField());
        $writer->writeStringValue('message', $this->getMessage());
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
     * Sets the field property value. The field causing the validation error.
     * @param string|null $value Value to set for the field property.
    */
    public function setField(?string $value): void {
        $this->field = $value;
    }

    /**
     * Sets the message property value. Details about the validation error.
     * @param string|null $value Value to set for the message property.
    */
    public function setMessage(?string $value): void {
        $this->message = $value;
    }

}
