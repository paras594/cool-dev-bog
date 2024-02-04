import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Cool Dev",
    template: "%s | Cool Dev",
  },
  description: "Cool Dev Blog Website for cool programmers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-primary`}>
        <div
          className="grid gap-4 h-full"
          style={{
            gridTemplateRows: "auto 1fr auto",
          }}
        >
          <div className="sticky top-0 z-[50] bg-primary">
            <Navbar />
          </div>
          <div>{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
