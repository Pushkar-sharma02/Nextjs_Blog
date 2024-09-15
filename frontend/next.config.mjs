/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://nextjs-blog-hbrf.onrender.com/api/:path*',
      },
    ];
  },
};

export default nextConfig;