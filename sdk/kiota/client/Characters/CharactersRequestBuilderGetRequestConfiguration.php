<?php

namespace KiotaMarvelClient\Characters;

use Microsoft\Kiota\Abstractions\BaseRequestConfiguration;
use Microsoft\Kiota\Abstractions\RequestOption;

/**
 * Configuration for the request such as headers, query parameters, and middleware options.
*/
class CharactersRequestBuilderGetRequestConfiguration extends BaseRequestConfiguration 
{
    /**
     * @var CharactersRequestBuilderGetQueryParameters|null $queryParameters Request query parameters
    */
    public ?CharactersRequestBuilderGetQueryParameters $queryParameters = null;
    
    /**
     * Instantiates a new charactersRequestBuilderGetRequestConfiguration and sets the default values.
     * @param array<string, array<string>|string>|null $headers Request headers
     * @param array<RequestOption>|null $options Request options
     * @param CharactersRequestBuilderGetQueryParameters|null $queryParameters Request query parameters
    */
    public function __construct(?array $headers = null, ?array $options = null, ?CharactersRequestBuilderGetQueryParameters $queryParameters = null) {
        parent::__construct($headers ?? [], $options ?? []);
        $this->queryParameters = $queryParameters;
    }

    /**
     * Instantiates a new charactersRequestBuilderGetQueryParameters.
     * @param int|null $limit The number of items to return per page.
     * @param int|null $page The page number for pagination.
     * @return CharactersRequestBuilderGetQueryParameters
    */
    public static function createQueryParameters(?int $limit = null, ?int $page = null): CharactersRequestBuilderGetQueryParameters {
        return new CharactersRequestBuilderGetQueryParameters($limit, $page);
    }

}
