// ==============================================
// YouTube Video Data Library
// ==============================================
// Curated YouTube videos organized by language and topic.

export interface VideoItem {
  id: string;
  title: string;
  youtubeId: string;
  topic: string;
  duration: string;
  channel: string;
  description: string;
}

export interface VideoCategory {
  id: string;
  name: string;
  icon: string;
  type: "spoken" | "coding" | "nlp";
  color: string;
  videos: VideoItem[];
}

export const VIDEO_LIBRARY: VideoCategory[] = [
  // ===== CODING LANGUAGES =====
  {
    id: "python",
    name: "Python",
    icon: "🐍",
    type: "coding",
    color: "#3776AB",
    videos: [
      {
        id: "py-1",
        title: "Python Tutorial for Beginners - Full Course",
        youtubeId: "kqtD5dpn9C8",
        topic: "Basics",
        duration: "6:14:07",
        channel: "Programming with Mosh",
        description: "Learn Python programming from scratch with this comprehensive beginner tutorial."
      },
      {
        id: "py-2",
        title: "Python Functions & Decorators",
        youtubeId: "9Os0o3wzS_I",
        topic: "Functions",
        duration: "1:34:11",
        channel: "freeCodeCamp",
        description: "Master Python functions, closures, and decorators."
      },
      {
        id: "py-3",
        title: "Python OOP - Object Oriented Programming",
        youtubeId: "JeznW_7DlB0",
        topic: "OOP",
        duration: "56:34",
        channel: "Tech With Tim",
        description: "Learn Object Oriented Programming in Python with classes and objects."
      },
      {
        id: "py-4",
        title: "Python Data Structures & Algorithms",
        youtubeId: "pkYVOmU3MgA",
        topic: "Data Structures",
        duration: "2:10:43",
        channel: "freeCodeCamp",
        description: "Complete guide to data structures and algorithms in Python."
      },
      {
        id: "py-5",
        title: "Python for Data Science - Full Course",
        youtubeId: "LHBE6Q9XlzI",
        topic: "Data Science",
        duration: "4:22:13",
        channel: "freeCodeCamp",
        description: "Learn Python for data science including NumPy, Pandas, and Matplotlib."
      },
      {
        id: "py-6",
        title: "Machine Learning with Python - Full Course",
        youtubeId: "7eh4d6sabA0",
        topic: "ML/AI",
        duration: "3:47:55",
        channel: "freeCodeCamp",
        description: "Build machine learning models with scikit-learn and TensorFlow."
      },
    ],
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: "⚡",
    type: "coding",
    color: "#F7DF1E",
    videos: [
      {
        id: "js-1",
        title: "JavaScript Tutorial Full Course for Beginners",
        youtubeId: "EfAl9bwzVZk",
        topic: "Basics",
        duration: "8:01:26",
        channel: "Bro Code",
        description: "Complete JavaScript course covering variables, functions, DOM, and more."
      },
      {
        id: "js-2",
        title: "JavaScript ES6+ Features",
        youtubeId: "NCwa_xi0Uuc",
        topic: "ES6+",
        duration: "48:22",
        channel: "Traversy Media",
        description: "Modern JavaScript features: arrow functions, destructuring, promises, and async/await."
      },
      {
        id: "js-3",
        title: "JavaScript DOM Manipulation",
        youtubeId: "5fb2aPlgoys",
        topic: "DOM",
        duration: "1:14:03",
        channel: "Traversy Media",
        description: "Master the Document Object Model and build interactive web pages."
      },
      {
        id: "js-4",
        title: "Async JavaScript - Promises, Async/Await",
        youtubeId: "ZYb_ZU8LNxs",
        topic: "Async",
        duration: "35:15",
        channel: "Traversy Media",
        description: "Understand callbacks, promises, and async/await in JavaScript."
      },
      {
        id: "js-5",
        title: "React JS Full Course for Beginners",
        youtubeId: "RVFAyFWO4go",
        topic: "React",
        duration: "4:01:19",
        channel: "Dave Gray",
        description: "Learn React.js from scratch with hooks and modern patterns."
      },
      {
        id: "js-6",
        title: "Node.js Full Course for Beginners",
        youtubeId: "f2EqECiTBL8",
        topic: "Node.js",
        duration: "7:03:41",
        channel: "Dave Gray",
        description: "Build server-side applications with Node.js and Express."
      },
    ],
  },
  {
    id: "java",
    name: "Java",
    icon: "☕",
    type: "coding",
    color: "#ED8B00",
    videos: [
      {
        id: "java-1",
        title: "Java Full Course for Beginners",
        youtubeId: "xk4_1vDrzzo",
        topic: "Basics",
        duration: "12:48:53",
        channel: "Bro Code",
        description: "Complete Java programming course from zero to hero."
      },
      {
        id: "java-2",
        title: "Java OOP Concepts",
        youtubeId: "6T_HgnjoYwM",
        topic: "OOP",
        duration: "2:10:00",
        channel: "Telusko",
        description: "Object-oriented programming in Java with inheritance, polymorphism, and encapsulation."
      },
      {
        id: "java-3",
        title: "Java Collections Framework",
        youtubeId: "viTainYWyIE",
        topic: "Collections",
        duration: "1:33:28",
        channel: "Coding with John",
        description: "Master Java collections: ArrayList, HashMap, LinkedList, and more."
      },
      {
        id: "java-4",
        title: "Spring Boot Tutorial for Beginners",
        youtubeId: "9SGDpanrc8U",
        topic: "Spring Boot",
        duration: "3:42:11",
        channel: "Amigoscode",
        description: "Build REST APIs with Spring Boot framework."
      },
    ],
  },
  {
    id: "cpp",
    name: "C++",
    icon: "⚙️",
    type: "coding",
    color: "#00599C",
    videos: [
      {
        id: "cpp-1",
        title: "C++ Tutorial for Beginners - Full Course",
        youtubeId: "vLnPwxZdW4Y",
        topic: "Basics",
        duration: "4:01:17",
        channel: "freeCodeCamp",
        description: "Learn C++ from scratch with this comprehensive course."
      },
      {
        id: "cpp-2",
        title: "C++ Pointers Explained",
        youtubeId: "kiUGf_Z08RQ",
        topic: "Pointers",
        duration: "32:40",
        channel: "CodeBeauty",
        description: "Understand pointers, references, and memory management in C++."
      },
      {
        id: "cpp-3",
        title: "C++ Object Oriented Programming",
        youtubeId: "wN0x9eZLix4",
        topic: "OOP",
        duration: "1:30:26",
        channel: "freeCodeCamp",
        description: "Classes, inheritance, polymorphism, and virtual functions."
      },
      {
        id: "cpp-4",
        title: "Data Structures and Algorithms in C++",
        youtubeId: "B31LgI4Y4DQ",
        topic: "Data Structures",
        duration: "3:22:12",
        channel: "freeCodeCamp",
        description: "Learn essential data structures and algorithms using C++."
      },
    ],
  },
  {
    id: "htmlcss",
    name: "HTML/CSS",
    icon: "🎨",
    type: "coding",
    color: "#E34F26",
    videos: [
      {
        id: "html-1",
        title: "HTML Full Course for Beginners",
        youtubeId: "mJgBOIoGihA",
        topic: "HTML Basics",
        duration: "4:10:27",
        channel: "Bro Code",
        description: "Learn HTML from scratch - elements, attributes, forms, and semantics."
      },
      {
        id: "html-2",
        title: "CSS Full Course - Flexbox, Grid, Animations",
        youtubeId: "OXGznpKZ_sA",
        topic: "CSS",
        duration: "6:18:37",
        channel: "freeCodeCamp",
        description: "Master CSS including Flexbox, Grid, transitions, and animations."
      },
      {
        id: "html-3",
        title: "Build 5 Responsive Websites",
        youtubeId: "srvUrASNj0s",
        topic: "Projects",
        duration: "5:23:48",
        channel: "freeCodeCamp",
        description: "Build responsive websites with HTML and CSS from scratch."
      },
    ],
  },

  // ===== SPOKEN LANGUAGES =====
  {
    id: "english",
    name: "English",
    icon: "🇬🇧",
    type: "spoken",
    color: "#3B82F6",
    videos: [
      {
        id: "en-1",
        title: "English Speaking Practice - Daily Conversations",
        youtubeId: "dKB7pqS0kxk",
        topic: "Conversation",
        duration: "2:01:33",
        channel: "English Addict",
        description: "Practice everyday English conversations for fluency."
      },
      {
        id: "en-2",
        title: "English Grammar Full Course",
        youtubeId: "a_e_8_FCZdU",
        topic: "Grammar",
        duration: "3:10:45",
        channel: "Shaw English",
        description: "Complete English grammar course from basic to advanced."
      },
      {
        id: "en-3",
        title: "English Vocabulary - 500 Essential Words",
        youtubeId: "kYgs0zVRMT4",
        topic: "Vocabulary",
        duration: "1:44:17",
        channel: "English with Lucy",
        description: "Learn 500 most important English words with examples."
      },
      {
        id: "en-4",
        title: "English Pronunciation Training",
        youtubeId: "v2v1YSxpJdY",
        topic: "Pronunciation",
        duration: "55:20",
        channel: "Rachel's English",
        description: "Master American English pronunciation and accent."
      },
    ],
  },
  {
    id: "japanese",
    name: "Japanese",
    icon: "🇯🇵",
    type: "spoken",
    color: "#EF4444",
    videos: [
      {
        id: "jp-1",
        title: "Learn Japanese in 4 Hours - Full Course",
        youtubeId: "6p9Il_j0zjc",
        topic: "Basics",
        duration: "4:00:00",
        channel: "JapanesePod101",
        description: "Complete beginner Japanese course - Hiragana, Katakana, and basic grammar."
      },
      {
        id: "jp-2",
        title: "Japanese Conversation for Beginners",
        youtubeId: "kx9bOiNV-Qk",
        topic: "Conversation",
        duration: "1:22:45",
        channel: "JapanesePod101",
        description: "Practice basic Japanese conversations for daily life."
      },
      {
        id: "jp-3",
        title: "JLPT N5 Grammar - Full Review",
        youtubeId: "WGxzfTKYc1Y",
        topic: "Grammar",
        duration: "2:14:33",
        channel: "Japanese Ammo",
        description: "Master all JLPT N5 grammar points with Misa."
      },
    ],
  },
  {
    id: "spanish",
    name: "Spanish",
    icon: "🇪🇸",
    type: "spoken",
    color: "#F59E0B",
    videos: [
      {
        id: "sp-1",
        title: "Spanish for Beginners - Full Course",
        youtubeId: "TBgaoLD47Pk",
        topic: "Basics",
        duration: "5:31:15",
        channel: "SpanishPod101",
        description: "Learn Spanish from scratch - alphabet, numbers, greetings, and grammar."
      },
      {
        id: "sp-2",
        title: "Spanish Conversation Practice",
        youtubeId: "R3MqXHgYNsk",
        topic: "Conversation",
        duration: "1:45:00",
        channel: "Butterfly Spanish",
        description: "Practice Spanish conversations for everyday situations."
      },
      {
        id: "sp-3",
        title: "Spanish Verb Conjugation - Complete Guide",
        youtubeId: "pQVVqN-dYDw",
        topic: "Grammar",
        duration: "1:12:42",
        channel: "SpanishPod101",
        description: "Master Spanish verb conjugation - present, past, and future tenses."
      },
    ],
  },
  {
    id: "hindi",
    name: "Hindi",
    icon: "🇮🇳",
    type: "spoken",
    color: "#F97316",
    videos: [
      {
        id: "hi-1",
        title: "Learn Hindi for Beginners - Full Course",
        youtubeId: "5MRfPGfejTc",
        topic: "Basics",
        duration: "3:12:00",
        channel: "HindiPod101",
        description: "Complete Hindi beginner course - Devanagari script, numbers, and basic phrases."
      },
      {
        id: "hi-2",
        title: "Hindi Conversation Practice",
        youtubeId: "a3kVv2vDBRg",
        topic: "Conversation",
        duration: "1:08:25",
        channel: "Learn Hindi with HindiPod101",
        description: "Practice everyday Hindi conversations."
      },
      {
        id: "hi-3",
        title: "Hindi Grammar Essentials",
        youtubeId: "Y_7-r1SqWBQ",
        topic: "Grammar",
        duration: "58:15",
        channel: "HindiPod101",
        description: "Essential Hindi grammar - sentence structure, postpositions, and tenses."
      },
    ],
  },
  {
    id: "tamil",
    name: "Tamil",
    icon: "🇮🇳",
    type: "spoken",
    color: "#8B5CF6",
    videos: [
      {
        id: "ta-1",
        title: "Learn Tamil for Beginners",
        youtubeId: "eErn4MCjyPg",
        topic: "Basics",
        duration: "2:30:00",
        channel: "TamilPod101",
        description: "Learn Tamil from scratch - alphabet, numbers, and basic phrases."
      },
      {
        id: "ta-2",
        title: "Tamil Conversation for Daily Life",
        youtubeId: "dT8x9CL8qwE",
        topic: "Conversation",
        duration: "45:12",
        channel: "Learn Tamil",
        description: "Everyday Tamil conversations and phrases."
      },
      {
        id: "ta-3",
        title: "Tamil Grammar Basics",
        youtubeId: "HPp4GV-cxSs",
        topic: "Grammar",
        duration: "1:05:33",
        channel: "Tamil Virtual Academy",
        description: "Tamil grammar fundamentals - sentence structure and verb forms."
      },
    ],
  },

  // ===== NLP =====
  {
    id: "nlp",
    name: "NLP Concepts",
    icon: "🧠",
    type: "nlp",
    color: "#8B5CF6",
    videos: [
      {
        id: "nlp-1",
        title: "NLP Full Course - Natural Language Processing",
        youtubeId: "fOvTtapxa9c",
        topic: "Introduction",
        duration: "5:04:33",
        channel: "freeCodeCamp",
        description: "Complete NLP course covering tokenization, stemming, TF-IDF, and more."
      },
      {
        id: "nlp-2",
        title: "Tokenization in NLP Explained",
        youtubeId: "fNxaJsNG3-s",
        topic: "Tokenization",
        duration: "18:42",
        channel: "Krish Naik",
        description: "Understand word and sentence tokenization techniques."
      },
      {
        id: "nlp-3",
        title: "Sentiment Analysis with Python",
        youtubeId: "QpzMWQvxXWk",
        topic: "Sentiment Analysis",
        duration: "45:20",
        channel: "Rob Mulla",
        description: "Build a sentiment analysis model from scratch with Python."
      },
      {
        id: "nlp-4",
        title: "Named Entity Recognition (NER) Tutorial",
        youtubeId: "0EJbpKqXUAI",
        topic: "Named Entity Recognition",
        duration: "32:15",
        channel: "Krish Naik",
        description: "Learn NER concepts and build an entity extractor."
      },
      {
        id: "nlp-5",
        title: "Word Embeddings - Word2Vec, GloVe",
        youtubeId: "viZrOnJclY0",
        topic: "Word Embeddings",
        duration: "42:18",
        channel: "StatQuest",
        description: "Understand word embeddings and vector representations of text."
      },
      {
        id: "nlp-6",
        title: "Transformers & BERT Explained",
        youtubeId: "xI0HHN5XKDo",
        topic: "Transformers",
        duration: "56:00",
        channel: "CodeEmporium",
        description: "Deep dive into Transformer architecture and BERT model."
      },
      {
        id: "nlp-7",
        title: "Text Classification with NLP",
        youtubeId: "6S2v7G-OupA",
        topic: "Text Classification",
        duration: "38:45",
        channel: "Krish Naik",
        description: "Build text classifiers using bag of words, TF-IDF, and deep learning."
      },
      {
        id: "nlp-8",
        title: "POS Tagging & Syntax Parsing",
        youtubeId: "DEz3xPjQXaM",
        topic: "POS Tagging",
        duration: "25:10",
        channel: "NLP Demystified",
        description: "Parts of speech tagging and syntactic analysis."
      },
    ],
  },
];

// Helper functions
export function getVideosByCategory(categoryId: string): VideoItem[] {
  const category = VIDEO_LIBRARY.find((c) => c.id === categoryId);
  return category?.videos || [];
}

export function getVideosByType(type: "spoken" | "coding" | "nlp"): VideoCategory[] {
  return VIDEO_LIBRARY.filter((c) => c.type === type);
}

export function getAllTopics(categoryId: string): string[] {
  const videos = getVideosByCategory(categoryId);
  return [...new Set(videos.map((v) => v.topic))];
}

export function searchVideos(query: string): VideoItem[] {
  const q = query.toLowerCase();
  return VIDEO_LIBRARY.flatMap((c) =>
    c.videos.filter(
      (v) =>
        v.title.toLowerCase().includes(q) ||
        v.topic.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        v.channel.toLowerCase().includes(q)
    )
  );
}
