import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "War Thunder DB",
    description: "War Thunder vehicle DB",
};

const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
};

export default RootLayout;
