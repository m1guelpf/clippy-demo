import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const domain = req.query.domain as string
	res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')

	const widget = await fetch(`https://api.clippy.help/widget`, {
		headers: { Origin: `https://${domain}` },
	})

	if (!widget.ok) res.redirect(`https://clippy.help`)

	res.setHeader('Content-Type', 'text/html; charset=utf-8')
	res.status(200).send(
		`<html>
            <head>
                <style>body { margin: 0; } iframe { width: 100vw; height: 100vh; margin: 0; border: 0; }</style>
            </head>
            <body>
                <iframe src="https://${domain}" style="width: 100%; height: 100%; border: none;"></iframe>
                <script src="https://unpkg.com/clippy-widget@latest"></script>
            </body>
        </html>`
	)
}

export default handler
