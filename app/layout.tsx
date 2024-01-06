import { Providers } from "./providers";
import { Metadata, Viewport } from "next";
import './globals.css';

export const metadata: Metadata = {
    title: "Caboose",
    manifest: "/manifest.json"
}

export const viewport: Viewport = {
    themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className='dark'>
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}