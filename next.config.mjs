/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qysvdqbzumbcrawbvzzj.supabase.co",
        pathname: "/storage/v1/object/public/klea_uploads/**",
      },

      {
        protocol: "https",
        hostname: "qysvdqbzumbcrawbvzzj.supabase.co",
        pathname: "/storage/v1/object/public/klea_static/**",
      },
    ],
  },
};

export default nextConfig;
