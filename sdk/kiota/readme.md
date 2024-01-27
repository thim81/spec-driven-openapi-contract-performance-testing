### Install

Run Composer install

### Generate SDK

```terminal
kiota generate -l PHP -d ../../openapi.yml -c MarvelApiClient -n KiotaMarvel\Client -o ./client
```

Add the following to your composer.json to set your namespaces correctly:

```json
"autoload": {
    "psr-4": {
    "KiotaMarvel\\": "client/"
    }
}
```


To load the newly generated classes can be imported, update the autoload paths using:

```terminal
composer dumpautoload
```





