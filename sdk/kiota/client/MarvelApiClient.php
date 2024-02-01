<?php

namespace KiotaMarvelClient;

use KiotaMarvelClient\Characters\CharactersRequestBuilder;
use KiotaMarvelClient\Movies\MoviesRequestBuilder;
use KiotaMarvelClient\Teams\TeamsRequestBuilder;
use Microsoft\Kiota\Abstractions\ApiClientBuilder;
use Microsoft\Kiota\Abstractions\BaseRequestBuilder;
use Microsoft\Kiota\Abstractions\RequestAdapter;
use Microsoft\Kiota\Serialization\Json\JsonParseNodeFactory;
use Microsoft\Kiota\Serialization\Json\JsonSerializationWriterFactory;
use Microsoft\Kiota\Serialization\Text\TextParseNodeFactory;
use Microsoft\Kiota\Serialization\Text\TextSerializationWriterFactory;

/**
 * The main entry point of the SDK, exposes the configuration and the fluent API.
*/
class MarvelApiClient extends BaseRequestBuilder 
{
    /**
     * The characters property
    */
    public function characters(): CharactersRequestBuilder {
        return new CharactersRequestBuilder($this->pathParameters, $this->requestAdapter);
    }
    
    /**
     * The movies property
    */
    public function movies(): MoviesRequestBuilder {
        return new MoviesRequestBuilder($this->pathParameters, $this->requestAdapter);
    }
    
    /**
     * The teams property
    */
    public function teams(): TeamsRequestBuilder {
        return new TeamsRequestBuilder($this->pathParameters, $this->requestAdapter);
    }
    
    /**
     * Instantiates a new MarvelApiClient and sets the default values.
     * @param RequestAdapter $requestAdapter The request adapter to use to execute the requests.
    */
    public function __construct(RequestAdapter $requestAdapter) {
        parent::__construct($requestAdapter, [], '{+baseurl}');
        ApiClientBuilder::registerDefaultSerializer(JsonSerializationWriterFactory::class);
        ApiClientBuilder::registerDefaultSerializer(TextSerializationWriterFactory::class);
        ApiClientBuilder::registerDefaultDeserializer(JsonParseNodeFactory::class);
        ApiClientBuilder::registerDefaultDeserializer(TextParseNodeFactory::class);
        if (empty($this->requestAdapter->getBaseUrl())) {
            $this->requestAdapter->setBaseUrl('http://localhost:3004/api');
        }
        $this->pathParameters['baseurl'] = $this->requestAdapter->getBaseUrl();
    }

}
