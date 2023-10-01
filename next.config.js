/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: true,
		serverComponentsExternalPackages: ['mongoose'],
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'img.clerk.com',
			},
			{
				protocol: 'https',
				hostname: 'images.clerk.dev',
			},
			{
				protocol: 'https',
				hostname: 'uploadthing.com',
			},
			{
				protocol: 'https',
				hostname: 'placehold.co',
			},
			{
				protocol: 'https',
				hostname: 'utfs.io', // Add this line
			},
		],
		typescript: {
			ignoreBuildErrors: true,
		},
	},
};

module.exports = nextConfig;
