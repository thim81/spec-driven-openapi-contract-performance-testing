<?php

namespace KiotaMarvelClient\Models;

use Microsoft\Kiota\Abstractions\ApiException;
use Microsoft\Kiota\Abstractions\Serialization\AdditionalDataHolder;
use Microsoft\Kiota\Abstractions\Serialization\Parsable;
use Microsoft\Kiota\Abstractions\Serialization\ParseNode;
use Microsoft\Kiota\Abstractions\Serialization\SerializationWriter;

class UnprocessableEntityError extends ApiException implements AdditionalDataHolder, Parsable 
{
    /**
     * @var array<string, mixed>|null $additionalData Stores additional data not described in the OpenAPI description found when deserializing. Can be used for serialization as well.
    */
    private ?array $additionalData = null;
    
    /**
     * @var array<UnprocessableEntityError_details>|null $details An array of objects providing details about the validation errors encountered in the request.
    */
    private ?array $details = null;
    
    /**
     * @var string|null $error Description of the error.
    */
    private ?string $error = null;
    
    /**
     * Instantiates a new UnprocessableEntityError and sets the default values.
    */
    public function __construct() {
        parent::__construct();
        $this->setAdditionalData([]);
    }

    /**
     * Creates a new instance of the appropriate class based on discriminator value
     * @param ParseNode $parseNode The parse node to use to read the discriminator value and create the object
     * @return UnprocessableEntityError
    */
    public static function createFromDiscriminatorValue(ParseNode $parseNode): UnprocessableEntityError {
        return new UnprocessableEntityError();
    }

    /**
     * Gets the AdditionalData property value. Stores additional data not described in the OpenAPI description found when deserializing. Can be used for serialization as well.
     * @return array<string, mixed>|null
    */
    public function getAdditionalData(): ?array {
        return $this->additionalData;
    }

    /**
     * Gets the details property value. An array of objects providing details about the validation errors encountered in the request.
     * @return array<UnprocessableEntityError_details>|null
    */
    public function getDetails(): ?array {
        return $this->details;
    }

    /**
     * Gets the error property value. Description of the error.
     * @return string|null
    */
    public function getError(): ?string {
        return $this->error;
    }

    /**
     * The deserialization information for the current model
     * @return array<string, callable(ParseNode): void>
    */
    public function getFieldDeserializers(): array {
        $o = $this;
        return  [
            'details' => fn(ParseNode $n) => $o->setDetails($n->getCollectionOfObjectValues([UnprocessableEntityError_details::class, 'createFromDiscriminatorValue'])),
            'error' => fn(ParseNode $n) => $o->setError($n->getStringValue()),
        ];
    }

    /**
     * The primary error message.
     * @return string
    */
    public function getPrimaryErrorMessage(): string {
        return parent::getMessage();
    }

    /**
     * Serializes information the current object
     * @param SerializationWriter $writer Serialization writer to use to serialize this model
    */
    public function serialize(SerializationWriter $writer): void {
        $writer->writeCollectionOfObjectValues('details', $this->getDetails());
        $writer->writeStringValue('error', $this->getError());
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
     * Sets the details property value. An array of objects providing details about the validation errors encountered in the request.
     * @param array<UnprocessableEntityError_details>|null $value Value to set for the details property.
    */
    public function setDetails(?array $value): void {
        $this->details = $value;
    }

    /**
     * Sets the error property value. Description of the error.
     * @param string|null $value Value to set for the error property.
    */
    public function setError(?string $value): void {
        $this->error = $value;
    }

}
