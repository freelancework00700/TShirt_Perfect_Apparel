/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",
  // reactStrictMode: true,
};
module.exports = nextConfig;
// export default nextConfig;

module.exports = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
}
