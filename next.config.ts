import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  async rewrites() {
    return [
      {
        source: "/login",
        destination: "/auth/login",
      },
      // Tu peux aussi ajouter le signup si nécessaire
      {
        source: "/signup",
        destination: "/auth/sign-up",
      },
    ];
  },
};

export default nextConfig;