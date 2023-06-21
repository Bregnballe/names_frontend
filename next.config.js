/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: "/api/names",
				destination: "http://localhost:3000/api/names",
			},
		];
	},
};

module.exports = nextConfig;
