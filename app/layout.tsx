import { Providers } from "./providers";
import { Metadata } from "next";
import './globals.css';

export const metadata: Metadata = {
    title: "Caboose"
}

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