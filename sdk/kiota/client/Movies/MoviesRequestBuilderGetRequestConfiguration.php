<?php

namespace KiotaMarvelClient\Movies;

use Microsoft\Kiota\Abstractions\BaseRequestConfiguration;
use Microsoft\Kiota\Abstractions\RequestOption;

/**
 * Configuration for the request such as headers, query parameters, and middleware options.
*/
class MoviesRequestBuilderGetRequestConfiguration extends BaseRequestConfiguration 
{
    /**
     * @var MoviesRequestBuilderGetQueryParameters|null $queryParameters Request query parameters
    */
    public ?MoviesRequestBuilderGetQueryParameters $queryParameters = null;
    
    /**
     * Instantiates a new moviesRequestBuilderGetRequestConfiguration and sets the default values.
     * @param array<string, array<string>|string>|null $headers Request headers
     * @param array<RequestOption>|null $options Request options
     * @param MoviesRequestBuilderGetQueryParameters|null $queryParameters Request query parameters
    */
    public function __construct(?array $headers = null, ?array $options = null, ?MoviesRequestBuilderGetQueryParameters $queryParameters = null) {
        parent::__construct($headers ?? [], $options ?? []);
        $this->queryParameters = $queryParameters;
    }

    /**
     * Instantiates a new moviesRequestBuilderGetQueryParameters.
     * @param int|null $limit The number of items to return per page.
     * @param int|null $page The page number for pagination.
     * @return MoviesRequestBuilderGetQueryParameters
    */
    public static function createQueryParameters(?int $limit = null, ?int $page = null): MoviesRequestBuilderGetQueryParameters {
        return new MoviesRequestBuilderGetQueryParameters($limit, $page);
    }

}
