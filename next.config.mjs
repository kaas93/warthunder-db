/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "wtvehiclesapi.sgambe.serv00.net",
                port: "",
                pathname: "/assets/**",
            },
        ],
    },
};

export default nextConfig;
