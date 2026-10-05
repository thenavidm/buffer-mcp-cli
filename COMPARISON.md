# Buffer comparisons

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


CLI and MCP are built by [Slipway](https://github.com/thenavidm/slipway) from each tool's one definition, so they share discovery, validation, handlers, accounts and one write guard, and no second provider implementation can drift.

README section 7 has this package's own costs, measured in Claude Code and Codex against 2.0.1 on 2026-10-05. Tool counts, schema bytes and character estimates are not task-token savings, and no other offering was measured.
