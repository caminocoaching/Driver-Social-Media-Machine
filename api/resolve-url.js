// Vercel Serverless Function — Resolves Google Grounding API Redirect URLs
// This runs SERVER-SIDE, bypassing CORS restrictions that block browser-side resolution.
// The browser fetch() cannot follow cross-origin redirects from vertexaisearch.cloud.google.com
// because the redirect target (e.g. crash.net) doesn't set Access-Control-Allow-Origin.

export const config = { runtime: 'edge' };

export default async function handler(req) {
    const { searchParams } = new URL(req.url);
    const targetUrl = searchParams.get('url');

    // CORS headers for the response
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (!targetUrl) {
        return new Response(
            JSON.stringify({ error: 'url parameter required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }

    // Only allow resolving Google grounding redirect URLs (security measure)
    if (!targetUrl.includes('grounding-api-redirect') && !targetUrl.includes('vertexaisearch')) {
        return new Response(
            JSON.stringify({ resolvedUrl: targetUrl }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }

    try {
        // HEAD request — fastest, follows redirects server-side
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        const response = await fetch(targetUrl, {
            method: 'HEAD',
            redirect: 'follow',
            signal: controller.signal,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
            }
        });
        clearTimeout(timeoutId);

        if (response.url && response.url !== targetUrl && !response.url.includes('grounding-api-redirect')) {
            return new Response(
                JSON.stringify({ resolvedUrl: response.url }),
                { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }
    } catch (e) {
        // HEAD failed, try GET
    }

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        const response = await fetch(targetUrl, {
            method: 'GET',
            redirect: 'follow',
            signal: controller.signal,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
            }
        });
        clearTimeout(timeoutId);

        if (response.url && response.url !== targetUrl && !response.url.includes('grounding-api-redirect')) {
            return new Response(
                JSON.stringify({ resolvedUrl: response.url }),
                { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }
    } catch (e) {
        // GET also failed
    }

    // Could not resolve — return original
    return new Response(
        JSON.stringify({ resolvedUrl: targetUrl, unresolved: true }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
}
