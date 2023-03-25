import "@/styles/globals.css";
import { Inter } from "@next/font/google";
import { Toaster } from "@/components/ui/Toaster";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
    return (
        <div className={inter.className}>
            <Component {...pageProps} />
            <Toaster />
        </div>
    );
}
