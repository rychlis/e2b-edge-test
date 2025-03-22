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
		const sandbox = await Sandbox.create("next-empty",
			{
				timeoutMs: 60_000,
				apiKey: env.E2B_API_KEY,
			}
		)
		let stdout = ""
		let stderr = ""
		const result = await sandbox.commands.run("df -h", {
			timeoutMs: 10_000,
			background: true,
			onStdout: (data) => {
				console.log("stdout", data)
				stdout += data
			},
			onStderr: (data) => {
				console.log("stderr", data)
				stderr += data
			},
		})
		await result.wait()
		return new Response('Sandbox created: ' + sandbox.sandboxId + '\nstdout:' + stdout + '\stderr:' + stderr);
	},
} satisfies ExportedHandler<Env>;
