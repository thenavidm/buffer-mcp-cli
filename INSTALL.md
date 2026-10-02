# Install Buffer MCP Server & CLI

One npm package includes both binaries and all **41 tools**. Requires Node.js 22 or newer for CLI/manual MCP installs. Discovery works before account authentication. Account operations need eligible Buffer API access; Buffer plans, publishing permissions and API quota apply.

| Route | Program | Use |
| --- | --- | --- |
| Terminal | buffer-cli | Scripts and agents with a shell |
| Local MCP | buffer-mcp | AI clients supporting stdio |
| Desktop archive | buffer-2.0.0.mcpb | Compatible Claude Desktop custom extensions |
| Buffer-hosted alternative | https://mcp.buffer.com/mcp | Official remote provider-hosted access |

## Contents

[Requirements](#requirements) · [CLI](#cli) · [Private account setup](#private-account-setup) · [Claude Code](#claude-code) · [Codex](#codex) · [Claude Desktop](#claude-desktop) · [Cursor](#cursor) · [VS Code and Copilot](#vs-code-and-copilot) · [Windsurf](#windsurf) · [Zed](#zed) · [Gemini CLI](#gemini-cli) · [Docker](#docker) · [Verify](#verify) · [Multiple accounts](#multiple-accounts) · [Updates and removal](#updates-and-removal) · [Troubleshooting](#troubleshooting) · [Development](#development)

## Requirements

Install Node from [nodejs.org](https://nodejs.org/en/download). Open a new terminal and check `node --version` and `npm --version`. The desktop host needs a compatible Node runtime; dependencies are bundled. A GUI app may not inherit your terminal's environment. Check your account's current API access and quota with Buffer instead of assuming npm installation provides it.

## CLI

On macOS/Linux, use Terminal. On Windows, use PowerShell or Command Prompt:

```bash
npm install -g @thenavidm/buffer-mcp-cli@latest
buffer-cli --version
buffer-cli
buffer-cli get-account --help
buffer-cli schema create-post
buffer-cli login
```

If PowerShell blocks npm.ps1, use npm.cmd or Command Prompt according to your policy. If a binary is missing, check `npm prefix -g`, ensure its executable directory is on PATH and open a new terminal. Avoid sudo as a workaround for PATH problems.

For one command without a global install:

```bash
npx -y --package @thenavidm/buffer-mcp-cli@latest buffer-cli tools
```

Make [SKILL.md](./SKILL.md) available in your agent's supported skill location. The installed file is `<npm root -g>/@thenavidm/buffer-mcp-cli/SKILL.md`. npm does not automatically register client skills. Your agent should read the actual schema and use --agent/--select for compact output.

## Private account setup

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


```bash
export BUFFER_TOKEN_FILE='/absolute/private/buffer.txt'
buffer-cli doctor --network
```

```powershell
$env:BUFFER_TOKEN_FILE = 'C:\Users\YOUR_USER\Private\buffer.txt'
buffer-cli doctor --network
```

### Agent-guided installation

> Help me install Buffer MCP Server & CLI with INSTALL.md. Check Node and the binary, let me configure my account credentials privately, then run discovery and doctor --network. Do not publish or mutate accounts during setup.

## Codex

Codex is the current validation priority. Private token paths must exist in the process or remote environment where the server runs.

~~~bash
codex mcp add buffer -- npx -y @thenavidm/buffer-mcp-cli@latest
codex mcp list
~~~

Account credentials must reach the server through private environment settings. `codex mcp add --env NAME=value` stores values in your local config, so never commit that config or put secrets in a shared command. In TOML, the equivalent server is:

~~~toml
[mcp_servers.buffer]
command = "npx"
args = ["-y", "@thenavidm/buffer-mcp-cli@latest"]
env_vars = ["BUFFER_API_KEY", "BUFFER_API_TOKEN", "BUFFER_TOKEN_FILE", "BUFFER_ACCOUNTS", "BUFFER_DEFAULT_ACCOUNT", "BUFFER_ORGANIZATION_ID", "BUFFER_READ_ONLY", "BUFFER_ALLOW_DESTRUCTIVE"]
~~~

`env_vars` forwards those names from the environment available to Codex. If that environment does not contain them, configure private env settings locally. Codex can also call the CLI directly with SKILL.md and `--agent` output.

## Claude Code

For a user-scoped connection, after privately configuring credentials:

~~~bash
claude mcp add --scope user buffer -- npx -y @thenavidm/buffer-mcp-cli@latest
claude mcp list
~~~

Use the client's private local environment settings for the account variable if they are not inherited. Claude's `-e NAME=value` registration option writes values into its config; only use it locally through your secret manager, with no shared command transcript. Never place credentials in a project .mcp.json. Reconnect and ask Claude to verify credentials.

Alternatively install the CLI, make SKILL.md available to Claude, and use shell commands. Registering both surfaces is optional.

## Claude Desktop

### Install the .mcpb extension

1. Download `buffer-2.0.0.mcpb` from [GitHub Releases](https://github.com/thenavidm/buffer-mcp-cli/releases/latest).
2. In a supported Claude Desktop build, open **Settings > Extensions > Advanced settings > Install Extension…** and select it.
3. Enter a private API key in the sensitive setting, or an absolute private token-file path. Leave the unused credential method empty. Requests use Authorization: Bearer at the fixed Buffer endpoint. Configure an optional organization input default privately; it does not narrow a PAT's permissions.
4. Enable read-only if you want only the 24 read operations. Reconnect and ask for account verification.

The bundle includes production dependencies and no credentials. Use a regular private token-only file if you prefer file-based credentials. The manifest requires Node 22 or newer from a compatible host. Organization policy may restrict custom extensions. Manual bundle updates require installing the new version; no automatic directory updates are promised. GUI installation remains unverified separately from archive/protocol checks.

### Manual config

Open **Settings > Developer > Edit Config**, or use your platform's config file:

| OS | Typical config path |
| --- | --- |
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |
| Linux | `~/.config/Claude/claude_desktop_config.json`; confirm the location through Edit Config in your installed build |

~~~json
{
  "mcpServers": {
    "buffer": {
      "command": "npx",
      "args": ["-y", "@thenavidm/buffer-mcp-cli@latest"],
      "env": {
        "BUFFER_API_KEY": "YOUR_PRIVATE_API_KEY",
        "BUFFER_TOKEN_FILE": "",
        "BUFFER_ORGANIZATION_ID": "YOUR_ORGANIZATION_ID"}
    }
  }
}
~~~

Replace the placeholders only in your private file. Merge the server entry into an existing mcpServers object instead of replacing other integrations. Fully quit and reopen Claude Desktop. Do not enable an extension and a manual entry with the same name; choose one route.

If a Windows launcher cannot execute npx directly, use `"command": "cmd"` with `"args": ["/c", "npx", "-y", "@thenavidm/buffer-mcp-cli@latest"]`. An absolute node executable and installed `dist/index.js` path also avoids launcher/PATH problems.

## Cursor

Use private user settings at `~/.cursor/mcp.json`, or **Settings > Tools & MCP**. [Cursor documents environment interpolation and envFile support](https://cursor.com/docs/mcp).

~~~json
{
  "mcpServers": {
    "buffer": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@thenavidm/buffer-mcp-cli@latest"],
      "env": {
        "BUFFER_API_KEY": "${env:BUFFER_API_KEY}",
        "BUFFER_TOKEN_FILE": "${env:BUFFER_TOKEN_FILE}",
        "BUFFER_ORGANIZATION_ID": "${env:BUFFER_ORGANIZATION_ID}"}
    }
  }
}
~~~

The environment values must exist for the Cursor process. If you use envFile, keep that file private and outside version control. A project's .cursor/mcp.json must not contain actual credentials. Reconnect the server after saving.

## VS Code and Copilot

Use **MCP: Open User Configuration**. [VS Code uses servers and secure inputs](https://code.visualstudio.com/docs/agent-customization/mcp-servers), rather than a mcpServers root:

~~~json
{
  "inputs": [
    {"type": "promptString", "id": "buffer-api-key", "description": "Buffer API key (leave empty for a private token file)", "password": true},
    {"type": "promptString", "id": "buffer-token-file", "description": "Optional private token-file path (leave empty for API key)"},
    {"type": "promptString", "id": "buffer-organization-id", "description": "Optional Buffer organization input default"}],
  "servers": {
    "buffer": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@thenavidm/buffer-mcp-cli@latest"],
      "env": {
        "BUFFER_API_KEY": "${input:buffer-api-key}",
        "BUFFER_TOKEN_FILE": "${input:buffer-token-file}",
        "BUFFER_ORGANIZATION_ID": "${input:buffer-organization-id}"}
    }
  }
}
~~~

Start Buffer through the MCP controls, approve trust if prompted, and enter credentials in the private input prompts. Workspace .vscode/mcp.json may contain this placeholder-only structure, but never resolved secret values. Remote development runs the server in the selected remote environment, so local file paths refer to that environment.

## Windsurf

Open Cascade's MCP settings or edit the private user file `~/.codeium/windsurf/mcp_config.json`. Use the Claude Desktop manual mcpServers block above with your locally configured env values. See [Windsurf's current MCP documentation](https://docs.devin.ai/desktop/cascade/mcp). Restart or reconnect Buffer in Cascade; project files must not contain secrets.

## Zed

Open **Settings > AI > MCP Servers > Add Server > Add Local Server**, or your user settings file. [Zed uses context_servers](https://zed.dev/docs/ai/mcp):

~~~json
{
  "context_servers": {
    "buffer": {
      "command": "npx",
      "args": ["-y", "@thenavidm/buffer-mcp-cli@latest"],
      "env": {
        "BUFFER_API_KEY": "YOUR_PRIVATE_API_KEY",
        "BUFFER_TOKEN_FILE": "",
        "BUFFER_ORGANIZATION_ID": "YOUR_ORGANIZATION_ID"}
    }
  }
}
~~~

Enter actual values only in private user settings. Check the active-server indicator before prompting. Do not wrap command and args inside a nested command object from older Zed examples.

## Gemini CLI

Merge the Claude Desktop manual mcpServers block into your private `~/.gemini/settings.json`. Configure the private credential values locally, then restart Gemini CLI and inspect `/mcp`. See [Gemini CLI's MCP configuration](https://geminicli.com/docs/tools/mcp-server/). Its project settings must not contain real credentials. You can instead use the CLI from an agent shell.

Other local stdio clients use the same command and arguments, adapted to their config format. A client that only accepts a remote MCP URL cannot connect directly: this package does not ship a public HTTP listener. ChatGPT's remote connector setup is not a substitute for local stdio installation.

## Docker

Build locally from the reviewed source; no prebuilt registry image is claimed:

```bash
git clone https://github.com/thenavidm/buffer-mcp-cli.git
cd buffer-mcp-cli
docker build -t buffer-mcp-cli .
docker run --rm -i -e BUFFER_API_KEY buffer-mcp-cli
```


## Cline and other local MCP clients

Use the client's **Add MCP server** flow with command `npx`, arguments `-y` and `@thenavidm/buffer-mcp-cli@latest`, stdio transport, and private local BUFFER_API_KEY or BUFFER_TOKEN_FILE settings. UI names depend on the installed client. Reconnect and discover tools before an account call. Browser-only clients need a remote HTTPS connector; use Buffer's official server rather than this local stdio command.

## Verify

```bash
buffer-cli doctor
buffer-cli doctor --network
buffer-cli tools
buffer-cli schema get-posts
buffer-cli list-accounts --agent
```

The full server discovers 41 tools; read-only discovers 24. Help/schemas/list_accounts are local. The network doctor reads a minimal account identity without returning account details. A successful account read does not prove every post/platform or account operation.

To try read-only, privately set BUFFER_READ_ONLY=1, restart/reconnect and inspect discovery. All 17 mutations must disappear and direct mutation calls must refuse. Remove/disable the setting and reconnect only when you need approved operations. `BUFFER_ALLOW_DESTRUCTIVE=0` separately blocks all 17 mutations even when confirmed.

## Multiple accounts

BUFFER_ACCOUNTS is a private JSON array of unique labels with api_key (or api_token), token_file and optional organization_id. The array replaces single-account settings completely; no entry inherits a global token or organization. BUFFER_DEFAULT_ACCOUNT selects the default, otherwise the first label is used. Unknown labels/defaults refuse.

```json
[{"name":"work","token_file":"/absolute/private/buffer-work.txt","organization_id":"YOUR_WORK_ORG"},{"name":"personal","token_file":"/absolute/private/buffer-personal.txt","organization_id":"YOUR_PERSONAL_ORG"}]
```

A selected profile fills a missing organizationId only for named native inputs that declare it. An explicit request organizationId takes precedence; generic GraphQL variables are preserved exactly. Preview requires explicit input and reads no credential/profile defaults. list_accounts returns labels/default/authentication presence only, never tokens, file paths or organization IDs.

A profile label is credential routing, not a security boundary for an account-wide PAT. Use separately scoped provider grants/accounts where appropriate. Several labels using the same grant still share permissions and rate quota. Token files override inline profile keys and are cached until restart.

## Updates and removal

```bash
npm install -g @thenavidm/buffer-mcp-cli@latest
buffer-cli --version
claude mcp remove --scope user buffer
codex mcp remove buffer
npm uninstall -g @thenavidm/buffer-mcp-cli
```

Reinstall a newer desktop archive separately and restart affected clients. Remove manual client entries using its own settings. Uninstalling the package does not revoke Buffer credentials, remove private token files or undo scheduled or published posts. Revoke the API key in the provider API Keys area when appropriate. Inspect and remove your private settings and files separately.

Pin a reviewed version instead of @latest if your automation requires reproducibility. Check [CHANGELOG.md](./CHANGELOG.md) and [GitHub Releases](https://github.com/thenavidm/buffer-mcp-cli/releases) before a major update. Do not roll back by blindly publishing an older version over an existing npm version.

## Troubleshooting

| Problem | Check |
| --- | --- |
| Missing command | Node 22+, global prefix and PATH |
| No configured account | Private BUFFER_API_KEY or regular BUFFER_TOKEN_FILE |
| GUI authentication fails | Actual private GUI environment; shell env is separate |
| 401/403 | Bearer grant, selected organization, provider role and eligible API access |
| Invalid/null body | schema; use payload/payload_file for null and nested data |
| First page only | Current endpoint cursor from its prior response; no automatic all-pages |
| Guard refusal | User-requested --confirm, read-only and operation settings |
| Mutation timeout | Inspect account before repeating; no automatic mutation retries |
| Desktop host rejects extension | Compatible host/runtime and organization custom-extension policy |

See the README for the complete argument table, safety, 20 FAQs and API snapshot corrections. Secrets must never appear in a troubleshooting transcript.

## Development

```bash
git clone https://github.com/thenavidm/buffer-mcp-cli.git
cd buffer-mcp-cli
npm ci
npm run typecheck
npm run build
npm test
npm run check:counts
npm run build:mcpb
```

Source mode: configure private env, then register `node /absolute/path/buffer-mcp-cli/dist/index.js` as the MCP command. Build before registration and after source changes. No local credentials are packaged. [CONTRIBUTING.md](./CONTRIBUTING.md), [SECURITY.md](./SECURITY.md) and [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md) cover contributions, disclosures and licensing.
