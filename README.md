E2B Typescript SDK currently only support NodeJS runtimes. See https://e2b.dev/docs/troubleshooting/sdks/workers-edge-runtime

We use it in [macaly](macaly.com), where we stream output from sandbox to frontend continually.

With standard nodejs runtime, you usually pay per second of compute. 

With edge runtime, you pay just by CPU time which will be much cheaper! 🎉

This is a proof of concept of using E2B SDK in edge runtime (Cloudflare in this case).

This uses my fork of @e2b/code-interpreter, which uses fork of e2b, which uses fork of connect-web :D with this simple change: https://github.com/rychlis/connect-es/pull/1/files


Main file here: https://github.com/rychlis/e2b-edge-test/blob/main/src/index.ts


This PoC works with creating sandbox and running command inside. In e2b, same could be achieved with pnpm patch
