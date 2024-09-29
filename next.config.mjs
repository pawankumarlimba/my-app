/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'img.freepik.com',
      'encrypted-tbn0.gstatic.com',
      'aceternity.com',
      'res.cloudinary.com',
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*', // Apply headers to all routes (or adjust to specific routes if necessary)
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
