// ==============================================
// Login Page
// ==============================================

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useAuth } from "@/context/auth-context";
import { GraduationCap, Eye, EyeOff, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      toast.success("Welcome back! 🎉");
      router.push("/dashboard");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Invalid email or password";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-purple-500/10 animate-gradient" />
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-float delay-300" />

      <Card className="w-full max-w-md relative z-10 border-border/50 bg-card/80 backdrop-blur-xl shadow-2xl animate-slide-up">
        <CardHeader className="text-center space-y-3">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center gap-2 mb-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-purple-400 flex items-center justify-center shadow-lg shadow-primary/20">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
          </Link>
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>
            Sign in to continue your learning journey
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">


          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="login-password">Password</Label>
              <div className="relative">
                <Input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 pr-10"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 transition-all duration-300 shadow-lg shadow-primary/20"
              disabled={loading}
            >
              {loading ? (
                <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
