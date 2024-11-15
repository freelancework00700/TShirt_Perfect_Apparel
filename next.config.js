const { hostname } = require('os');

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
  images: {
    domains: ['localhost', '138.197.15.44', '192.168.1.61'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/product-image/**',
      },
      {
        protocol: 'http',
        hostname: '138.197.15.44',
        port: '20040',
        pathname: '/product-image/**',
      },
      {
        protocol: 'http',
        hostname: '192.168.1.61',
        port: '11015',
        pathname: '/product-image/**',
      },
      {
        protocol: 'http',
        hostname: '138.197.15.44',
        port: '20041',
        pathname: '/product-image/**',
      },
    ],
  },
}
