import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	output: "standalone",
};

export default withPayload(nextConfig);
