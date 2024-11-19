import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeToggler from "./{components}/ThemeToggler";
import { AuthProvider } from "@/app/context/AuthContext";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Huxlogs",
  description: "Bank logs, credit cards etc",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        <ThemeProvider>
          <AuthProvider>
            <ThemeToggler />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
