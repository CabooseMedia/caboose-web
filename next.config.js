/** @type {import('next').NextConfig} */

const withSerwist = require("@serwist/next").default({
    swSrc: "lib/sw.ts",
    swDest: "public/sw.js",
});

const nextConfig = {
    output: (process.env.CABOOSE_WEB_USE_EXPORT ?? "false") == "true" ? 'export' : undefined,
    experimental: {
        typedRoutes: true,
    }
}

module.exports = withSerwist(nextConfig);