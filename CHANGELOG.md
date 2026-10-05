# Changelog

## 3.0.1, 2026-10-05

- **A refusal and the approval form say what the call can do again.** 3.0.0 said every confirmed call "is public or cannot be undone", Slipway's words for a call it knows nothing more about. Both say again what 2.0.1 said, that the call may affect account content, media, messages, workflows or billing, and a test holds them to it.
- **Built on Slipway 0.1.17**, which a fresh install of 3.0.0 already used. Since the Slipway 3.0.0 was measured on, `which` prints a title once where a description opens with it and reads an argument by its own words, and the general help counts the tuning settings instead of naming them, with `agent-context` describing each.

## 3.0.0, 2026-10-05

Built on [Slipway](https://github.com/thenavidm/slipway) 0.1.14. The 41 tools keep their names and arguments, and every difference below was measured against 2.0.1, the last version on npm, before release.

- **A tool list half the size.** Each write's native input appeared twice, as its own fields and inside `payload`; 3.0.0 writes each repeated part once under `$defs`, and nothing is lost: Claude Code and Codex both read fields that appear only there, and validation still checks the full schema. Every tool loaded costs 60,720 tokens in Claude Code instead of 112,029.
- **Short titles.** 2.0.1 copied whole GraphQL descriptions into 24 titles, up to 672 characters; each title is now the description's first clause, or the tool's own name, and the descriptions keep every word. The command list is 579 tokens instead of 1,581.
- **A person approves each write over MCP.** All 17 writes still need confirmation. Claude Code (2.1.246 and later) shows its own prompt, and a client that can show forms asks with an approval form whose one box starts unticked. Approvals are signed, bound to the exact call and work once. Where a client can do neither, the model's `confirm: true` still counts, and `BUFFER_CONFIRM=model` makes it enough everywhere. The audit log records who approved each write.
- **`BUFFER_ALLOW_DESTRUCTIVE=0` still refuses every write**, confirmed or not, as 2.0 did.
- **Buffer's status picks the exit code.** A request Buffer rejects (400 or 422) exits 2 instead of 5, and a removed resource (410) 3 instead of 5. 401 and 403 still exit 4, 404 3, 429 7, a server error 5, and an unknown profile or nothing configured 10. 1 now means an unexpected error. A GraphQL error's own type, such as `InvalidInputError`, travels in `details.reason`, where 2.0.1 put it in `code`.
- **`which <words>` finds a command**, and `agent-context` describes every command, flag and setting as JSON. In Codex 0.159.3, finding the command that schedules a post to a channel took a median of 111,104 input tokens over the CLI instead of 113,353 (five runs each), because Codex asked `which` instead of reading the full command list.
- **`install <client>`** adds the server to Claude Code, Codex, Claude Desktop, Cursor, VS Code or Gemini CLI in each one's own format, and **`buffer-mcp --http`** serves the same tools over Streamable HTTP, on 127.0.0.1:8787 unless told otherwise.
- **Less work to start.** Each input schema now compiles on its first use rather than at load, and the entry turns on Node's compile cache. The server spends 263 ms of CPU before its first answer where 2.0.1 spent 700, and answers in 164 ms of wall time instead of 392 (median of 21 runs, taking turns on one busy Mac). npx installs 11 dependencies instead of 95. A test still compiles every schema.
- **Docs.** README section 7 has the measured Claude Code and Codex costs, where 2.0 said they were pending; the version table says 3.0.0; and the exit codes include 1.

### Upgrading

Over MCP, expect an approval prompt or form before any write; a headless agent that should write with `confirm: true` alone needs `BUFFER_CONFIRM=model`. A script that read exit 5 as a rejected request should read 2, and as a removed resource 3. An error's JSON keeps `error` and `status`; its `code` is now Slipway's (`usage`, `auth`, `not_found`, `rate_limited`, `api`, `not_configured`), and Buffer's own, such as `InvalidInputError`, moves to `details.reason`. Over MCP, an argument that fails the schema comes back as the MCP SDK's own message, "Input validation error: …", instead of JSON. With `BUFFER_READ_ONLY=1`, a client that calls a hidden write gets "tool not found" instead of a refusal naming `BUFFER_READ_ONLY`; the CLI still names it. 24 titles are shorter; a client that matched on a title should match on the tool name. Codex shows `create_idea`'s argument descriptions, which 2.0.1's larger schema lost in its rendering; its full listing is 426 tokens longer. The audit log's lines gain `confirmed_by`, and each allowed write is followed by a `done` or `failed` line. A script that pipes JSON-RPC into the server must keep stdin open until it reads the answer: the server now stops when its input ends, as the MCP stdio binding asks. `--http` refuses a page from another site unless `BUFFER_HTTP_ALLOWED_ORIGINS` lists it. Some terminal screens grew: the general help by 156 tokens, for `which`, `install`, the flags and the exit codes it now lists; `create-post --help` by 18 and `delete-post --help` by 12. `SKILL.md` is 58 tokens longer in Claude Code, because it says how approval works over MCP and lists every exit code.

## 2.0.1, 2026-10-04

- **`npx -y @thenavidm/buffer-mcp-cli` starts the MCP server whatever order npm keeps.** npx starts whichever binary the npm registry lists first when they share one file, and the registry does not keep the published order. For this package that happened to be the server; for 23 others it was the CLI. A third binary named after the package, on its own file, now always starts the server, and npx picks it by name.

Use the native terminal capture at 1040 source pixels with lossless GIF optimization, displayed at 520 pixels, matching the Bluesky/Substack reference. Original assets remain available.

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
