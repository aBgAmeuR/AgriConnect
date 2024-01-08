/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: '**',
    //   },
    //   {
    //     protocol: 'http',
    //     hostname: '**',
    //   },
    // ],
    loader: 'custom',
    loaderFile: './src/lib/imagesLoader.ts',
  },
};

module.exports = nextConfig;
