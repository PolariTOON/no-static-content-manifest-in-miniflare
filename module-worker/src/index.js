import {getAssetFromKV} from "@cloudflare/kv-asset-handler";
import __STATIC_CONTENT_MANIFEST from '__STATIC_CONTENT_MANIFEST'
console.log(__STATIC_CONTENT_MANIFEST)
const ASSET_MANIFEST = Object.assign(Object.create(null), JSON.parse(__STATIC_CONTENT_MANIFEST));
export default {
  async fetch(request, env, ctx) {
		try {
			const url = new URL(request.url);
			if (url.pathname.endsWith("/")) {
				url.pathname += "index.html";
			}
			if (!(url.pathname.slice(1) in ASSET_MANIFEST)) {
				throw new Error(`File \`${url.pathname}\` not found`);
			}
			return await getAssetFromKV(
				{
					request,
					waitUntil(promise) {
						return ctx.waitUntil(promise);
					},
				},
				{
				ASSET_NAMESPACE: env.__STATIC_CONTENT,
				ASSET_MANIFEST,
			});
		} catch (error) {
			console.warn(error.message);
			return new Response("404 Not Found", {
				status: 404,
				headers: {
				"content-type": "text/plain; charset=utf-8",
				},
			});
		}
  },
}
