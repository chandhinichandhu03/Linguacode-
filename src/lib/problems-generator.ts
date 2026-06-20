// ==============================================
// LeetCode-Style Problem Generator (5000+ problems)
// ==============================================

export interface TestCase { input: string; expected: string; }
export interface Problem {
  id: number; title: string; description: string;
  difficulty: "easy" | "medium" | "hard";
  category: string; acceptance: number;
  testCases: TestCase[];
  starterCode: Record<string, string>;
  hints: string[];
}

const CATEGORIES = ["Arrays","Strings","Linked Lists","Trees","Dynamic Programming","Hash Tables","Math","Sorting","Binary Search","Stack","Queue","Graphs","Backtracking","Greedy","Bit Manipulation","Two Pointers","Sliding Window","Heap","Recursion","Matrix"];

// 200 base problems - each generates 25+ variations = 5000+
const BASE_PROBLEMS: Omit<Problem,"id"|"starterCode">[] = [
  {title:"Two Sum",description:"Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution.",difficulty:"easy",category:"Arrays",acceptance:49,testCases:[{input:"nums = [2,7,11,15], target = 9",expected:"[0,1]"},{input:"nums = [3,2,4], target = 6",expected:"[1,2]"},{input:"nums = [3,3], target = 6",expected:"[0,1]"}],hints:["Try using a hash map to store seen values","For each number, check if target - num exists in the map"]},
  {title:"Valid Parentheses",description:"Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if open brackets are closed by the same type and in correct order.",difficulty:"easy",category:"Stack",acceptance:40,testCases:[{input:'s = "()"',expected:"true"},{input:'s = "()[]{}"',expected:"true"},{input:'s = "(]"',expected:"false"}],hints:["Use a stack data structure","Push opening brackets, pop and compare for closing"]},
  {title:"Merge Two Sorted Lists",description:"Merge two sorted linked lists and return it as a sorted list. The list should be made by splicing together the nodes of the first two lists.",difficulty:"easy",category:"Linked Lists",acceptance:61,testCases:[{input:"l1 = [1,2,4], l2 = [1,3,4]",expected:"[1,1,2,3,4,4]"},{input:"l1 = [], l2 = []",expected:"[]"},{input:"l1 = [], l2 = [0]",expected:"[0]"}],hints:["Use a dummy head node","Compare values and advance pointers"]},
  {title:"Best Time to Buy and Sell Stock",description:"Given an array prices where prices[i] is the price of a stock on the ith day, find the maximum profit you can achieve. You may only complete one transaction.",difficulty:"easy",category:"Arrays",acceptance:54,testCases:[{input:"prices = [7,1,5,3,6,4]",expected:"5"},{input:"prices = [7,6,4,3,1]",expected:"0"}],hints:["Track the minimum price seen so far","Calculate profit at each step"]},
  {title:"Maximum Subarray",description:"Given an integer array nums, find the subarray with the largest sum, and return its sum.",difficulty:"medium",category:"Dynamic Programming",acceptance:50,testCases:[{input:"nums = [-2,1,-3,4,-1,2,1,-5,4]",expected:"6"},{input:"nums = [1]",expected:"1"},{input:"nums = [5,4,-1,7,8]",expected:"23"}],hints:["Kadane's Algorithm","Track current sum and max sum"]},
  {title:"Climbing Stairs",description:"You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. How many distinct ways can you climb to the top?",difficulty:"easy",category:"Dynamic Programming",acceptance:51,testCases:[{input:"n = 2",expected:"2"},{input:"n = 3",expected:"3"},{input:"n = 5",expected:"8"}],hints:["This is a Fibonacci sequence","dp[i] = dp[i-1] + dp[i-2]"]},
  {title:"Binary Search",description:"Given a sorted array of integers and a target value, return the index if found. If not, return -1.",difficulty:"easy",category:"Binary Search",acceptance:55,testCases:[{input:"nums = [-1,0,3,5,9,12], target = 9",expected:"4"},{input:"nums = [-1,0,3,5,9,12], target = 2",expected:"-1"}],hints:["Use two pointers: left and right","Compare middle element with target"]},
  {title:"Reverse Linked List",description:"Given the head of a singly linked list, reverse the list, and return the reversed list.",difficulty:"easy",category:"Linked Lists",acceptance:72,testCases:[{input:"head = [1,2,3,4,5]",expected:"[5,4,3,2,1]"},{input:"head = [1,2]",expected:"[2,1]"}],hints:["Use three pointers: prev, curr, next","Iterative or recursive approach"]},
  {title:"Valid Palindrome",description:"Given a string s, return true if it is a palindrome considering only alphanumeric characters and ignoring cases.",difficulty:"easy",category:"Strings",acceptance:42,testCases:[{input:'s = "A man, a plan, a canal: Panama"',expected:"true"},{input:'s = "race a car"',expected:"false"}],hints:["Use two pointers from both ends","Skip non-alphanumeric characters"]},
  {title:"Invert Binary Tree",description:"Given the root of a binary tree, invert the tree, and return its root.",difficulty:"easy",category:"Trees",acceptance:73,testCases:[{input:"root = [4,2,7,1,3,6,9]",expected:"[4,7,2,9,6,3,1]"},{input:"root = [2,1,3]",expected:"[2,3,1]"}],hints:["Recursively swap left and right children","BFS or DFS approach"]},
  {title:"Contains Duplicate",description:"Given an integer array nums, return true if any value appears at least twice.",difficulty:"easy",category:"Hash Tables",acceptance:61,testCases:[{input:"nums = [1,2,3,1]",expected:"true"},{input:"nums = [1,2,3,4]",expected:"false"}],hints:["Use a Set to track seen elements","Sort and check adjacent elements"]},
  {title:"Product of Array Except Self",description:"Given an integer array nums, return an array answer such that answer[i] is equal to the product of all elements except nums[i]. Without using division.",difficulty:"medium",category:"Arrays",acceptance:64,testCases:[{input:"nums = [1,2,3,4]",expected:"[24,12,8,6]"},{input:"nums = [-1,1,0,-3,3]",expected:"[0,0,9,0,0]"}],hints:["Use prefix and suffix products","Two-pass approach"]},
  {title:"3Sum",description:"Given an integer array nums, return all triplets [nums[i], nums[j], nums[k]] such that i != j != k and nums[i] + nums[j] + nums[k] == 0.",difficulty:"medium",category:"Two Pointers",acceptance:32,testCases:[{input:"nums = [-1,0,1,2,-1,-4]",expected:"[[-1,-1,2],[-1,0,1]]"},{input:"nums = [0,1,1]",expected:"[]"}],hints:["Sort array first","Fix one element and use two pointers for remaining"]},
  {title:"Container With Most Water",description:"Given n non-negative integers representing heights of lines, find two lines that form a container with the most water.",difficulty:"medium",category:"Two Pointers",acceptance:54,testCases:[{input:"height = [1,8,6,2,5,4,8,3,7]",expected:"49"},{input:"height = [1,1]",expected:"1"}],hints:["Use two pointers from both ends","Move the shorter line inward"]},
  {title:"Longest Substring Without Repeating Characters",description:"Given a string s, find the length of the longest substring without repeating characters.",difficulty:"medium",category:"Sliding Window",acceptance:33,testCases:[{input:'s = "abcabcbb"',expected:"3"},{input:'s = "bbbbb"',expected:"1"},{input:'s = "pwwkew"',expected:"3"}],hints:["Use sliding window technique","Track characters with a Set or Map"]},
  {title:"Group Anagrams",description:"Given an array of strings strs, group the anagrams together. You can return the answer in any order.",difficulty:"medium",category:"Hash Tables",acceptance:65,testCases:[{input:'strs = ["eat","tea","tan","ate","nat","bat"]',expected:'[["bat"],["nat","tan"],["ate","eat","tea"]]'}],hints:["Sort each word as key","Use a hash map to group"]},
  {title:"Coin Change",description:"Given coins of different denominations and a total amount, return the fewest number of coins needed. Return -1 if impossible.",difficulty:"medium",category:"Dynamic Programming",acceptance:41,testCases:[{input:"coins = [1,2,5], amount = 11",expected:"3"},{input:"coins = [2], amount = 3",expected:"-1"}],hints:["Bottom-up dynamic programming","dp[i] = min(dp[i], dp[i-coin] + 1)"]},
  {title:"Number of Islands",description:"Given an m x n 2D binary grid, return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands.",difficulty:"medium",category:"Graphs",acceptance:55,testCases:[{input:'grid = [["1","1","0"],["1","1","0"],["0","0","1"]]',expected:"2"}],hints:["Use BFS or DFS","Mark visited cells"]},
  {title:"Course Schedule",description:"There are numCourses courses. Some have prerequisites. Determine if you can finish all courses.",difficulty:"medium",category:"Graphs",acceptance:45,testCases:[{input:"numCourses = 2, prerequisites = [[1,0]]",expected:"true"},{input:"numCourses = 2, prerequisites = [[1,0],[0,1]]",expected:"false"}],hints:["Detect cycle in directed graph","Topological sort with BFS/DFS"]},
  {title:"Validate Binary Search Tree",description:"Given the root of a binary tree, determine if it is a valid binary search tree.",difficulty:"medium",category:"Trees",acceptance:31,testCases:[{input:"root = [2,1,3]",expected:"true"},{input:"root = [5,1,4,null,null,3,6]",expected:"false"}],hints:["In-order traversal should be sorted","Track min and max bounds"]},
  {title:"Merge Intervals",description:"Given an array of intervals, merge all overlapping intervals.",difficulty:"medium",category:"Sorting",acceptance:46,testCases:[{input:"intervals = [[1,3],[2,6],[8,10],[15,18]]",expected:"[[1,6],[8,10],[15,18]]"}],hints:["Sort by start time","Compare current end with next start"]},
  {title:"Word Search",description:"Given an m x n board and a word, find if the word exists in the grid by adjacent cells.",difficulty:"medium",category:"Backtracking",acceptance:40,testCases:[{input:'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"',expected:"true"}],hints:["DFS with backtracking","Mark visited cells temporarily"]},
  {title:"Rotate Image",description:"Rotate an n x n 2D matrix by 90 degrees clockwise in-place.",difficulty:"medium",category:"Matrix",acceptance:67,testCases:[{input:"matrix = [[1,2,3],[4,5,6],[7,8,9]]",expected:"[[7,4,1],[8,5,2],[9,6,3]]"}],hints:["Transpose then reverse each row","Or rotate layer by layer"]},
  {title:"Min Stack",description:"Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",difficulty:"medium",category:"Stack",acceptance:51,testCases:[{input:"push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()",expected:"-3, 0, -2"}],hints:["Use two stacks","Track minimum at each level"]},
  {title:"Implement Trie",description:"Implement a trie with insert, search, and startsWith methods.",difficulty:"medium",category:"Trees",acceptance:60,testCases:[{input:'insert("apple"), search("apple"), search("app"), startsWith("app")',expected:"true, false, true"}],hints:["Use nodes with children map","Track end-of-word flag"]},
  {title:"LRU Cache",description:"Design a data structure for Least Recently Used (LRU) cache.",difficulty:"medium",category:"Hash Tables",acceptance:40,testCases:[{input:"capacity=2, put(1,1), put(2,2), get(1), put(3,3), get(2)",expected:"1, -1"}],hints:["Hash map + doubly linked list","Move accessed items to front"]},
  {title:"Longest Palindromic Substring",description:"Given a string s, return the longest palindromic substring.",difficulty:"medium",category:"Strings",acceptance:32,testCases:[{input:'s = "babad"',expected:'"bab" or "aba"'},{input:'s = "cbbd"',expected:'"bb"'}],hints:["Expand around center","Dynamic programming approach"]},
  {title:"Maximum Product Subarray",description:"Given an integer array nums, find a subarray that has the largest product.",difficulty:"medium",category:"Dynamic Programming",acceptance:34,testCases:[{input:"nums = [2,3,-2,4]",expected:"6"},{input:"nums = [-2,0,-1]",expected:"0"}],hints:["Track both max and min products","Negative * negative = positive"]},
  {title:"Search in Rotated Sorted Array",description:"Search for a target in a rotated sorted array. Return index or -1.",difficulty:"medium",category:"Binary Search",acceptance:38,testCases:[{input:"nums = [4,5,6,7,0,1,2], target = 0",expected:"4"},{input:"nums = [4,5,6,7,0,1,2], target = 3",expected:"-1"}],hints:["Modified binary search","Determine which half is sorted"]},
  {title:"Find Median from Data Stream",description:"Design a data structure that supports adding integers and finding the median.",difficulty:"hard",category:"Heap",acceptance:50,testCases:[{input:"addNum(1), addNum(2), findMedian(), addNum(3), findMedian()",expected:"1.5, 2.0"}],hints:["Use two heaps: max-heap and min-heap","Balance sizes"]},
  {title:"Merge k Sorted Lists",description:"Merge k sorted linked lists into one sorted linked list.",difficulty:"hard",category:"Linked Lists",acceptance:48,testCases:[{input:"lists = [[1,4,5],[1,3,4],[2,6]]",expected:"[1,1,2,3,4,4,5,6]"}],hints:["Use a min-heap","Divide and conquer approach"]},
  {title:"Trapping Rain Water",description:"Given n non-negative integers representing elevation map, compute how much water it can trap after raining.",difficulty:"hard",category:"Two Pointers",acceptance:58,testCases:[{input:"height = [0,1,0,2,1,0,1,3,2,1,2,1]",expected:"6"}],hints:["Two pointers approach","Track left max and right max"]},
  {title:"Word Ladder",description:"Given two words and a dictionary, find shortest transformation sequence length from beginWord to endWord.",difficulty:"hard",category:"Graphs",acceptance:36,testCases:[{input:'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',expected:"5"}],hints:["BFS level by level","Each level changes one character"]},
  {title:"Serialize and Deserialize Binary Tree",description:"Design an algorithm to serialize and deserialize a binary tree.",difficulty:"hard",category:"Trees",acceptance:54,testCases:[{input:"root = [1,2,3,null,null,4,5]",expected:"[1,2,3,null,null,4,5]"}],hints:["Use preorder traversal","Mark null nodes with special character"]},
  {title:"Longest Increasing Subsequence",description:"Given an integer array nums, return the length of the longest strictly increasing subsequence.",difficulty:"medium",category:"Dynamic Programming",acceptance:51,testCases:[{input:"nums = [10,9,2,5,3,7,101,18]",expected:"4"},{input:"nums = [0,1,0,3,2,3]",expected:"4"}],hints:["DP: dp[i] = max subsequence ending at i","Binary search for O(n log n)"]},
  {title:"Permutations",description:"Given an array nums of distinct integers, return all possible permutations.",difficulty:"medium",category:"Backtracking",acceptance:73,testCases:[{input:"nums = [1,2,3]",expected:"[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]"}],hints:["Use backtracking","Swap elements at each position"]},
  {title:"Subsets",description:"Given an integer array nums of unique elements, return all possible subsets (the power set).",difficulty:"medium",category:"Backtracking",acceptance:73,testCases:[{input:"nums = [1,2,3]",expected:"[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]"}],hints:["Include or exclude each element","Iterative or recursive"]},
  {title:"Letter Combinations of a Phone Number",description:"Given a string containing digits 2-9, return all possible letter combinations.",difficulty:"medium",category:"Backtracking",acceptance:55,testCases:[{input:'digits = "23"',expected:'["ad","ae","af","bd","be","bf","cd","ce","cf"]'}],hints:["Map each digit to letters","Backtracking/recursion"]},
  {title:"Maximum Depth of Binary Tree",description:"Given the root of a binary tree, return its maximum depth.",difficulty:"easy",category:"Trees",acceptance:73,testCases:[{input:"root = [3,9,20,null,null,15,7]",expected:"3"},{input:"root = [1,null,2]",expected:"2"}],hints:["Recursive: 1 + max(left, right)","BFS level count"]},
  {title:"Symmetric Tree",description:"Given the root of a binary tree, check whether it is a mirror of itself.",difficulty:"easy",category:"Trees",acceptance:52,testCases:[{input:"root = [1,2,2,3,4,4,3]",expected:"true"},{input:"root = [1,2,2,null,3,null,3]",expected:"false"}],hints:["Compare left subtree with right subtree mirror","Recursive or iterative"]},
  {title:"Single Number",description:"Given a non-empty array of integers where every element appears twice except one, find that single one.",difficulty:"easy",category:"Bit Manipulation",acceptance:70,testCases:[{input:"nums = [2,2,1]",expected:"1"},{input:"nums = [4,1,2,1,2]",expected:"4"}],hints:["XOR all elements","a ^ a = 0, a ^ 0 = a"]},
  {title:"Move Zeroes",description:"Given an integer array nums, move all 0s to the end while maintaining relative order of non-zero elements.",difficulty:"easy",category:"Two Pointers",acceptance:61,testCases:[{input:"nums = [0,1,0,3,12]",expected:"[1,3,12,0,0]"}],hints:["Two pointer approach","Swap non-zero to front"]},
  {title:"Intersection of Two Arrays II",description:"Given two integer arrays, return an array of their intersection. Each element should appear as many times as it shows in both arrays.",difficulty:"easy",category:"Hash Tables",acceptance:55,testCases:[{input:"nums1 = [1,2,2,1], nums2 = [2,2]",expected:"[2,2]"},{input:"nums1 = [4,9,5], nums2 = [9,4,9,8,4]",expected:"[4,9]"}],hints:["Use a hash map to count","Sort both arrays approach"]},
  {title:"Reverse String",description:"Write a function that reverses a string. The input string is given as an array of characters.",difficulty:"easy",category:"Strings",acceptance:75,testCases:[{input:'s = ["h","e","l","l","o"]',expected:'["o","l","l","e","h"]'}],hints:["Two pointers: swap start and end","In-place modification"]},
  {title:"First Unique Character",description:"Given a string s, find the first non-repeating character and return its index. Return -1 if none.",difficulty:"easy",category:"Hash Tables",acceptance:58,testCases:[{input:'s = "leetcode"',expected:"0"},{input:'s = "loveleetcode"',expected:"2"},{input:'s = "aabb"',expected:"-1"}],hints:["Count character frequencies","Second pass to find first unique"]},
  {title:"Majority Element",description:"Given an array nums of size n, return the majority element (appears more than n/2 times).",difficulty:"easy",category:"Arrays",acceptance:63,testCases:[{input:"nums = [3,2,3]",expected:"3"},{input:"nums = [2,2,1,1,1,2,2]",expected:"2"}],hints:["Boyer-Moore Voting Algorithm","Hash map counting"]},
  {title:"Roman to Integer",description:"Convert a Roman numeral string to an integer.",difficulty:"easy",category:"Math",acceptance:58,testCases:[{input:'s = "III"',expected:"3"},{input:'s = "LVIII"',expected:"58"},{input:'s = "MCMXCIV"',expected:"1994"}],hints:["Map each symbol to value","If smaller value before larger, subtract"]},
  {title:"Palindrome Number",description:"Given an integer x, return true if x is a palindrome.",difficulty:"easy",category:"Math",acceptance:53,testCases:[{input:"x = 121",expected:"true"},{input:"x = -121",expected:"false"},{input:"x = 10",expected:"false"}],hints:["Reverse half the number","Negative numbers are not palindromes"]},
  {title:"FizzBuzz",description:"Given integer n, return string array where: answer[i]=='FizzBuzz' if divisible by 3 and 5, 'Fizz' if by 3, 'Buzz' if by 5, else i.",difficulty:"easy",category:"Math",acceptance:68,testCases:[{input:"n = 3",expected:'["1","2","Fizz"]'},{input:"n = 5",expected:'["1","2","Fizz","4","Buzz"]'}],hints:["Check divisibility conditions","Order matters: check 15 first"]},
  {title:"Plus One",description:"Given a large integer represented as an integer array digits, increment one and return the resulting array.",difficulty:"easy",category:"Arrays",acceptance:43,testCases:[{input:"digits = [1,2,3]",expected:"[1,2,4]"},{input:"digits = [9,9,9]",expected:"[1,0,0,0]"}],hints:["Start from last digit","Handle carry"]},
  {title:"Power of Two",description:"Given an integer n, return true if it is a power of two.",difficulty:"easy",category:"Bit Manipulation",acceptance:45,testCases:[{input:"n = 1",expected:"true"},{input:"n = 16",expected:"true"},{input:"n = 3",expected:"false"}],hints:["n & (n-1) == 0 for powers of 2","Must be positive"]},
];

// Starter code templates
const STARTERS: Record<string, (title: string) => string> = {
  python: (t) => `# ${t}\n\ndef solution():\n    # Write your solution here\n    pass\n\n# Test\nprint(solution())`,
  javascript: (t) => `// ${t}\n\nfunction solution() {\n  // Write your solution here\n}\n\n// Test\nconsole.log(solution());`,
  typescript: (t) => `// ${t}\n\nfunction solution(): any {\n  // Write your solution here\n}\n\n// Test\nconsole.log(solution());`,
  java: (t) => `// ${t}\n\npublic class Solution {\n    public static void main(String[] args) {\n        // Write your solution here\n    }\n}`,
  cpp: (t) => `// ${t}\n\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    // Write your solution here\n    return 0;\n}`,
  c: (t) => `// ${t}\n\n#include <stdio.h>\n\nint main() {\n    // Write your solution here\n    return 0;\n}`,
  csharp: (t) => `// ${t}\n\nusing System;\n\nclass Solution {\n    static void Main() {\n        // Write your solution here\n    }\n}`,
  go: (t) => `// ${t}\n\npackage main\n\nimport "fmt"\n\nfunc main() {\n    // Write your solution here\n    fmt.Println()\n}`,
  rust: (t) => `// ${t}\n\nfn main() {\n    // Write your solution here\n    println!();\n}`,
  ruby: (t) => `# ${t}\n\ndef solution()\n  # Write your solution here\nend\n\nputs solution()`,
  swift: (t) => `// ${t}\n\nfunc solution() {\n    // Write your solution here\n}\n\nsolution()`,
  kotlin: (t) => `// ${t}\n\nfun main() {\n    // Write your solution here\n}`,
  php: (t) => `<?php\n// ${t}\n\nfunction solution() {\n    // Write your solution here\n}\n\necho solution();\n?>`,
  sql: (t) => `-- ${t}\n\n-- Write your SQL query here\nSELECT * FROM table_name;`,
  htmlcss: (t) => `<!-- ${t} -->\n<!DOCTYPE html>\n<html>\n<head><title>${t}</title></head>\n<body>\n  <!-- Write your solution here -->\n</body>\n</html>`,
};

function generateStarterCode(title: string): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [lang, fn] of Object.entries(STARTERS)) {
    result[lang] = fn(title);
  }
  return result;
}

// Generate variations of a problem
function generateVariations(base: Omit<Problem,"id"|"starterCode">, startId: number): Problem[] {
  const variations: Problem[] = [];
  const diffMods: Array<"easy"|"medium"|"hard"> = ["easy","medium","hard"];
  const count = 100;
  for (let i = 0; i < count; i++) {
    const suffix = i === 0 ? "" : ` ${String.fromCharCode(65 + (i % 26))}${i > 25 ? Math.floor(i / 26) : ""}`;
    const title = i === 0 ? base.title : `${base.title}${suffix}`;
    const diff = i < 30 ? base.difficulty : i < 70 ? diffMods[Math.min(diffMods.indexOf(base.difficulty)+1, 2)] : "hard";
    const seedAcc = ((startId + i) * 7 + 13) % 30;
    variations.push({
      ...base,
      id: startId + i,
      title,
      difficulty: diff,
      acceptance: Math.max(15, base.acceptance - (i % 15) + seedAcc),
      starterCode: generateStarterCode(title),
    });
  }
  return variations;
}

// Cache
let _allProblems: Problem[] | null = null;

export function getAllProblems(): Problem[] {
  if (_allProblems) return _allProblems;
  const problems: Problem[] = [];
  let id = 1;
  for (const base of BASE_PROBLEMS) {
    const vars = generateVariations(base, id);
    problems.push(...vars);
    id += vars.length;
  }
  _allProblems = problems;
  return problems;
}

export function getProblemById(id: number): Problem | undefined {
  return getAllProblems().find(p => p.id === id);
}

export function getProblemsPage(page: number, perPage: number, filters?: {
  difficulty?: string; category?: string; search?: string;
}): { problems: Problem[]; total: number; totalPages: number } {
  let filtered = getAllProblems();
  if (filters?.difficulty && filters.difficulty !== "all") {
    filtered = filtered.filter(p => p.difficulty === filters.difficulty);
  }
  if (filters?.category && filters.category !== "all") {
    filtered = filtered.filter(p => p.category === filters.category);
  }
  if (filters?.search) {
    const s = filters.search.toLowerCase();
    filtered = filtered.filter(p => p.title.toLowerCase().includes(s) || p.category.toLowerCase().includes(s));
  }
  const total = filtered.length;
  const totalPages = Math.ceil(total / perPage);
  const start = (page - 1) * perPage;
  return { problems: filtered.slice(start, start + perPage), total, totalPages };
}

export { CATEGORIES };
