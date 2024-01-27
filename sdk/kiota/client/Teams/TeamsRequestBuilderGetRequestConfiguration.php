<?php

namespace KiotaMarvelClient\Teams;

use Microsoft\Kiota\Abstractions\BaseRequestConfiguration;
use Microsoft\Kiota\Abstractions\RequestOption;

/**
 * Configuration for the request such as headers, query parameters, and middleware options.
*/
class TeamsRequestBuilderGetRequestConfiguration extends BaseRequestConfiguration 
{
    /**
     * @var TeamsRequestBuilderGetQueryParameters|null $queryParameters Request query parameters
    */
    public ?TeamsRequestBuilderGetQueryParameters $queryParameters = null;
    
    /**
     * Instantiates a new teamsRequestBuilderGetRequestConfiguration and sets the default values.
     * @param array<string, array<string>|string>|null $headers Request headers
     * @param array<RequestOption>|null $options Request options
     * @param TeamsRequestBuilderGetQueryParameters|null $queryParameters Request query parameters
    */
    public function __construct(?array $headers = null, ?array $options = null, ?TeamsRequestBuilderGetQueryParameters $queryParameters = null) {
        parent::__construct($headers ?? [], $options ?? []);
        $this->queryParameters = $queryParameters;
    }

    /**
     * Instantiates a new teamsRequestBuilderGetQueryParameters.
     * @param int|null $limit The number of items to return per page.
     * @param int|null $page The page number for pagination.
     * @return TeamsRequestBuilderGetQueryParameters
    */
    public static function createQueryParameters(?int $limit = null, ?int $page = null): TeamsRequestBuilderGetQueryParameters {
        return new TeamsRequestBuilderGetQueryParameters($limit, $page);
    }

}
