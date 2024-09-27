
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"  >
      <body className={inter.className}>
      
    {children}
      <ToastContainer/> </body>
    </html>
  );
}
