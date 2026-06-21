# Marvel FastMCP demo

This server generates MCP tools from `../../openapi-appearance.yml` using
[FastMCP's OpenAPI integration](https://gofastmcp.com/integrations/openapi).
An explicit route allowlist exposes only:

- `list_movies` — resolve movie titles and IDs.
- `list_heroes` — enumerate the heroes to investigate.
- `list_hero_appearances` — fetch appearances for one hero.

## Setup

Start the SQLite-backed Marvel API from the parent directory:

```bash
npm start
```

Install [`uv`](https://docs.astral.sh/uv/getting-started/installation/). No project
virtual environment or dependency installation is required: `uvx` creates an
isolated environment and caches it for subsequent runs.

In another terminal, inspect and run the FastMCP server:

```bash
npm run mcp:fastmcp:inspect
npm run mcp:fastmcp
```

The underlying server command is:

```bash
uvx --from 'fastmcp-slim[server]==3.4.2' --with pyyaml fastmcp run \
  fastmcp/server.py --transport http --host 127.0.0.1 --port 8007
```

The Streamable HTTP MCP endpoint is `http://127.0.0.1:8007/mcp`. Keep this
process running, then copy the `npx mcp-remote` entry from
`claude-desktop.example.json` into the Claude Desktop configuration.
`mcp-remote` is configured with `http-only`, so it will not fall back to SSE.

FastMCP defaults to the REST Inspectr proxy at `http://127.0.0.1:3007`.
`MARVEL_API_BASE_URL` can override that address. Start the REST Inspectr
configuration with `npm run inspect` before invoking MCP tools. Use
`MARVEL_MCP_HOST` and `MARVEL_MCP_PORT` only when running `server.py` directly;
the npm command sets the MCP host and port through FastMCP's CLI.

## Inspect MCP requests

Run the dedicated Inspectr configuration instead of starting FastMCP directly:

```bash
npm run mcp:fastmcp:proxy
```

This command starts both services:

- FastMCP backend: `http://127.0.0.1:8007/mcp`
- Inspectr MCP proxy: `http://127.0.0.1:8008/mcp`
- Inspectr request UI: `http://127.0.0.1:4008`

The Claude Desktop example connects `mcp-remote` to port `8008`, ensuring MCP
requests pass through Inspectr. Keep `mcp-remote` on `http-only` because the
FastMCP server uses Streamable HTTP.

## Demo question

> Using the Marvel MCP, which heroes appeared in both Infinity War and Endgame
> — and what else were they in?

The server instructions guide the client through this sequence:

1. Discover the three tools.
2. Resolve the two movie titles to IDs with `list_movies`.
3. List all heroes and intersect their appearances for those movie IDs.
4. Fetch every other appearance for the matching heroes.
5. Translate movie IDs to titles and answer with the results.

All list calls must follow pagination until `current_page` equals `total_pages`.

With the seeded demo database, the expected intersection contains Iron Man and
Spider-Man. Iron Man's other appearances are *Iron Man*, *Iron Man 2*, and
*Iron Man 3*; Spider-Man's other appearance is *Spider-Man*.
