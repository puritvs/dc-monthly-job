import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";
import JobsProvider from "@/contexts/jobsContext";
import { Toaster } from "sonner";
import UserProvider from "@/contexts/userContext";

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
          <UserProvider>
            <JobsProvider>{children}</JobsProvider>
          </UserProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
