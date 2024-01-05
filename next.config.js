/** @type {import('next').NextConfig} */
const nextConfig = {
    output: (process.env.CABOOSE_WEB_USE_EXPORT ?? "false") == "true" ? 'export' : undefined,
    experimental: {
        typedRoutes: true,
    }
}

module.exports = nextConfig