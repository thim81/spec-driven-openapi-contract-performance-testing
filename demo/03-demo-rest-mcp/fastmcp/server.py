"""FastMCP server exposing a curated view of the Marvel OpenAPI API."""

from __future__ import annotations

import os
from pathlib import Path

import httpx
import yaml
from fastmcp import FastMCP
from fastmcp.server.providers.openapi import MCPType, RouteMap

INSTRUCTIONS = """
Use these three tools to answer questions about heroes and their movie appearances.

For questions such about appearances use a workflow":
1. Call list_movies for every page to resolve movie titles to IDs and retain the
   complete ID-to-title mapping.
2. Call list_heroes for every page.
3. Call list_hero_appearances for each hero, following every page.
4. Intersect the heroes whose appearances contain both requested movie IDs.
5. Translate all other movie IDs for those heroes back to titles and answer with
   the matching heroes and their additional appearances.

Pagination metadata is nested under response.pagination.pagination. Continue until
current_page equals total_pages. Do not infer movie titles from IDs.
""".strip()


OPENAPI_PATH = Path(__file__).resolve().parents[2] / "openapi-appearance.yml"
API_BASE_URL = os.getenv("MARVEL_API_BASE_URL", "http://127.0.0.1:3007/api")
MCP_HOST = os.getenv("MARVEL_MCP_HOST", "127.0.0.1")
MCP_PORT = int(os.getenv("MARVEL_MCP_PORT", "8007"))

def load_openapi_spec() -> dict:
    with OPENAPI_PATH.open(encoding="utf-8") as specification:
        return yaml.safe_load(specification)


api_client = httpx.AsyncClient(base_url=API_BASE_URL, timeout=30.0)

mcp = FastMCP.from_openapi(
    openapi_spec=load_openapi_spec(),
    client=api_client,
    name="Marvel Appearance MCP",
    instructions=INSTRUCTIONS,
    route_maps=[
        RouteMap(
            methods=["GET"],
            pattern=r"^/movies$",
            mcp_type=MCPType.TOOL,
        ),
        RouteMap(
            methods=["GET"],
            pattern=r"^/heroes$",
            mcp_type=MCPType.TOOL,
        ),
        RouteMap(
            methods=["GET"],
            pattern=r"^/heroes/\{heroId\}/appearances$",
            mcp_type=MCPType.TOOL,
        ),
        RouteMap(mcp_type=MCPType.EXCLUDE),
    ],
    mcp_names={
        "getMovies": "list_movies",
        "getHeroes": "list_heroes",
        "getHeroAppearances": "list_hero_appearances",
    },
)


if __name__ == "__main__":
    mcp.run(transport="http", host=MCP_HOST, port=MCP_PORT)
