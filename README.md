# 🎓 LinguaCode AI — Learn Languages & Coding with AI

A modern, AI-powered web application for learning spoken languages and programming languages. Built with **Next.js**, **TypeScript**, **Tailwind CSS**, **Shadcn UI**, **Gemini AI**, and **Firebase**.

![LinguaCode AI](https://img.shields.io/badge/Powered_by-Gemini_AI-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)

---

## ✨ Features

### 🗣️ Language Learning
- **5 Languages**: English, Japanese, Spanish, Hindi, Tamil
- **AI Conversation Practice**: Chat with Gemini AI to practice speaking
- **Vocabulary Flashcards**: AI-generated word cards with flip animations
- **Grammar Checker**: Paste text and get instant corrections
- **Adaptive Quizzes**: AI-generated quizzes with explanations

### 💻 Coding Learning
- **5 Languages**: Python, JavaScript, C++, Java, HTML/CSS
- **Monaco Code Editor**: Full-featured code editor in the browser
- **AI Code Explanation**: Get line-by-line code explanations
- **AI Debugging**: Paste buggy code and get fix suggestions
- **Coding Challenges**: Practice problems with AI feedback
- **Knowledge Quizzes**: Test your programming concepts

### 📊 Dashboard & Tracking
- User progress dashboard with charts
- Daily streak tracking
- XP system
- Simple leaderboard
- Recent activity feed

### 🎨 Design
- Modern, minimal UI inspired by Duolingo + Notion + Linear
- Dark/Light mode toggle
- Mobile responsive
- Smooth animations
- Glassmorphism effects

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ installed
- **Firebase** project created
- **Gemini API** key

### 1. Clone & Install

```bash
cd ashok-project
npm install
```

### 2. Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project (or use an existing one)
3. Enable **Authentication**:
   - Go to Build → Authentication → Get Started
   - Enable **Email/Password** provider
   - Enable **Google** provider
4. Enable **Firestore Database**:
   - Go to Build → Firestore Database
   - Click **Create Database**
   - Start in **Test Mode**
5. Get your Firebase config:
   - Go to Project Settings → General → Your Apps → Web App
   - Copy the `firebaseConfig` values

### 3. Get Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/apikey)
2. Create an API key
3. Copy it

### 4. Configure Environment Variables

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` with your actual values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
GEMINI_API_KEY=your_gemini_api_key
```

### 5. Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Global styles & theme
│   ├── (auth)/                     # Auth pages (login, signup)
│   ├── (protected)/                # Authenticated pages
│   │   ├── layout.tsx              # Auth guard + sidebar
│   │   ├── dashboard/              # Dashboard
│   │   ├── languages/[lang]/       # Language learning
│   │   ├── coding/[lang]/          # Coding learning
│   │   ├── chat/                   # AI chat
│   │   ├── profile/                # User profile
│   │   ├── settings/               # Settings
│   │   └── leaderboard/            # Leaderboard
│   └── api/ai/                     # API routes (Gemini)
├── components/
│   ├── ui/                         # Shadcn UI components
│   ├── layout/                     # Sidebar, navbar, mobile nav
│   ├── auth/                       # Auth components
│   ├── dashboard/                  # Dashboard widgets
│   ├── language/                   # Language learning components
│   ├── coding/                     # Coding components
│   └── shared/                     # Reusable components
├── context/                        # React contexts
├── hooks/                          # Custom hooks
├── lib/                            # Utilities & configs
└── types/                          # TypeScript types
```

---

## 🔧 Tech Stack

| Technology | Purpose |
|-----------|---------|
| [Next.js 15](https://nextjs.org) | React framework (App Router) |
| [TypeScript](https://typescriptlang.org) | Type safety |
| [Tailwind CSS v4](https://tailwindcss.com) | Styling |
| [Shadcn UI](https://ui.shadcn.com) | UI components |
| [Gemini AI](https://ai.google.dev) | AI capabilities |
| [Firebase Auth](https://firebase.google.com/auth) | Authentication |
| [Firestore](https://firebase.google.com/firestore) | Database |
| [Monaco Editor](https://microsoft.github.io/monaco-editor/) | Code editor |
| [Recharts](https://recharts.org) | Charts |
| [Framer Motion](https://framer.com/motion) | Animations |
| [Lucide React](https://lucide.dev) | Icons |

---

## 🗄️ Database Structure (Firestore)

```
users/{userId}
  ├── displayName, email, photoURL
  ├── streak, xp, lastActive
  ├── bookmarks[]
  ├── progress/{languageId}
  │     ├── type, lessonsCompleted, quizScores[]
  │     └── vocabLearned, lastAccessed
  ├── activities/{activityId}
  │     ├── type, title, language, timestamp
  │     └── score (optional)
  └── chatHistory/{chatId}
        ├── language, messages[]
        └── createdAt
```

---

## 📝 API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/ai/chat` | POST | AI conversation (Gemini) |
| `/api/ai/quiz` | POST | Generate quiz questions |
| `/api/ai/grammar` | POST | Grammar correction |
| `/api/ai/code-explain` | POST | Code explanation |
| `/api/ai/code-debug` | POST | Code debugging |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ and Gemini AI
