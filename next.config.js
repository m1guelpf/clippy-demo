/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	redirects: async () => {
		return [{ source: '/', destination: 'https://clippy.help', permanent: true }]
	},
	rewrites: async () => {
		return [{ source: '/:url*', destination: '/api/demo?url=:url*' }]
	},
}

module.exports = nextConfig
