// ==============================================
// Landing Page
// ==============================================
// Public landing page with hero, features, and CTA.

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Languages,
  Code2,
  MessageSquare,
  Zap,
  Brain,
  BarChart3,
  ArrowRight,
  Sparkles,
  Star,
} from "lucide-react";
import { ThemeToggle } from "@/components/shared/theme-toggle";

const features = [
  {
    icon: Languages,
    title: "AI Language Tutor",
    description:
      "Practice English, Japanese, Spanish, Hindi, and Tamil with an AI that corrects your grammar and simulates real conversations.",
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: Code2,
    title: "Interactive Coding Lab",
    description:
      "Learn Python, JavaScript, C++, Java, and HTML/CSS with a built-in code editor, AI debugging, and live explanations.",
    color: "from-green-500 to-emerald-400",
  },
  {
    icon: MessageSquare,
    title: "Smart AI Chat",
    description: "Chat freely with our AI — ask questions, get explanations, and practice in any language or coding topic.",
    color: "from-purple-500 to-pink-400",
  },
  {
    icon: Brain,
    title: "AI-Generated Quizzes",
    description:
      "Test your knowledge with adaptive quizzes tailored to your level. Get instant feedback and explanations.",
    color: "from-orange-500 to-yellow-400",
  },
  {
    icon: Zap,
    title: "Daily Practice",
    description:
      "Build habits with daily streaks, vocabulary cards, and bite-sized challenges to keep your skills sharp.",
    color: "from-red-500 to-rose-400",
  },
  {
    icon: BarChart3,
    title: "Track Your Progress",
    description:
      "Visual dashboard with charts, streaks, XP tracking, and a leaderboard to stay motivated.",
    color: "from-indigo-500 to-violet-400",
  },
];

const stats = [
  { value: "10+", label: "Languages & Skills" },
  { value: "AI", label: "Powered by AI" },
  { value: "∞", label: "Practice Sessions" },
  { value: "24/7", label: "Available" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ===== Navbar ===== */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-purple-400 flex items-center justify-center shadow-md">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              LinguaCode AI
            </span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                size="sm"
                className="bg-gradient-to-r from-primary to-purple-500 shadow-md shadow-primary/20"
              >
                Get Started
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ===== Hero Section ===== */}
      <section className="relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float delay-300" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-20 pb-24 relative">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-6 px-4 py-1.5 text-sm bg-primary/10 text-primary border-primary/20 animate-slide-up">
              Powered by AI
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-slide-up delay-100">
              Master{" "}
              <span className="bg-gradient-to-r from-primary via-purple-400 to-pink-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Languages
              </span>{" "}
              &{" "}
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Coding
              </span>{" "}
              with AI
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up delay-200">
              Your personal AI tutor for spoken languages and programming. Practice
              conversations, solve coding challenges, and track your progress — all
              in one beautiful platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up delay-300">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="h-12 px-8 text-base bg-gradient-to-r from-primary to-purple-500 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                >
                  Start Learning Free
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 text-base border-border/50 hover:bg-accent"
                >
                  I have an account
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-3xl mx-auto">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center p-4 rounded-2xl bg-card/50 border border-border/30 backdrop-blur-sm animate-slide-up delay-${(i + 1) * 100}`}
              >
                <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Features Section ===== */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              <Star className="h-3.5 w-3.5 mr-1.5" />
              Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to{" "}
              <span className="text-primary">learn effectively</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Combine the power of AI with proven learning techniques for an
              experience that adapts to your pace and style.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="card-hover border-border/50 bg-card/80 backdrop-blur-sm group"
              >
                <CardContent className="p-6">
                  <div
                    className={`h-12 w-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA Section ===== */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-purple-500/5 to-primary/5" />
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to start your{" "}
            <span className="text-primary">learning journey</span>?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of learners using AI to master new languages and
            programming skills. It&apos;s free, it&apos;s fun, and it works.
          </p>
          <Link href="/signup">
            <Button
              size="lg"
              className="h-14 px-10 text-lg bg-gradient-to-r from-primary to-purple-500 shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 animate-pulse-glow"
            >
              Get Started — It&apos;s Free
              <Sparkles className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t border-border/50 py-8 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary to-purple-400 flex items-center justify-center">
              <GraduationCap className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-sm">LinguaCode AI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} LinguaCode AI. Built with ❤️ and AI.
          </p>
        </div>
      </footer>
    </div>
  );
}
