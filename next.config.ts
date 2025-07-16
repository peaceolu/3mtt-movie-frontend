import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	ignoreDuringBuilds: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				port: "",
				pathname: "/sightek/**",
				search: "",
			},
			{
				protocol: "http",
				hostname: "image.tmdb.org",
				port: "",
				pathname: "/t/p/w500/**",
				search: "",
			},
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				port: "",
				pathname: "/dzzxgsrbl/image/upload/v1750080930/**",
				search: "",
			},
			{
				protocol: "https",
				hostname: "youtube.com",
				port: "",
				pathname: "/watch/**",
				search: "",
			},
		],
	},
};

module.exports = {
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
	...nextConfig,
};

// export default nextConfig;
