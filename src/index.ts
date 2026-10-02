#!/usr/bin/env node
import {StdioServerTransport} from '@modelcontextprotocol/sdk/server/stdio.js';import {buildServer,VERSION} from './server.js';import {runCli,exitCodeFor} from './cli.js';import {runDoctor} from './doctor.js';import {basename} from 'node:path';
const HELP=`Buffer MCP server and CLI ${VERSION}

buffer-mcp                         Start local stdio MCP
buffer-cli                         List task commands
buffer-cli <command> --help        Current arguments
buffer-cli schema <command>        Full JSON input schema
buffer-cli doctor [--network]      Local configuration / minimal account read
buffer-cli login                   Private API-key setup instructions
buffer-cli --version               Package version

BUFFER_API_KEY / BUFFER_API_TOKEN   Private account-wide PAT or valid OAuth access token
BUFFER_TOKEN_FILE                  Owner-only regular token file, max 64 KiB
BUFFER_ACCOUNTS / _DEFAULT_ACCOUNT  Private named profiles; no inherited global credentials
BUFFER_ORGANIZATION_ID              Optional native organization input default; not a permissions boundary
BUFFER_READ_ONLY=1                  Hide/refuse all mutations, including generic GraphQL
BUFFER_ALLOW_DESTRUCTIVE=0          Refuse mutations even with confirmation
BUFFER_AUDIT_LOG                    Private guard decisions; no input content
BUFFER_REQUEST_TIMEOUT_MS=30000    Local timeout; no automatic retries
BUFFER_MIN_REQUEST_INTERVAL_MS=200  Per-account process pacing

https://github.com/thenavidm/buffer-mcp-cli
`;
async function main():Promise<void>{const args=process.argv.slice(2);const command=args[0];if(['--version','-v'].includes(command??'')){console.log(VERSION);return;}if(['--help','-h','help'].includes(command??'')){process.stdout.write(HELP);return;}if(command==='login'){console.log('Create your own Buffer API key at https://publish.buffer.com/settings/api. Store it privately in BUFFER_API_KEY or BUFFER_TOKEN_FILE. PATs can access every organization in your account; organization defaults do not scope a PAT. OAuth app grants are separate. login prints instructions and does not save keys, open browsers or perform OAuth. See INSTALL.md and doctor.');return;}if(command==='doctor'){if(args.slice(1).some(a=>a!=='--network')){process.exitCode=2;console.error(JSON.stringify({error:'doctor accepts only --network'}));return;}process.exitCode=await runDoctor(args.includes('--network'));return;}if(args.length||basename(process.argv[1]??'').startsWith('buffer-cli')){process.exitCode=await runCli(args);return;}const server=buildServer();await server.connect(new StdioServerTransport());for(const signal of ['SIGTERM','SIGINT'])process.on(signal,()=>void server.close().then(()=>process.exit(0)));}
main().catch(e=>{console.error(JSON.stringify({error:e.message}));process.exitCode=exitCodeFor(e.message);});
