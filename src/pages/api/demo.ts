import { NextRequest } from 'next/server'

const handler = async (req: NextRequest) => {
	const url = req.nextUrl.searchParams.get('url')
	const theme = req.nextUrl.searchParams.get('theme') ?? 'dark'

	let host: string
	try {
		host = new URL(`https://${url}`).host
	} catch (e) {
		return new Response('Invalid URL', { status: 400 })
	}

	const widget = await fetch(`https://api.clippy.help/widget`, { headers: { Origin: `https://${host}` } })

	if (!widget.ok) return new Response('Not found', { status: 404 })

	return new Response(
		`<html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>body { margin: 0; } iframe { width: 100%; height: 100%; margin: 0; border: 0; }</style>
                <base href="https://${host}">
            </head>
            <body>
                <iframe src="https://${url}"></iframe>
                <script src="https://unpkg.com/clippy-widget@latest" id="clippy-script" async data-theme="${theme}"></script>
            </body>
        </html>`,
		{
			status: 200,
			headers: {
				'Content-Type': 'text/html; charset=utf-8',
				'Cache-Control': 's-maxage=1, stale-while-revalidate',
			},
		}
	)
}

export default handler

export const config = {
	runtime: 'edge',
}
