import asyncio

from fastmcp import Client

from server import mcp


EXPECTED_TOOLS = {
    "list_heroes",
    "list_movies",
    "list_hero_appearances",
}


async def verify_tools() -> None:
    async with Client(mcp) as client:
        tools = await client.list_tools()

    names = {tool.name for tool in tools}
    assert names == EXPECTED_TOOLS, f"Expected {EXPECTED_TOOLS}, received {names}"
    print("Exposed tools:", ", ".join(sorted(names)))


if __name__ == "__main__":
    asyncio.run(verify_tools())
