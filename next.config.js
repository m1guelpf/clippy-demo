/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	redirects: async () => {
		return [{ source: '/', destination: 'https://clippy.help', permanent: true }]
	},
	rewrites: async () => {
		return [{ source: '/:domain', destination: '/api/demo?domain=:domain' }]
	},
}

module.exports = nextConfig
