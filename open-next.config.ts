import { defineCloudflareConfig } from "@opennextjs/cloudflare";

const openNextConfig = {
	...defineCloudflareConfig(),
	buildCommand: "node node_modules/next/dist/bin/next build",
};

export default openNextConfig;
