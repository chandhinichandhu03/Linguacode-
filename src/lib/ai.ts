// ==============================================
// AI Client (Server-Side Only)
// ==============================================
// Helper functions for interacting with the AI API.
// Powered by Groq for fast, open-source model inference.

import Groq from "groq-sdk";

// Initialize the client pointing to Google's Gemini OpenAI-compatible endpoint
const groq = new Groq({
  apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.GROQ_API_KEY || "",
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

// Configure the default model to Gemini
const DEFAULT_MODEL = "gemini-1.5-flash";

// --- Chat Generation ---
// Generates a conversational response for language practice
export async function generateChat(
  messages: { role: string; content: string }[],
  language: string,
  systemPrompt?: string
) {
  const defaultPrompt = `You are a friendly and patient ${language} language tutor. 
  Help the user practice ${language} through natural conversation. 
  Correct any grammar mistakes gently and explain why.
  Keep responses concise and encouraging.
  If the user writes in English, respond in both ${language} and English.
  Use simple vocabulary for beginners.`;

  // Format messages for Groq API
  const formattedMessages = [
    { role: "system", content: systemPrompt || defaultPrompt },
    ...messages.map(msg => ({
      role: msg.role === "user" ? "user" : "assistant",
      content: msg.content
    }))
  ];

  // Cast to satisfy Groq's strict message types
  const completion = await groq.chat.completions.create({
    messages: formattedMessages as any,
    model: DEFAULT_MODEL,
    temperature: 0.7,
  });

  return completion.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";
}

// --- Streaming Chat ---
// Returns a stream for real-time chat responses (Note: Streaming in Groq is slightly different, adapting it to return a stream object readable by Next.js if needed. The original app might have expected a Google stream. We'll return the raw async iterator.)
export async function generateChatStream(
  messages: { role: string; content: string }[],
  language: string,
  systemPrompt?: string
) {
  const defaultPrompt = `You are a friendly and patient ${language} language tutor. 
  Help the user practice ${language} through natural conversation. 
  Correct any grammar mistakes gently and explain why.
  Keep responses concise and encouraging.
  If the user writes in English, respond in both ${language} and English.
  Use simple vocabulary for beginners.`;

  const formattedMessages = [
    { role: "system", content: systemPrompt || defaultPrompt },
    ...messages.map(msg => ({
      role: msg.role === "user" ? "user" : "assistant",
      content: msg.content
    }))
  ];

  // Cast to satisfy Groq's strict message types
  const stream = await groq.chat.completions.create({
    messages: formattedMessages as any,
    model: DEFAULT_MODEL,
    temperature: 0.7,
    stream: true,
  });

  return stream;
}

// --- Quiz Generation ---
// Generates quiz questions for a given language and topic
export async function generateQuiz(
  language: string,
  topic: string,
  difficulty: string,
  type: "spoken" | "coding",
  count: number = 5
) {
  const prompt =
    type === "spoken"
      ? `Generate ${count} ${difficulty} ${language} language quiz questions about "${topic}".
    Focus on vocabulary, grammar, and common phrases.
    
    You MUST respond with a strictly formatted JSON object containing an array named "questions".
    Each object in the array must have exactly:
    - "question": the question text
    - "options": array of 4 answer choices
    - "correctAnswer": index (0-3) of the correct option
    - "explanation": brief explanation of why the answer is correct
    - "type": "multiple-choice"
    `
      : `Generate ${count} ${difficulty} ${language} programming quiz questions about "${topic}".
    Include questions about syntax, output prediction, and best practices.
    
    You MUST respond with a strictly formatted JSON object containing an array named "questions".
    Each object in the array must have exactly:
    - "question": the question text (can include code snippets)
    - "options": array of 4 answer choices
    - "correctAnswer": index (0-3) of the correct option
    - "explanation": brief explanation of why the answer is correct
    - "type": "multiple-choice"
    `;

  const completion = await groq.chat.completions.create({
    messages: [
      { role: "system", content: "You are a quiz generation engine that ONLY outputs valid JSON." },
      { role: "user", content: prompt }
    ],
    model: DEFAULT_MODEL,
    response_format: { type: "json_object" },
    temperature: 0.5,
  });

  const text = completion.choices[0]?.message?.content || "{}";
  const parsed = JSON.parse(text);
  return parsed.questions || parsed; // Handle wrapping
}

// --- Grammar Correction ---
// Corrects grammar in the user's text for a given language
export async function correctGrammar(text: string, language: string) {
  const prompt = `You are a ${language} grammar expert. Analyze the following text and provide corrections.
  
  Text: "${text}"
  
  You MUST respond with a strictly formatted JSON object with EXACTLY these keys:
  - "correctedText": the corrected version
  - "mistakes": array of objects with "original", "corrected", and "explanation"
  - "overallFeedback": a brief encouraging feedback message
  
  If there are no mistakes, say so positively in the overallFeedback and leave mistakes empty.`;

  const completion = await groq.chat.completions.create({
    messages: [
      { role: "system", content: "You are a grammar analysis engine that ONLY outputs valid JSON." },
      { role: "user", content: prompt }
    ],
    model: DEFAULT_MODEL,
    response_format: { type: "json_object" },
    temperature: 0.3,
  });

  const responseText = completion.choices[0]?.message?.content || "{}";
  return JSON.parse(responseText);
}

// --- Code Explanation ---
// Explains code in a given programming language
export async function explainCode(code: string, language: string) {
  const prompt = `You are a ${language} programming expert and teacher.
  Explain the following code in a clear, beginner-friendly way:
  
  \`\`\`${language}
  ${code}
  \`\`\`
  
  Provide:
  1. A brief overview of what the code does
  2. A line-by-line or block-by-block explanation
  3. Key concepts used
  4. Any potential improvements or best practices
  
  Keep it concise and educational.`;

  const completion = await groq.chat.completions.create({
    messages: [
      { role: "system", content: "You are an expert programming tutor." },
      { role: "user", content: prompt }
    ],
    model: DEFAULT_MODEL,
    temperature: 0.5,
  });

  return completion.choices[0]?.message?.content || "Explanation failed.";
}

// --- Code Debugging ---
// Helps debug code issues
export async function debugCode(
  code: string,
  language: string,
  error?: string
) {
  const prompt = `You are a ${language} programming expert and debugger.
  Help debug the following code:
  
  \`\`\`${language}
  ${code}
  \`\`\`
  ${error ? `\nError message: ${error}` : ""}
  
  Provide:
  1. Identify the bug(s) or issues
  2. Explain why the issue occurs
  3. Provide the corrected code
  4. Tips to avoid similar issues in the future
  
  Keep explanations clear and beginner-friendly.`;

  const completion = await groq.chat.completions.create({
    messages: [
      { role: "system", content: "You are an expert programming debugger." },
      { role: "user", content: prompt }
    ],
    model: DEFAULT_MODEL,
    temperature: 0.5,
  });

  return completion.choices[0]?.message?.content || "Debugging failed.";
}

// --- Vocabulary Generation ---
// Generates vocabulary cards for a given language
export async function generateVocabulary(
  language: string,
  topic: string,
  count: number = 6
) {
  const prompt = `Generate ${count} ${language} vocabulary words related to "${topic}".
  Include a mix of difficulty levels.
  
  You MUST respond with a strictly formatted JSON object containing an array named "words".
  Each object in the array must have exactly:
  - "word": the word in ${language}
  - "translation": English translation
  - "pronunciation": how to pronounce it (romanized if needed)
  - "example": an example sentence using the word in ${language} with English translation in parentheses
  `;

  const completion = await groq.chat.completions.create({
    messages: [
      { role: "system", content: "You are a vocabulary generation engine that ONLY outputs valid JSON." },
      { role: "user", content: prompt }
    ],
    model: DEFAULT_MODEL,
    response_format: { type: "json_object" },
    temperature: 0.6,
  });

  const text = completion.choices[0]?.message?.content || "{}";
  const parsed = JSON.parse(text);
  return parsed.words || parsed;
}

// --- Coding Challenge Generation ---
// Generates coding challenges for practice
export async function generateChallenge(
  language: string,
  difficulty: string,
  topic?: string
) {
  const prompt = `Generate a ${difficulty} ${language} coding challenge${topic ? ` about "${topic}"` : ""}.
  Make it practical and educational.
  
  You MUST respond with a strictly formatted JSON object with EXACTLY these keys:
  - "title": challenge title
  - "description": detailed description of what to build
  - "starterCode": starter code template
  - "hints": array of 2-3 helpful hints
  - "difficulty": "${difficulty}"
  `;

  const completion = await groq.chat.completions.create({
    messages: [
      { role: "system", content: "You are a coding challenge generator that ONLY outputs valid JSON." },
      { role: "user", content: prompt }
    ],
    model: DEFAULT_MODEL,
    response_format: { type: "json_object" },
    temperature: 0.6,
  });

  const text = completion.choices[0]?.message?.content || "{}";
  return JSON.parse(text);
}
