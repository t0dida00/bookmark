export async function POST(req) {
    const { url } = await req.json();

    if (!url) {
        return new Response(JSON.stringify({ error: 'URL is required' }), { status: 400 });
    }

    try {
        const response = await fetch(url);
        const html = await response.text();

        // Use a regular expression to extract the title tag content
        const match = html.match(/<title>(.*?)<\/title>/i);
        const title = match ? match[1] : null;
        if (title && title!='Error') {
            // res.status(200).json({ title });
            return new Response(JSON.stringify({ title }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'Title not found' }), { status: 404 });
            // res.status(404).json({ error: 'Title not found' });
        }
        // return new Response(JSON.stringify({ title }), { status: 200 });
    } catch (error) {
        console.error("Error fetching site title:", error);
        return new Response(JSON.stringify({ error: 'Failed to fetch title' }), { status: 500 });
    }
}