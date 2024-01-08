/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'agriconnect.antoinejosset.fr'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'agriconnect.antoinejosset.fr',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
};

module.exports = nextConfig;
