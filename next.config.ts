import type { NextConfig } from "next";

const nextConfig: NextConfig = {

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'twehizpuhmnhkfmdkqmr.supabase.co',
                port: '',
                pathname: '/storage/v1/object/sign/**',
            },
        ],
    },

    async rewrites() {
        return [
            {
                source: "/login",
                destination: "/auth/login",
            },
            {
                source: "/signup",
                destination: "/auth/sign-up",
            },
        ];
    },
};

export default nextConfig;