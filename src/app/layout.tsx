import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/providers/ThemeProviders";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSiderbar";
import NoteProvider from "@/providers/NotePorvider";

export const metadata: Metadata = {
  title: "notes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="white">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NoteProvider>
            <SidebarProvider>
              <AppSidebar />
              <div className="flex min-h-screen w-full flex-col">
                <Header />
                <main className="flex flex-1 flex-col px-4 pt-10 xl:px-8  ">
                  {children}
                </main>
                <Toaster />
              </div>
            </SidebarProvider>
          </NoteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
