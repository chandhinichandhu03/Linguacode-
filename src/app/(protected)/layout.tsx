// ==============================================
// Protected Layout
// ==============================================
// Layout wrapper for authenticated pages.
// Redirects to login if not authenticated.
// Provides sidebar + navbar + mobile nav structure.

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { PageLoader } from "@/components/shared/loading-spinner";
import { VoiceAssistant } from "@/components/shared/voice-assistant";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <PageLoader />
      </div>
    );
  }

  // Don't render protected content if not authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6 overflow-auto">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />

      {/* Global Voice Assistant */}
      <VoiceAssistant />
    </div>
  );
}
