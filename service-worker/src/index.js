import {getAssetFromKV} from "@cloudflare/kv-asset-handler";
console.log(self.__STATIC_CONTENT_MANIFEST)
const ASSET_MANIFEST = Object.assign(Object.create(null), JSON.parse(self.__STATIC_CONTENT_MANIFEST));
async function handleFetchEvent(event) {
	const {request} = event;
	try {
		const url = new URL(request.url);
		if (url.pathname.endsWith("/")) {
			url.pathname += "index.html";
		}
		if (!(url.pathname.slice(1) in ASSET_MANIFEST)) {
			throw new Error(`File \`${url.pathname}\` not found`);
		}
		return await getAssetFromKV(event);
	} catch (error) {
		console.warn(error.message);
		return new Response("404 Not Found", {
			status: 404,
			headers: {
			"content-type": "text/plain; charset=utf-8",
			},
		});
	}
}
self.addEventListener("fetch", (event) => {
	event.respondWith(handleFetchEvent(event));
});
