import type { ReactNode } from "react";
import NavBar from "@/components/NavBar";
import { orbitron, exo2 } from "./fonts";
import "./globals.css";

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children } : LayoutProps) {
  return (
    <html lang="en" className={`${orbitron.variable} ${exo2.variable}`}>
      <body className="bg-orange-50 flex flex-col min-h-screen px-4 py-2">
        <header>
          <NavBar />
        </header>
        <main className="grow py-3">
          {children}
        </main>
        <footer className="text-center text-xs border-t py-3 text-slate-500">
          Game data and images courtesy of <a href="https://rawg.io/" target="_blank"
          className="text-orange-800 hover:underline"
          >RAWG</a>
        </footer>
      </body>
    </html>
  )
}
