# Security

Report privately through [GitHub private reporting](https://github.com/thenavidm/buffer-mcp-cli/security/advisories/new). Never attach keys, signed links, private input or account exports.

Credentials stay in private environment/client settings or token-only files. The server caches file credentials until restart and sends Bearer only to https://api.buffer.com, with redirects refused. It neither reads official global/repository Buffer configuration nor collects browser cookies. No telemetry relay, browser sign-in, local content database or public HTTP server is added.

API responses can contain post text, media, customer/account identifiers, organization/channel metadata and performance data. Outputs remain sensitive even when credential-like fields, the configured token and recognized signed credential URLs are redacted. Redaction is not anonymization; arbitrary secrets in free-form content can still appear. Local preview includes the supplied post/input content and should also stay private.

Buffer receives the requested native GraphQL operation/variables; social delivery and asset processing follow provider terms. Model/client hosting sees whatever tool output you let it receive. --fields limits requested data; --select trims after receipt. Neither control changes provider consent or guarantees a safe URL.

Opt-in audit logs contain guard metadata only. Do not put credentials, signed links, raw headers, account dumps or .env files into commits, artifacts or public issues. Private legacy history stays outside the new public repository. Public npm and desktop bundles must be scanned before release.

All 17 exposed mutation tools require --confirm/confirm=true for the exact human-requested action. Named create/edit/delete/queue/content/promotion/template operations and generic GraphQL mutation pass through one write guard before file reading or network work.

Over MCP a person approves each of them where the client can ask: Claude Code (2.1.246 and later) shows its own prompt, and a client that can show forms asks with an approval form whose one box starts unticked. Each approval is signed, bound to that exact call and works once. Where a client can do neither, the model's confirm:true counts. BUFFER_CONFIRM=model makes confirm:true enough everywhere, for an agent with no person to ask.

BUFFER_READ_ONLY=1 hides mutations from discovery and refuses direct hidden calls. BUFFER_ALLOW_DESTRUCTIVE=0 separately refuses mutations even with confirmation. --agent/--yes are output/noninteractive controls, not permission to publish. Local preview is available in read-only mode because it validates and returns data without transmitting a mutation.

Generic query parses exactly one GraphQL query and refuses mutation/subscription/multiple-operation documents. Generic mutation parses exactly one mutation with one direct root field; multi-action/root-fragment mutation documents refuse. It inserts __typename and the MutationError message catch-all. Aliases are preserved. Buffer validates native generic variables and provider permissions; local schema validation of unknown experimental operations is not claimed.

Audit writes are opt-in metadata containing time, surface, tool, risk, static description and guard outcome, without keys, post text, native variables or provider content. Keep the log private. Guard acceptance is permission to attempt one operation, not proof it succeeded remotely. Provider permissions/client consent remain independent.
