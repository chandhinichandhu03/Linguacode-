// ==============================================
// Coding Challenges Page (5000+ LeetCode-Style Problems)
// ==============================================

"use client";

import { use, useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CodeEditor } from "@/components/coding/code-editor";
import { CodeOutput } from "@/components/coding/code-output";
import { CODING_LANGUAGES, MONACO_LANGUAGE_MAP } from "@/lib/constants";
import { getProblemsPage, CATEGORIES, type Problem } from "@/lib/problems-generator";
import { ArrowLeft, Puzzle, Loader2, Search, ChevronLeft, ChevronRight, CheckCircle2, PlayCircle, FlaskConical } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const DIFF_COLORS = {
  easy: "bg-green-500/10 text-green-500 border-green-500/20",
  medium: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  hard: "bg-red-500/10 text-red-500 border-red-500/20",
};

export default function ChallengesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params);
  const language = CODING_LANGUAGES.find((l) => l.id === lang);
  const [activeProblem, setActiveProblem] = useState<Problem | null>(null);
  const [code, setCode] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [diffFilter, setDiffFilter] = useState("all");
  const [catFilter, setCatFilter] = useState("all");
  const [solvedIds, setSolvedIds] = useState<Set<number>>(new Set());
  const perPage = 50;

  if (!language) return notFound();

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`solved_${lang}`);
      if (saved) setSolvedIds(new Set(JSON.parse(saved)));
    } catch {}
  }, [lang]);

  const { problems, total, totalPages } = useMemo(
    () => getProblemsPage(page, perPage, { difficulty: diffFilter, category: catFilter, search }),
    [page, diffFilter, catFilter, search]
  );

  const monacoLang = MONACO_LANGUAGE_MAP[lang] || "plaintext";

  const openProblem = (p: Problem) => {
    setActiveProblem(p);
    setCode(p.starterCode[lang] || p.starterCode.python || "// Start coding...");
    setFeedback("");
  };

  const submitSolution = async () => {
    if (!code.trim() || !activeProblem) { toast.error("Write some code first"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/ai/code-explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code, language: language.name,
          prompt: `Review this solution for: "${activeProblem.title}" - ${activeProblem.description}. Test cases: ${activeProblem.testCases.map(t => `Input: ${t.input}, Expected: ${t.expected}`).join("; ")}. Provide feedback on correctness, time complexity, and improvements.`,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setFeedback(data.response);
      const newSolved = new Set(solvedIds);
      newSolved.add(activeProblem.id);
      setSolvedIds(newSolved);
      localStorage.setItem(`solved_${lang}`, JSON.stringify([...newSolved]));
      toast.success("Solution reviewed! +15 XP");
    } catch { toast.error("Failed to submit"); }
    finally { setLoading(false); }
  };

  // Problem detail view
  if (activeProblem) {
    return (
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setActiveProblem(null)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">#{activeProblem.id}</span>
              <h1 className="text-xl font-bold truncate">{activeProblem.title}</h1>
              <Badge variant="outline" className={DIFF_COLORS[activeProblem.difficulty]}>{activeProblem.difficulty}</Badge>
              <Badge variant="secondary" className="text-xs">{activeProblem.category}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{activeProblem.description}</p>
          </div>
        </div>

        {/* Test Cases */}
        <Card className="border-border/50 bg-card/80">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <FlaskConical className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold">Test Cases</span>
            </div>
            <div className="grid gap-2">
              {activeProblem.testCases.map((tc, i) => (
                <div key={i} className="flex gap-4 text-xs font-mono bg-muted/40 rounded-lg p-3 border border-border/30">
                  <div><span className="text-muted-foreground">Input:</span> {tc.input}</div>
                  <div><span className="text-muted-foreground">Expected:</span> <span className="text-green-500">{tc.expected}</span></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="space-y-3">
            <CodeEditor value={code} onChange={(val) => setCode(val || "")} language={monacoLang} height="400px" />
            <Button onClick={submitSolution} disabled={loading} className="w-full bg-gradient-to-r from-primary to-purple-500">
              {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Puzzle className="h-4 w-4 mr-2" />}
              Submit Solution
            </Button>
          </div>
          <CodeOutput content={feedback} loading={loading} title="AI Feedback" />
        </div>
      </div>
    );
  }

  // Problem list view
  return (
    <div className="max-w-6xl mx-auto space-y-4">
      <div className="flex items-center gap-3">
        <Link href={`/coding/${lang}`}>
          <Button variant="ghost" size="icon" className="rounded-full"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Puzzle className="h-5 w-5 text-primary" />
            {language.icon} {language.name} Challenges
          </h1>
          <p className="text-sm text-muted-foreground">{total.toLocaleString()} problems available • {solvedIds.size} solved</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search problems..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-border/50 bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <select value={diffFilter} onChange={(e) => { setDiffFilter(e.target.value); setPage(1); }}
          className="px-3 py-2 rounded-lg border border-border/50 bg-muted/30 text-sm">
          <option value="all">All Difficulties</option>
          <option value="easy">🟢 Easy</option>
          <option value="medium">🟡 Medium</option>
          <option value="hard">🔴 Hard</option>
        </select>
        <select value={catFilter} onChange={(e) => { setCatFilter(e.target.value); setPage(1); }}
          className="px-3 py-2 rounded-lg border border-border/50 bg-muted/30 text-sm">
          <option value="all">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Problem Table */}
      <Card className="border-border/50 bg-card/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30 text-muted-foreground">
                <th className="text-left p-3 w-10">#</th>
                <th className="text-left p-3">Title</th>
                <th className="text-left p-3 w-24">Difficulty</th>
                <th className="text-left p-3 w-32 hidden sm:table-cell">Category</th>
                <th className="text-center p-3 w-20 hidden md:table-cell">Accept.</th>
                <th className="text-center p-3 w-16">Status</th>
              </tr>
            </thead>
            <tbody>
              {problems.map((p) => (
                <tr key={p.id} onClick={() => openProblem(p)}
                  className="border-b border-border/20 hover:bg-muted/30 cursor-pointer transition-colors">
                  <td className="p-3 text-muted-foreground">{p.id}</td>
                  <td className="p-3 font-medium hover:text-primary transition-colors">{p.title}</td>
                  <td className="p-3">
                    <Badge variant="outline" className={cn("text-xs", DIFF_COLORS[p.difficulty])}>{p.difficulty}</Badge>
                  </td>
                  <td className="p-3 text-muted-foreground text-xs hidden sm:table-cell">{p.category}</td>
                  <td className="p-3 text-center text-muted-foreground hidden md:table-cell">{p.acceptance}%</td>
                  <td className="p-3 text-center">
                    {solvedIds.has(p.id) ? <CheckCircle2 className="h-4 w-4 text-green-500 mx-auto" /> : <span className="text-muted-foreground">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Showing {(page-1)*perPage+1}-{Math.min(page*perPage, total)} of {total.toLocaleString()}
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(p => p-1)}>
            <ChevronLeft className="h-4 w-4" /> Prev
          </Button>
          <span className="flex items-center px-3 text-sm">{page}/{totalPages}</span>
          <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(p => p+1)}>
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
