export type Account = {name:string;apiToken:string;tokenFile:string;organizationId:string};
export type Config = {accounts:Account[];defaultAccount:string;readOnly:boolean;allowDestructive:boolean;auditPath:string;timeoutMs:number;minIntervalMs:number};
function integer(v:string|undefined,defaultValue:number,min:number,max:number):number{const n=v?Number(v):defaultValue;if(!Number.isInteger(n)||n<min||n>max)throw Error('Invalid request timeout or pacing settings.');return n;}
export function loadConfig(env:NodeJS.ProcessEnv=process.env):Config{
 let entries:Record<string,unknown>[]=[];
 if(env.BUFFER_ACCOUNTS){try{const v=JSON.parse(env.BUFFER_ACCOUNTS);if(!Array.isArray(v))throw Error();entries=v;}catch{throw Error('BUFFER_ACCOUNTS must be a private JSON array of named accounts.');}}
 else if(env.BUFFER_API_KEY||env.BUFFER_API_TOKEN||env.BUFFER_TOKEN_FILE)entries=[{name:'default',api_key:env.BUFFER_API_KEY??env.BUFFER_API_TOKEN,token_file:env.BUFFER_TOKEN_FILE,organization_id:env.BUFFER_ORGANIZATION_ID}];
 const accounts=entries.map(x=>{if(!x||typeof x!=='object'||typeof x.name!=='string'||!x.name.trim())throw Error('Every Buffer account requires a unique nonempty name.');for(const k of ['api_key','api_token','token_file','organization_id'])if(x[k]!==undefined&&(typeof x[k]!=='string'||/[\r\n]/.test(x[k] as string)))throw Error('Private Buffer profile settings must be strings without line breaks.');return {name:x.name.trim(),apiToken:String(x.api_key??x.api_token??''),tokenFile:String(x.token_file??''),organizationId:String(x.organization_id??'')};});
 if(new Set(accounts.map(a=>a.name)).size!==accounts.length)throw Error('Buffer account names must be unique.');
 const defaultAccount=env.BUFFER_DEFAULT_ACCOUNT??accounts[0]?.name??'';if(defaultAccount&&!accounts.some(a=>a.name===defaultAccount))throw Error('Unknown account configured as BUFFER_DEFAULT_ACCOUNT.');
 return {accounts,defaultAccount,readOnly:/^(1|true)$/i.test(env.BUFFER_READ_ONLY??''),allowDestructive:!/^(0|false)$/i.test(env.BUFFER_ALLOW_DESTRUCTIVE??''),auditPath:env.BUFFER_AUDIT_LOG??'',timeoutMs:integer(env.BUFFER_REQUEST_TIMEOUT_MS,30000,100,300000),minIntervalMs:integer(env.BUFFER_MIN_REQUEST_INTERVAL_MS,200,0,10000)};
}
export function selectAccount(config:Config,hint?:string):Account{const a=config.accounts.find(a=>a.name===(hint??config.defaultAccount));if(!a)throw Error(config.accounts.length?'Unknown account. Run list_accounts and use its exact name.':'No credentials configured. Set BUFFER_API_KEY or BUFFER_TOKEN_FILE privately; run buffer-cli login.');return a;}
