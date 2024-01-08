/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'agriconnect.antoinejosset.fr'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'agriconnect.antoinejosset.fr',
        port: '',
        pathname: '/api/ressource/image/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/api-agriconnect/ressource/image/**',
      },
    ],
  },
};

module.exports = nextConfig;
