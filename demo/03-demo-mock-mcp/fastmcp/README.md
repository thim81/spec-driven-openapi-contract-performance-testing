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

In another terminal, install and verify the FastMCP server:

```bash
cd fastmcp
python3 -m venv .venv
.venv/bin/pip install -e .
.venv/bin/python test_tools.py
.venv/bin/python server.py
```

After setup, the last two commands are also available from the parent directory
as `npm run mcp:fastmcp:test` and `npm run mcp:fastmcp`.

The MCP transport defaults to stdio. Copy the entry from
`claude-desktop.example.json` into the Claude Desktop configuration to use it
there. Set `MARVEL_API_BASE_URL` when the API is not available at
`http://127.0.0.1:2007`.

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
