// ==============================================
// Default Fallback Quizzes
// ==============================================

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const DEFAULT_CODING_QUIZ: QuizQuestion[] = [
  {
    question: "What is a variable in programming?",
    options: [
      "A container for storing data values",
      "A mathematical concept only",
      "A type of function",
      "An error message"
    ],
    correctAnswer: 0,
    explanation: "A variable is like a container that holds data values which can be used and changed throughout the execution of a program."
  },
  {
    question: "Which of these is a widely used control structure for repeating actions?",
    options: [
      "if-else statement",
      "for loop",
      "try-catch block",
      "switch statement"
    ],
    correctAnswer: 1,
    explanation: "A 'for loop' is a control flow statement for specifying iteration, which allows code to be executed repeatedly."
  },
  {
    question: "What does an array or list allow you to do?",
    options: [
      "Store only a single number",
      "Store multiple items of the same or different types in a single variable",
      "Automatically fix syntax errors",
      "Create a user interface"
    ],
    correctAnswer: 1,
    explanation: "Arrays or lists are data structures used to store multiple elements, usually of the same type, in a single continuous block of memory or collection."
  },
  {
    question: "What is the primary purpose of a function?",
    options: [
      "To declare variables",
      "To encapsulate a block of code to be reused",
      "To increase the program's execution time",
      "To style a web page"
    ],
    correctAnswer: 1,
    explanation: "Functions are reusable blocks of code that perform a specific task, reducing redundancy and making the code more organized and modular."
  },
  {
    question: "What is debugging?",
    options: [
      "Adding more bugs to the code",
      "The process of identifying and removing errors from computer hardware or software",
      "Writing documentation",
      "Deploying the application"
    ],
    correctAnswer: 1,
    explanation: "Debugging is the routine process of locating and removing computer program bugs, errors or abnormalities, which is methodically handled by software programmers via debugging tools."
  }
];

export const DEFAULT_LANGUAGE_QUIZ: QuizQuestion[] = [
  {
    question: "Which of the following is typically a formal greeting?",
    options: [
      "Good morning",
      "Hey there",
      "What's up?",
      "Hi"
    ],
    correctAnswer: 0,
    explanation: "'Good morning' is universally recognized as a formal and polite greeting."
  },
  {
    question: "Which word is a verb in this sentence: 'The cat quickly jumped over the fence.'",
    options: [
      "cat",
      "quickly",
      "jumped",
      "fence"
    ],
    correctAnswer: 2,
    explanation: "'Jumped' is an action word, which makes it the verb in the sentence."
  },
  {
    question: "What is an adjective?",
    options: [
      "A word that describes an action",
      "A word that modifies a noun or pronoun",
      "A word that connects sentences",
      "A person, place, or thing"
    ],
    correctAnswer: 1,
    explanation: "An adjective is a word that describes, identifies, or further defines a noun or a pronoun."
  },
  {
    question: "Which is the correct past tense of the verb 'to go'?",
    options: [
      "Goed",
      "Went",
      "Gone",
      "Going"
    ],
    correctAnswer: 1,
    explanation: "'Went' is the simple past tense of the irregular verb 'to go'."
  },
  {
    question: "What is a common phrase to ask for help?",
    options: [
      "Can you please assist me?",
      "I don't care.",
      "See you later.",
      "You are welcome."
    ],
    correctAnswer: 0,
    explanation: "'Can you please assist me?' is a polite and clear way to request help from someone."
  }
];

export function getDefaultQuiz(type: "coding" | "spoken"): QuizQuestion[] {
  return type === "coding" ? DEFAULT_CODING_QUIZ : DEFAULT_LANGUAGE_QUIZ;
}
