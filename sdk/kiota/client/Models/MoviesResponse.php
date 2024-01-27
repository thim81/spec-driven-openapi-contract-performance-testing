<?php

namespace KiotaMarvelClient\Models;

use Microsoft\Kiota\Abstractions\Serialization\AdditionalDataHolder;
use Microsoft\Kiota\Abstractions\Serialization\Parsable;
use Microsoft\Kiota\Abstractions\Serialization\ParseNode;
use Microsoft\Kiota\Abstractions\Serialization\SerializationWriter;

class MoviesResponse implements AdditionalDataHolder, Parsable 
{
    /**
     * @var array<string, mixed>|null $additionalData Stores additional data not described in the OpenAPI description found when deserializing. Can be used for serialization as well.
    */
    private ?array $additionalData = null;
    
    /**
     * @var array<MarvelMovieModel>|null $movies List of Marvel movies.
    */
    private ?array $movies = null;
    
    /**
     * @var PaginationModel|null $pagination Pagination information.
    */
    private ?PaginationModel $pagination = null;
    
    /**
     * Instantiates a new MoviesResponse and sets the default values.
    */
    public function __construct() {
        $this->setAdditionalData([]);
    }

    /**
     * Creates a new instance of the appropriate class based on discriminator value
     * @param ParseNode $parseNode The parse node to use to read the discriminator value and create the object
     * @return MoviesResponse
    */
    public static function createFromDiscriminatorValue(ParseNode $parseNode): MoviesResponse {
        return new MoviesResponse();
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
            'movies' => fn(ParseNode $n) => $o->setMovies($n->getCollectionOfObjectValues([MarvelMovieModel::class, 'createFromDiscriminatorValue'])),
            'pagination' => fn(ParseNode $n) => $o->setPagination($n->getObjectValue([PaginationModel::class, 'createFromDiscriminatorValue'])),
        ];
    }

    /**
     * Gets the movies property value. List of Marvel movies.
     * @return array<MarvelMovieModel>|null
    */
    public function getMovies(): ?array {
        return $this->movies;
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
        $writer->writeCollectionOfObjectValues('movies', $this->getMovies());
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
     * Sets the movies property value. List of Marvel movies.
     * @param array<MarvelMovieModel>|null $value Value to set for the movies property.
    */
    public function setMovies(?array $value): void {
        $this->movies = $value;
    }

    /**
     * Sets the pagination property value. Pagination information.
     * @param PaginationModel|null $value Value to set for the pagination property.
    */
    public function setPagination(?PaginationModel $value): void {
        $this->pagination = $value;
    }

}
