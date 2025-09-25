/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    FILECOIN_API_KEY: process.env.FILECOIN_API_KEY,
    SYNTHIK_API_KEY: process.env.SYNTHIK_API_KEY,
  },
}


export default nextConfig;
