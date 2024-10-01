import type { Metadata } from "next";
import { AuthProvider } from "@/contexts/auth";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import MainLayout from "@/components/Layout/MainLayout";
import AntdStyledComponentsRegistry from "@/libs/AntdStyledComponentsRegistry";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
    title: "Conduit",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.png" type="image/png" />

                {/* <link
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
                    rel="stylesheet"
                    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
                    crossOrigin="anonymous"
                /> */}

                <link
                    href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic"
                    rel="stylesheet"
                    type="text/css"
                ></link>
            </head>
            <body>
                <AuthProvider>
                    <AntdStyledComponentsRegistry>
                        <MainLayout>{children}</MainLayout>
                        <Toaster position="bottom-right" />
                    </AntdStyledComponentsRegistry>
                </AuthProvider>
                <Script
                    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
                    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
                    crossOrigin="anonymous"
                ></Script>
                <SpeedInsights />
            </body>
        </html>
    );
}
