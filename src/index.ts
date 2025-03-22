/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { Sandbox } from "@e2b/code-interpreter"

export default {
	async fetch(request, env, ctx): Promise<Response> {
		console.log(env.E2B_API_KEY)
		// @ts-ignore - hack to make e2b work
		globalThis.process = {env: env}
		const sandbox = await Sandbox.create("next-empty",
			{
				timeoutMs: 1000,
			}
		)
		return new Response('Sandbox created: ' + sandbox.sandboxId);
	},
} satisfies ExportedHandler<Env>;
