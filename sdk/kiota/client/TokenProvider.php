<?php

namespace KiotaMarvelClient;

use Http\Promise\FulfilledPromise;
use Http\Promise\Promise;
use Microsoft\Kiota\Abstractions\Authentication\AccessTokenProvider;
use Microsoft\Kiota\Abstractions\Authentication\AllowedHostsValidator;

class TokenProvider implements AccessTokenProvider
{
    private string $token;
    private AllowedHostsValidator $allowedHostsValidator;

    public function __construct($token)
    {
        $this->token = $token;
    }

    public function getAuthorizationTokenAsync(string $url, array $additionalAuthenticationContext = []): Promise
    {
        return new FulfilledPromise($this->token);
    }

    public function getAllowedHostsValidator(): AllowedHostsValidator
    {
        return new AllowedHostsValidator();
    }
}