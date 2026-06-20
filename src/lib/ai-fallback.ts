// ==============================================
// AI Fallback System (Works without API keys)
// ==============================================
// Provides intelligent responses when external AI APIs are unavailable.

// --- Tokenization Analysis ---
function analyzeTokenization(text: string): string {
  const words = text.split(/\s+/).filter(Boolean);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim());
  const wordTokens = words.map(w => `"${w}"`).join(", ");
  
  let result = `📋 TOKENIZATION ANALYSIS\n\n`;
  result += `📝 Original Text: "${text}"\n\n`;
  result += `1️⃣ WORD TOKENS (${words.length} tokens):\n`;
  result += `   [${wordTokens}]\n\n`;
  result += `2️⃣ SENTENCE TOKENS (${sentences.length} sentences):\n`;
  sentences.forEach((s, i) => {
    result += `   S${i + 1}: "${s.trim()}"\n`;
  });
  result += `\n3️⃣ CHARACTER COUNT PER TOKEN:\n`;
  words.forEach(w => {
    result += `   "${w}" → ${w.length} characters\n`;
  });
  result += `\n4️⃣ SUBWORD ANALYSIS:\n`;
  result += `   Total characters: ${text.length}\n`;
  result += `   Average word length: ${(words.reduce((a, w) => a + w.length, 0) / words.length).toFixed(1)}\n`;
  result += `   Unique tokens: ${new Set(words.map(w => w.toLowerCase())).size}\n`;
  return result;
}

// --- Sentiment Analysis ---
function analyzeSentiment(text: string): string {
  const positiveWords = ['love', 'great', 'amazing', 'wonderful', 'excellent', 'good', 'happy', 'fantastic', 'beautiful', 'awesome', 'best', 'perfect', 'enjoy', 'like', 'brilliant'];
  const negativeWords = ['hate', 'bad', 'terrible', 'awful', 'horrible', 'worst', 'ugly', 'poor', 'boring', 'disappointing', 'sad', 'angry', 'worse', 'annoying', 'disgusting'];
  
  const lower = text.toLowerCase();
  const words = lower.split(/\W+/);
  const posFound = words.filter(w => positiveWords.includes(w));
  const negFound = words.filter(w => negativeWords.includes(w));
  
  const posScore = posFound.length;
  const negScore = negFound.length;
  const total = posScore + negScore || 1;
  const sentiment = posScore > negScore ? "Positive" : negScore > posScore ? "Negative" : "Neutral";
  const confidence = Math.min(95, Math.round((Math.abs(posScore - negScore) / total) * 80 + 15));
  
  let result = `📊 SENTIMENT ANALYSIS\n\n`;
  result += `1️⃣ OVERALL SENTIMENT: ${sentiment} (${confidence}% confidence)\n\n`;
  result += `2️⃣ EMOTION DETECTED: ${sentiment === "Positive" ? "Joy / Satisfaction" : sentiment === "Negative" ? "Frustration / Disappointment" : "Neutral / Informational"}\n\n`;
  result += `3️⃣ KEY PHRASES:\n`;
  if (posFound.length) result += `   ✅ Positive indicators: ${posFound.map(w => `"${w}"`).join(", ")}\n`;
  if (negFound.length) result += `   ❌ Negative indicators: ${negFound.map(w => `"${w}"`).join(", ")}\n`;
  if (!posFound.length && !negFound.length) result += `   ℹ️ No strong sentiment indicators found\n`;
  result += `\n4️⃣ SCORE BREAKDOWN:\n`;
  result += `   Positive score: ${posScore}\n`;
  result += `   Negative score: ${negScore}\n`;
  result += `   Net sentiment: ${posScore - negScore > 0 ? "+" : ""}${posScore - negScore}\n`;
  return result;
}

// --- Named Entity Recognition ---
function analyzeNER(text: string): string {
  const patterns: { regex: RegExp; type: string }[] = [
    { regex: /\b[A-Z][a-z]+ [A-Z][a-z]+\b/g, type: "PERSON" },
    { regex: /\b(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b/gi, type: "DATE" },
    { regex: /\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\b/gi, type: "DATE" },
    { regex: /\b(?:Inc|Corp|LLC|Ltd|Google|Apple|Microsoft|Amazon|Facebook|Meta|Tesla|OpenAI|Netflix)\b/gi, type: "ORGANIZATION" },
    { regex: /\b(?:New York|California|London|Tokyo|Paris|Berlin|Mumbai|Cupertino|San Francisco)\b/gi, type: "LOCATION" },
    { regex: /\b\d{4}\b/g, type: "DATE" },
    { regex: /\$[\d,.]+/g, type: "MONEY" },
    { regex: /\b\d+%/g, type: "PERCENTAGE" },
  ];

  const entities: { text: string; type: string }[] = [];
  for (const p of patterns) {
    const matches = text.match(p.regex);
    if (matches) {
      matches.forEach(m => {
        if (!entities.find(e => e.text === m)) {
          entities.push({ text: m, type: p.type });
        }
      });
    }
  }

  let result = `🏷️ NAMED ENTITY RECOGNITION\n\n`;
  result += `Found ${entities.length} entities in the text:\n\n`;
  if (entities.length === 0) {
    result += `ℹ️ No named entities detected. Try text with names, organizations, locations, or dates.\n`;
  } else {
    entities.forEach((e, i) => {
      result += `${i + 1}. "${e.text}" → [${e.type}]\n`;
    });
  }
  result += `\nENTITY TYPE LEGEND:\n`;
  result += `  PERSON = People's names\n  ORGANIZATION = Companies, institutions\n  LOCATION = Places, cities, countries\n  DATE = Dates, days, years\n  MONEY = Currency amounts\n  PERCENTAGE = Percent values\n`;
  return result;
}

// --- POS Tagging ---
function analyzePOS(text: string): string {
  const commonPOS: Record<string, string> = {
    the: "DET", a: "DET", an: "DET", this: "DET", that: "DET", these: "DET", those: "DET",
    is: "VERB", are: "VERB", was: "VERB", were: "VERB", be: "VERB", been: "VERB", being: "VERB",
    have: "VERB", has: "VERB", had: "VERB", do: "VERB", does: "VERB", did: "VERB",
    will: "AUX", would: "AUX", could: "AUX", should: "AUX", may: "AUX", might: "AUX",
    and: "CONJ", or: "CONJ", but: "CONJ", nor: "CONJ",
    in: "PREP", on: "PREP", at: "PREP", to: "PREP", for: "PREP", with: "PREP", from: "PREP", by: "PREP", of: "PREP", about: "PREP", over: "PREP",
    i: "PRON", you: "PRON", he: "PRON", she: "PRON", it: "PRON", we: "PRON", they: "PRON",
    not: "ADV", very: "ADV", quickly: "ADV", slowly: "ADV", always: "ADV", never: "ADV",
  };

  const words = text.split(/\s+/).filter(Boolean);
  let result = `🏗️ POS TAGGING ANALYSIS\n\n`;
  result += `Text: "${text}"\n\n`;
  result += `WORD → POS TAG:\n`;
  words.forEach(w => {
    const clean = w.replace(/[^a-zA-Z]/g, "").toLowerCase();
    let pos = commonPOS[clean] || "NOUN";
    if (clean.endsWith("ly")) pos = "ADV";
    if (clean.endsWith("ing")) pos = "VERB";
    if (clean.endsWith("ed")) pos = "VERB";
    if (clean.endsWith("ful") || clean.endsWith("ous") || clean.endsWith("ive") || clean.endsWith("al")) pos = "ADJ";
    result += `  "${w}" → ${pos}\n`;
  });
  result += `\nPOS TAG LEGEND:\n`;
  result += `  NOUN = Noun | VERB = Verb | ADJ = Adjective\n`;
  result += `  ADV = Adverb | DET = Determiner | PREP = Preposition\n`;
  result += `  PRON = Pronoun | CONJ = Conjunction | AUX = Auxiliary\n`;
  return result;
}

// --- Text Classification ---
function analyzeClassification(text: string): string {
  const categories: Record<string, string[]> = {
    Technology: ["tech", "software", "computer", "ai", "digital", "app", "code", "data", "algorithm", "internet", "cyber", "robot"],
    Business: ["stock", "market", "company", "profit", "revenue", "investment", "ceo", "business", "trade", "economy", "finance"],
    Sports: ["game", "team", "player", "score", "win", "championship", "match", "goal", "tournament", "athlete"],
    Science: ["research", "study", "experiment", "theory", "molecule", "atom", "physics", "biology", "chemistry", "discovery"],
    News: ["breaking", "report", "announced", "government", "official", "election", "policy", "crisis", "update"],
    Entertainment: ["movie", "music", "film", "actor", "show", "celebrity", "concert", "album", "series", "star"],
  };

  const lower = text.toLowerCase();
  const scores: Record<string, number> = {};
  for (const [cat, words] of Object.entries(categories)) {
    scores[cat] = words.filter(w => lower.includes(w)).length;
  }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const primary = sorted[0][1] > 0 ? sorted[0][0] : "General";

  let result = `📂 TEXT CLASSIFICATION\n\n`;
  result += `1️⃣ PRIMARY CATEGORY: ${primary}\n\n`;
  result += `2️⃣ CATEGORY CONFIDENCE:\n`;
  sorted.forEach(([cat, score]) => {
    const conf = Math.min(95, score * 25 + 10);
    const bar = "█".repeat(Math.round(conf / 10)) + "░".repeat(10 - Math.round(conf / 10));
    result += `   ${cat}: ${bar} ${score > 0 ? conf : 5}%\n`;
  });
  result += `\n3️⃣ KEY FEATURES:\n`;
  for (const [cat, words] of Object.entries(categories)) {
    const found = words.filter(w => lower.includes(w));
    if (found.length) result += `   ${cat}: ${found.map(w => `"${w}"`).join(", ")}\n`;
  }
  return result;
}

// --- Generic NLP Fallback ---
function genericNLPAnalysis(text: string, topic: string): string {
  return `📊 ${topic.toUpperCase()} ANALYSIS\n\nText: "${text}"\n\nThis is a demonstration of ${topic} analysis. The text contains ${text.split(/\s+/).length} words and ${text.length} characters.\n\nKey observations:\n• Word count: ${text.split(/\s+/).length}\n• Sentence count: ${text.split(/[.!?]+/).filter(s => s.trim()).length}\n• Average word length: ${(text.replace(/\s/g, "").length / text.split(/\s+/).length).toFixed(1)} characters\n• Unique words: ${new Set(text.toLowerCase().split(/\W+/)).size}\n\nNote: For more detailed ${topic} analysis with advanced AI models, please configure your API key in .env.local.`;
}

// --- Main NLP Fallback Router ---
export function fallbackNLPAnalysis(text: string, topicId: string, topicTitle: string): string {
  switch (topicId) {
    case "tokenization": return analyzeTokenization(text);
    case "sentiment-analysis": return analyzeSentiment(text);
    case "named-entity-recognition": return analyzeNER(text);
    case "pos-tagging": return analyzePOS(text);
    case "text-classification": return analyzeClassification(text);
    default: return genericNLPAnalysis(text, topicTitle);
  }
}

// --- Voice Conversation Fallback ---
export function fallbackVoiceResponse(userText: string, topic: string): string {
  const lower = userText.toLowerCase();
  
  // NLP topic responses
  const topicResponses: Record<string, string[]> = {
    tokenization: [
      "Tokenization is the process of breaking text into smaller units called tokens. These can be words, subwords, or even characters. It's the very first step in any NLP pipeline.",
      "Great question about tokenization! There are several approaches: word tokenization splits by spaces, subword tokenization like BPE finds common character sequences, and character tokenization treats each letter as a token.",
      "When we tokenize text, we're essentially preparing it for a model to understand. Modern transformers like GPT use Byte Pair Encoding, which balances vocabulary size with meaning preservation.",
    ],
    "sentiment-analysis": [
      "Sentiment analysis determines the emotional tone of text. We classify it as positive, negative, or neutral. Modern approaches use deep learning models trained on millions of labeled examples.",
      "There are different levels of sentiment analysis. Document-level looks at the whole text, sentence-level examines each sentence, and aspect-based sentiment identifies feelings about specific features.",
      "Traditional sentiment analysis used word lists and rules. Now, transformer models like BERT can understand context, sarcasm, and nuanced emotions much better than older approaches.",
    ],
  };

  const responses = topicResponses[topic] || [
    `That's an interesting point about ${topic}. This is a fundamental concept in Natural Language Processing that helps machines understand human language better.`,
    `Great observation! ${topic} is widely used in modern AI applications. Would you like to explore any specific aspect of it further?`,
    `You're making good progress understanding ${topic}. This concept builds on the foundation of how computers process and analyze text data.`,
  ];

  // Greeting detection
  if (lower.match(/^(hi|hello|hey|howdy|greetings)/)) {
    return `Hello! I'm your NLP learning assistant. I'd love to discuss ${topic} with you. What would you like to know about it?`;
  }

  // Question detection
  if (lower.includes("what is") || lower.includes("what are") || lower.includes("explain") || lower.includes("how does")) {
    return responses[0];
  }

  if (lower.includes("example") || lower.includes("show me") || lower.includes("can you")) {
    return responses[1];
  }

  return responses[Math.floor(Math.random() * responses.length)];
}

// --- Chat Fallback ---
export function fallbackChatResponse(userText: string, language: string): string {
  const lower = userText.toLowerCase();

  if (lower.match(/^(hi|hello|hey|namaste|hola|konnichiwa)/)) {
    return `Hello! I'm your AI learning assistant. I can help you with ${language}, coding concepts, NLP topics, and more. What would you like to explore today?`;
  }

  if (lower.includes("how are you")) {
    return `I'm doing great, thanks for asking! I'm here to help you learn. You can ask me about programming, NLP concepts, language learning, or any tech topic!`;
  }

  // NLP knowledge base
  if (lower.includes("nlp") || lower.includes("natural language")) {
    return `NLP (Natural Language Processing) is a branch of AI that helps computers understand, interpret, and generate human language. Key areas include:\n\n• Tokenization — breaking text into words/subwords\n• Sentiment Analysis — detecting emotions in text\n• Named Entity Recognition — identifying people, places, organizations\n• Machine Translation — translating between languages\n• Text Generation — creating human-like text (like GPT, BERT)\n\nNLP powers voice assistants, chatbots, search engines, and translation tools. What specific NLP topic interests you?`;
  }

  // Programming knowledge
  if (lower.includes("python") || lower.includes("javascript") || lower.includes("coding") || lower.includes("programming")) {
    const topic = lower.includes("python") ? "Python" : lower.includes("javascript") ? "JavaScript" : "programming";
    return `Great question about ${topic}! Here are some key concepts to master:\n\n• Variables & Data Types — storing and managing data\n• Functions — reusable blocks of code\n• Control Flow — if/else, loops, switches\n• Data Structures — arrays, objects, maps, sets\n• Algorithms — sorting, searching, recursion\n\nWould you like me to explain any of these in detail? Try the Code Editor section for hands-on practice!`;
  }

  // AI/ML questions
  if (lower.includes("ai") || lower.includes("machine learning") || lower.includes("deep learning")) {
    return `AI and Machine Learning are fascinating fields! Here's a quick overview:\n\n• Machine Learning — algorithms that learn from data\n• Deep Learning — neural networks with many layers\n• Supervised Learning — learning from labeled examples\n• Unsupervised Learning — finding patterns in unlabeled data\n• Reinforcement Learning — learning through trial and error\n\nPopular frameworks include TensorFlow, PyTorch, and scikit-learn. What aspect of AI interests you most?`;
  }

  // General questions
  if (lower.includes("what is") || lower.includes("explain") || lower.includes("how") || lower.includes("why") || lower.includes("tell me")) {
    return `That's a great question! Here's what I can help with:\n\n🔤 Language Learning — vocabulary, grammar, pronunciation\n💻 Coding — Python, JavaScript, Java, C++, and 10+ more languages\n🧠 NLP — tokenization, sentiment analysis, text classification\n🎙️ Voice — text-to-speech, speech recognition practice\n\nTry being specific, like "What is tokenization?" or "Explain Python functions" for detailed answers!`;
  }

  return `Thanks for your message! I can help you with:\n\n• 🔤 Language learning and practice\n• 💻 Coding challenges (5000+ LeetCode-style problems)\n• 🧠 NLP concepts and demos\n• 🎙️ Voice interaction practice\n\nTry asking something specific like "What is NLP?", "Explain Python loops", or "How does sentiment analysis work?"`;
}

// --- Code Explanation Fallback ---
export function fallbackCodeExplanation(code: string, language: string): string {
  const lines = code.split("\n").filter(l => l.trim());
  const hasFunction = /function |def |public .* \(|fn |func /.test(code);
  const hasLoop = /for |while |\.forEach|\.map/.test(code);
  const hasCondition = /if |else |switch |match /.test(code);
  const hasClass = /class /.test(code);
  const hasImport = /import |require|#include|using /.test(code);

  let result = `📖 CODE EXPLANATION (${language})\n\n`;
  result += `📋 Overview:\n`;
  result += `This ${language} code has ${lines.length} lines of code.\n\n`;
  result += `🔍 Structure Analysis:\n`;
  if (hasImport) result += `• Uses external imports/modules\n`;
  if (hasClass) result += `• Defines a class structure\n`;
  if (hasFunction) result += `• Contains function definitions\n`;
  if (hasLoop) result += `• Uses loop constructs for iteration\n`;
  if (hasCondition) result += `• Has conditional logic (if/else)\n`;
  result += `\n📝 Line-by-Line:\n`;
  lines.slice(0, 15).forEach((line, i) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("//") || trimmed.startsWith("#") || trimmed.startsWith("/*")) {
      result += `  Line ${i + 1}: Comment - ${trimmed}\n`;
    } else if (trimmed.startsWith("import") || trimmed.startsWith("#include") || trimmed.startsWith("require")) {
      result += `  Line ${i + 1}: Import statement\n`;
    } else if (/function |def |public .* \(/.test(trimmed)) {
      result += `  Line ${i + 1}: Function definition\n`;
    } else if (trimmed) {
      result += `  Line ${i + 1}: ${trimmed.substring(0, 60)}${trimmed.length > 60 ? "..." : ""}\n`;
    }
  });
  if (lines.length > 15) result += `  ... and ${lines.length - 15} more lines\n`;
  result += `\n💡 Key Concepts: Variables, ${hasFunction ? "Functions, " : ""}${hasLoop ? "Loops, " : ""}${hasCondition ? "Conditionals, " : ""}${hasClass ? "OOP, " : ""}I/O\n`;
  return result;
}

// --- Code Debug Fallback ---
export function fallbackCodeDebug(code: string, language: string, error?: string): string {
  let result = `🐛 DEBUG ANALYSIS (${language})\n\n`;

  if (error) {
    result += `❌ Error reported: ${error}\n\n`;
  }

  result += `🔍 Common Issues Check:\n`;

  // Check for common issues
  const issues: string[] = [];
  if (language.toLowerCase() === "python" && code.includes("{") && code.includes("}")) {
    issues.push("Python uses indentation for blocks, not curly braces {}");
  }
  if (code.includes("==") && !code.includes("===") && language.toLowerCase() === "javascript") {
    issues.push("Consider using === instead of == for strict equality in JavaScript");
  }
  if (/;\s*$/.test(code) && language.toLowerCase() === "python") {
    issues.push("Python doesn't require semicolons at the end of lines");
  }
  if (!code.includes("return") && /function |def /.test(code)) {
    issues.push("Function may be missing a return statement");
  }

  if (issues.length) {
    issues.forEach((issue, i) => {
      result += `  ${i + 1}. ⚠️ ${issue}\n`;
    });
  } else {
    result += `  ✅ No obvious syntax issues detected\n`;
  }

  result += `\n💡 Tips:\n`;
  result += `  • Check variable names for typos\n`;
  result += `  • Verify all brackets/parentheses are matched\n`;
  result += `  • Ensure proper indentation\n`;
  result += `  • Test with simple inputs first\n`;
  return result;
}

// --- Grammar Correction Fallback ---
export function fallbackGrammarCorrection(text: string, language: string): {
  correctedText: string;
  mistakes: { original: string; corrected: string; explanation: string }[];
  overallFeedback: string;
} {
  const mistakes: { original: string; corrected: string; explanation: string }[] = [];

  if (language.toLowerCase() === "english") {
    // Subject-verb agreement with don't
    const dontMatch = text.match(/\b(don't|doesnt|doesn't)\s+(goes|likes|wants|needs|plays|runs|comes)\b/i);
    if (dontMatch) {
      mistakes.push({
        original: `${dontMatch[1]} ${dontMatch[2]}`,
        corrected: `${dontMatch[1]} ${dontMatch[2].replace(/e?s$/, "")}`,
        explanation: `After "don't/doesn't", use the base form of the verb.`,
      });
    }

    // Pronoun case errors
    if (/\b(me|him|her|them)\s+and\s+(me|him|her|them|i)\b/i.test(text)) {
      const match = text.match(/\b(me|him|her|them)\s+and\s+(me|him|her|them|i)\b/i)!;
      mistakes.push({
        original: match[0],
        corrected: "He and I / She and I (subject form)",
        explanation: "When used as a subject, use subject pronouns (I, he, she, they).",
      });
    }

    // Irregular plurals
    if (/\bchilds\b/i.test(text)) {
      mistakes.push({ original: "childs", corrected: "children", explanation: "'Child' has an irregular plural: 'children'." });
    }
    if (/\bmans\b/i.test(text)) {
      mistakes.push({ original: "mans", corrected: "men", explanation: "'Man' has an irregular plural: 'men'." });
    }
    if (/\bwomans\b/i.test(text)) {
      mistakes.push({ original: "womans", corrected: "women", explanation: "'Woman' has an irregular plural: 'women'." });
    }

    // Since + duration
    if (/\bsince\s+\d+\s+(years?|months?|days?|weeks?)\b/i.test(text)) {
      const match = text.match(/\bsince\s+(\d+\s+(?:years?|months?|days?|weeks?))\b/i)!;
      mistakes.push({
        original: `since ${match[1]}`,
        corrected: `for ${match[1]}`,
        explanation: "Use 'for' with durations, 'since' with specific points in time.",
      });
    }

    // Stative verbs in continuous
    if (/\bam\s+(liking|knowing|believing|wanting|needing)\b/i.test(text)) {
      const match = text.match(/\bam\s+(liking|knowing|believing|wanting|needing)\b/i)!;
      const base = match[1].replace(/ing$/, "").replace(/k$/, "ke");
      mistakes.push({
        original: `am ${match[1]}`,
        corrected: base,
        explanation: `"${base}" is a stative verb — not normally used in continuous form.`,
      });
    }

    // for + base verb → to + base verb
    if (/\bfor\s+(buy|eat|go|see|get|make|take|do|have)\b/i.test(text)) {
      const match = text.match(/\bfor\s+(buy|eat|go|see|get|make|take|do|have)\b/i)!;
      mistakes.push({
        original: `for ${match[1]}`,
        corrected: `to ${match[1]}`,
        explanation: "Use 'to' + verb for expressing purpose, not 'for' + base verb.",
      });
    }
  }

  // Generic checks
  if (/  +/.test(text)) {
    mistakes.push({
      original: "multiple consecutive spaces",
      corrected: "single space",
      explanation: "Use single spaces between words.",
    });
  }

  let correctedText = text.replace(/  +/g, " ");
  if (language.toLowerCase() === "english") {
    correctedText = correctedText.replace(/\bchilds\b/gi, "children");
  }

  const overallFeedback = mistakes.length === 0
    ? `Your ${language} text looks correct! No obvious grammar issues found. (Offline analysis — connect AI for deeper checking.)`
    : `Found ${mistakes.length} potential issue${mistakes.length > 1 ? "s" : ""}. Review the corrections to improve your ${language}!`;

  return { correctedText, mistakes, overallFeedback };
}

