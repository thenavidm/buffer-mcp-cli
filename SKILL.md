---
name: buffer
description: Use Buffer MCP or buffer-cli for approved Buffer publishing, content, templates and analytics with private account profiles.
metadata:
  install:
    package: "@thenavidm/buffer-mcp-cli"
    command: "npm install -g @thenavidm/buffer-mcp-cli@latest"
---

# Buffer

## Install gate

Run buffer-cli --version. STOP account work if unavailable; install and verify first. Read INSTALL.md for private key files, matching organization and channel identities and named accounts. Never ask for credentials in chat. login only prints instructions.

## Discovery and task groups

Use buffer-cli tools, COMMAND --help, schema COMMAND and get-operation-schema --operation NATIVE_NAME. Groups include account/channels/posts, ideas/content items/drafts/templates, analytics/audio, generic GraphQL and local helpers. Confirmed operations are marked. Do not duplicate the full inventory.

## Agent mode and inputs

Use --agent for compact JSON and --select for needed output fields. Dashed commands map to underscore MCP tools. Repeat array flags for each item; nested objects take JSON. Body flags, payload and payload_file are mutually exclusive routes. Account, fields, pagination and confirm remain outside native input. --agent/--yes never supply --confirm.

## Exit codes

| Exit | Meaning |
| --- | --- |
| 0 | Success |
| 2 | Invalid usage or refused operation |
| 3 | Not found |
| 4 | Authentication/permissions |
| 5 | API/transport failure |
| 7 | Rate limited |
| 10 | Missing/invalid configuration |

## Approval and scope

All 17 exposed mutation tools require --confirm/confirm=true for the exact human-requested action. Named create/edit/delete/queue/content/promotion/template operations and generic GraphQL mutation pass through one WriteGuard before file reading or network work.

BUFFER_READ_ONLY=1 hides mutations from discovery and refuses direct hidden calls. BUFFER_ALLOW_DESTRUCTIVE=0 separately refuses mutations even with confirmation. --agent/--yes are output/noninteractive controls, not permission to publish. Local preview is available in read-only mode because it validates and returns data without transmitting a mutation.

Generic query parses exactly one GraphQL query and refuses mutation/subscription/multiple-operation documents. Generic mutation parses exactly one mutation with one direct root field; multi-action/root-fragment mutation documents refuse. It inserts __typename and the MutationError message catch-all. Aliases are preserved. Buffer validates native generic variables and provider permissions; local schema validation of unknown experimental operations is not claimed.

Audit writes are opt-in metadata containing time, surface, tool, risk, static description and guard outcome, without keys, post text, native variables or provider content. Keep the log private. Guard acceptance is permission to attempt one operation, not proof it succeeded remotely. Provider permissions/client consent remain independent.

## Provider details

### Private API key and account access

1. Sign in to the intended account's [API settings](https://publish.buffer.com/settings/api). Create the API key needed for this task and review that client's current quota.
2. Save it privately as BUFFER_API_KEY, or in a regular token-only file outside every repository and configure its absolute BUFFER_TOKEN_FILE path. BUFFER_API_TOKEN remains a compatibility alias; API_KEY takes precedence when both are supplied.
3. Run buffer-cli doctor. Then deliberately run doctor --network: it requests only account { id } and prints diagnostic success, never the account ID or provider content.
4. Read get-account with minimal fields, then inspect account.organizations and choose the exact organization/channel for the task. Use get_operation_schema to discover actual selectable paths.
5. Review the native input, platform metadata and publishing mode. Preview locally, then confirm only the precise operation the human requested. Successful creation is not proof that a social network published the post.

[API keys](https://developers.buffer.com/guides/authentication) authenticate through Authorization: Bearer at the fixed https://api.buffer.com endpoint. Personal API keys act across every organization accessible to that account; an organization input/default does not restrict the key. Provider roles, publishing policies and connected-channel grants still apply. Named local profiles route credentials and defaults; they cannot narrow provider authorization.

OAuth access tokens already granted to an app can use the same private credential path. The wrapper does not register apps, open consent, implement PKCE exchange, save refresh tokens or renew expiry. Follow [OAuth](https://developers.buffer.com/guides/oauth) for current PKCE and organization-specific app grants. PAT and OAuth permissions differ. Analytics uses PAT insightsRead access; current OAuth grants cannot request that analytics scope.

Use a private 0700 directory and 0600 regular token-only file on macOS/Linux. Windows users must restrict the file's ACL to their own user; POSIX checks do not establish Windows ACL protection. Files cannot be symlinks or exceed 64 KiB. File credentials override environment keys and are cached until restart. No automatic .env loader, browser credential harvesting or global official CLI configuration is used.

### Plans, quotas and query limits

This AGPL wrapper is free. Buffer plans, posting limits, social-network permissions and API quotas are separate. Current [API limits](https://developers.buffer.com/guides/api-limits) document these per-client rolling windows:

| Plan | API keys / app clients | 15 minutes | 24 hours | 30 days |
| --- | --- | --- | --- | --- |
| Free | 1 / 1 | 100 | 250 | 3000 |
| Essentials | 3 / 3 | 100 | 250 | 7500 |
| Team | 5 / 5 | 100 | 500 | 15000 |

Official MCP connections share a rate-limit bucket with personal keys; connecting another assistant does not create extra quota. RateLimit and Retry-After headers are returned with successful data; inspect your API settings' live usage. Quotas and query-complexity rules can change; the provider's returned policy takes precedence. The local 200 ms pacing is per profile/process, not a provider quota reservation. Labels sharing a key and several processes still share upstream limits.

Every ordinary command sends one request. query_pages is capped at five pages and 100 records requested per page locally; the provider can reject a smaller or differently constrained query. No request retries automatically, including reads, HTTP 200 GraphQL errors, HTTP 429 or timeouts. Wait for the provider's indicated reset, inspect account state, and make a deliberate retry. A transport timeout can leave a mutation completed remotely.

Local request JSON cap is 1 MiB, document cap 64 KiB/10000 parsed tokens, response cap 5 MiB and default timeout 30 seconds. These limits do not raise upstream query-depth, complexity, array, scheduling or social-network limits. Media URLs must be reachable by Buffer and meet platform constraints; local filesystem paths are not uploaded by this wrapper.

### Revocation and rotation

Revoke/rotate the intended key in Buffer API settings or revoke the OAuth app grant through provider controls, update private local configuration and restart. Package uninstall does not revoke the key, disconnect a channel, delete hosted data or unschedule posts. Never send keys, private account exports, signed media links or raw error responses to public issues.


## Files and untrusted content

Ordinary paginated tools request one page with native first/after/input arguments and return edges/node/pageInfo. The default page size is 25 where declared; local first cap is 100. Cursors are opaque and must be passed unchanged.

```bash
buffer-cli query-pages --operation posts --arguments '{"organizationId":"SELECTED_ORG","fields":["items.id","items.status"],"first":25}' --max-pages 3 --agent
```

query_pages accepts only current named paginated reads, one to five pages. It adds hasNextPage and endCursor fields, returns page responses and resumeCursor, and stops at the requested cap. Missing or repeated cursors abort remaining requests; this is an error, not a complete-library claim. Provider errors also abort remaining pages and no retries run. For very large results, each page still faces the response cap and provider complexity limits. A later continuation sees current account state, not a snapshot guarantee.

payload_file must be regular non-symlink JSON up to 1 MiB. Native input fields, payload and payload_file are mutually exclusive; account, fields, pagination and confirm are outside native payload. No media bytes, output-file downloads or unlimited polling are implemented. Store account responses privately through your own reviewed shell output process; the package does not hide private post/customer content automatically.

Transport failure does not establish that a mutation failed remotely. Preserve its inputs/returned IDs and inspect the provider before making a deliberate repeat. Rate limits can be GraphQL errors inside HTTP 200 as well as transport responses. Quota is shared by the actual upstream client, not reserved by a local label or preview.

## Codex setup

After private environment configuration:

```bash
codex mcp add buffer -- npx -y @thenavidm/buffer-mcp-cli@latest
```

Optional Claude Code setup and the other clients are in INSTALL.md. Fresh matched-task usage evidence is pending; do not invent token savings.
