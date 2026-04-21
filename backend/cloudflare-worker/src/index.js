/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
    async fetch(request, env, ctx) {
        const targetUrl = new URL(request.url);
		console.log({ targetUrl });

		// 1. Define your headers
		let corsAllowOrigin = null;
		if (targetUrl.hostname === "www.simonhaas.eu") {
			corsAllowOrigin = "https://www.simonhaas.eu";
		} else if (targetUrl.hostname === "typst.link") {
			corsAllowOrigin = "https://typst.link";
		} else if (targetUrl.hostname === "www.typst.link") {
			corsAllowOrigin = "https://www.typst.link";
		}
        const corsHeaders = {
            'Access-Control-Allow-Origin': corsAllowOrigin,
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Max-Age': '86400',
          	'Content-Type': 'text/plain'
        };

        // 2. Handle the "Preflight" request (OPTIONS)
        // Browsers send this BEFORE the actual GET request
        if (request.method === 'OPTIONS') {
            return new Response(null, {
                status: 204,
                headers: corsHeaders,
            });
        }

        // 3. Your actual logic

		const searchParams = targetUrl.searchParams;
		const urlParam = searchParams.get('url');

        if (!urlParam) {
            return new Response('Missing "url" parameter', { status: 400 });
        };

        try {
            const response = await fetch(urlParam);
            const text = await response.text();

            // 4. Return the response WITH the CORS headers
            return new Response(text, {
                status: response.status,
                headers: {
                    ...corsHeaders,
                    'Content-Type': response.headers.get('Content-Type') || 'text/plain',
                },
            });
        } catch (err) {
            return new Response('Error fetching target URL', { 
                status: 500, 
                headers: corsHeaders 
            });
        }
    },
};
