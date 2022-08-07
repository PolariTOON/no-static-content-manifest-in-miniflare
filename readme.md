# No static content manifest in Miniflare

This is a repository intended to reproduce a bug found in Wrangler 2.

Install Wrangler 2 globally with `npm install -g wrangler`, clone the repository, and go to one of the following directories : `service-worker` or `module-worker`.

Run `npm install` then `wrangler dev` or `wrangler dev --local`, then open the site in the browser and navigate to the root page.

Here are the results you get at the time of writing:

* In `service-worker` with `wrangler dev`, the root page should appear as intended
* In `module-worker` with `wrangler dev`, the root page should appear as intended
* In `service-worker` with `wrangler dev --local`, a `SyntaxError: unexpected token o in JSON at position 1` is thrown
* In `module-worker` with `wrangler dev --local`, a 404 page is send in place of the root page

So the local mode behavior does not match the non-local mode behavior.

See the package [`kv-asset-handler`](https://github.com/cloudflare/kv-asset-handler) for more context.
