<?php

namespace KiotaMarvelClient\Movies;

/**
 * Retrieve a list of all Marvel movies.
*/
class MoviesRequestBuilderGetQueryParameters 
{
    /**
     * @var int|null $limit The number of items to return per page.
    */
    public ?int $limit = null;
    
    /**
     * @var int|null $page The page number for pagination.
    */
    public ?int $page = null;
    
    /**
     * Instantiates a new moviesRequestBuilderGetQueryParameters and sets the default values.
     * @param int|null $limit The number of items to return per page.
     * @param int|null $page The page number for pagination.
    */
    public function __construct(?int $limit = null, ?int $page = null) {
        $this->limit = $limit;
        $this->page = $page;
    }

}
