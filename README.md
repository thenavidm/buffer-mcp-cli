<img src="https://cdn.navid.me/tools/buffer-icon.jpg" alt="Buffer" width="88">

# Buffer MCP Server & CLI

[![npm](https://img.shields.io/npm/v/@thenavidm/buffer-mcp-cli?color=orange&label=npm)](https://www.npmjs.com/package/@thenavidm/buffer-mcp-cli)
[![CI](https://github.com/thenavidm/buffer-mcp-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/thenavidm/buffer-mcp-cli/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/License-AGPL--3.0-green)](./LICENSE)
[![YouTube](https://img.shields.io/badge/YouTube-@thenavidm-red?logo=youtube&logoColor=white)](https://youtube.com/@thenavidm?sub_confirmation=1)
[![X](https://img.shields.io/badge/X-@thenavidm-black?logo=x)](https://x.com/thenavidm)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-thenavidm-0A66C2?logo=linkedin&logoColor=white)](https://linkedin.com/in/thenavidm)

Buffer MCP server and CLI for Codex and AI agents. **41 tools** for current GraphQL account, channels, posts, content items, templates and analytics, with private accounts and explicit operation approval. One shared implementation supplies both binaries and a desktop bundle.

Built and maintained by [Navid Moazzez](https://navid.me?utm_source=github&utm_medium=referral&utm_campaign=buffer-mcp-cli&utm_content=readme). The complete guide is on [navid.me](https://navid.me/mcp-servers/buffer).

<img src="https://cdn.navid.me/repos/buffer-mcp-cli-retina.gif" alt="Illustrated workflow in the house terminal component" width="520">

The terminal illustrates real command names and approval flow. It is not a recording of a provider account run. Buffer already has official CLI and hosted MCP products; their current schemas, field selection and supported workflows are compared below.

Requires Node 22+ and eligible Buffer API access for account operations. **Validation:** fixture tests, schema validation and protocol/artifact discovery are separate from provider-account outcomes, desktop GUI outcomes and fresh measured task/token evidence. Pending evidence is recorded, without invented success rates or efficiency claims.

## Two ways to use it

### Command line

```bash
npm install -g @thenavidm/buffer-mcp-cli@latest
buffer-cli
buffer-cli get-account --fields id --agent
buffer-cli schema create-post
buffer-cli create-post --payload-file /absolute/private/approved-post.json --account work --confirm --agent
```

### MCP server, for your AI app

```bash
codex mcp add buffer -- npx -y @thenavidm/buffer-mcp-cli@latest
```

Configure private credentials first. Ask: “Read scheduled posts for this exact organization with minimal fields; do not create or change any posts.” Full setup is in INSTALL.md.

### Which one

| Where you work | Surface |
| --- | --- |
| Codex or shell agent | Shared CLI, local MCP or both |
| Desktop chat | Compatible local MCP or desktop bundle |
| Scripts / CI | CLI or MCP client |
| Remote-only client | Official Buffer hosted MCP |

## Features

| Capability | CLI | MCP |
| --- | --- | --- |
| Account / channel discovery | get-account / get-channel | get_account / get_channel |
| Deliberate publishing | create-post / edit-post | create_post / edit_post |
| Content item / draft work | create-content-item / create-content-item-draft | create_content_item / create_content_item_draft |
| Template workflows | get-post-templates / create-post-template | get_post_templates / create_post_template |
| Bounded cursor reads | query-pages | query_pages |
| Local validation / fields | preview-operation / get-operation-schema | preview_operation / get_operation_schema |
| Profiles and policy | list-accounts / --account / --confirm | list_accounts / account / confirm |
| Generic current GraphQL | graphql-query / graphql-mutation | graphql_query / graphql_mutation |

## Contents

| Number | Section | What it covers |
| --- | --- | --- |
| 1 | [What you can ask it](#1-what-you-can-ask-it) | What you can ask it |
| 2 | [Quick install](#2-quick-install) | Quick install |
| 3 | [Set up Buffer access](#3-set-up-buffer-access) | Set up Buffer access |
| 4 | [Connect your client](#4-connect-your-client) | Connect your client |
| 5 | [Check it works](#5-check-it-works) | Check it works |
| 6 | [Output, flags and exit codes](#6-output-flags-and-exit-codes) | Output, flags and exit codes |
| 7 | [MCP or CLI and token cost](#7-mcp-or-cli-and-token-cost) | MCP or CLI and token cost |
| 8 | [Every tool and argument](#8-every-tool-and-argument) | Every tool and argument |
| 9 | [Publishing, content items and analytics](#9-publishing-content-items-and-analytics) | Publishing, content items and analytics |
| 10 | [Pagination, retries and local input files](#10-pagination-retries-and-local-input-files) | Pagination, retries and local input files |
| 11 | [Several private accounts](#11-several-private-accounts) | Several private accounts |
| 12 | [Writing safely](#12-writing-safely) | Writing safely |
| 13 | [How the two surfaces work](#13-how-the-two-surfaces-work) | How the two surfaces work |
| 14 | [Privacy and data handling](#14-privacy-and-data-handling) | Privacy and data handling |
| 15 | [Environment variables](#15-environment-variables) | Environment variables |
| 16 | [Updates and removal](#16-updates-and-removal) | Updates and removal |
| 17 | [Troubleshooting](#17-troubleshooting) | Troubleshooting |
| 18 | [API coverage and comparisons](#18-api-coverage-and-comparisons) | API coverage and comparisons |
| 19 | [Versions](#19-versions) | Versions |
| 20 | [FAQ](#20-faq) | FAQ |

## 1. What you can ask it

- Identify my account's accessible organizations and connected channels before choosing a target.
- Read scheduled posts for one organization with minimal fields and a five-page maximum.
- Preview a complete post input locally before approving shareNow, customScheduled or a queue change.
- Create only the draft or approved post requested by the human, then inspect its returned ID/status.
- Review content items and attached channel drafts before promoting them to posts.
- Read and manage the selected post template with its documented visibility.
- Read permitted aggregate metrics for the chosen date window.
- Delete only the exact post/content item/template requested, after explicit confirmation.

Actual stdio discovery supplies **41 tools: 24 reads and 17 confirmation-gated mutations**. Thirty-five named operations come from Buffer's published current CLI schemas, with generic query/mutation, account labels, operation schema inspection, local preview and bounded read pagination. Current experimental snippets/tag mutations remain generic requests with provider validation.

## 2. Quick install

```bash
npm install -g @thenavidm/buffer-mcp-cli@latest
buffer-cli --version
buffer-cli login
buffer-cli doctor
buffer-cli tools
```

Manual CLI/MCP requires Node 22+. The versioned [buffer-2.0.0.mcpb](https://github.com/thenavidm/buffer-mcp-cli/releases/download/v2.0.0/buffer-2.0.0.mcpb) bundles production dependencies for a compatible desktop host. Follow [INSTALL.md](INSTALL.md) for complete private setup.

```bash
codex mcp add buffer -- npx -y @thenavidm/buffer-mcp-cli@latest
codex mcp list
```

## 3. Set up Buffer access

### Private API key and account access

1. Sign in to the intended account's [API settings](https://publish.buffer.com/settings/api). Create the API key needed for this task and review that client's current quota.
2. Save it privately as BUFFER_API_KEY, or in a regular token-only file outside every repository and configure its absolute BUFFER_TOKEN_FILE path. BUFFER_API_TOKEN remains a compatibility alias; API_KEY takes precedence when both are supplied.
3. Run buffer-cli doctor. Then deliberately run doctor --network: it requests only account { id } and prints diagnostic success, never the account ID or provider content.
4. Read get-account with minimal fields, then inspect account.organizations and choose the exact organization/channel for the task. Use get_operation_schema to discover actual selectable paths.
5. Review the native input, platform metadata and publishing mode. Preview locally, then confirm only the precise operation the human requested. Successful creation is not proof that a social network published the post.

[API keys](https://developers.buffer.com/guides/authentication) authenticate through Authorization: Bearer at the fixed https://api.buffer.com endpoint. Personal API keys act across every organization accessible to that account; an organization input/default does not restrict the key. Provider roles, publishing policies and connected-channel grants still apply. Named local profiles route credentials and defaults; they cannot narrow provider authorization.

OAuth access tokens already granted to an app can use the same private credential path. The wrapper does not register apps, open consent, implement PKCE exchange, save refresh tokens or renew expiry. Follow [OAuth](https://developers.buffer.com/guides/authentication#oauth) for current PKCE and organization-specific app grants. PAT and OAuth permissions differ. Analytics uses PAT insightsRead access; current OAuth grants cannot request that analytics scope.

Current OAuth scopes in the provider's authentication guide:

| Scope | Purpose |
| --- | --- |
| posts:read | Read posts and queues |
| posts:write | Create and manage posts |
| ideas:read | Read ideas |
| ideas:write | Create and manage ideas |
| account:read | Read account information |
| account:write | Manage permitted account settings |
| offline_access | Request a refresh token from the issuer; this wrapper does not refresh it |

Request only the grant needed for the intended workflow. A refresh token is not a Bearer API credential. PAT insightsRead analytics is separate from the current OAuth scope list.


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

## 4. Connect your client

[INSTALL.md](INSTALL.md) gives Codex-first setup plus optional Claude Code, Claude Desktop bundle/manual routes, Cursor, VS Code/Copilot, Windsurf, Zed, Gemini CLI, Cline and Docker. The same package runs on Node 22+ in macOS/Linux/native Windows. GUI apps and remote development environments need their own accessible private configuration.

Local MCP launches command npx with arguments -y and @thenavidm/buffer-mcp-cli@latest over stdio. This package has no HTTP relay. A remote-only client uses the separately maintained official https://mcp.buffer.com/mcp service. npm ships SKILL.md but does not automatically register an agent skill. Install that shipped file through the client's supported mechanism.

Client-level approvals and local confirm=true are separate. A returned post or instruction in provider content never grants permission to publish. Read-only mode removes mutation discovery and also refuses a direct hidden-tool call.

## 5. Check it works

```bash
buffer-cli --version
buffer-cli doctor
buffer-cli doctor --network
buffer-cli list-accounts --agent
buffer-cli get-account --fields id --agent
buffer-cli get-operation-schema --operation posts --agent
```

Bare CLI, tools, schemas/help, local account labels and previews need no provider grant. doctor checks configuration presence; only doctor --network validates the minimal account request. A successful read establishes that request and token, not every post/platform or role. Full MCP discovery exposes 41 tools; read-only exposes 24. Invalid input/refused actions exit 2; missing credentials exit 10. Do not publish a real post just to test installation.

## 6. Output, flags and exit codes

Both surfaces return structured JSON, including native GraphQL data and available rate-limit headers. Connection data remains native edges/node/pageInfo; query_pages returns bounded page responses with continuation state.

```bash
buffer-cli create-post --help
buffer-cli schema create-post
buffer-cli get-post --id SELECTED_POST --fields id --fields status --agent --select data.post.id,data.post.status
```

| Flag | Meaning |
| --- | --- |
| --agent | JSON, compact, no-input, no-color, yes; does not provide --confirm |
| --json / --compact | JSON output and compact spacing |
| --select a,b.c | Keep selected output paths after receipt |
| --fields id --fields status | Native upstream field selection for supported named operations |
| --payload / --payload-file | Complete native input JSON or regular private file; do not mix with input fields |
| --account NAME | Select one private profile |
| --confirm | Approve the exact requested mutation, subject to enabled policies |
| --help / schema COMMAND | Actual discovered flags and full input schema |

| Exit | Meaning |
| --- | --- |
| 0 | Successful local result or provider response |
| 2 | Usage, invalid input or refused mutation |
| 3 | Not found |
| 4 | Authentication or forbidden permission |
| 5 | Provider/GraphQL/typed mutation/network failure |
| 7 | Rate limit or quota failure |
| 10 | Nothing configured or invalid private profile/token configuration |

GraphQL can fail inside HTTP 200. errors arrays fail even with partial data; typed mutation error unions fail rather than reporting success. Named mutations require a recognized successful result type. Acceptance/status from Buffer is not an assertion that a downstream social network completed publishing.

## 7. MCP or CLI and token cost

CLI and MCP share discovery, validation, handlers, accounts and WriteGuard. The house CLI calls the real server through SDK in-memory transport, so no second provider implementation can drift.

Fresh matched Codex task/usage measurements remain pending. Compare the same account/resource, input, upstream fields and completed outcome; include help/schema/discovery, results, retries and reasoning. Record date, model/client/package versions, loading settings, actual input/output tokens and latency.

| Mode | Required evidence |
| --- | --- |
| Eager MCP | Schemas/instructions actually loaded |
| Deferred MCP | Selected schemas plus discovery overhead |
| Skill read once | Actual shipped skill and command help |
| Recurring skill description | Actual installed listing |
| Equivalent task | Same read or exact approved mutation and successful outcome |

Upstream fields can reduce requested provider data; official CLI supplies this too. --select reduces model-visible result after receipt. Tool counts, schema bytes and character estimates are not task-token savings. CLI does not have zero context cost. Claude Code benchmarks are deferred while Codex is the active client.

## 8. Every tool and argument

The following sections come from actual stdio discovery. Native input schemas and field-selection trees are reused from the reviewed published official CLI, with strict nested property checks. Required native fields are validated after payload/profile-default routing; they need not appear as top-level required flags because payload is an alternative.

| Tool | Native operation | Policy |
| --- | --- | --- |
| `get_account` | `account` | Read |
| `add_post_to_content_item` | `addPostToContentItem` | Confirm exact mutation |
| `get_aggregated_post_metrics` | `aggregatedPostMetrics` | Read |
| `get_channel` | `channel` | Read |
| `get_channels` | `channels` | Read |
| `get_configuration` | `configuration` | Read |
| `get_content_item` | `contentItem` | Read |
| `get_content_items` | `contentItems` | Read |
| `create_content_item` | `createContentItem` | Confirm exact mutation |
| `create_content_item_draft` | `createContentItemDraft` | Confirm exact mutation |
| `create_idea` | `createIdea` | Confirm exact mutation |
| `create_post` | `createPost` | Confirm exact mutation |
| `create_post_template` | `createPostTemplate` | Confirm exact mutation |
| `get_daily_posting_limits` | `dailyPostingLimits` | Read |
| `delete_content_item` | `deleteContentItem` | Confirm exact mutation |
| `delete_post` | `deletePost` | Confirm exact mutation |
| `delete_post_template` | `deletePostTemplate` | Confirm exact mutation |
| `edit_post` | `editPost` | Confirm exact mutation |
| `get_idea_groups` | `ideaGroups` | Read |
| `get_ideas` | `ideas` | Read |
| `get_instagram_audio` | `instagramAudio` | Read |
| `move_post_in_queue` | `movePostInQueue` | Confirm exact mutation |
| `get_post` | `post` | Read |
| `get_posts` | `posts` | Read |
| `get_post_template` | `postTemplate` | Read |
| `get_post_templates` | `postTemplates` | Read |
| `promote_content_item_draft_to_posts` | `promoteContentItemDraftToPosts` | Confirm exact mutation |
| `remove_post_from_content_item` | `removePostFromContentItem` | Confirm exact mutation |
| `get_search_instagram_audio` | `searchInstagramAudio` | Read |
| `get_tag` | `tag` | Read |
| `get_tags_v2` | `tagsV2` | Read |
| `get_trending_instagram_audio` | `trendingInstagramAudio` | Read |
| `update_content_item` | `updateContentItem` | Confirm exact mutation |
| `update_content_item_draft` | `updateContentItemDraft` | Confirm exact mutation |
| `update_post_template` | `updatePostTemplate` | Confirm exact mutation |
| `list_accounts` | Local/helper or parsed GraphQL | Read |
| `graphql_query` | Local/helper or parsed GraphQL | Read |
| `graphql_mutation` | Local/helper or parsed GraphQL | Confirm exact mutation |
| `preview_operation` | Local/helper or parsed GraphQL | Read |
| `query_pages` | Local/helper or parsed GraphQL | Read |
| `get_operation_schema` | Local/helper or parsed GraphQL | Read |

#### get_account

`buffer-cli get-account`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `payload` | No; body and guard rules apply | object | Complete native input object instead of individual input fields. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON input file, no symlink, at most 1 MiB; cannot mix with payload or individual input fields. minLength: `1`. |
| `fields` | No; body and guard rules apply | array | Upstream field paths relative to the result, as in official CLI --fields. Default fields are bounded. Use items.id for connection nodes; pageInfo.endCursor for cursors. minItems: `1`. maxItems: `100`. Items: string. |
| `account` | No; body and guard rules apply | string | Private account profile name. Selects credentials only; an organization default does not restrict provider token permissions. minLength: `1`. |

Native input requirements: No required native input fields. Use individual fields or complete payload/payload_file.

Default upstream fields: `id`, `email`, `organizations.id`, `organizations.channelCount`, `timezone`. Inspect get_operation_schema for every selectable path.

#### add_post_to_content_item

`buffer-cli add-post-to-content-item`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body and guard rules apply | string | The content item to add the post to. |
| `postId` | No; body and guard rules apply | string | The post to add. The post must already exist. The post and the content item must belong to the same organization. |
| `payload` | No; body and guard rules apply | object | Complete native input object instead of individual input fields. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON input file, no symlink, at most 1 MiB; cannot mix with payload or individual input fields. minLength: `1`. |
| `fields` | No; body and guard rules apply | array | Upstream field paths relative to the result, as in official CLI --fields. Default fields are bounded. Use items.id for connection nodes; pageInfo.endCursor for cursors. minItems: `1`. maxItems: `100`. Items: string. |
| `account` | No; body and guard rules apply | string | Private account profile name. Selects credentials only; an organization default does not restrict provider token permissions. minLength: `1`. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for this exact user-requested Buffer mutation. |

Native input requirements: `id`, `postId`. Use individual fields or complete payload/payload_file.

Default upstream fields: `__typename`, `contentItem.id`, `contentItem.accountId`, `contentItem.allowedActions`, `contentItem.author.id`, `contentItem.author.avatar`, `contentItem.author.email`, `contentItem.author.isDeleted`, `contentItem.author.name`, `contentItem.author.urn`, `contentItem.body.__typename`, `contentItem.body.id`, `contentItem.body.aiAssisted`, `contentItem.body.assets.__typename`, `contentItem.body.assets.id`, `contentItem.body.assets.mimeType`, `contentItem.body.assets.source`, `contentItem.body.assets.thumbnail`, `contentItem.body.assets.type`, `contentItem.body.text`, `contentItem.organizationId`, `contentItem.tags.id`, `contentItem.tags.color`, `contentItem.tags.colorName`, `contentItem.tags.isLocked`, `contentItem.tags.name`, `contentItem.targetDate`, `contentItem.title`, `contentItem.createdAt`, `post.id`, `post.allowedActions`, `post.assets.__typename`, `post.assets.id`, `post.assets.mimeType`, `post.assets.source`, `post.assets.thumbnail`, `post.assets.type`, `post.author.id`, `post.author.avatar`, `post.author.email`, `post.author.isDeleted`, `post.author.name`, `post.author.urn`, `post.channel.id`, `post.channel.allowedActions`, `post.channel.avatar`, `post.channel.descriptor`, `post.channel.displayName`, `post.channel.externalLink`, `post.channel.hasActiveMemberDevice`, `post.channel.isDisconnected`, `post.channel.isLocked`, `post.channel.isNew`, `post.channel.isQueuePaused`, `post.channel.metadata.__typename`, `post.channel.metadata.defaultToReminders`, `post.channel.metadata.maxCharacters`, `post.channel.metadata.serverUrl`, `post.channel.metadata.subscriptionType`, `post.channel.metadata.shouldShowLinkedinAnalyticsRefreshBanner`, `post.channel.metadata.businessPortfolioId`, `post.channel.metadata.lastSubscribedAt`, `post.channel.metadata.phoneNumberId`, `post.channel.metadata.wabaId`, `post.channel.name`, `post.channel.organizationId`, `post.channel.products`, `post.channel.scopes`, `post.channel.service`, `post.channel.serviceId`, `post.channel.showTrendingTopicSuggestions`, `post.channel.timezone`, `post.channel.type`, `post.channel.createdAt`, `post.channel.updatedAt`, `post.channelId`, `post.channelService`, `post.contentItemId`, `post.dueAt`, `post.error.message`, `post.error.rawError`, `post.error.supportUrl`, `post.externalLink`, `post.ideaId`, `post.isCustomScheduled`, `post.metadata.__typename`, `post.metadata.firstComment`, `post.metadata.isAiGenerated`, `post.metadata.link`, `post.metadata.shouldShareToFeed`, `post.metadata.type`, `post.metadata.title`, `post.metadata.threadCount`, `post.metadata.url`, `post.metadata.details.__typename`, `post.metadata.details.button`, `post.metadata.details.link`, `post.metadata.details.code`, `post.metadata.details.endDate`, `post.metadata.details.startDate`, `post.metadata.details.terms`, `post.metadata.details.title`, `post.metadata.details.endTime`, `post.metadata.details.isFullDayEvent`, `post.metadata.details.startTime`, `post.metadata.embeddable`, `post.metadata.license`, `post.metadata.madeForKids`, `post.metadata.notifySubscribers`, `post.metadata.privacy`, `post.metadata.spoilerText`, `post.metadata.locationId`, `post.metadata.locationName`, `post.metadata.topic`, `post.metrics.description`, `post.metrics.name`, `post.metrics.type`, `post.metrics.unit`, `post.metrics.value`, `post.metricsUpdatedAt`, `post.notes.id`, `post.notes.allowedActions`, `post.notes.text`, `post.notes.type`, `post.notes.createdAt`, `post.notes.updatedAt`, `post.notificationStatus`, `post.schedulingType`, `post.sentAt`, `post.sharedNow`, `post.shareMode`, `post.status`, `post.tags.id`, `post.tags.color`, `post.tags.colorName`, `post.tags.isLocked`, `post.tags.name`, `post.text`, `post.via`, `post.createdAt`, `post.updatedAt`, `message`. Inspect get_operation_schema for every selectable path.

#### get_aggregated_post_metrics

`buffer-cli get-aggregated-post-metrics`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `channelIds` | No; body and guard rules apply | array | Optional list of channel IDs to filter by. When omitted (null), the aggregate spans every channel in the organization the actor has insights access to. When set to an empty array, no channels match and the result is empty. Items: string. |
| `endDateTime` | No; body and guard rules apply | string | End of the aggregation window. Consumers typically pass UTC midnight of the last calendar day in the window (the backend treats the range as inclusive of that day), for example `2026-01-31T00:00:00Z`. Date range is capped to 365 days. |
| `organizationId` | No; body and guard rules apply | string | The organization ID |
| `startDateTime` | No; body and guard rules apply | string | Start of the aggregation window. Consumers typically pass UTC midnight of the first calendar day in the window, for example `2026-01-01T00:00:00Z`. |
| `tags` | No; body and guard rules apply | object | See the full input schema. |
| `payload` | No; body and guard rules apply | object | Complete native input object instead of individual input fields. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON input file, no symlink, at most 1 MiB; cannot mix with payload or individual input fields. minLength: `1`. |
| `fields` | No; body and guard rules apply | array | Upstream field paths relative to the result, as in official CLI --fields. Default fields are bounded. Use items.id for connection nodes; pageInfo.endCursor for cursors. minItems: `1`. maxItems: `100`. Items: string. |
| `account` | No; body and guard rules apply | string | Private account profile name. Selects credentials only; an organization default does not restrict provider token permissions. minLength: `1`. |

Native input requirements: `endDateTime`, `organizationId`, `startDateTime`. Use individual fields or complete payload/payload_file.

Default upstream fields: `metrics.type`, `metrics.name`, `metrics.value`, `metrics.unit`, `metricsUpdatedAt`. Inspect get_operation_schema for every selectable path.

#### get_channel

`buffer-cli get-channel`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body and guard rules apply | string | The ID of the channel to be retrieved |
| `payload` | No; body and guard rules apply | object | Complete native input object instead of individual input fields. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON input file, no symlink, at most 1 MiB; cannot mix with payload or individual input fields. minLength: `1`. |
| `fields` | No; body and guard rules apply | array | Upstream field paths relative to the result, as in official CLI --fields. Default fields are bounded. Use items.id for connection nodes; pageInfo.endCursor for cursors. minItems: `1`. maxItems: `100`. Items: string. |
| `account` | No; body and guard rules apply | string | Private account profile name. Selects credentials only; an organization default does not restrict provider token permissions. minLength: `1`. |

Native input requirements: `id`. Use individual fields or complete payload/payload_file.

Default upstream fields: `id`, `displayName`, `service`, `timezone`, `serviceId`. Inspect get_operation_schema for every selectable path.

#### get_channels

`buffer-cli get-channels`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `filter` | No; body and guard rules apply | object | See the full input schema. |
| `organizationId` | No; body and guard rules apply | string | The Organization id to fetch channels for |
| `payload` | No; body and guard rules apply | object | Complete native input object instead of individual input fields. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON input file, no symlink, at most 1 MiB; cannot mix with payload or individual input fields. minLength: `1`. |
| `fields` | No; body and guard rules apply | array | Upstream field paths relative to the result, as in official CLI --fields. Default fields are bounded. Use items.id for connection nodes; pageInfo.endCursor for cursors. minItems: `1`. maxItems: `100`. Items: string. |
| `account` | No; body and guard rules apply | string | Private account profile name. Selects credentials only; an organization default does not restrict provider token permissions. minLength: `1`. |

Native input requirements: `organizationId`. Use individual fields or complete payload/payload_file.

Default upstream fields: `id`, `name`, `service`. Inspect get_operation_schema for every selectable path.

#### get_configuration

`buffer-cli get-configuration`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `organizationId` | No; body and guard rules apply | string | The organization to return configuration for. |
| `payload` | No; body and guard rules apply | object | Complete native input object instead of individual input fields. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON input file, no symlink, at most 1 MiB; cannot mix with payload or individual input fields. minLength: `1`. |
| `fields` | No; body and guard rules apply | array | Upstream field paths relative to the result, as in official CLI --fields. Default fields are bounded. Use items.id for connection nodes; pageInfo.endCursor for cursors. minItems: `1`. maxItems: `100`. Items: string. |
| `account` | No; body and guard rules apply | string | Private account profile name. Selects credentials only; an organization default does not restrict provider token permissions. minLength: `1`. |

Native input requirements: `organizationId`. Use individual fields or complete payload/payload_file.

Default upstream fields: `channels.authorizationStatus.feature`, `channels.authorizationStatus.reason`, `channels.authorizationStatus.status`, `channels.channelId`, `channels.channelType`, `channels.content.configurationContentTypes`, `channels.content.rules.__typename`, `channels.content.rules.property`, `channels.content.rules.max`, `channels.content.rules.min`, `channels.content.rules.maxLength`, `channels.content.rules.conflictsWith`, `channels.content.rules.requires`, `channels.content.rules.maxMegabytes`, `channels.content.rules.maxDurationSeconds`, `channels.content.rules.allowedFormats`, `channels.content.supportedProperties`, `channels.engagement.engagementType`, `channels.engagement.metadata.__typename`, `channels.engagement.metadata.hasUserRating`, `channels.engagement.metadata.permanentNote`, `channels.engagement.supportedAiFeatures`, `channels.service`, `services.channelType`, `services.content.configurationContentTypes`, `services.content.rules.__typename`, `services.content.rules.property`, `services.content.rules.max`, `services.content.rules.min`, `services.content.rules.maxLength`, `services.content.rules.conflictsWith`, `services.content.rules.requires`, `services.content.rules.maxMegabytes`, `services.content.rules.maxDurationSeconds`, `services.content.rules.allowedFormats`, `services.content.supportedProperties`, `services.engagement.engagementType`, `services.engagement.metadata.__typename`, `services.engagement.metadata.hasUserRating`, `services.engagement.metadata.permanentNote`, `services.engagement.supportedAiFeatures`, `services.service`. Inspect get_operation_schema for every selectable path.

#### get_content_item

`buffer-cli get-content-item`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body and guard rules apply | string | The unique identifier of the content item to fetch. |
| `payload` | No; body and guard rules apply | object | Complete native input object instead of individual input fields. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON input file, no symlink, at most 1 MiB; cannot mix with payload or individual input fields. minLength: `1`. |
| `fields` | No; body and guard rules apply | array | Upstream field paths relative to the result, as in official CLI --fields. Default fields are bounded. Use items.id for connection nodes; pageInfo.endCursor for cursors. minItems: `1`. maxItems: `100`. Items: string. |
| `account` | No; body and guard rules apply | string | Private account profile name. Selects credentials only; an organization default does not restrict provider token permissions. minLength: `1`. |

Native input requirements: `id`. Use individual fields or complete payload/payload_file.

Default upstream fields: `id`, `accountId`, `allowedActions`, `author.id`, `author.avatar`, `author.email`, `author.isDeleted`, `author.name`, `author.urn`, `body.__typename`, `body.id`, `body.aiAssisted`, `body.assets.__typename`, `body.assets.id`, `body.assets.mimeType`, `body.assets.source`, `body.assets.thumbnail`, `body.assets.type`, `body.text`, `body.posts.id`, `body.posts.allowedActions`, `body.posts.assets.__typename`, `body.posts.assets.id`, `body.posts.assets.mimeType`, `body.posts.assets.source`, `body.posts.assets.thumbnail`, `body.posts.assets.type`, `body.posts.channelId`, `body.posts.channelService`, `body.posts.contentItemId`, `body.posts.dueAt`, `body.posts.externalLink`, `body.posts.ideaId`, `body.posts.isCustomScheduled`, `body.posts.metadata.__typename`, `body.posts.metadata.firstComment`, `body.posts.metadata.isAiGenerated`, `body.posts.metadata.link`, `body.posts.metadata.shouldShareToFeed`, `body.posts.metadata.type`, `body.posts.metadata.title`, `body.posts.metadata.threadCount`, `body.posts.metadata.url`, `body.posts.metadata.details.__typename`, `body.posts.metadata.details.button`, `body.posts.metadata.details.link`, `body.posts.metadata.details.code`, `body.posts.metadata.details.endDate`, `body.posts.metadata.details.startDate`, `body.posts.metadata.details.terms`, `body.posts.metadata.details.title`, `body.posts.metadata.details.endTime`, `body.posts.metadata.details.isFullDayEvent`, `body.posts.metadata.details.startTime`, `body.posts.metadata.embeddable`, `body.posts.metadata.license`, `body.posts.metadata.madeForKids`, `body.posts.metadata.notifySubscribers`, `body.posts.metadata.privacy`, `body.posts.metadata.spoilerText`, `body.posts.metadata.locationId`, `body.posts.metadata.locationName`, `body.posts.metadata.topic`, `body.posts.metricsUpdatedAt`, `body.posts.notificationStatus`, `body.posts.schedulingType`, `body.posts.sentAt`, `body.posts.sharedNow`, `body.posts.shareMode`, `body.posts.status`, `body.posts.text`, `body.posts.via`, `body.posts.createdAt`, `body.posts.updatedAt`, `organizationId`, `tags.id`, `tags.color`, `tags.colorName`, `tags.isLocked`, `tags.name`, `targetDate`, `title`, `createdAt`. Inspect get_operation_schema for every selectable path.

#### get_content_items

`buffer-cli get-content-items`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `filter` | No; body and guard rules apply | object | See the full input schema. |
| `organizationId` | No; body and guard rules apply | string | Organization to list content items for. The caller must be a member of this organization. |
| `sort` | No; body and guard rules apply | array | Sorting to apply, each entry breaking ties in the one before it. Defaults to newest first. A pagination cursor is only valid for the sort that produced it, so reset `after` to null whenever the sort changes. Items: object. |
| `payload` | No; body and guard rules apply | object | Complete native input object instead of individual input fields. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON input file, no symlink, at most 1 MiB; cannot mix with payload or individual input fields. minLength: `1`. |
| `fields` | No; body and guard rules apply | array | Upstream field paths relative to the result, as in official CLI --fields. Default fields are bounded. Use items.id for connection nodes; pageInfo.endCursor for cursors. minItems: `1`. maxItems: `100`. Items: string. |
| `account` | No; body and guard rules apply | string | Private account profile name. Selects credentials only; an organization default does not restrict provider token permissions. minLength: `1`. |
| `first` | No; body and guard rules apply | integer | Local page-size cap 100, default 25; provider may impose additional query limits. minimum: `1`. maximum: `100`. |
| `after` | No; body and guard rules apply | string | Opaque cursor from pageInfo.endCursor. One page per ordinary call. maxLength: `8192`. |

Native input requirements: `organizationId`. Use individual fields or complete payload/payload_file.

Default upstream fields: `items.id`, `items.accountId`, `items.allowedActions`, `items.author.id`, `items.author.avatar`, `items.author.email`, `items.author.isDeleted`, `items.author.name`, `items.author.urn`, `items.body.__typename`, `items.body.id`, `items.body.aiAssisted`, `items.body.assets.__typename`, `items.body.assets.id`, `items.body.assets.mimeType`, `items.body.assets.source`, `items.body.assets.thumbnail`, `items.body.assets.type`, `items.body.text`, `items.organizationId`, `items.tags.id`, `items.tags.color`, `items.tags.colorName`, `items.tags.isLocked`, `items.tags.name`, `items.targetDate`, `items.title`, `items.createdAt`, `pageInfo.endCursor`, `pageInfo.hasNextPage`, `pageInfo.hasPreviousPage`, `pageInfo.startCursor`. Inspect get_operation_schema for every selectable path.

#### create_content_item

`buffer-cli create-content-item`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `organizationId` | No; body and guard rules apply | string | Organization that owns the content item and all variants created in it. |
| `posts` | No; body and guard rules apply | array | The channel-specific post variants to create, one per channel. Provide at least one variant, and at most one variant per channel. Items: object. |
| `tagIds` | No; body and guard rules apply | array | Tags to apply to this content item. Omit to create it with no tags. Items: string. |
| `targetDate` | No; body and guard rules apply | string | Optional date indicating when this piece of content should go out. This is a planning aid only and does not schedule any posts. |
| `title` | No; body and guard rules apply | string | Optional title describing what this piece of content is about. |
| `payload` | No; body and guard rules apply | object | Complete native input object instead of individual input fields. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON input file, no symlink, at most 1 MiB; cannot mix with payload or individual input fields. minLength: `1`. |
| `fields` | No; body and guard rules apply | array | Upstream field paths relative to the result, as in official CLI --fields. Default fields are bounded. Use items.id for connection nodes; pageInfo.endCursor for cursors. minItems: `1`. maxItems: `100`. Items: string. |
| `account` | No; body and guard rules apply | string | Private account profile name. Selects credentials only; an organization default does not restrict provider token permissions. minLength: `1`. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for this exact user-requested Buffer mutation. |

Native input requirements: `organizationId`, `posts`. Use individual fields or complete payload/payload_file.

Default upstream fields: `__typename`, `content.id`, `content.accountId`, `content.allowedActions`, `content.author.id`, `content.author.avatar`, `content.author.email`, `content.author.isDeleted`, `content.author.name`, `content.author.urn`, `content.body.__typename`, `content.body.id`, `content.body.aiAssisted`, `content.body.assets.__typename`, `content.body.assets.id`, `content.body.assets.mimeType`, `content.body.assets.source`, `content.body.assets.thumbnail`, `content.body.assets.type`, `content.body.text`, `content.organizationId`, `content.tags.id`, `content.tags.color`, `content.tags.colorName`, `content.tags.isLocked`, `content.tags.name`, `content.targetDate`, `content.title`, `content.createdAt`, `errors.__typename`, `errors.message`, `errors.channelId`, `message`. Inspect get_operation_schema for every selectable path.

#### create_content_item_draft

`buffer-cli create-content-item-draft`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `correlationId` | No; body and guard rules apply | string | Client-generated UUID that makes draft creation idempotent. A retry with the same UUID in the same organization returns the first content item in its current state. |
| `draft` | No; body and guard rules apply | object | See the full input schema. |
| `organizationId` | No; body and guard rules apply | string | Organization that will own the content item. |
| `tagIds` | No; body and guard rules apply | array | Tags to apply to this content item. Omit to create it with no tags. Items: string. |
| `targetDate` | No; body and guard rules apply | string | Optional date indicating when this piece of content should go out. This is a planning aid only and does not schedule any posts. |
| `title` | No; body and guard rules apply | string | Optional title describing what this piece of content is about. |
| `payload` | No; body and guard rules apply | object | Complete native input object instead of individual input fields. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON input file, no symlink, at most 1 MiB; cannot mix with payload or individual input fields. minLength: `1`. |
| `fields` | No; body and guard rules apply | array | Upstream field paths relative to the result, as in official CLI --fields. Default fields are bounded. Use items.id for connection nodes; pageInfo.endCursor for cursors. minItems: `1`. maxItems: `100`. Items: string. |
| `account` | No; body and guard rules apply | string | Private account profile name. Selects credentials only; an organization default does not restrict provider token permissions. minLength: `1`. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for this exact user-requested Buffer mutation. |

Native input requirements: `draft`, `organizationId`. Use individual fields or complete payload/payload_file.

Default upstream fields: `__typename`, `contentItem.id`, `contentItem.accountId`, `contentItem.allowedActions`, `contentItem.author.id`, `contentItem.author.avatar`, `contentItem.author.email`, `contentItem.author.isDeleted`, `contentItem.author.name`, `contentItem.author.urn`, `contentItem.body.__typename`, `contentItem.body.id`, `contentItem.body.aiAssisted`, `contentItem.body.assets.__typename`, `contentItem.body.assets.id`, `contentItem.body.assets.mimeType`, `contentItem.body.assets.source`, `contentItem.body.assets.thumbnail`, `contentItem.body.assets.type`, `contentItem.body.text`, `contentItem.organizationId`, `contentItem.tags.id`, `contentItem.tags.color`, `contentItem.tags.colorName`, `contentItem.tags.isLocked`, `contentItem.tags.name`, `contentItem.targetDate`, `contentItem.title`, `contentItem.createdAt`, `errors.message`, `message`. Inspect get_operation_schema for every selectable path.

#### create_idea

`buffer-cli create-idea`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `content` | No; body and guard rules apply | object | See the full input schema. |
| `cta` | No; body and guard rules apply | string | Call-to-action identifier for analytics tracking |
| `group` | No; body and guard rules apply | object | See the full input schema. |
| `organizationId` | No; body and guard rules apply | string | Organization ID that will own the idea |
| `templateId` | No; body and guard rules apply | string | Template ID used to create the idea |
| `payload` | No; body and guard rules apply | object | Complete native input object instead of individual input fields. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON input file, no symlink, at most 1 MiB; cannot mix with payload or individual input fields. minLength: `1`. |
| `fields` | No; body and guard rules apply | array | Upstream field paths relative to the result, as in official CLI --fields. Default fields are bounded. Use items.id for connection nodes; pageInfo.endCursor for cursors. minItems: `1`. maxItems: `100`. Items: string. |
| `account` | No; body and guard rules apply | string | Private account profile name. Selects credentials only; an organization default does not restrict provider token permissions. minLength: `1`. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for this exact user-requested Buffer mutation. |

Native input requirements: `content`, `organizationId`. Use individual fields or complete payload/payload_file.

Default upstream fields: `__typename`, `id`, `content.aiAssisted`, `content.date`, `content.media.id`, `content.media.alt`, `content.media.size`, `content.media.thumbnailUrl`, `content.media.type`, `content.media.url`, `content.services`, `content.tags.id`, `content.tags.color`, `content.tags.colorName`, `content.tags.name`, `content.text`, `content.title`, `groupId`, `organizationId`, `position`, `createdAt`, `updatedAt`, `idea.id`, `idea.content.aiAssisted`, `idea.content.date`, `idea.content.services`, `idea.content.text`, `idea.content.title`, `idea.groupId`, `idea.organizationId`, `idea.position`, `idea.createdAt`, `idea.updatedAt`, `refreshIdeas`, `message`. Inspect get_operation_schema for every selectable path.

#### create_post

`buffer-cli create-post`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `aiAssisted` | No; body and guard rules apply | boolean | If this post was created with the help of AI |
| `assets` | No; body and guard rules apply | array | Ordered list of assets on this post. Items: object. |
| `channelId` | No; body and guard rules apply | string | Channel's Id for which we want to create the post |
| `draftId` | No; body and guard rules apply | string | Is set when the Post is generated from a Draft |
| `dueAt` | No; body and guard rules apply | string | Date when the post is scheduled to be published |
| `ideaId` | No; body and guard rules apply | string | Is set when the Post is generated from an Idea |
| `metadata` | No; body and guard rules apply | object | See the full input schema. |
| `mode` | No; body and guard rules apply | string | How the post is being scheduled. Values: `addToQueue`, `customScheduled`, `shareNext`, `shareNow`. |
| `needsApproval` | No; body and guard rules apply | boolean | Submit the post for approval instead of scheduling it. A post submitted for approval is always a draft, so this conflicts with turning `saveToDraft` off.  Only valid when your posting policy on the target channel requires approval. |
| `saveToDraft` | No; body and guard rules apply | boolean | If true, saves the post as a draft instead of scheduling it. When saving as draft: - Post status will be 'draft' instead of 'buffer' - Posting limits are not checked - The post will not be published until explicitly scheduled |
| `schedulingType` | No; body and guard rules apply | string | Scheduling type to indicate notification publishing or automatic publishing Values: `automatic`, `notification`. |
| `source` | No; body and guard rules apply | string | source where the composer was initiated from, used for tracking. |
| `tagIds` | No; body and guard rules apply | array | List of tag IDs Items: string. |
| `text` | No; body and guard rules apply | string | Text content of the Post.  Note: for threaded posts, this needs to match the first item in the `thread` array. |
| `payload` | No; body and guard rules apply | object | Complete native input object instead of individual input fields. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON input file, no symlink, at most 1 MiB; cannot mix with payload or individual input fields. minLength: `1`. |
| `fields` | No; body and guard rules apply | array | Upstream field paths relative to the result, as in official CLI --fields. Default fields are bounded. Use items.id for connection nodes; pageInfo.endCursor for cursors. minItems: `1`. maxItems: `100`. Items: string. |
| `account` | No; body and guard rules apply | string | Private account profile name. Selects credentials only; an organization default does not restrict provider token permissions. minLength: `1`. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for this exact user-requested Buffer mutation. |

Native input requirements: `channelId`, `mode`, `schedulingType`. Use individual fields or complete payload/payload_file.

Default upstream fields: `post.id`, `post.status`. Inspect get_operation_schema for every selectable path.

#### create_post_template

`buffer-cli create-post-template`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `body` | No; body and guard rules apply | string | The main content body of the template, may contain {{placeholders}}. |
| `description` | No; body and guard rules apply | string | A short user-facing description of the template. Nullable for backwards-compat at the GraphQL boundary — the resolver rejects null/empty values with a clear input error so the underlying storage contract (non-empty string) is still honored. |
| `emoji` | No; body and guard rules apply | string | The emoji associated with the template. |
| `organizationId` | No; body and guard rules apply | string | Organization the template belongs to. The caller must be a member of this organization. For `internal` visibility this is the team scope; for `private` it's recorded on the template but does not affect visibility. |
| `title` | No; body and guard rules apply | string | The title of the template. |
| `visibility` | No; body and guard rules apply | string | Defaults to `private` if omitted. `public` is rejected — it is only available to official Buffer clients. Values: `internal`, `private`, `public`. |
| `payload` | No; body and guard rules apply | object | Complete native input object instead of individual input fields. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON input file, no symlink, at most 1 MiB; cannot mix with payload or individual input fields. minLength: `1`. |
| `fields` | No; body and guard rules apply | array | Upstream field paths relative to the result, as in official CLI --fields. Default fields are bounded. Use items.id for connection nodes; pageInfo.endCursor for cursors. minItems: `1`. maxItems: `100`. Items: string. |
| `account` | No; body and guard rules apply | string | Private account profile name. Selects credentials only; an organization default does not restrict provider token permissions. minLength: `1`. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for this exact user-requested Buffer mutation. |

Native input requirements: `body`, `organizationId`, `title`. Use individual fields or complete payload/payload_file.

Default upstream fields: `__typename`, `postTemplate.id`, `postTemplate.body`, `postTemplate.description`, `postTemplate.emoji`, `postTemplate.organizationId`, `postTemplate.title`, `postTemplate.visibility`, `postTemplate.createdAt`, `postTemplate.updatedAt`, `message`. Inspect get_operation_schema for every selectable path.

#### get_daily_posting_limits

`buffer-cli get-daily-posting-limits`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `channelIds` | No; body and guard rules apply | array | List of channel IDs to check limits for. All channels must belong to the same organization. Items: string. |
| `date` | No; body and guard rules apply | string | The date to check limits for. Defaults to today if not provided. |
| `payload` | No; body and guard rules apply | object | Complete native input object instead of individual input fields. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON input file, no symlink, at most 1 MiB; cannot mix with payload or individual input fields. minLength: `1`. |
| `fields` | No; body and guard rules apply | array | Upstream field paths relative to the result, as in official CLI --fields. Default fields are bounded. Use items.id for connection nodes; pageInfo.endCursor for cursors. minItems: `1`. maxItems: `100`. Items: string. |
| `account` | No; body and guard rules apply | string | Private account profile name. Selects credentials only; an organization default does not restrict provider token permissions. minLength: `1`. |

Native input requirements: `channelIds`. Use individual fields or complete payload/payload_file.

Default upstream fields: `channelId`, `isAtLimit`, `limit`, `scheduled`, `sent`. Inspect get_operation_schema for every selectable path.

#### delete_content_item

`buffer-cli delete-content-item`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body and guard rules apply | string | The content item to delete. |
| `payload` | No; body and guard rules apply | object | Complete native input object instead of individual input fields. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON input file, no symlink, at most 1 MiB; cannot mix with payload or individual input fields. minLength: `1`. |
| `fields` | No; body and guard rules apply | array | Upstream field paths relative to the result, as in official CLI --fields. Default fields are bounded. Use items.id for connection nodes; pageInfo.endCursor for cursors. minItems: `1`. maxItems: `100`. Items: string. |
| `account` | No; body and guard rules apply | string | Private account profile name. Selects credentials only; an organization default does not restrict provider token permissions. minLength: `1`. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for this exact user-requested Buffer mutation. |

Native input requirements: `id`. Use individual fields or complete payload/payload_file.

Default upstream fields: `__typename`, `_empty`, `errors.channelId`, `errors.message`, `message`. Inspect get_operation_schema for every selectable path.

#### delete_post

`buffer-cli delete-post`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body and guard rules apply | string | Post id to delete. |
| `payload` | No; body and guard rules apply | object | Complete native input object instead of individual input fields. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON input file, no symlink, at most 1 MiB; cannot mix with payload or individual input fields. minLength: `1`. |
| `fields` | No; body and guard rules apply | array | Upstream field paths relative to the result, as in official CLI --fields. Default fields are bounded. Use items.id for connection nodes; pageInfo.endCursor for cursors. minItems: `1`. maxItems: `100`. Items: string. |
| `account` | No; body and guard rules apply | string | Private account profile name. Selects credentials only; an organization default does not restrict provider token permissions. minLength: `1`. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for this exact user-requested Buffer mutation. |

Native input requirements: `id`. Use individual fields or complete payload/payload_file.

Default upstream fields: `__typename`, `id`, `message`. Inspect get_operation_schema for every selectable path.

#### delete_post_template

`buffer-cli delete-post-template`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body and guard rules apply | string | The ID of the template to delete. |
| `payload` | No; body and guard rules apply | object | Complete native input object instead of individual input fields. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON input file, no symlink, at most 1 MiB; cannot mix with payload or individual input fields. minLength: `1`. |
| `fields` | No; body and guard rules apply | array | Upstream field paths relative to the result, as in official CLI --fields. Default fields are bounded. Use items.id for connection nodes; pageInfo.endCursor for cursors. minItems: `1`. maxItems: `100`. Items: string. |
| `account` | No; body and guard rules apply | string | Private account profile name. Selects credentials only; an organization default does not restrict provider token permissions. minLength: `1`. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for this exact user-requested Buffer mutation. |

Native input requirements: `id`. Use individual fields or complete payload/payload_file.

Default upstream fields: `__typename`, `_empty`, `message`. Inspect get_operation_schema for every selectable path.

#### edit_post

`buffer-cli edit-post`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body and guard rules apply | string | ID of the post to edit |
| `aiAssisted` | No; body and guard rules apply | boolean | If this post was edited with the help of AI |
| `approvalChange` | No; body and guard rules apply | string | Change the post's approval state alongside this edit. Leave unset to keep the post's current approval state.  Only valid when your posting policy on the post's channel requires approval, and only on your own drafts. Asking for the state the post is already in does nothing. Values: `request`, `revert`. |
| `assets` | No; body and guard rules apply | array | Ordered list of assets on this post. Omit to preserve the existing list, pass an empty array to clear it Items: object. |
| `draftId` | No; body and guard rules apply | string | Is set when the Post is generated from a Draft |
| `dueAt` | No; body and guard rules apply | string | Date when the post is scheduled to be published |
| `ideaId` | No; body and guard rules apply | string | Is set when the Post is generated from an Idea |
| `metadata` | No; body and guard rules apply | object | See the full input schema. |
| `mode` | No; body and guard rules apply | string | How the post is being scheduled. Omit the field or pass null to make no scheduling change — null does not clear or reset the schedule: a scheduled post keeps its current share mode, queue slot, and any custom time, and the edit applies only the other provided fields. Pass a non-null ShareMode to apply that mode. Values: `addToQueue`, `customScheduled`, `shareNext`, `shareNow`. |
| `saveToDraft` | No; body and guard rules apply | boolean | If true, saves the post as a draft instead of keeping it scheduled. When saving as draft: - Post status will be 'draft' instead of 'buffer' - The post will not be published until explicitly scheduled |
| `schedulingType` | No; body and guard rules apply | string | Scheduling type to indicate notification publishing or automatic publishing.  Omit it, or send null, to leave the post publishing the way it already does. Values: `automatic`, `notification`. |
| `source` | No; body and guard rules apply | string | source where the composer was initiated from, used for tracking. |
| `tagIds` | No; body and guard rules apply | array | tags Items: string. |
| `text` | No; body and guard rules apply | string | Text content of the Post. Omit the field to keep the current text; pass an empty string or null to clear it.  Note: for threaded posts, this needs to match the first item in the `thread` array. |
| `payload` | No; body and guard rules apply | object | Complete native input object instead of individual input fields. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON input file, no symlink, at most 1 MiB; cannot mix with payload or individual input fields. minLength: `1`. |
| `fields` | No; body and guard rules apply | array | Upstream field paths relative to the result, as in official CLI --fields. Default fields are bounded. Use items.id for connection nodes; pageInfo.endCursor for cursors. minItems: `1`. maxItems: `100`. Items: string. |
| `account` | No; body and guard rules apply | string | Private account profile name. Selects credentials only; an organization default does not restrict provider token permissions. minLength: `1`. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for this exact user-requested Buffer mutation. |

Native input requirements: `id`. Use individual fields or complete payload/payload_file.

Default upstream fields: `__typename`, `post.id`, `post.allowedActions`, `post.assets.__typename`, `post.assets.id`, `post.assets.mimeType`, `post.assets.source`, `post.assets.thumbnail`, `post.assets.type`, `post.author.id`, `post.author.avatar`, `post.author.email`, `post.author.isDeleted`, `post.author.name`, `post.author.urn`, `post.channel.id`, `post.channel.allowedActions`, `post.channel.avatar`, `post.channel.descriptor`, `post.channel.displayName`, `post.channel.externalLink`, `post.channel.hasActiveMemberDevice`, `post.channel.isDisconnected`, `post.channel.isLocked`, `post.channel.isNew`, `post.channel.isQueuePaused`, `post.channel.metadata.__typename`, `post.channel.metadata.defaultToReminders`, `post.channel.metadata.maxCharacters`, `post.channel.metadata.serverUrl`, `post.channel.metadata.subscriptionType`, `post.channel.metadata.shouldShowLinkedinAnalyticsRefreshBanner`, `post.channel.metadata.businessPortfolioId`, `post.channel.metadata.lastSubscribedAt`, `post.channel.metadata.phoneNumberId`, `post.channel.metadata.wabaId`, `post.channel.name`, `post.channel.organizationId`, `post.channel.products`, `post.channel.scopes`, `post.channel.service`, `post.channel.serviceId`, `post.channel.showTrendingTopicSuggestions`, `post.channel.timezone`, `post.channel.type`, `post.channel.createdAt`, `post.channel.updatedAt`, `post.channelId`, `post.channelService`, `post.contentItemId`, `post.dueAt`, `post.error.message`, `post.error.rawError`, `post.error.supportUrl`, `post.externalLink`, `post.ideaId`, `post.isCustomScheduled`, `post.metadata.__typename`, `post.metadata.firstComment`, `post.metadata.isAiGenerated`, `post.metadata.link`, `post.metadata.shouldShareToFeed`, `post.metadata.type`, `post.metadata.title`, `post.metadata.threadCount`, `post.metadata.url`, `post.metadata.details.__typename`, `post.metadata.details.button`, `post.metadata.details.link`, `post.metadata.details.code`, `post.metadata.details.endDate`, `post.metadata.details.startDate`, `post.metadata.details.terms`, `post.metadata.details.title`, `post.metadata.details.endTime`, `post.metadata.details.isFullDayEvent`, `post.metadata.details.startTime`, `post.metadata.embeddable`, `post.metadata.license`, `post.metadata.madeForKids`, `post.metadata.notifySubscribers`, `post.metadata.privacy`, `post.metadata.spoilerText`, `post.metadata.locationId`, `post.metadata.locationName`, `post.metadata.topic`, `post.metrics.description`, `post.metrics.name`, `post.metrics.type`, `post.metrics.unit`, `post.metrics.value`, `post.metricsUpdatedAt`, `post.notes.id`, `post.notes.allowedActions`, `post.notes.text`, `post.notes.type`, `post.notes.createdAt`, `post.notes.updatedAt`, `post.notificationStatus`, `post.schedulingType`, `post.sentAt`, `post.sharedNow`, `post.shareMode`, `post.status`, `post.tags.id`, `post.tags.color`, `post.tags.colorName`, `post.tags.isLocked`, `post.tags.name`, `post.text`, `post.via`, `post.createdAt`, `post.updatedAt`, `message`, `code`, `link`. Inspect get_operation_schema for every selectable path.

#### get_idea_groups

`buffer-cli get-idea-groups`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `organizationId` | No; body and guard rules apply | string | Unique identifier for the organization. |
| `payload` | No; body and guard rules apply | object | Complete native input object instead of individual input fields. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON input file, no symlink, at most 1 MiB; cannot mix with payload or individual input fields. minLength: `1`. |
| `fields` | No; body and guard rules apply | array | Upstream field paths relative to the result, as in official CLI --fields. Default fields are bounded. Use items.id for connection nodes; pageInfo.endCursor for cursors. minItems: `1`. maxItems: `100`. Items: string. |
| `account` | No; body and guard rules apply | string | Private account profile name. Selects credentials only; an organization default does not restrict provider token permissions. minLength: `1`. |

Native input requirements: `organizationId`. Use individual fields or complete payload/payload_file.

Default upstream fields: `id`, `name`, `isLocked`. Inspect get_operation_schema for every selectable path.

#### get_ideas

`buffer-cli get-ideas`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `groupFilter` | No; body and guard rules apply | object | See the full input schema. |
| `organizationId` | No; body and guard rules apply | string | The organization to fetch ideas from. |
| `tagsFilter` | No; body and guard rules apply | object | See the full input schema. |
| `payload` | No; body and guard rules apply | object | Complete native input object instead of individual input fields. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON input file, no symlink, at most 1 MiB; cannot mix with payload or individual input fields. minLength: `1`. |
| `fields` | No; body and guard rules apply | array | Upstream field paths relative to the result, as in official CLI --fields. Default fields are bounded. Use items.id for connection nodes; pageInfo.endCursor for cursors. minItems: `1`. maxItems: `100`. Items: string. |
| `account` | No; body and guard rules apply | string | Private account profile name. Selects credentials only; an organization default does not restrict provider token permissions. minLength: `1`. |
| `first` | No; body and guard rules apply | integer | Local page-size cap 100, default 25; provider may impose additional query limits. minimum: `1`. maximum: `100`. |
| `after` | No; body and guard rules apply | string | Opaque cursor from pageInfo.endCursor. One page per ordinary call. maxLength: `8192`. |

Native input requirements: `organizationId`. Use individual fields or complete payload/payload_file.

Default upstream fields: `items.id`, `items.content.aiAssisted`, `items.content.date`, `items.content.services`, `items.content.text`, `items.content.title`, `items.groupId`, `items.organizationId`, `items.position`, `items.createdAt`, `items.updatedAt`, `pageInfo.endCursor`, `pageInfo.hasNextPage`, `pageInfo.hasPreviousPage`, `pageInfo.startCursor`. Inspect get_operation_schema for every selectable path.

#### get_instagram_audio

`buffer-cli get-instagram-audio`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `audioId` | No; body and guard rules apply | string | Meta audio asset ID |
| `channelId` | No; body and guard rules apply | string | Instagram channel used to authorize the refresh |
| `payload` | No; body and guard rules apply | object | Complete native input object instead of individual input fields. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON input file, no symlink, at most 1 MiB; cannot mix with payload or individual input fields. minLength: `1`. |
| `fields` | No; body and guard rules apply | array | Upstream field paths relative to the result, as in official CLI --fields. Default fields are bounded. Use items.id for connection nodes; pageInfo.endCursor for cursors. minItems: `1`. maxItems: `100`. Items: string. |
| `account` | No; body and guard rules apply | string | Private account profile name. Selects credentials only; an organization default does not restrict provider token permissions. minLength: `1`. |

Native input requirements: `audioId`, `channelId`. Use individual fields or complete payload/payload_file.

Default upstream fields: `__typename`, `audio.id`, `audio.coverArtworkUrl`, `audio.creatorUsername`, `audio.displayArtist`, `audio.duration`, `audio.previewUrl`, `audio.title`, `audio.type`, `channelIds`, `message`. Inspect get_operation_schema for every selectable path.

#### move_post_in_queue

`buffer-cli move-post-in-queue`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body and guard rules apply | string | ID of the post to move. |
| `position` | No; body and guard rules apply | string | Target position within the channel's queue. Values: `bottom`, `top`. |
| `payload` | No; body and guard rules apply | object | Complete native input object instead of individual input fields. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON input file, no symlink, at most 1 MiB; cannot mix with payload or individual input fields. minLength: `1`. |
| `fields` | No; body and guard rules apply | array | Upstream field paths relative to the result, as in official CLI --fields. Default fields are bounded. Use items.id for connection nodes; pageInfo.endCursor for cursors. minItems: `1`. maxItems: `100`. Items: string. |
| `account` | No; body and guard rules apply | string | Private account profile name. Selects credentials only; an organization default does not restrict provider token permissions. minLength: `1`. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for this exact user-requested Buffer mutation. |

Native input requirements: `id`, `position`. Use individual fields or complete payload/payload_file.

Default upstream fields: `__typename`, `post.id`, `post.allowedActions`, `post.assets.__typename`, `post.assets.id`, `post.assets.mimeType`, `post.assets.source`, `post.assets.thumbnail`, `post.assets.type`, `post.author.id`, `post.author.avatar`, `post.author.email`, `post.author.isDeleted`, `post.author.name`, `post.author.urn`, `post.channel.id`, `post.channel.allowedActions`, `post.channel.avatar`, `post.channel.descriptor`, `post.channel.displayName`, `post.channel.externalLink`, `post.channel.hasActiveMemberDevice`, `post.channel.isDisconnected`, `post.channel.isLocked`, `post.channel.isNew`, `post.channel.isQueuePaused`, `post.channel.metadata.__typename`, `post.channel.metadata.defaultToReminders`, `post.channel.metadata.maxCharacters`, `post.channel.metadata.serverUrl`, `post.channel.metadata.subscriptionType`, `post.channel.metadata.shouldShowLinkedinAnalyticsRefreshBanner`, `post.channel.metadata.businessPortfolioId`, `post.channel.metadata.lastSubscribedAt`, `post.channel.metadata.phoneNumberId`, `post.channel.metadata.wabaId`, `post.channel.name`, `post.channel.organizationId`, `post.channel.products`, `post.channel.scopes`, `post.channel.service`, `post.channel.serviceId`, `post.channel.showTrendingTopicSuggestions`, `post.channel.timezone`, `post.channel.type`, `post.channel.createdAt`, `post.channel.updatedAt`, `post.channelId`, `post.channelService`, `post.contentItemId`, `post.dueAt`, `post.error.message`, `post.error.rawError`, `post.error.supportUrl`, `post.externalLink`, `post.ideaId`, `post.isCustomScheduled`, `post.metadata.__typename`, `post.metadata.firstComment`, `post.metadata.isAiGenerated`, `post.metadata.link`, `post.metadata.shouldShareToFeed`, `post.metadata.type`, `post.metadata.title`, `post.metadata.threadCount`, `post.metadata.url`, `post.metadata.details.__typename`, `post.metadata.details.button`, `post.metadata.details.link`, `post.metadata.details.code`, `post.metadata.details.endDate`, `post.metadata.details.startDate`, `post.metadata.details.terms`, `post.metadata.details.title`, `post.metadata.details.endTime`, `post.metadata.details.isFullDayEvent`, `post.metadata.details.startTime`, `post.metadata.embeddable`, `post.metadata.license`, `post.metadata.madeForKids`, `post.metadata.notifySubscribers`, `post.metadata.privacy`, `post.metadata.spoilerText`, `post.metadata.locationId`, `post.metadata.locationName`, `post.metadata.topic`, `post.metrics.description`, `post.metrics.name`, `post.metrics.type`, `post.metrics.unit`, `post.metrics.value`, `post.metricsUpdatedAt`, `post.notes.id`, `post.notes.allowedActions`, `post.notes.text`, `post.notes.type`, `post.notes.createdAt`, `post.notes.updatedAt`, `post.notificationStatus`, `post.schedulingType`, `post.sentAt`, `post.sharedNow`, `post.shareMode`, `post.status`, `post.tags.id`, `post.tags.color`, `post.tags.colorName`, `post.tags.isLocked`, `post.tags.name`, `post.text`, `post.via`, `post.createdAt`, `post.updatedAt`, `message`. Inspect get_operation_schema for every selectable path.

#### get_post

`buffer-cli get-post`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body and guard rules apply | string | The ID of the post to be retrieved |
| `payload` | No; body and guard rules apply | object | Complete native input object instead of individual input fields. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON input file, no symlink, at most 1 MiB; cannot mix with payload or individual input fields. minLength: `1`. |
| `fields` | No; body and guard rules apply | array | Upstream field paths relative to the result, as in official CLI --fields. Default fields are bounded. Use items.id for connection nodes; pageInfo.endCursor for cursors. minItems: `1`. maxItems: `100`. Items: string. |
| `account` | No; body and guard rules apply | string | Private account profile name. Selects credentials only; an organization default does not restrict provider token permissions. minLength: `1`. |

Native input requirements: `id`. Use individual fields or complete payload/payload_file.

Default upstream fields: `id`, `text`, `status`, `channel.name`, `channel.id`, `createdAt`. Inspect get_operation_schema for every selectable path.

#### get_posts

`buffer-cli get-posts`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `filter` | No; body and guard rules apply | object | See the full input schema. |
| `organizationId` | No; body and guard rules apply | string | The Organization id to fetch posts for |
| `sort` | No; body and guard rules apply | array | The sort to apply to the posts results Items: object. |
| `payload` | No; body and guard rules apply | object | Complete native input object instead of individual input fields. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON input file, no symlink, at most 1 MiB; cannot mix with payload or individual input fields. minLength: `1`. |
| `fields` | No; body and guard rules apply | array | Upstream field paths relative to the result, as in official CLI --fields. Default fields are bounded. Use items.id for connection nodes; pageInfo.endCursor for cursors. minItems: `1`. maxItems: `100`. Items: string. |
| `account` | No; body and guard rules apply | string | Private account profile name. Selects credentials only; an organization default does not restrict provider token permissions. minLength: `1`. |
| `first` | No; body and guard rules apply | integer | Local page-size cap 100, default 25; provider may impose additional query limits. minimum: `1`. maximum: `100`. |
| `after` | No; body and guard rules apply | string | Opaque cursor from pageInfo.endCursor. One page per ordinary call. maxLength: `8192`. |

Native input requirements: `organizationId`. Use individual fields or complete payload/payload_file.

Default upstream fields: `items.id`, `items.text`, `items.status`, `pageInfo`. Inspect get_operation_schema for every selectable path.

#### get_post_template

`buffer-cli get-post-template`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body and guard rules apply | string | The unique identifier of the template to fetch. |
| `payload` | No; body and guard rules apply | object | Complete native input object instead of individual input fields. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON input file, no symlink, at most 1 MiB; cannot mix with payload or individual input fields. minLength: `1`. |
| `fields` | No; body and guard rules apply | array | Upstream field paths relative to the result, as in official CLI --fields. Default fields are bounded. Use items.id for connection nodes; pageInfo.endCursor for cursors. minItems: `1`. maxItems: `100`. Items: string. |
| `account` | No; body and guard rules apply | string | Private account profile name. Selects credentials only; an organization default does not restrict provider token permissions. minLength: `1`. |

Native input requirements: `id`. Use individual fields or complete payload/payload_file.

Default upstream fields: `id`, `body`, `description`, `emoji`, `organizationId`, `title`, `visibility`, `createdAt`, `updatedAt`. Inspect get_operation_schema for every selectable path.

#### get_post_templates

`buffer-cli get-post-templates`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `filter` | No; body and guard rules apply | object | See the full input schema. |
| `organizationId` | No; body and guard rules apply | string | Organization to scope `internal`-visibility templates to. The caller must be a member of this organization. |
| `payload` | No; body and guard rules apply | object | Complete native input object instead of individual input fields. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON input file, no symlink, at most 1 MiB; cannot mix with payload or individual input fields. minLength: `1`. |
| `fields` | No; body and guard rules apply | array | Upstream field paths relative to the result, as in official CLI --fields. Default fields are bounded. Use items.id for connection nodes; pageInfo.endCursor for cursors. minItems: `1`. maxItems: `100`. Items: string. |
| `account` | No; body and guard rules apply | string | Private account profile name. Selects credentials only; an organization default does not restrict provider token permissions. minLength: `1`. |
| `first` | No; body and guard rules apply | integer | Local page-size cap 100, default 25; provider may impose additional query limits. minimum: `1`. maximum: `100`. |
| `after` | No; body and guard rules apply | string | Opaque cursor from pageInfo.endCursor. One page per ordinary call. maxLength: `8192`. |

Native input requirements: `organizationId`. Use individual fields or complete payload/payload_file.

Default upstream fields: `items.id`, `items.body`, `items.description`, `items.emoji`, `items.organizationId`, `items.title`, `items.visibility`, `items.createdAt`, `items.updatedAt`, `pageInfo.endCursor`, `pageInfo.hasNextPage`, `pageInfo.hasPreviousPage`, `pageInfo.startCursor`. Inspect get_operation_schema for every selectable path.

#### promote_content_item_draft_to_posts

`buffer-cli promote-content-item-draft-to-posts`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body and guard rules apply | string | The content item to promote. |
| `posts` | No; body and guard rules apply | array | The channel-specific posts to create, one per channel. Provide at least one post, and at most one post per channel. Items: object. |
| `tagIds` | No; body and guard rules apply | array | Tags to apply to this content item. Omit to keep the current tags. An empty list or null removes them all. Items: string. |
| `payload` | No; body and guard rules apply | object | Complete native input object instead of individual input fields. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON input file, no symlink, at most 1 MiB; cannot mix with payload or individual input fields. minLength: `1`. |
| `fields` | No; body and guard rules apply | array | Upstream field paths relative to the result, as in official CLI --fields. Default fields are bounded. Use items.id for connection nodes; pageInfo.endCursor for cursors. minItems: `1`. maxItems: `100`. Items: string. |
| `account` | No; body and guard rules apply | string | Private account profile name. Selects credentials only; an organization default does not restrict provider token permissions. minLength: `1`. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for this exact user-requested Buffer mutation. |

Native input requirements: `id`, `posts`. Use individual fields or complete payload/payload_file.

Default upstream fields: `__typename`, `contentItem.id`, `contentItem.accountId`, `contentItem.allowedActions`, `contentItem.author.id`, `contentItem.author.avatar`, `contentItem.author.email`, `contentItem.author.isDeleted`, `contentItem.author.name`, `contentItem.author.urn`, `contentItem.body.__typename`, `contentItem.body.id`, `contentItem.body.aiAssisted`, `contentItem.body.assets.__typename`, `contentItem.body.assets.id`, `contentItem.body.assets.mimeType`, `contentItem.body.assets.source`, `contentItem.body.assets.thumbnail`, `contentItem.body.assets.type`, `contentItem.body.text`, `contentItem.organizationId`, `contentItem.tags.id`, `contentItem.tags.color`, `contentItem.tags.colorName`, `contentItem.tags.isLocked`, `contentItem.tags.name`, `contentItem.targetDate`, `contentItem.title`, `contentItem.createdAt`, `errors.__typename`, `errors.message`, `errors.channelId`, `message`. Inspect get_operation_schema for every selectable path.

#### remove_post_from_content_item

`buffer-cli remove-post-from-content-item`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body and guard rules apply | string | The content item to remove the post from. |
| `postId` | No; body and guard rules apply | string | The post to remove from a content item. |
| `payload` | No; body and guard rules apply | object | Complete native input object instead of individual input fields. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON input file, no symlink, at most 1 MiB; cannot mix with payload or individual input fields. minLength: `1`. |
| `fields` | No; body and guard rules apply | array | Upstream field paths relative to the result, as in official CLI --fields. Default fields are bounded. Use items.id for connection nodes; pageInfo.endCursor for cursors. minItems: `1`. maxItems: `100`. Items: string. |
| `account` | No; body and guard rules apply | string | Private account profile name. Selects credentials only; an organization default does not restrict provider token permissions. minLength: `1`. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for this exact user-requested Buffer mutation. |

Native input requirements: `id`, `postId`. Use individual fields or complete payload/payload_file.

Default upstream fields: `__typename`, `contentItem.id`, `contentItem.accountId`, `contentItem.allowedActions`, `contentItem.author.id`, `contentItem.author.avatar`, `contentItem.author.email`, `contentItem.author.isDeleted`, `contentItem.author.name`, `contentItem.author.urn`, `contentItem.body.__typename`, `contentItem.body.id`, `contentItem.body.aiAssisted`, `contentItem.body.assets.__typename`, `contentItem.body.assets.id`, `contentItem.body.assets.mimeType`, `contentItem.body.assets.source`, `contentItem.body.assets.thumbnail`, `contentItem.body.assets.type`, `contentItem.body.text`, `contentItem.organizationId`, `contentItem.tags.id`, `contentItem.tags.color`, `contentItem.tags.colorName`, `contentItem.tags.isLocked`, `contentItem.tags.name`, `contentItem.targetDate`, `contentItem.title`, `contentItem.createdAt`, `post.id`, `post.allowedActions`, `post.assets.__typename`, `post.assets.id`, `post.assets.mimeType`, `post.assets.source`, `post.assets.thumbnail`, `post.assets.type`, `post.author.id`, `post.author.avatar`, `post.author.email`, `post.author.isDeleted`, `post.author.name`, `post.author.urn`, `post.channel.id`, `post.channel.allowedActions`, `post.channel.avatar`, `post.channel.descriptor`, `post.channel.displayName`, `post.channel.externalLink`, `post.channel.hasActiveMemberDevice`, `post.channel.isDisconnected`, `post.channel.isLocked`, `post.channel.isNew`, `post.channel.isQueuePaused`, `post.channel.metadata.__typename`, `post.channel.metadata.defaultToReminders`, `post.channel.metadata.maxCharacters`, `post.channel.metadata.serverUrl`, `post.channel.metadata.subscriptionType`, `post.channel.metadata.shouldShowLinkedinAnalyticsRefreshBanner`, `post.channel.metadata.businessPortfolioId`, `post.channel.metadata.lastSubscribedAt`, `post.channel.metadata.phoneNumberId`, `post.channel.metadata.wabaId`, `post.channel.name`, `post.channel.organizationId`, `post.channel.products`, `post.channel.scopes`, `post.channel.service`, `post.channel.serviceId`, `post.channel.showTrendingTopicSuggestions`, `post.channel.timezone`, `post.channel.type`, `post.channel.createdAt`, `post.channel.updatedAt`, `post.channelId`, `post.channelService`, `post.contentItemId`, `post.dueAt`, `post.error.message`, `post.error.rawError`, `post.error.supportUrl`, `post.externalLink`, `post.ideaId`, `post.isCustomScheduled`, `post.metadata.__typename`, `post.metadata.firstComment`, `post.metadata.isAiGenerated`, `post.metadata.link`, `post.metadata.shouldShareToFeed`, `post.metadata.type`, `post.metadata.title`, `post.metadata.threadCount`, `post.metadata.url`, `post.metadata.details.__typename`, `post.metadata.details.button`, `post.metadata.details.link`, `post.metadata.details.code`, `post.metadata.details.endDate`, `post.metadata.details.startDate`, `post.metadata.details.terms`, `post.metadata.details.title`, `post.metadata.details.endTime`, `post.metadata.details.isFullDayEvent`, `post.metadata.details.startTime`, `post.metadata.embeddable`, `post.metadata.license`, `post.metadata.madeForKids`, `post.metadata.notifySubscribers`, `post.metadata.privacy`, `post.metadata.spoilerText`, `post.metadata.locationId`, `post.metadata.locationName`, `post.metadata.topic`, `post.metrics.description`, `post.metrics.name`, `post.metrics.type`, `post.metrics.unit`, `post.metrics.value`, `post.metricsUpdatedAt`, `post.notes.id`, `post.notes.allowedActions`, `post.notes.text`, `post.notes.type`, `post.notes.createdAt`, `post.notes.updatedAt`, `post.notificationStatus`, `post.schedulingType`, `post.sentAt`, `post.sharedNow`, `post.shareMode`, `post.status`, `post.tags.id`, `post.tags.color`, `post.tags.colorName`, `post.tags.isLocked`, `post.tags.name`, `post.text`, `post.via`, `post.createdAt`, `post.updatedAt`, `message`. Inspect get_operation_schema for every selectable path.

#### get_search_instagram_audio

`buffer-cli get-search-instagram-audio`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `audioType` | No; body and guard rules apply | string | Music or original sound catalog Values: `music`, `originalSound`. |
| `channelId` | No; body and guard rules apply | string | Instagram channel to search audio for |
| `query` | No; body and guard rules apply | string | Search text. Required. Use trendingInstagramAudio for trending results. |
| `payload` | No; body and guard rules apply | object | Complete native input object instead of individual input fields. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON input file, no symlink, at most 1 MiB; cannot mix with payload or individual input fields. minLength: `1`. |
| `fields` | No; body and guard rules apply | array | Upstream field paths relative to the result, as in official CLI --fields. Default fields are bounded. Use items.id for connection nodes; pageInfo.endCursor for cursors. minItems: `1`. maxItems: `100`. Items: string. |
| `account` | No; body and guard rules apply | string | Private account profile name. Selects credentials only; an organization default does not restrict provider token permissions. minLength: `1`. |

Native input requirements: `audioType`, `channelId`, `query`. Use individual fields or complete payload/payload_file.

Default upstream fields: `__typename`, `audio.id`, `audio.coverArtworkUrl`, `audio.creatorUsername`, `audio.displayArtist`, `audio.duration`, `audio.previewUrl`, `audio.title`, `audio.type`, `channelIds`, `message`. Inspect get_operation_schema for every selectable path.

#### get_tag

`buffer-cli get-tag`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body and guard rules apply | string | The unique identifier of the tag to fetch. |
| `payload` | No; body and guard rules apply | object | Complete native input object instead of individual input fields. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON input file, no symlink, at most 1 MiB; cannot mix with payload or individual input fields. minLength: `1`. |
| `fields` | No; body and guard rules apply | array | Upstream field paths relative to the result, as in official CLI --fields. Default fields are bounded. Use items.id for connection nodes; pageInfo.endCursor for cursors. minItems: `1`. maxItems: `100`. Items: string. |
| `account` | No; body and guard rules apply | string | Private account profile name. Selects credentials only; an organization default does not restrict provider token permissions. minLength: `1`. |

Native input requirements: `id`. Use individual fields or complete payload/payload_file.

Default upstream fields: `id`, `color`, `colorName`, `isLocked`, `name`. Inspect get_operation_schema for every selectable path.

#### get_tags_v2

`buffer-cli get-tags-v2`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `filter` | No; body and guard rules apply | object | See the full input schema. |
| `organizationId` | No; body and guard rules apply | string | Organization to list tags for. The caller must be a member of this organization. |
| `payload` | No; body and guard rules apply | object | Complete native input object instead of individual input fields. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON input file, no symlink, at most 1 MiB; cannot mix with payload or individual input fields. minLength: `1`. |
| `fields` | No; body and guard rules apply | array | Upstream field paths relative to the result, as in official CLI --fields. Default fields are bounded. Use items.id for connection nodes; pageInfo.endCursor for cursors. minItems: `1`. maxItems: `100`. Items: string. |
| `account` | No; body and guard rules apply | string | Private account profile name. Selects credentials only; an organization default does not restrict provider token permissions. minLength: `1`. |
| `first` | No; body and guard rules apply | integer | Local page-size cap 100, default 25; provider may impose additional query limits. minimum: `1`. maximum: `100`. |
| `after` | No; body and guard rules apply | string | Opaque cursor from pageInfo.endCursor. One page per ordinary call. maxLength: `8192`. |

Native input requirements: `organizationId`. Use individual fields or complete payload/payload_file.

Default upstream fields: `items.id`, `items.color`, `items.colorName`, `items.isLocked`, `items.name`, `pageInfo.endCursor`, `pageInfo.hasNextPage`, `pageInfo.hasPreviousPage`, `pageInfo.startCursor`. Inspect get_operation_schema for every selectable path.

#### get_trending_instagram_audio

`buffer-cli get-trending-instagram-audio`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `audioType` | No; body and guard rules apply | string | Music or original sound catalog Values: `music`, `originalSound`. |
| `channelId` | No; body and guard rules apply | string | Instagram channel to load trending audio for |
| `payload` | No; body and guard rules apply | object | Complete native input object instead of individual input fields. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON input file, no symlink, at most 1 MiB; cannot mix with payload or individual input fields. minLength: `1`. |
| `fields` | No; body and guard rules apply | array | Upstream field paths relative to the result, as in official CLI --fields. Default fields are bounded. Use items.id for connection nodes; pageInfo.endCursor for cursors. minItems: `1`. maxItems: `100`. Items: string. |
| `account` | No; body and guard rules apply | string | Private account profile name. Selects credentials only; an organization default does not restrict provider token permissions. minLength: `1`. |

Native input requirements: `audioType`, `channelId`. Use individual fields or complete payload/payload_file.

Default upstream fields: `__typename`, `audio.id`, `audio.coverArtworkUrl`, `audio.creatorUsername`, `audio.displayArtist`, `audio.duration`, `audio.previewUrl`, `audio.title`, `audio.type`, `channelIds`, `message`. Inspect get_operation_schema for every selectable path.

#### update_content_item

`buffer-cli update-content-item`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body and guard rules apply | string | The content item to update. |
| `targetDate` | No; body and guard rules apply | string | Omit to preserve the existing target date. Null clears it. |
| `title` | No; body and guard rules apply | string | Omit to preserve the existing title. Null clears it. |
| `payload` | No; body and guard rules apply | object | Complete native input object instead of individual input fields. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON input file, no symlink, at most 1 MiB; cannot mix with payload or individual input fields. minLength: `1`. |
| `fields` | No; body and guard rules apply | array | Upstream field paths relative to the result, as in official CLI --fields. Default fields are bounded. Use items.id for connection nodes; pageInfo.endCursor for cursors. minItems: `1`. maxItems: `100`. Items: string. |
| `account` | No; body and guard rules apply | string | Private account profile name. Selects credentials only; an organization default does not restrict provider token permissions. minLength: `1`. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for this exact user-requested Buffer mutation. |

Native input requirements: `id`. Use individual fields or complete payload/payload_file.

Default upstream fields: `__typename`, `contentItem.id`, `contentItem.accountId`, `contentItem.allowedActions`, `contentItem.author.id`, `contentItem.author.avatar`, `contentItem.author.email`, `contentItem.author.isDeleted`, `contentItem.author.name`, `contentItem.author.urn`, `contentItem.body.__typename`, `contentItem.body.id`, `contentItem.body.aiAssisted`, `contentItem.body.assets.__typename`, `contentItem.body.assets.id`, `contentItem.body.assets.mimeType`, `contentItem.body.assets.source`, `contentItem.body.assets.thumbnail`, `contentItem.body.assets.type`, `contentItem.body.text`, `contentItem.organizationId`, `contentItem.tags.id`, `contentItem.tags.color`, `contentItem.tags.colorName`, `contentItem.tags.isLocked`, `contentItem.tags.name`, `contentItem.targetDate`, `contentItem.title`, `contentItem.createdAt`, `errors.message`, `message`. Inspect get_operation_schema for every selectable path.

#### update_content_item_draft

`buffer-cli update-content-item-draft`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body and guard rules apply | string | The content item whose channel-less draft is replaced. |
| `draft` | No; body and guard rules apply | object | See the full input schema. |
| `tagIds` | No; body and guard rules apply | array | Tags to apply to this content item. Omit to keep the current tags. An empty list or null removes them all. Items: string. |
| `targetDate` | No; body and guard rules apply | string | Date indicating when this piece of content should go out. This is a planning aid only and does not schedule any posts. Omit to preserve the existing target date. Null clears it. |
| `payload` | No; body and guard rules apply | object | Complete native input object instead of individual input fields. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON input file, no symlink, at most 1 MiB; cannot mix with payload or individual input fields. minLength: `1`. |
| `fields` | No; body and guard rules apply | array | Upstream field paths relative to the result, as in official CLI --fields. Default fields are bounded. Use items.id for connection nodes; pageInfo.endCursor for cursors. minItems: `1`. maxItems: `100`. Items: string. |
| `account` | No; body and guard rules apply | string | Private account profile name. Selects credentials only; an organization default does not restrict provider token permissions. minLength: `1`. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for this exact user-requested Buffer mutation. |

Native input requirements: `id`, `draft`. Use individual fields or complete payload/payload_file.

Default upstream fields: `__typename`, `contentItem.id`, `contentItem.accountId`, `contentItem.allowedActions`, `contentItem.author.id`, `contentItem.author.avatar`, `contentItem.author.email`, `contentItem.author.isDeleted`, `contentItem.author.name`, `contentItem.author.urn`, `contentItem.body.__typename`, `contentItem.body.id`, `contentItem.body.aiAssisted`, `contentItem.body.assets.__typename`, `contentItem.body.assets.id`, `contentItem.body.assets.mimeType`, `contentItem.body.assets.source`, `contentItem.body.assets.thumbnail`, `contentItem.body.assets.type`, `contentItem.body.text`, `contentItem.organizationId`, `contentItem.tags.id`, `contentItem.tags.color`, `contentItem.tags.colorName`, `contentItem.tags.isLocked`, `contentItem.tags.name`, `contentItem.targetDate`, `contentItem.title`, `contentItem.createdAt`, `errors.__typename`, `errors.message`, `message`. Inspect get_operation_schema for every selectable path.

#### update_post_template

`buffer-cli update-post-template`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body and guard rules apply | string | The ID of the template to update. |
| `body` | No; body and guard rules apply | string | The main content body of the template, may contain {{placeholders}}. |
| `description` | No; body and guard rules apply | string | A short user-facing description of the template. |
| `emoji` | No; body and guard rules apply | string | The emoji associated with the template. |
| `title` | No; body and guard rules apply | string | The title of the template. |
| `visibility` | No; body and guard rules apply | string | `public` is rejected — it is only available to official Buffer clients. Values: `internal`, `private`, `public`. |
| `payload` | No; body and guard rules apply | object | Complete native input object instead of individual input fields. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON input file, no symlink, at most 1 MiB; cannot mix with payload or individual input fields. minLength: `1`. |
| `fields` | No; body and guard rules apply | array | Upstream field paths relative to the result, as in official CLI --fields. Default fields are bounded. Use items.id for connection nodes; pageInfo.endCursor for cursors. minItems: `1`. maxItems: `100`. Items: string. |
| `account` | No; body and guard rules apply | string | Private account profile name. Selects credentials only; an organization default does not restrict provider token permissions. minLength: `1`. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for this exact user-requested Buffer mutation. |

Native input requirements: `id`. Use individual fields or complete payload/payload_file.

Default upstream fields: `__typename`, `postTemplate.id`, `postTemplate.body`, `postTemplate.description`, `postTemplate.emoji`, `postTemplate.organizationId`, `postTemplate.title`, `postTemplate.visibility`, `postTemplate.createdAt`, `postTemplate.updatedAt`, `message`. Inspect get_operation_schema for every selectable path.

#### list_accounts

`buffer-cli list-accounts`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| None | No | None | No arguments |

#### graphql_query

`buffer-cli graphql-query`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `document` | Yes | string | See the full input schema. minLength: `1`. maxLength: `65536`. |
| `variables` | No; body and guard rules apply | object | Native JSON variables; validated remotely by Buffer. |
| `account` | No; body and guard rules apply | string | Private account profile name. Selects credentials only; an organization default does not restrict provider token permissions. minLength: `1`. |

#### graphql_mutation

`buffer-cli graphql-mutation`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `document` | Yes | string | See the full input schema. minLength: `1`. maxLength: `65536`. |
| `variables` | No; body and guard rules apply | object | Native JSON variables; validated remotely by Buffer. |
| `account` | No; body and guard rules apply | string | Private account profile name. Selects credentials only; an organization default does not restrict provider token permissions. minLength: `1`. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for this exact user-requested Buffer mutation. |

#### preview_operation

`buffer-cli preview-operation`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `operation` | Yes | string | See the full input schema. Values: `account`, `addPostToContentItem`, `aggregatedPostMetrics`, `channel`, `channels`, `configuration`, `contentItem`, `contentItems`, `createContentItem`, `createContentItemDraft`, `createIdea`, `createPost`, `createPostTemplate`, `dailyPostingLimits`, `deleteContentItem`, `deletePost`, `deletePostTemplate`, `editPost`, `ideaGroups`, `ideas`, `instagramAudio`, `movePostInQueue`, `post`, `posts`, `postTemplate`, `postTemplates`, `promoteContentItemDraftToPosts`, `removePostFromContentItem`, `searchInstagramAudio`, `tag`, `tagsV2`, `trendingInstagramAudio`, `updateContentItem`, `updateContentItemDraft`, `updatePostTemplate`. |
| `arguments` | Yes | object | Arguments for that named tool. Provide all required native input, including organizationId; profile defaults are not read. |

#### query_pages

`buffer-cli query-pages`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `operation` | Yes | string | See the full input schema. Values: `contentItems`, `ideas`, `posts`, `postTemplates`, `tagsV2`. |
| `arguments` | Yes | object | Arguments for the native read tool, including filters, fields, first/after and account. |
| `max_pages` | No; body and guard rules apply | integer | See the full input schema. minimum: `1`. maximum: `5`. default: `1`. |

#### get_operation_schema

`buffer-cli get-operation-schema`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `operation` | Yes | string | See the full input schema. Values: `account`, `addPostToContentItem`, `aggregatedPostMetrics`, `channel`, `channels`, `configuration`, `contentItem`, `contentItems`, `createContentItem`, `createContentItemDraft`, `createIdea`, `createPost`, `createPostTemplate`, `dailyPostingLimits`, `deleteContentItem`, `deletePost`, `deletePostTemplate`, `editPost`, `ideaGroups`, `ideas`, `instagramAudio`, `movePostInQueue`, `post`, `posts`, `postTemplate`, `postTemplates`, `promoteContentItemDraftToPosts`, `removePostFromContentItem`, `searchInstagramAudio`, `tag`, `tagsV2`, `trendingInstagramAudio`, `updateContentItem`, `updateContentItemDraft`, `updatePostTemplate`. |

### Nested native input definitions

These tables preserve the current nested object/array structures, required fields, enums and constraints. Repeated identical shapes are shown once; full inline schema remains available for each command.

##### addPostToContentItem.input

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | Yes | string | The content item to add the post to. |
| `postId` | Yes | string | The post to add. The post must already exist. The post and the content item must belong to the same organization. |

##### aggregatedPostMetrics.input

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `channelIds` | No; body and guard rules apply | array | Optional list of channel IDs to filter by. When omitted (null), the aggregate spans every channel in the organization the actor has insights access to. When set to an empty array, no channels match and the result is empty. Items: string. |
| `endDateTime` | Yes | string | End of the aggregation window. Consumers typically pass UTC midnight of the last calendar day in the window (the backend treats the range as inclusive of that day), for example `2026-01-31T00:00:00Z`. Date range is capped to 365 days. |
| `organizationId` | Yes | string | The organization ID |
| `startDateTime` | Yes | string | Start of the aggregation window. Consumers typically pass UTC midnight of the first calendar day in the window, for example `2026-01-01T00:00:00Z`. |
| `tags` | No; body and guard rules apply | object | See the full input schema. |

##### aggregatedPostMetrics.input.tags

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `in` | Yes | array | Include results that have any of the specified tags (union/OR). Items: string. |
| `isEmpty` | No; body and guard rules apply | boolean | When true, include results that have no tags assigned. Can be combined with 'in' for union filtering. Defaults to false if not specified. |

##### channel.input

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | Yes | string | The ID of the channel to be retrieved |

##### channels.input

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `filter` | No; body and guard rules apply | object | See the full input schema. |
| `organizationId` | Yes | string | The Organization id to fetch channels for |

##### channels.input.filter

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `isLocked` | No; body and guard rules apply | boolean | If not defined, it returns all channels Else,   if true, it only returns locked channels   if false, it only returns not locked channels |
| `product` | No; body and guard rules apply | string | If not passed, it return all channels Else, it filters the channels based on what the product supports. Values: `analyze`, `buffer`, `comments`, `engage`, `publish`, `startPage`. |

##### configuration.input

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `organizationId` | Yes | string | The organization to return configuration for. |

##### contentItem.input

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | Yes | string | The unique identifier of the content item to fetch. |

##### contentItems.input

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `filter` | No; body and guard rules apply | object | See the full input schema. |
| `organizationId` | Yes | string | Organization to list content items for. The caller must be a member of this organization. |
| `sort` | No; body and guard rules apply | array | Sorting to apply, each entry breaking ties in the one before it. Defaults to newest first. A pagination cursor is only valid for the sort that produced it, so reset `after` to null whenever the sort changes. Items: object. |

##### contentItems.input.filter

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `contentStatus` | No; body and guard rules apply | string | Only return content items with this content status. When omitted, content items in every status are returned. Values: `draftContent`, `postContent`. |
| `tags` | No; body and guard rules apply | object | See the full input schema. |
| `targetDate` | No; body and guard rules apply | object | See the full input schema. |

##### contentItems.input.filter.targetDate

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `presence` | No; body and guard rules apply | string | Only return content items by whether a target date is set: `present` returns only dated items, `absent` only undated ones. Values: `absent`, `present`. |
| `range` | No; body and guard rules apply | object | See the full input schema. |

##### contentItems.input.filter.targetDate.range

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `end` | No; body and guard rules apply | string | Include results with dates equal to or before the specified date |
| `start` | No; body and guard rules apply | string | Include results with dates equal to or after the specified date |

##### contentItems.input.sort[]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `direction` | Yes | string | The direction to sort by. Values: `asc`, `desc`. |
| `field` | Yes | string | The field to sort by. Values: `targetDate`, `createdAt`. |

##### createContentItem.input

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `organizationId` | Yes | string | Organization that owns the content item and all variants created in it. |
| `posts` | Yes | array | The channel-specific post variants to create, one per channel. Provide at least one variant, and at most one variant per channel. Items: object. |
| `tagIds` | No; body and guard rules apply | array | Tags to apply to this content item. Omit to create it with no tags. Items: string. |
| `targetDate` | No; body and guard rules apply | string | Optional date indicating when this piece of content should go out. This is a planning aid only and does not schedule any posts. |
| `title` | No; body and guard rules apply | string | Optional title describing what this piece of content is about. |

##### createContentItem.input.posts[]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `aiAssisted` | No; body and guard rules apply | boolean | If this post was created with the help of AI |
| `assets` | No; body and guard rules apply | array | Ordered list of assets on this post. Items: object. |
| `channelId` | Yes | string | Channel's Id for which we want to create the post |
| `draftId` | No; body and guard rules apply | string | Is set when the Post is generated from a Draft |
| `dueAt` | No; body and guard rules apply | string | Date when the post is scheduled to be published |
| `ideaId` | No; body and guard rules apply | string | Is set when the Post is generated from an Idea |
| `metadata` | No; body and guard rules apply | object | See the full input schema. |
| `mode` | Yes | string | How the post is being scheduled. Values: `addToQueue`, `customScheduled`, `shareNext`, `shareNow`. |
| `needsApproval` | No; body and guard rules apply | boolean | Submit the post for approval instead of scheduling it. A post submitted for approval is always a draft, so this conflicts with turning `saveToDraft` off.  Only valid when your posting policy on the target channel requires approval. |
| `saveToDraft` | No; body and guard rules apply | boolean | If true, saves the post as a draft instead of scheduling it. When saving as draft: - Post status will be 'draft' instead of 'buffer' - Posting limits are not checked - The post will not be published until explicitly scheduled |
| `schedulingType` | Yes | string | Scheduling type to indicate notification publishing or automatic publishing Values: `automatic`, `notification`. |
| `source` | No; body and guard rules apply | string | source where the composer was initiated from, used for tracking. |
| `tagIds` | No; body and guard rules apply | array | List of tag IDs Items: string. |
| `text` | No; body and guard rules apply | string | Text content of the Post.  Note: for threaded posts, this needs to match the first item in the `thread` array. |

##### createContentItem.input.posts[].assets[]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `document` | No; body and guard rules apply | object | See the full input schema. |
| `image` | No; body and guard rules apply | object | See the full input schema. |
| `link` | No; body and guard rules apply | object | See the full input schema. |
| `video` | No; body and guard rules apply | object | See the full input schema. |

##### createContentItem.input.posts[].assets[].document

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `thumbnailUrl` | Yes | string | Document thumbnail URL |
| `title` | Yes | string | Document title |
| `url` | Yes | string | Document URL |

##### createContentItem.input.posts[].assets[].image

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `metadata` | No; body and guard rules apply | object | See the full input schema. |
| `thumbnailUrl` | No; body and guard rules apply | string | URL to the static thumbnail of the asset |
| `url` | Yes | string | URL to the file source |

##### createContentItem.input.posts[].assets[].image.metadata

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `altText` | Yes | string | Alternative text for accessibility |
| `animatedThumbnail` | No; body and guard rules apply | string | Animated thumbnail URL |
| `dimensions` | No; body and guard rules apply | object | See the full input schema. |
| `userTags` | No; body and guard rules apply | array | Accounts to tag at specific points on the image. Each tag's x/y position uses normalized 0.0-1.0 coordinates - see UserTagInput. Items: object. |

##### createContentItem.input.posts[].assets[].image.metadata.dimensions

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `height` | Yes | integer | Image height in pixels |
| `width` | Yes | integer | Image width in pixels |

##### createContentItem.input.posts[].assets[].image.metadata.userTags[]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `handle` | Yes | string | The handle (username) of the account to tag, without the leading @. |
| `x` | Yes | number | Horizontal position of the tag as a normalized decimal float between 0.0 and 1.0 - the fraction of the image width from the left edge (0.5 is the horizontal center). Pass a number, not a string, and do not use pixel coordinates; to convert, divide the pixel X by the image width. |
| `y` | Yes | number | Vertical position of the tag as a normalized decimal float between 0.0 and 1.0 - the fraction of the image height from the top edge (0.5 is the vertical center). Pass a number, not a string, and do not use pixel coordinates; to convert, divide the pixel Y by the image height. |

##### createContentItem.input.posts[].assets[].link

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `description` | No; body and guard rules apply | string | Description of the link |
| `thumbnailUrl` | No; body and guard rules apply | string | Thumbnail URL of the link |
| `title` | No; body and guard rules apply | string | Title of the link |
| `url` | Yes | string | URL to the link |

##### createContentItem.input.posts[].assets[].video

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `metadata` | No; body and guard rules apply | object | See the full input schema. |
| `thumbnailUrl` | No; body and guard rules apply | string | Do not use: social networks do not accept custom video thumbnail images, and the API rejects video assets that set this field. To choose the video thumbnail, set `metadata.thumbnailOffset` to select a frame from the video (supported for Instagram, TikTok, and Pinterest only). |
| `url` | Yes | string | URL to the file source |

##### createContentItem.input.posts[].assets[].video.metadata

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `thumbnailOffset` | No; body and guard rules apply | integer | Offset of the thumbnail chosen for the video, in ms |
| `title` | No; body and guard rules apply | string | Video title |

##### createContentItem.input.posts[].metadata

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `bluesky` | No; body and guard rules apply | object | See the full input schema. |
| `facebook` | No; body and guard rules apply | object | See the full input schema. |
| `google` | No; body and guard rules apply | object | See the full input schema. |
| `instagram` | No; body and guard rules apply | object | See the full input schema. |
| `linkedin` | No; body and guard rules apply | object | See the full input schema. |
| `mastodon` | No; body and guard rules apply | object | See the full input schema. |
| `pinterest` | No; body and guard rules apply | object | See the full input schema. |
| `substack` | No; body and guard rules apply | object | See the full input schema. |
| `threads` | No; body and guard rules apply | object | See the full input schema. |
| `tiktok` | No; body and guard rules apply | object | See the full input schema. |
| `twitter` | No; body and guard rules apply | object | See the full input schema. |
| `youtube` | No; body and guard rules apply | object | See the full input schema. |

##### createContentItem.input.posts[].metadata.bluesky

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `linkAttachment` | No; body and guard rules apply | object | See the full input schema. |
| `thread` | No; body and guard rules apply | array | The ordered list of posts that make up the thread (not paginated). This array is the source of truth for what gets published: every post in the thread, including the root post, must be provided here. Posts are published in order, each replying to the previous one. The first item is the root post and should match the top-level `text` on the post input. Items: object. |

##### createContentItem.input.posts[].metadata.bluesky.linkAttachment

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `description` | No; body and guard rules apply | string | Description shown on the link card |
| `thumbnail` | No; body and guard rules apply | object | See the full input schema. |
| `title` | No; body and guard rules apply | string | Title shown on the link card |
| `url` | Yes | string | URL that the link asset has been built from |

##### createContentItem.input.posts[].metadata.bluesky.linkAttachment.thumbnail

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | URL of the thumbnail image |

##### createContentItem.input.posts[].metadata.bluesky.thread[]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `assets` | No; body and guard rules apply | array | Ordered list of assets on this threaded post Items: object. |
| `metadata` | No; body and guard rules apply | object | See the full input schema. |
| `text` | No; body and guard rules apply | string | The text body content of the threaded post |

##### createContentItem.input.posts[].metadata.facebook

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `annotations` | No; body and guard rules apply | array | Annotations representing entities in the text Items: object. |
| `firstComment` | No; body and guard rules apply | string | Facebook post's first comment |
| `linkAttachment` | No; body and guard rules apply | object | See the full input schema. |
| `type` | Yes | string | The channel-specific type of the post, eg, post, story, reel for Facebook Values: `post`, `reel`, `story`. |

##### createContentItem.input.posts[].metadata.facebook.annotations[]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `content` | Yes | string | The content of the annotation, e.g. '107509875938399' |
| `indices` | Yes | array | The indices of the annotation in the text, e.g. [6, 9] (from 6 to 9 characters in the text) Items: integer. |
| `text` | Yes | string | The text representation of the annotation, eg 'Buffer' |
| `url` | Yes | string | The URL the annotation points to, e.g. https://www.facebook.com/107509875938399 |

##### createContentItem.input.posts[].metadata.google

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `detailsEvent` | No; body and guard rules apply | object | See the full input schema. |
| `detailsOffer` | No; body and guard rules apply | object | See the full input schema. |
| `detailsWhatsNew` | No; body and guard rules apply | object | See the full input schema. |
| `title` | No; body and guard rules apply | string | Title if available in the given GBP post type: event and offer |
| `type` | Yes | string | The channel-specific type of the post, eg, post, offer, event for Google Business Profile Values: `event`, `offer`, `whats_new`. |

##### createContentItem.input.posts[].metadata.google.detailsEvent

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `button` | No; body and guard rules apply | string | Action button. Optional: a post with no button, or `none`, publishes without a call-to-action. On edit, omitting it preserves the existing value. Values: `book`, `call`, `learn_more`, `none`, `order`, `shop`, `signup`. |
| `endDate` | No; body and guard rules apply | string | End date of the event. Required on create; optional on edit (omitted preserves existing value). |
| `isFullDayEvent` | Yes | boolean | Indicate whether the event has a start or end time. |
| `link` | No; body and guard rules apply | string | Link to the action |
| `startDate` | No; body and guard rules apply | string | Start date of the event. Required on create; optional on edit (omitted preserves existing value). |
| `title` | No; body and guard rules apply | string | Title of the event. Required on create; optional on edit (omitted preserves existing value). |

##### createContentItem.input.posts[].metadata.google.detailsOffer

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `code` | No; body and guard rules apply | string | Coupon code for the offer |
| `endDate` | No; body and guard rules apply | string | End date of the offer. Required on create; optional on edit (omitted preserves existing value). |
| `link` | No; body and guard rules apply | string | Link to the offer |
| `startDate` | No; body and guard rules apply | string | Start date of the offer. Required on create; optional on edit (omitted preserves existing value). |
| `terms` | No; body and guard rules apply | string | Terms and Conditions |
| `title` | No; body and guard rules apply | string | Title of the offer. Required on create; optional on edit (omitted preserves existing value). |

##### createContentItem.input.posts[].metadata.google.detailsWhatsNew

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `button` | No; body and guard rules apply | string | Action button. Optional: a post with no button, or `none`, publishes without a call-to-action. On edit, omitting it preserves the existing value. Values: `book`, `call`, `learn_more`, `none`, `order`, `shop`, `signup`. |
| `link` | No; body and guard rules apply | string | Link to the action |

##### createContentItem.input.posts[].metadata.instagram

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `firstComment` | No; body and guard rules apply | string | Instagram post's first comment |
| `geolocation` | No; body and guard rules apply | object | See the full input schema. |
| `isAiGenerated` | No; body and guard rules apply | boolean | Whether the post discloses AI-generated content |
| `link` | No; body and guard rules apply | string | Shop Grid link for the post |
| `shouldShareToFeed` | Yes | boolean | Indicates whether post should be shared to feed |
| `stickerFields` | No; body and guard rules apply | object | See the full input schema. |
| `type` | Yes | string | The channel-specific type of the post, eg, post, story, reel for Instagram Values: `carousel`, `event`, `ghost_post`, `offer`, `post`, `reel`, `short`, `story`, `thread`, `whats_new`. |

##### createContentItem.input.posts[].metadata.instagram.geolocation

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body and guard rules apply | string | The id of this location |
| `text` | No; body and guard rules apply | string | The name of this location |

##### createContentItem.input.posts[].metadata.instagram.stickerFields

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `music` | No; body and guard rules apply | string | Placeholder text for the post's music |
| `other` | No; body and guard rules apply | string | Additional field for any other post content |
| `products` | No; body and guard rules apply | string | Placeholder text for the post's linked products |
| `text` | No; body and guard rules apply | string | Text for the Story or Reel |
| `topics` | No; body and guard rules apply | string | Placeholder text for the post's topics (Reels only) |

##### createContentItem.input.posts[].metadata.linkedin

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `annotations` | No; body and guard rules apply | array | Annotations representing entities in the text Items: object. |
| `firstComment` | No; body and guard rules apply | string | LinkedIn post's first comment |
| `linkAttachment` | No; body and guard rules apply | object | See the full input schema. |

##### createContentItem.input.posts[].metadata.linkedin.annotations[]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | Yes | string | The id of the annotation, e.g. 1521226 |
| `entity` | Yes | string | The entity of the annotation, e.g. urn:li:organization:1521226 |
| `length` | Yes | integer | The length of the annotation, e.g. 6 |
| `link` | Yes | string | The link of the annotation, e.g. https://www.linkedin.com/company/bufferapp |
| `localizedName` | Yes | string | The localized name of the annotation, e.g. Buffer |
| `start` | Yes | integer | The start of the annotation, e.g. 5 |
| `vanityName` | Yes | string | The vanity name of the annotation, e.g. bufferapp |

##### createContentItem.input.posts[].metadata.mastodon

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `spoilerText` | No; body and guard rules apply | string | Spoiler text hiding the root text of this post |
| `thread` | No; body and guard rules apply | array | The ordered list of posts that make up the thread (not paginated). This array is the source of truth for what gets published: every post in the thread, including the root post, must be provided here. Posts are published in order, each replying to the previous one. The first item is the root post and should match the top-level `text` on the post input. Items: object. |

##### createContentItem.input.posts[].metadata.pinterest

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `boardServiceId` | No; body and guard rules apply | string | The board ID of the Pin, can be obtained when fetching the channel details with the following query: ``` query GetChannelWithSubprofiles {   channel(input: { id: "[CHANNEL_ID_HERE]" }) {     metadata {       ... on PinterestMetadata {         boards {           serviceId         }       }     }   } } ``` Required on create; optional on edit (omitted preserves existing board). |
| `title` | No; body and guard rules apply | string | The title of the Pin |
| `url` | No; body and guard rules apply | string | The Pin destination link |

##### createContentItem.input.posts[].metadata.substack

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `linkAttachment` | No; body and guard rules apply | object | See the full input schema. |

##### createContentItem.input.posts[].metadata.threads

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `linkAttachment` | No; body and guard rules apply | object | See the full input schema. |
| `locationId` | No; body and guard rules apply | string | LocationId associated with the post |
| `locationName` | No; body and guard rules apply | string | Location name associated with the post |
| `thread` | No; body and guard rules apply | array | The ordered list of posts that make up the thread (not paginated). This array is the source of truth for what gets published: every post in the thread, including the root post, must be provided here. Posts are published in order, each replying to the previous one. The first item is the root post and should match the top-level `text` on the post input. Items: object. |
| `topic` | No; body and guard rules apply | string | Topic associated with the post |
| `type` | No; body and guard rules apply | string | The type of the post Values: `carousel`, `event`, `ghost_post`, `offer`, `post`, `reel`, `short`, `story`, `thread`, `whats_new`. |

##### createContentItem.input.posts[].metadata.tiktok

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `isAiGenerated` | No; body and guard rules apply | boolean | Whether the post discloses AI-generated content (TikTok video only) |
| `title` | No; body and guard rules apply | string | The title of the TikTok post (for photo posts) |

##### createContentItem.input.posts[].metadata.twitter

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `isAiGenerated` | No; body and guard rules apply | boolean | Whether the post discloses AI-generated content (original tweets only, never retweets) |
| `retweet` | No; body and guard rules apply | object | See the full input schema. |
| `thread` | No; body and guard rules apply | array | The ordered list of posts that make up the thread (not paginated). This array is the source of truth for what gets published: every post in the thread, including the root post, must be provided here. Posts are published in order, each replying to the previous one. The first item is the root post and should match the top-level `text` on the post input. Items: object. |

##### createContentItem.input.posts[].metadata.twitter.retweet

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | Yes | string | Retweet ID |
| `comment` | No; body and guard rules apply | string | Optional user comment shown above the embedded retweet |

##### createContentItem.input.posts[].metadata.youtube

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `categoryId` | No; body and guard rules apply | string | Youtube Category ID, one ID of this list: ID: 1 -> Film & Animation ID: 2 -> Autos & Vehicles ID: 10 -> Music ID: 15 -> Pets & Animals ID: 17 -> Sports ID: 19 -> Travel & Events ID: 20 -> Gaming ID: 22 -> People & Blogs ID: 23 -> Comedy ID: 24 -> Entertainment ID: 25 -> News & Politics ID: 26 -> Howto & Style ID: 27 -> Education ID: 28 -> Science & Technology ID: 29 -> Nonprofits & Activism  Required on create; optional on edit (omitted preserves existing value). |
| `embeddable` | No; body and guard rules apply | boolean | Indicates whether the video allows embedding (default: true) |
| `isAiGenerated` | No; body and guard rules apply | boolean | Whether the post discloses AI-generated content |
| `license` | No; body and guard rules apply | string | Video license (default: youtube) Values: `creativeCommon`, `youtube`. |
| `madeForKids` | No; body and guard rules apply | boolean | Indicates whether the video is suitable for kids (default: false) |
| `notifySubscribers` | No; body and guard rules apply | boolean | Indicates whether to notify subscribers on publish video (default: true) |
| `privacy` | No; body and guard rules apply | string | Privacy setting for post (default: public) Values: `private`, `public`, `unlisted`. |
| `title` | No; body and guard rules apply | string | Title of the Youtube post. Required on create; optional on edit (omitted preserves existing value). |

##### createContentItemDraft.input

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `correlationId` | No; body and guard rules apply | string | Client-generated UUID that makes draft creation idempotent. A retry with the same UUID in the same organization returns the first content item in its current state. |
| `draft` | Yes | object | See the full input schema. |
| `organizationId` | Yes | string | Organization that will own the content item. |
| `tagIds` | No; body and guard rules apply | array | Tags to apply to this content item. Omit to create it with no tags. Items: string. |
| `targetDate` | No; body and guard rules apply | string | Optional date indicating when this piece of content should go out. This is a planning aid only and does not schedule any posts. |
| `title` | No; body and guard rules apply | string | Optional title describing what this piece of content is about. |

##### createContentItemDraft.input.draft

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `aiAssisted` | No; body and guard rules apply | boolean | Set to true when the draft content was written with the help of AI. |
| `assets` | No; body and guard rules apply | array | Images, videos, or documents to attach to the draft, in display order. Items: object. |
| `text` | Yes | string | The written content of the draft. Can be empty when the draft holds at least one asset. |

##### createIdea.input

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `content` | Yes | object | See the full input schema. |
| `cta` | No; body and guard rules apply | string | Call-to-action identifier for analytics tracking |
| `group` | No; body and guard rules apply | object | See the full input schema. |
| `organizationId` | Yes | string | Organization ID that will own the idea |
| `templateId` | No; body and guard rules apply | string | Template ID used to create the idea |

##### createIdea.input.content

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `aiAssisted` | No; body and guard rules apply | boolean | Whether AI tools were used in creation |
| `date` | No; body and guard rules apply | string | Target date for the idea, often used for planning publish schedules |
| `media` | No; body and guard rules apply | array | List of media items to attach Items: object. |
| `services` | No; body and guard rules apply | array | Services associated with the idea for targeting specific platforms Items: string. |
| `tags` | No; body and guard rules apply | array | Tags to categorize the idea Items: object. |
| `text` | No; body and guard rules apply | string | Main body text or description |
| `title` | No; body and guard rules apply | string | Title or headline of the idea |

##### createIdea.input.content.media[]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | The URL of the media |
| `alt` | No; body and guard rules apply | string | Alternative text for the media |
| `thumbnailUrl` | No; body and guard rules apply | string | Thumbnail URL for the media |
| `type` | Yes | string | The type of media (image, gif, video, link, document, unsupported). Note: 'video' is not supported via public API Values: `image`, `gif`, `video`, `link`, `document`, `unsupported`. |
| `size` | No; body and guard rules apply | integer | The size of the media in bytes |
| `source` | No; body and guard rules apply | object | See the full input schema. |

##### createIdea.input.content.media[].source

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `name` | Yes | string | See the full input schema. |
| `id` | No; body and guard rules apply | string | See the full input schema. |
| `trigger` | No; body and guard rules apply | string | See the full input schema. |
| `author` | No; body and guard rules apply | string | for unsplash only |
| `authorUrl` | No; body and guard rules apply | string | See the full input schema. |

##### createIdea.input.content.tags[]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | Yes | string | See the full input schema. |
| `name` | Yes | string | See the full input schema. |
| `color` | Yes | string | See the full input schema. |

##### createIdea.input.group

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `groupId` | No; body and guard rules apply | string | Target group ID (null for unassigned group) |
| `placeAfterId` | No; body and guard rules apply | string | ID of idea to place after (null for top position) |

##### createPost.input

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `aiAssisted` | No; body and guard rules apply | boolean | If this post was created with the help of AI |
| `assets` | No; body and guard rules apply | array | Ordered list of assets on this post. Items: object. |
| `channelId` | Yes | string | Channel's Id for which we want to create the post |
| `draftId` | No; body and guard rules apply | string | Is set when the Post is generated from a Draft |
| `dueAt` | No; body and guard rules apply | string | Date when the post is scheduled to be published |
| `ideaId` | No; body and guard rules apply | string | Is set when the Post is generated from an Idea |
| `metadata` | No; body and guard rules apply | object | See the full input schema. |
| `mode` | Yes | string | How the post is being scheduled. Values: `addToQueue`, `customScheduled`, `shareNext`, `shareNow`. |
| `needsApproval` | No; body and guard rules apply | boolean | Submit the post for approval instead of scheduling it. A post submitted for approval is always a draft, so this conflicts with turning `saveToDraft` off.  Only valid when your posting policy on the target channel requires approval. |
| `saveToDraft` | No; body and guard rules apply | boolean | If true, saves the post as a draft instead of scheduling it. When saving as draft: - Post status will be 'draft' instead of 'buffer' - Posting limits are not checked - The post will not be published until explicitly scheduled |
| `schedulingType` | Yes | string | Scheduling type to indicate notification publishing or automatic publishing Values: `automatic`, `notification`. |
| `source` | No; body and guard rules apply | string | source where the composer was initiated from, used for tracking. |
| `tagIds` | No; body and guard rules apply | array | List of tag IDs Items: string. |
| `text` | No; body and guard rules apply | string | Text content of the Post.  Note: for threaded posts, this needs to match the first item in the `thread` array. |

##### createPost.input.metadata

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `bluesky` | No; body and guard rules apply | object | See the full input schema. |
| `facebook` | No; body and guard rules apply | object | See the full input schema. |
| `google` | No; body and guard rules apply | object | See the full input schema. |
| `instagram` | No; body and guard rules apply | object | See the full input schema. |
| `linkedin` | No; body and guard rules apply | object | See the full input schema. |
| `mastodon` | No; body and guard rules apply | object | See the full input schema. |
| `pinterest` | No; body and guard rules apply | object | See the full input schema. |
| `substack` | No; body and guard rules apply | object | See the full input schema. |
| `threads` | No; body and guard rules apply | object | See the full input schema. |
| `tiktok` | No; body and guard rules apply | object | See the full input schema. |
| `twitter` | No; body and guard rules apply | object | See the full input schema. |
| `youtube` | No; body and guard rules apply | object | See the full input schema. |

##### createPost.input.metadata.bluesky

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `linkAttachment` | No; body and guard rules apply | object | See the full input schema. |
| `thread` | No; body and guard rules apply | array | The ordered list of posts that make up the thread (not paginated). This array is the source of truth for what gets published: every post in the thread, including the root post, must be provided here. Posts are published in order, each replying to the previous one. The first item is the root post and should match the top-level `text` on the post input. Items: object. |

##### createPost.input.metadata.bluesky.thread[]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `assets` | No; body and guard rules apply | array | Ordered list of assets on this threaded post Items: object. |
| `metadata` | No; body and guard rules apply | object | See the full input schema. |
| `text` | No; body and guard rules apply | string | The text body content of the threaded post |

##### createPost.input.metadata.bluesky.thread[].assets[]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `document` | No; body and guard rules apply | object | See the full input schema. |
| `image` | No; body and guard rules apply | object | See the full input schema. |
| `link` | No; body and guard rules apply | object | See the full input schema. |
| `video` | No; body and guard rules apply | object | See the full input schema. |

##### createPost.input.metadata.bluesky.thread[].assets[].image

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `thumbnailUrl` | No; body and guard rules apply | string | URL to the static thumbnail of the asset |
| `url` | Yes | string | URL to the file source |

##### createPost.input.metadata.bluesky.thread[].assets[].video

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `thumbnailUrl` | No; body and guard rules apply | string | Do not use: social networks do not accept custom video thumbnail images, and the API rejects video assets that set this field. To choose the video thumbnail, set `metadata.thumbnailOffset` to select a frame from the video (supported for Instagram, TikTok, and Pinterest only). |
| `url` | Yes | string | URL to the file source |

##### createPost.input.metadata.bluesky.thread[].metadata

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `bluesky` | No; body and guard rules apply | object | See the full input schema. |
| `threads` | No; body and guard rules apply | object | See the full input schema. |

##### createPost.input.metadata.mastodon

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `spoilerText` | No; body and guard rules apply | string | Spoiler text hiding the root text of this post |
| `thread` | No; body and guard rules apply | array | The ordered list of posts that make up the thread (not paginated). This array is the source of truth for what gets published: every post in the thread, including the root post, must be provided here. Posts are published in order, each replying to the previous one. The first item is the root post and should match the top-level `text` on the post input. Items: object. |

##### createPost.input.metadata.threads

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `linkAttachment` | No; body and guard rules apply | object | See the full input schema. |
| `locationId` | No; body and guard rules apply | string | LocationId associated with the post |
| `locationName` | No; body and guard rules apply | string | Location name associated with the post |
| `thread` | No; body and guard rules apply | array | The ordered list of posts that make up the thread (not paginated). This array is the source of truth for what gets published: every post in the thread, including the root post, must be provided here. Posts are published in order, each replying to the previous one. The first item is the root post and should match the top-level `text` on the post input. Items: object. |
| `topic` | No; body and guard rules apply | string | Topic associated with the post |
| `type` | No; body and guard rules apply | string | The type of the post Values: `carousel`, `event`, `ghost_post`, `offer`, `post`, `reel`, `short`, `story`, `thread`, `whats_new`. |

##### createPost.input.metadata.twitter

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `isAiGenerated` | No; body and guard rules apply | boolean | Whether the post discloses AI-generated content (original tweets only, never retweets) |
| `retweet` | No; body and guard rules apply | object | See the full input schema. |
| `thread` | No; body and guard rules apply | array | The ordered list of posts that make up the thread (not paginated). This array is the source of truth for what gets published: every post in the thread, including the root post, must be provided here. Posts are published in order, each replying to the previous one. The first item is the root post and should match the top-level `text` on the post input. Items: object. |

##### createPostTemplate.input

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `body` | Yes | string | The main content body of the template, may contain {{placeholders}}. |
| `description` | No; body and guard rules apply | string | A short user-facing description of the template. Nullable for backwards-compat at the GraphQL boundary — the resolver rejects null/empty values with a clear input error so the underlying storage contract (non-empty string) is still honored. |
| `emoji` | No; body and guard rules apply | string | The emoji associated with the template. |
| `organizationId` | Yes | string | Organization the template belongs to. The caller must be a member of this organization. For `internal` visibility this is the team scope; for `private` it's recorded on the template but does not affect visibility. |
| `title` | Yes | string | The title of the template. |
| `visibility` | No; body and guard rules apply | string | Defaults to `private` if omitted. `public` is rejected — it is only available to official Buffer clients. Values: `internal`, `private`, `public`. |

##### dailyPostingLimits.input

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `channelIds` | Yes | array | List of channel IDs to check limits for. All channels must belong to the same organization. Items: string. |
| `date` | No; body and guard rules apply | string | The date to check limits for. Defaults to today if not provided. |

##### deleteContentItem.input

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | Yes | string | The content item to delete. |

##### deletePost.input

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | Yes | string | Post id to delete. |

##### deletePostTemplate.input

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | Yes | string | The ID of the template to delete. |

##### editPost.input

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | Yes | string | ID of the post to edit |
| `aiAssisted` | No; body and guard rules apply | boolean | If this post was edited with the help of AI |
| `approvalChange` | No; body and guard rules apply | string | Change the post's approval state alongside this edit. Leave unset to keep the post's current approval state.  Only valid when your posting policy on the post's channel requires approval, and only on your own drafts. Asking for the state the post is already in does nothing. Values: `request`, `revert`. |
| `assets` | No; body and guard rules apply | array | Ordered list of assets on this post. Omit to preserve the existing list, pass an empty array to clear it Items: object. |
| `draftId` | No; body and guard rules apply | string | Is set when the Post is generated from a Draft |
| `dueAt` | No; body and guard rules apply | string | Date when the post is scheduled to be published |
| `ideaId` | No; body and guard rules apply | string | Is set when the Post is generated from an Idea |
| `metadata` | No; body and guard rules apply | object | See the full input schema. |
| `mode` | No; body and guard rules apply | string | How the post is being scheduled. Omit the field or pass null to make no scheduling change — null does not clear or reset the schedule: a scheduled post keeps its current share mode, queue slot, and any custom time, and the edit applies only the other provided fields. Pass a non-null ShareMode to apply that mode. Values: `addToQueue`, `customScheduled`, `shareNext`, `shareNow`. |
| `saveToDraft` | No; body and guard rules apply | boolean | If true, saves the post as a draft instead of keeping it scheduled. When saving as draft: - Post status will be 'draft' instead of 'buffer' - The post will not be published until explicitly scheduled |
| `schedulingType` | No; body and guard rules apply | string | Scheduling type to indicate notification publishing or automatic publishing.  Omit it, or send null, to leave the post publishing the way it already does. Values: `automatic`, `notification`. |
| `source` | No; body and guard rules apply | string | source where the composer was initiated from, used for tracking. |
| `tagIds` | No; body and guard rules apply | array | tags Items: string. |
| `text` | No; body and guard rules apply | string | Text content of the Post. Omit the field to keep the current text; pass an empty string or null to clear it.  Note: for threaded posts, this needs to match the first item in the `thread` array. |

##### ideaGroups.input

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `organizationId` | Yes | string | Unique identifier for the organization. |

##### ideas.input

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `groupFilter` | No; body and guard rules apply | object | See the full input schema. |
| `organizationId` | Yes | string | The organization to fetch ideas from. |
| `tagsFilter` | No; body and guard rules apply | object | See the full input schema. |

##### ideas.input.groupFilter

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `groups` | No; body and guard rules apply | array | Return only ideas that belong to these specific groups (union/OR). Items: string. |
| `membership` | No; body and guard rules apply | string | Return ideas by a group-membership bucket rather than by specific group IDs. Values: `grouped`, `ungrouped`. |

##### instagramAudio.input

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `audioId` | Yes | string | Meta audio asset ID |
| `channelId` | Yes | string | Instagram channel used to authorize the refresh |

##### movePostInQueue.input

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | Yes | string | ID of the post to move. |
| `position` | Yes | string | Target position within the channel's queue. Values: `bottom`, `top`. |

##### post.input

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | Yes | string | The ID of the post to be retrieved |

##### posts.input

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `filter` | No; body and guard rules apply | object | See the full input schema. |
| `organizationId` | Yes | string | The Organization id to fetch posts for |
| `sort` | No; body and guard rules apply | array | The sort to apply to the posts results Items: object. |

##### posts.input.filter

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `channelIds` | No; body and guard rules apply | array | When set, it will filter posts by channel Items: string. |
| `dueAt` | No; body and guard rules apply | object | See the full input schema. |
| `dueAtPresence` | No; body and guard rules apply | string | When set, it will filter posts by whether their scheduled posting date exists. `absent` cannot be combined with `dueAt`, because absent dates cannot also match a date range. Values: `absent`, `present`. |
| `endDate` | No; body and guard rules apply | string | When set, it will return posts with createdAt or dueAt date before endDate |
| `postTypes` | No; body and guard rules apply | array | When set, it will filter posts by format.  `post` is a fallback bucket rather than one stored format: it matches every post the other formats do not claim, which is what `Post.metadata.type` reports for the same post. `carousel` and `thread` are rejected, because no stored value resolves to them. Items: string. |
| `startDate` | No; body and guard rules apply | string | When set, it will return posts with createdAt or dueAt date after startDate |
| `status` | No; body and guard rules apply | array | When set, it will filter posts by status Items: string. |
| `tagIds` | No; body and guard rules apply | array | When set, it will filter posts by tag Items: string. |
| `tags` | No; body and guard rules apply | object | See the full input schema. |
| `createdAt` | No; body and guard rules apply | object | See the full input schema. |

##### posts.input.sort[]

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `direction` | Yes | string | The direction to sort by. Values: `asc`, `desc`. |
| `field` | Yes | string | The field to sort by. Values: `dueAt`, `createdAt`. |

##### postTemplate.input

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | Yes | string | The unique identifier of the template to fetch. |

##### postTemplates.input

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `filter` | No; body and guard rules apply | object | See the full input schema. |
| `organizationId` | Yes | string | Organization to scope `internal`-visibility templates to. The caller must be a member of this organization. |

##### postTemplates.input.filter

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `visibility` | No; body and guard rules apply | string | Narrow the result to a single visibility scope. Omit to receive the union of: public templates, internal templates from the supplied organization, and private templates from the actor's account. Values: `internal`, `private`, `public`. |

##### promoteContentItemDraftToPosts.input

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | Yes | string | The content item to promote. |
| `posts` | Yes | array | The channel-specific posts to create, one per channel. Provide at least one post, and at most one post per channel. Items: object. |
| `tagIds` | No; body and guard rules apply | array | Tags to apply to this content item. Omit to keep the current tags. An empty list or null removes them all. Items: string. |

##### removePostFromContentItem.input

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | Yes | string | The content item to remove the post from. |
| `postId` | Yes | string | The post to remove from a content item. |

##### searchInstagramAudio.input

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `audioType` | Yes | string | Music or original sound catalog Values: `music`, `originalSound`. |
| `channelId` | Yes | string | Instagram channel to search audio for |
| `query` | Yes | string | Search text. Required. Use trendingInstagramAudio for trending results. |

##### tag.input

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | Yes | string | The unique identifier of the tag to fetch. |

##### tagsV2.input

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `filter` | No; body and guard rules apply | object | See the full input schema. |
| `organizationId` | Yes | string | Organization to list tags for. The caller must be a member of this organization. |

##### tagsV2.input.filter

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `isLocked` | No; body and guard rules apply | boolean | Return only locked tags when true, only unlocked tags when false. Omit to return both. See `Tag.isLocked` for what locking means. |

##### trendingInstagramAudio.input

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `audioType` | Yes | string | Music or original sound catalog Values: `music`, `originalSound`. |
| `channelId` | Yes | string | Instagram channel to load trending audio for |

##### updateContentItem.input

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | Yes | string | The content item to update. |
| `targetDate` | No; body and guard rules apply | string | Omit to preserve the existing target date. Null clears it. |
| `title` | No; body and guard rules apply | string | Omit to preserve the existing title. Null clears it. |

##### updateContentItemDraft.input

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | Yes | string | The content item whose channel-less draft is replaced. |
| `draft` | Yes | object | See the full input schema. |
| `tagIds` | No; body and guard rules apply | array | Tags to apply to this content item. Omit to keep the current tags. An empty list or null removes them all. Items: string. |
| `targetDate` | No; body and guard rules apply | string | Date indicating when this piece of content should go out. This is a planning aid only and does not schedule any posts. Omit to preserve the existing target date. Null clears it. |

##### updatePostTemplate.input

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | Yes | string | The ID of the template to update. |
| `body` | No; body and guard rules apply | string | The main content body of the template, may contain {{placeholders}}. |
| `description` | No; body and guard rules apply | string | A short user-facing description of the template. |
| `emoji` | No; body and guard rules apply | string | The emoji associated with the template. |
| `title` | No; body and guard rules apply | string | The title of the template. |
| `visibility` | No; body and guard rules apply | string | `public` is rejected — it is only available to official Buffer clients. Values: `internal`, `private`, `public`. |

## 9. Publishing, content items and analytics

### Deliberate posting and scheduling

Read the account, exact organization and connected channel. Inspect createPost input and supported metadata for that service. Current modes are addToQueue, customScheduled, shareNext and shareNow; schedulingType is automatic or notification. shareNow can reach people immediately. A draft requires saveToDraft=true; needsApproval follows the channel's provider-side policy and conflicts with explicitly disabling saveToDraft. Due dates and publication restrictions remain provider validated.

```bash
buffer-cli get-channel --id SELECTED_CHANNEL --fields id --fields name --agent
buffer-cli preview-operation --operation createPost --arguments '{"channelId":"SELECTED_CHANNEL","mode":"addToQueue","schedulingType":"automatic","saveToDraft":true,"text":"Reviewed draft"}' --agent
buffer-cli create-post --payload-file /absolute/private/approved-post.json --account work --confirm --agent
buffer-cli get-post --id RETURNED_POST_ID --fields id --fields status --agent
```

Preview is schema/document validation only: it does not check account access, media reachability, platform text limits or Buffer scheduling policy. An approved file must contain the native input exactly reviewed. One approved draft does not authorize scheduling, promotion, retries or all posts in an organization. Keep the returned ID and inspect existing state before any deliberate repeat.

### Platform metadata and media

The current native schema includes service-specific metadata, media assets and threaded inputs. Read the nested tables and provider's [posting guide](https://developers.buffer.com/guides/posts-and-scheduling). Platform capabilities differ: automatic versus notification delivery, text/media formats, approvals, first comments and thread rules are not interchangeable. The wrapper does not rewrite platform metadata or guess limits. Named schemas catch structure/enums; provider semantic validation is authoritative.

Supply supported externally reachable asset URLs. A local path is not uploaded. URLs supplied to Buffer are processed by the provider; request confirmation includes only the selected assets and target. Private/signed URLs can expose credentials and expire before publication; output redaction is not a guarantee that a submitted URL is safe to share.

### Content items, ideas and templates

Content items coordinate organization content and channel drafts. Inspect the selected item's existing drafts/posts before create/update/add/remove or promoteContentItemDraftToPosts. Promotion creates posts under the documented scheduling rules and requires its own confirmation. Ideas and post templates have distinct schemas and permissions; templates can be private/internal and inherit provider actor visibility. Never assume these commands grant team access or publish automatically.

### Analytics

aggregatedPostMetrics uses an explicit organization and startDateTime/endDateTime, optionally channelIds. An empty channelIds list means no channels, unlike omitted/null. Current date windows are capped at 365 days; metrics refresh daily and require the provider's PAT insightsRead permission. Current OAuth app grants cannot request that scope. Zero/absent metrics are not proof that no posts performed. Inspect provider availability and dates; do not fabricate missing results.

## 10. Pagination, retries and local input files

Ordinary paginated tools request one page with native first/after/input arguments and return edges/node/pageInfo. The default page size is 25 where declared; local first cap is 100. Cursors are opaque and must be passed unchanged.

```bash
buffer-cli query-pages --operation posts --arguments '{"organizationId":"SELECTED_ORG","fields":["items.id","items.status"],"first":25}' --max-pages 3 --agent
```

query_pages accepts only current named paginated reads, one to five pages. It adds hasNextPage and endCursor fields, returns page responses and resumeCursor, and stops at the requested cap. Missing or repeated cursors abort remaining requests; this is an error, not a complete-library claim. Provider errors also abort remaining pages and no retries run. For very large results, each page still faces the response cap and provider complexity limits. A later continuation sees current account state, not a snapshot guarantee.

payload_file must be regular non-symlink JSON up to 1 MiB. Native input fields, payload and payload_file are mutually exclusive; account, fields, pagination and confirm are outside native payload. No media bytes, output-file downloads or unlimited polling are implemented. Store account responses privately through your own reviewed shell output process; the package does not hide private post/customer content automatically.

Transport failure does not establish that a mutation failed remotely. Preserve its inputs/returned IDs and inspect the provider before making a deliberate repeat. Rate limits can be GraphQL errors inside HTTP 200 as well as transport responses. Quota is shared by the actual upstream client, not reserved by a local label or preview.

## 11. Several private accounts

BUFFER_ACCOUNTS is a private JSON array of unique labels with api_key (or api_token), token_file and optional organization_id. The array replaces single-account settings completely; no entry inherits a global token or organization. BUFFER_DEFAULT_ACCOUNT selects the default, otherwise the first label is used. Unknown labels/defaults refuse.

```json
[{"name":"work","token_file":"/absolute/private/buffer-work.txt","organization_id":"YOUR_WORK_ORG"},{"name":"personal","token_file":"/absolute/private/buffer-personal.txt","organization_id":"YOUR_PERSONAL_ORG"}]
```

A selected profile fills a missing organizationId only for named native inputs that declare it. An explicit request organizationId takes precedence; generic GraphQL variables are preserved exactly. Preview requires explicit input and reads no credential/profile defaults. list_accounts returns labels/default/authentication presence only, never tokens, file paths or organization IDs.

A profile label is credential routing, not a security boundary for an account-wide PAT. Use separately scoped provider grants/accounts where appropriate. Several labels using the same grant still share permissions and rate quota. Token files override inline profile keys and are cached until restart.

## 12. Writing safely

All 17 exposed mutation tools require --confirm/confirm=true for the exact human-requested action. Named create/edit/delete/queue/content/promotion/template operations and generic GraphQL mutation pass through one WriteGuard before file reading or network work.

BUFFER_READ_ONLY=1 hides mutations from discovery and refuses direct hidden calls. BUFFER_ALLOW_DESTRUCTIVE=0 separately refuses mutations even with confirmation. --agent/--yes are output/noninteractive controls, not permission to publish. Local preview is available in read-only mode because it validates and returns data without transmitting a mutation.

Generic query parses exactly one GraphQL query and refuses mutation/subscription/multiple-operation documents. Generic mutation parses exactly one mutation with one direct root field; multi-action/root-fragment mutation documents refuse. It inserts __typename and the MutationError message catch-all. Aliases are preserved. Buffer validates native generic variables and provider permissions; local schema validation of unknown experimental operations is not claimed.

Audit writes are opt-in metadata containing time, surface, tool, risk, static description and guard outcome, without keys, post text, native variables or provider content. Keep the log private. Guard acceptance is permission to attempt one operation, not proof it succeeded remotely. Provider permissions/client consent remain independent.

## 13. How the two surfaces work

src/tools/index.ts exports one ALL_TOOLS catalogue, current published native metadata and six helpers. The SDK server registers discovery and calls; the house CLI uses SDK in-memory transport to obtain the same schemas and execute the same handlers. There is one validation path, one private client and one WriteGuard.

Thirty-five native GraphQL shells, nested input schemas and selection trees are reused from @bufferapp/cli 1.2.2. The upstream field-selection renderer is credited under ISC. Ajv performs strict native input checks; GraphQL parsing verifies generic operation type before transmission. Only the fixed HTTPS Buffer endpoint is used; redirects, arbitrary API hosts and arbitrary caller headers are absent.

The 41 tools include 24 reads and 17 mutations. These are shared wrapper catalogue counts, not the count of provider endpoints or a superiority benchmark. The current reference contains 42 roots, including seven newer experimental roots accessible through generic GraphQL subject to availability. See THIRD_PARTY_NOTICES.md and api-source.json for source versions/checksums.

## 14. Privacy and data handling

Credentials stay in private environment/client settings or token-only files. The server caches file credentials until restart and sends Bearer only to https://api.buffer.com, with redirects refused. It neither reads official global/repository Buffer configuration nor collects browser cookies. No telemetry relay, browser sign-in, local content database or public HTTP server is added.

API responses can contain post text, media, customer/account identifiers, organization/channel metadata and performance data. Outputs remain sensitive even when credential-like fields, the configured token and recognized signed credential URLs are redacted. Redaction is not anonymization; arbitrary secrets in free-form content can still appear. Local preview includes the supplied post/input content and should also stay private.

Buffer receives the requested native GraphQL operation/variables; social delivery and asset processing follow provider terms. Model/client hosting sees whatever tool output you let it receive. --fields limits requested data; --select trims after receipt. Neither control changes provider consent or guarantees a safe URL.

Opt-in audit logs contain guard metadata only. Do not put credentials, signed links, raw headers, account dumps or .env files into commits, artifacts or public issues. Private legacy history stays outside the new public repository. Public npm and desktop bundles must be scanned before release.

## 15. Environment variables

### Credentials

| Variable | Meaning |
| --- | --- |
| `BUFFER_API_KEY` | Private account-wide PAT or authorized OAuth access token |
| `BUFFER_API_TOKEN` | Legacy alias; API_KEY wins if both exist |
| `BUFFER_TOKEN_FILE` | Regular owner-only token-only file, max 64 KiB; overrides environment key |
| `BUFFER_ACCOUNTS` | Private named profile array; no global credential/default inheritance |
| `BUFFER_DEFAULT_ACCOUNT` | Exact configured label; default first entry |
| `BUFFER_ORGANIZATION_ID` | Optional input default for single account; does not restrict permissions |

### Safety

| Variable | Meaning |
| --- | --- |
| `BUFFER_READ_ONLY` | 1/true hides and refuses mutations; default false |
| `BUFFER_ALLOW_DESTRUCTIVE` | 0/false refuses even confirmed mutations; default true |
| `BUFFER_AUDIT_LOG` | Private append-only guard decisions, no input content |

### Tuning

| Variable | Meaning |
| --- | --- |
| `BUFFER_REQUEST_TIMEOUT_MS` | Default 30000, range 100–300000 |
| `BUFFER_MIN_REQUEST_INTERVAL_MS` | Default 200, range 0–10000; process/profile pacing only |

## 16. Updates and removal

npx -y @thenavidm/buffer-mcp-cli@latest re-resolves the latest registry tag when the client launches; restart to run the updated process. Global installs require npm update -g @thenavidm/buffer-mcp-cli; pinned versions require an intentional change. Desktop archives are versioned and must be downloaded/reinstalled separately. Clones require reviewing the changelog, pulling, npm ci and rebuilding.

```bash
npm update -g @thenavidm/buffer-mcp-cli
buffer-cli --version
# Disconnect the server in each client before local removal.
npm uninstall -g @thenavidm/buffer-mcp-cli
```

Remove the matching client entry or desktop extension and separately remove any registered skill. Delete/revoke private grants using provider controls if requested. Local uninstall does not revoke credentials, disconnect social accounts or undo scheduled/published posts. Keep private input/audit files only for your actual needs.

## 17. Troubleshooting

| Symptom | Check |
| --- | --- |
| Binary absent | Node 22+, npm prefix/PATH, reopen terminal; PowerShell can use npm.cmd |
| Configuration exit 10 | Private token path/permissions, account label/default and GUI environment |
| Auth/forbidden exit 4 | Actual Buffer key/grant, organization role and connected-channel authorization |
| Refused mutation exit 2 | Exact human request, explicit confirm, read-only/disabled settings |
| Native input/schema error | Current required fields/enums/nested schema; do not mix payload and body flags |
| Unknown fields | get_operation_schema; use relative selection paths and items for connections |
| HTTP 200 but failure | GraphQL errors or typed MutationError; inspect safe error and provider state |
| Rate limit exit 7 | Provider returned quota/reset, shared PAT/MCP bucket and per-plan windows |
| Post accepted but not published | Returned post status, notification delivery, approvals and platform processing |
| Missing analytics | PAT insightsRead, provider availability, daily refresh and date range |
| Missing/repeated pagination cursor | Stop and inspect state; never assume the library is complete |
| GUI discovers nothing | Server stdio launch/PATH, private settings, duplicate extension/manual entries, restart |
| Local preview works but API fails | Preview is structural only; account permissions/semantic limits still require provider validation |

Do not log credentials or post/customer content in a public issue. Include package/Node/client versions, exact command name, safe error code, whether a request was sent and redacted reproduction. Never disable policies or replay a publication merely to hide an error.

## 18. API coverage and comparisons

| Offering | Surface and current evidence | Tradeoff |
| --- | --- | --- |
| [Official MCP](https://developers.buffer.com/guides/integrations/mcp) | https://mcp.buffer.com/mcp; 20 documented tools plus generic GraphQL query/mutation | Provider-maintained remote connection and client approval flow. Generic GraphQL already reaches the API; do not claim ours uniquely supports the full API. Live authenticated discovery was not performed in this review. |
| [Official CLI](https://developers.buffer.com/guides/cli) | @bufferapp/cli 1.2.2; buffer; 35 published generated operations | Native inputs, schema exploration, upstream --fields, dry-run, JSON/stdin, doctor, contexts and Codex/Claude skills already exist. Setup and update flows remain useful. |
| This owned package | Shared buffer-cli / local MCP / versioned .mcpb; 35 named operations plus six useful helpers | Enforces mutation confirmation/read-only policies in both surfaces, isolated private profiles, credential redaction, local previews and bounded read pagination. Requires Node 22+. No automatic OAuth renewal or official interactive setup. |
| [Buffer API](https://developers.buffer.com/reference) | Current reference: 42 root operations | Seven newer snippet/tag roots are marked experimental; generic GraphQL can request them subject to provider availability. They are not presented as stable named-tool superiority. |
| [Community GraphQL MCP](https://github.com/jakemeany523/buffer-mcp/tree/d8516a672ca57b22a8c9b943eb9ff7db63f2a30e) | Python local MCP, 13 source-declared tools | Current GraphQL workflows include post batches, R2 media hosting and optional Twitter-side integration. No dedicated task CLI is established by this source review. update_post performs delete then create, which can partially fail; it is not a transactional update. Those integrations are useful capabilities absent from this wrapper. |
| [Community REST MCP](https://github.com/rodrigo-do-carmo/mcp-server-buffer/tree/25eeb3587a5a607c1d3507bfc54e757429f1a245) | Node MCP for legacy API | Source targets api.bufferapp.com/1 and old profiles/updates/schedules. It is not evidence of current GraphQL parity. Only source was reviewed; account compatibility was not exercised. |

Checked October 3, 2026. The current reference, changelog and published official 1.2.2 archive were read directly. A clean anonymous npm 10.9.8 install of that archive fails EUNSUPPORTEDPROTOCOL because its published commander dependency is catalog:. No dependency rewrite or workaround was used. This is a dated installer observation, not a permanent provider limitation or evidence that every installer fails.

To compare local confirmation behavior despite that packaging issue, a network-free fixture exercises the actual published executePipeline and pure helpers with its real generated createPost input/document, a fake token resolver and a mocked GraphQL response. Valid shareNow input without a confirm flag reaches the injected request once; official dry-run reaches it zero times. This is an isolated published function fixture, not a complete official CLI installation or a claim that remote MCP clients lack approvals. The owned equivalent refuses before transmission without explicit confirmation; read-only/disabled policies refuse even confirmed calls.

Pinned community sources were read without executing them or using provider accounts: GraphQL d8516a6 and legacy REST 25eeb35. Their advertised capabilities are not treated as validated account outcomes.

Both official CLI and this package perform upstream field selection and detect typed API errors. Neither capability is claimed unique. Our local --select additionally trims already received output; it cannot reduce upstream work. The owned recurring workflow is deliberate reviewed publishing or administration across isolated profiles with shared enforced policy and bounded reads. No token, speed, success-rate or global superiority claim is inferred from schemas, SEO or tool counts. Provider-account outcomes, desktop GUI and matched Codex task usage remain separate.

## 19. Versions

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
| `acorn` | 8.18.0 |
| `@anthropic-ai/mcpb` | 2.1.2 |

Checked October 3, 2026. CHANGELOG records dated changes. Package/manifest, annotated default-branch tag, npm latest and desktop filename must agree. Preserve AGPL and private legacy history. Refresh through reviewed, checksum-recorded official schemas; never copy a public schema example without scanning it.

The private 1.0.0 legacy MCP had no declared CLI binaries and used older query/input shapes. Current organizations are read through account.organizations, and channel uses channel(input:{id}), not channel(id). New named tools use get_ for queries and native snake_case for mutations; discover current commands instead of relying on old names. Every mutation now requires confirmation. BUFFER_API_TOKEN remains an alias, while native current input and exact role restrictions take precedence. No prior public npm release is assumed.

## 20. FAQ

<details>
<summary><b>Is this official Buffer software?</b></summary>

No. Navid Media builds this owned wrapper. Buffer maintains separate official MCP and CLI products, which are compared here.

</details>

<details>
<summary><b>Why build it if Buffer has both MCP and CLI?</b></summary>

The useful added workflow is one shared enforced confirmation/read-only policy across local surfaces, isolated profiles and bounded native read pagination. Official field selection, dry-run and API coverage already exist; no blanket superiority is claimed.

</details>

<details>
<summary><b>Does it include MCP and a CLI?</b></summary>

Yes. buffer-mcp and buffer-cli share 41 tools, handlers, input schemas, private accounts and guard.

</details>

<details>
<summary><b>Is it free?</b></summary>

The AGPL wrapper is free. Buffer plans, API quota, account roles and social-platform policies remain separate.

</details>

<details>
<summary><b>How do I get an API key?</b></summary>

Use the intended account's publish.buffer.com/settings/api controls. Store it privately in BUFFER_API_KEY or a regular token-only BUFFER_TOKEN_FILE; login only prints instructions.

</details>

<details>
<summary><b>Are API keys limited to one organization?</b></summary>

Personal API keys can act across accessible organizations. A local organization default/profile is input routing and cannot narrow those provider permissions.

</details>

<details>
<summary><b>Can I keep several accounts separate?</b></summary>

Yes. Unique named private profiles select their own keys/files/default organization. They never inherit a global credential or organization when the profile array is configured.

</details>

<details>
<summary><b>Does it work in Codex?</b></summary>

Use the documented local stdio registration or shared CLI. Codex is the priority; fresh matched task/token usage remains pending.

</details>

<details>
<summary><b>What about Windows, macOS and Linux?</b></summary>

Use Node 22+ on the chosen OS. GUI environment/PATH and Windows private-file ACLs need separate setup. Cross-platform CI is required before release.

</details>

<details>
<summary><b>Is there a desktop extension?</b></summary>

The versioned .mcpb bundles production dependencies and private configuration fields for a compatible desktop host. Actual GUI installation remains a separate acceptance check.

</details>

<details>
<summary><b>Does --agent approve publishing?</b></summary>

No. --agent/--yes set output/noninteractive behavior. The precise requested mutation still needs --confirm or confirm=true and enabled policies.

</details>

<details>
<summary><b>Can read-only prevent generic mutations too?</b></summary>

Yes. Mutations disappear from discovery and direct calls refuse. Generic query parses operation type and refuses mutation/subscription/multiple-operation documents.

</details>

<details>
<summary><b>Is local preview provider validation?</b></summary>

No. It validates native structure and fields and returns document/variables without credentials or requests. Permissions, media, platform and scheduling rules remain remote checks.

</details>

<details>
<summary><b>Why can HTTP 200 still fail?</b></summary>

Buffer reports GraphQL errors and typed mutation errors in the JSON body. The wrapper checks them, and named mutations require a recognized successful result type.

</details>

<details>
<summary><b>Can it upload local photos or videos?</b></summary>

No local media upload is implemented. Supply the current native asset URLs that Buffer can reach and that the chosen platform supports; local file paths are not uploads.

</details>

<details>
<summary><b>Will pagination fetch my whole library?</b></summary>

Ordinary reads fetch one page. query_pages fetches one to five pages, reports continuation and stops on malformed/repeated cursors; it never claims an unbounded complete library.

</details>

<details>
<summary><b>Can it use new snippet or tag APIs?</b></summary>

Generic GraphQL can request the seven newer documented experimental roots, subject to provider availability and native variables. They are not stable dedicated named tools in this release.

</details>

<details>
<summary><b>Does it renew OAuth or provide all analytics?</b></summary>

No automatic OAuth exchange/refresh is implemented. Analytics requires the current PAT insightsRead permission, supported data and a date window up to 365 days; current OAuth grants cannot request that scope.

</details>

<details>
<summary><b>Is CLI more token-efficient?</b></summary>

Only a matched successful Codex task with actual usage can establish that. Upstream fields and local output selection help bound data, but counts, character estimates and borrowed metrics do not prove token savings.

</details>

<details>
<summary><b>How do I update or remove it?</b></summary>

Restart @latest client launches, update global npm installs separately, and reinstall the versioned desktop bundle separately. Uninstall does not revoke keys or undo scheduled/published posts.

</details>

## Questions

Open a sanitized [issue](https://github.com/thenavidm/buffer-mcp-cli/issues). Read SECURITY.md for private reports.

## About the author

Navid Moazzez is a leading AI business strategist, and the host of the AI Creator Summit, watched by 100,000+ creators. He helps creators and founders master AI and build their own AI Operating System (AI OS) to automate their business and life. This Buffer MCP server and CLI is one piece of that system.

**Links**

- Personal website: [navid.me](https://navid.me?utm_source=github&utm_medium=referral&utm_campaign=buffer-mcp-cli&utm_content=readme)
- Link in bio: [navid.bio](https://navid.bio?utm_source=github&utm_medium=referral&utm_campaign=buffer-mcp-cli&utm_content=readme)
- Navid Media: [navid.media](https://navid.media?utm_source=github&utm_medium=referral&utm_campaign=buffer-mcp-cli&utm_content=readme)
- YouTube: [@thenavidm](https://youtube.com/@thenavidm?sub_confirmation=1) and [@thenavidai](https://youtube.com/@thenavidai?sub_confirmation=1)
- X: [@thenavidm](https://x.com/thenavidm)
- Instagram: [@thenavidm](https://instagram.com/thenavidm)
- LinkedIn: [thenavidm](https://linkedin.com/in/thenavidm)

If this is useful, star the repo and come say hi on [X](https://x.com/thenavidm).

## Dependencies

Runtime: MCP TypeScript SDK, Ajv, ajv-formats and GraphQL. Development: TypeScript, Vitest, Vite, Acorn and MCPB. Exact component versions are above and in package-lock.json. ISC Buffer selection code and generated metadata are credited in THIRD_PARTY_NOTICES.md; development packaging tools are excluded from runtime bundles.

## License

Preserves AGPL-3.0-or-later. Read [LICENSE](LICENSE), the [full text](licenses/AGPL-3.0.txt) and [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Provider terms remain separate.

---

© 2026 [Navid Media](https://navid.media). Made with ❤️ by [Navid Moazzez](https://navid.me).
