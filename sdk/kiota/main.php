<?php

use KiotaMarvelClient\MarvelApiClient;
use KiotaMarvelClient\Models\MarvelCharacterModel;
use KiotaMarvelClient\TokenProvider;
use Microsoft\Kiota\Abstractions\ApiException;
use Microsoft\Kiota\Abstractions\Authentication\BaseBearerTokenAuthenticationProvider;
use Microsoft\Kiota\Http\GuzzleRequestAdapter;

require __DIR__ . '/vendor/autoload.php';

try {
    $token = 'spec-driven-development';
    $tokenProvider = new TokenProvider($token);

    $authProvider = new BaseBearerTokenAuthenticationProvider($tokenProvider);
    $requestAdapter = new GuzzleRequestAdapter($authProvider);
    $client = new MarvelApiClient($requestAdapter);

    // GET /characters
    $charactersResponse = $client->characters()->get()->wait();

    // Check if the 'characters' property exists in the response
    if ($charactersResponse->getCharacters() !== null) {
        // Access the 'characters' property and get the count
        $characters = $charactersResponse->getCharacters();
        $charactersCount = sizeof($characters);

        // Now you can use $charactersCount as the count of characters
        echo "Number of characters: $charactersCount\n";
    } else {
        echo "No characters found in the response.\n";
    }

    // GET /characters/{id}
    $id = 1;
    $character = $client->characters()->byId($id)->get()->wait();
    echo "Retrieved Character - ID: {$character->getId()}, Name: {$character->getName()}, Description: {$character->getDescription()}\n";

    // POST /characters
    $newCharacter = new MarvelCharacterModel();
    $newCharacter->setName("Black Panther");
    $newCharacter->setFirstName("T'Challa");
    $newCharacter->setDescription("The king and protector of the African nation of Wakanda");

    $newCharacterRes = $client->characters()->post($newCharacter)->wait();
    $newCharacterId = $newCharacterRes->getId();
    echo "Created new character with ID: {$newCharacterId}\n";
    echo var_export($newCharacterRes, true) . "\n";

    // PUT /characters/{id}
    //$update = new MarvelCharacterModel();
    // Only update last name
    $newCharacter->setLastName("T'Chaka");

    $updatedCharacterRes = $client->characters()->byId($newCharacterId)->put($newCharacter)->wait();
    echo "Updated character - ID: {$updatedCharacterRes->getId()}, Last Name: {$updatedCharacterRes->getLastName()}}\n";

    // DELETE /character/{id}
    $client->characters()->byId($newCharacterId)->delete()->wait();
} catch (ApiException $ex) {
    echo $ex->getMessage();
} catch (Exception $e) {
    echo $e->getMessage();
}
