// ==============================================
// Code Editor Page (Monaco + AI Assistant)
// ==============================================

"use client";

import { use, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CodeEditor } from "@/components/coding/code-editor";
import { AIAssistant } from "@/components/coding/ai-assistant";
import { CODING_LANGUAGES, MONACO_LANGUAGE_MAP } from "@/lib/constants";
import { ArrowLeft, Code2 } from "lucide-react";
import { notFound } from "next/navigation";

// Default starter code per language
const starterCode: Record<string, string> = {
  python: `# Welcome to Python! 🐍\ndef greet(name):\n    return f"Hello, {name}! Welcome to Python."\n\nprint(greet("World"))\n`,
  javascript: `// Welcome to JavaScript! ⚡\nfunction greet(name) {\n  return \`Hello, \${name}! Welcome to JavaScript.\`;\n}\nconsole.log(greet("World"));\n`,
  typescript: `// Welcome to TypeScript! 🔷\nfunction greet(name: string): string {\n  return \`Hello, \${name}! Welcome to TypeScript.\`;\n}\nconsole.log(greet("World"));\n`,
  cpp: `// Welcome to C++! ⚙️\n#include <iostream>\n#include <string>\nusing namespace std;\n\nstring greet(const string& name) {\n    return "Hello, " + name + "! Welcome to C++.";\n}\n\nint main() {\n    cout << greet("World") << endl;\n    return 0;\n}\n`,
  c: `// Welcome to C! 🔧\n#include <stdio.h>\n\nint main() {\n    printf("Hello, World! Welcome to C.\\n");\n    return 0;\n}\n`,
  java: `// Welcome to Java! ☕\npublic class Main {\n    public static String greet(String name) {\n        return "Hello, " + name + "! Welcome to Java.";\n    }\n    public static void main(String[] args) {\n        System.out.println(greet("World"));\n    }\n}\n`,
  csharp: `// Welcome to C#! 🟣\nusing System;\n\nclass Program {\n    static string Greet(string name) {\n        return $"Hello, {name}! Welcome to C#.";\n    }\n    static void Main() {\n        Console.WriteLine(Greet("World"));\n    }\n}\n`,
  go: `// Welcome to Go! 🐹\npackage main\n\nimport "fmt"\n\nfunc greet(name string) string {\n    return "Hello, " + name + "! Welcome to Go."\n}\n\nfunc main() {\n    fmt.Println(greet("World"))\n}\n`,
  rust: `// Welcome to Rust! 🦀\nfn greet(name: &str) -> String {\n    format!("Hello, {}! Welcome to Rust.", name)\n}\n\nfn main() {\n    println!("{}", greet("World"));\n}\n`,
  ruby: `# Welcome to Ruby! 💎\ndef greet(name)\n  "Hello, #{name}! Welcome to Ruby."\nend\n\nputs greet("World")\n`,
  swift: `// Welcome to Swift! 🍎\nfunc greet(_ name: String) -> String {\n    return "Hello, \\(name)! Welcome to Swift."\n}\n\nprint(greet("World"))\n`,
  kotlin: `// Welcome to Kotlin! 🟠\nfun greet(name: String): String {\n    return "Hello, $name! Welcome to Kotlin."\n}\n\nfun main() {\n    println(greet("World"))\n}\n`,
  php: `<?php\n// Welcome to PHP! 🐘\nfunction greet($name) {\n    return "Hello, $name! Welcome to PHP.";\n}\n\necho greet("World");\n?>\n`,
  sql: `-- Welcome to SQL! 🗃️\n-- Try writing queries here\n\nSELECT 'Hello, World! Welcome to SQL.' AS greeting;\n`,
  htmlcss: `<!-- Welcome to HTML/CSS! 🎨 -->\n<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <title>My First Page</title>\n    <style>\n        body { font-family: Arial; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: linear-gradient(135deg, #667eea, #764ba2); color: white; }\n        .card { background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 1rem; text-align: center; }\n    </style>\n</head>\n<body>\n    <div class="card"><h1>Hello, World!</h1><p>Welcome to HTML & CSS.</p></div>\n</body>\n</html>\n`,
};

export default function EditorPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = use(params);
  const language = CODING_LANGUAGES.find((l) => l.id === lang);
  const [code, setCode] = useState(starterCode[lang] || "// Start coding here...");

  if (!language) return notFound();

  const monacoLang = MONACO_LANGUAGE_MAP[lang] || "plaintext";

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <div className="flex items-center gap-3">
        <Link href={`/coding/${lang}`}>
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Code2 className="h-5 w-5 text-primary" />
            {language.icon} {language.name} Editor
          </h1>
          <p className="text-sm text-muted-foreground">
            Write code and get AI explanations
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-4">
        {/* Editor - takes 3/5 */}
        <div className="lg:col-span-3">
          <CodeEditor
            value={code}
            onChange={(val) => setCode(val || "")}
            language={monacoLang}
            height="calc(100vh - 14rem)"
          />
        </div>

        {/* AI Assistant - takes 2/5 */}
        <div className="lg:col-span-2">
          <AIAssistant code={code} language={language.name} />
        </div>
      </div>
    </div>
  );
}
