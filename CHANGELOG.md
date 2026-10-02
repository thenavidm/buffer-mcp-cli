# Changelog

## 2.0.0 - 2026-10-03

- Refresh current GraphQL shapes through 35 published official schemas with the shared CLI/local MCP and desktop framework.
- Add 41 shared tools: 24 reads and 17 explicitly confirmed mutations, including guarded generic GraphQL, local previews/schema discovery and bounded cursor reads.
- Enforce read-only/disabled policies across direct MCP and CLI calls, preserve private named account isolation and native organization defaults.
- Detect HTTP 200 GraphQL/typed mutation failures and require recognized native mutation success responses.
- Preserve fixed endpoint, bounded data, credential redaction and no automatic request replay.
- Add full house docs, client/OS setup, current official comparisons and reviewed schema refresh; preserve AGPL and private legacy history.

| Component | Current baseline |
| --- | --- |
| `Package / desktop` | 2.0.0 |
| `Named operations / current reference` | 35 generated / 42 roots, seven experimental newer roots via generic |
| `Shared catalogue` | 41 tools: 24 reads, 17 confirmed mutations |
| `Official CLI inspected` | @bufferapp/cli 1.2.2 (published package) |
| `Official MCP` | 20 documented tools plus generic GraphQL; no authenticated discovery |
| `Node` | 22+; CI targets 22/24 on macOS/Linux/Windows |
| `@modelcontextprotocol/sdk` | 1.32.0 |
| `ajv` | 8.20.0 |
| `ajv-formats` | 3.0.1 |
| `graphql` | 16.14.2 |
| `typescript` | 7.0.2 |
| `vitest` | 5.0.3 |
| `vite` | 8.3.2 |
| `@anthropic-ai/mcpb` | 2.1.2 |

Checked October 3, 2026. CHANGELOG records dated changes. Package/manifest, annotated default-branch tag, npm latest and desktop filename must agree. Preserve AGPL and private legacy history. Refresh through reviewed, checksum-recorded official schemas; never copy a public schema example without scanning it.

The private 1.0.0 legacy MCP had no declared CLI binaries and used older query/input shapes. Current organizations are read through account.organizations, and channel uses channel(input:{id}), not channel(id). New named tools use get_ for queries and native snake_case for mutations; discover current commands instead of relying on old names. Every mutation now requires confirmation. BUFFER_API_TOKEN remains an alias, while native current input and exact role restrictions take precedence. No prior public npm release is assumed.

## 1.0.0 - private legacy source

Earlier MCP-only implementation with no declared CLI binaries and outdated organization/channel shapes. No verified earlier public npm release is assumed.
