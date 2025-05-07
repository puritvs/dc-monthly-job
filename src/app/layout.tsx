import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";
import JobsProvider from "@/contexts/jobsContext";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "DC-Monthly-Job",
  description: "-",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <JobsProvider>{children}</JobsProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
