# Prism Mock service

REMARK:
The base path of the server in OpenAPI is `/api` but Prism will ignore it and will use the host with the operation path.
So instead of `http://localhost:3004/api/characters` it will be `http://localhost:3004/characters`.

## API service with example responses

```bash
prism mock ../openapi.yml --p 3005
```

## API service with dynamic responses

```bash
prism mock -d ../openapi.yml --p 3005
```

