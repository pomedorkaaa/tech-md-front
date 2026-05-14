const fs = require('fs');
const path = require('path');

const enData = {
  tasks: [
    {
      id: "1",
      title: "Sum of Two Numbers",
      description: "Write a function sumTwoNumbers that takes two integers and returns their sum.\n\nThis is a basic task to check environment setup and function syntax.",
      difficulty: "Easy",
      category: "Basics",
      tags: ["basics", "functions"],
      companyName: "TechFlow Systems",
      position: "Senior Frontend Developer",
      examples: [
        { input: "sumTwoNumbers(2, 3)", output: "5", explanation: "Simple addition" },
        { input: "sumTwoNumbers(-1, 1)", output: "0", explanation: "Addition with a negative number" }
      ],
      constraints: ["-1000 <= a, b <= 1000"],
      solvedCount: 1842,
      functionName: "sumTwoNumbers",
      defaultCode: "function sumTwoNumbers(a, b) {\n  // Write your solution here\n  \n}",
      testCases: [
        { args: [2, 3], expected: 5, label: "sumTwoNumbers(2, 3)" },
        { args: [-1, 1], expected: 0, label: "sumTwoNumbers(-1, 1)" },
        { args: [0, 0], expected: 0, label: "sumTwoNumbers(0, 0)" },
        { args: [100, -50], expected: 50, label: "sumTwoNumbers(100, -50)" },
        { args: [-999, -1], expected: -1000, label: "sumTwoNumbers(-999, -1)" }
      ]
    },
    {
      id: "2",
      title: "Reverse String",
      description: "Write a function reverseString that takes a string and returns it in reverse order.\n\nDo not use the built-in reverse() method.",
      difficulty: "Easy",
      category: "Strings",
      tags: ["strings", "basics"],
      companyName: "CloudBase Pro",
      position: "Backend Engineer",
      examples: [
        { input: "reverseString('hello')", output: "'olleh'", explanation: "Characters are reversed" },
        { input: "reverseString('abc')", output: "'cba'" }
      ],
      constraints: ["0 <= s.length <= 10^5", "String contains only printable ASCII characters"],
      solvedCount: 1200,
      functionName: "reverseString",
      defaultCode: "function reverseString(s) {\n  // Write your solution here\n  \n}",
      testCases: [
        { args: ["hello"], expected: "olleh", label: "reverseString('hello')" },
        { args: ["abc"], expected: "cba", label: "reverseString('abc')" },
        { args: [""], expected: "", label: "reverseString('')" },
        { args: ["a"], expected: "a", label: "reverseString('a')" },
        { args: ["racecar"], expected: "racecar", label: "reverseString('racecar')" }
      ]
    },
    {
      id: "3",
      title: "FizzBuzz",
      description: "Write a function fizzBuzz that takes a number n and returns an array of strings from 1 to n, where:\n- Multiples of 3 are replaced by 'Fizz'\n- Multiples of 5 are replaced by 'Buzz'\n- Multiples of both 3 and 5 are replaced by 'FizzBuzz'\n- Other numbers remain as strings",
      difficulty: "Easy",
      category: "Basics",
      tags: ["basics", "loops", "conditions"],
      examples: [
        { input: "fizzBuzz(5)", output: "['1', '2', 'Fizz', '4', 'Buzz']" },
        { input: "fizzBuzz(15)", output: "['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz']" }
      ],
      constraints: ["1 <= n <= 10^4"],
      solvedCount: 980,
      functionName: "fizzBuzz",
      defaultCode: "function fizzBuzz(n) {\n  // Write your solution here\n  \n}",
      testCases: [
        { args: [3], expected: ["1", "2", "Fizz"], label: "fizzBuzz(3)" },
        { args: [5], expected: ["1", "2", "Fizz", "4", "Buzz"], label: "fizzBuzz(5)" },
        { args: [15], expected: ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"], label: "fizzBuzz(15)" },
        { args: [1], expected: ["1"], label: "fizzBuzz(1)" }
      ]
    },
    {
      id: "4",
      title: "Two Sum",
      description: "Write a function twoSum that takes an array of integers nums and an integer target. Return the indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
      difficulty: "Medium",
      category: "Arrays",
      tags: ["arrays", "hash-table"],
      companyName: "DataMinds",
      position: "Senior Data Scientist",
      examples: [
        { input: "twoSum([2, 7, 11, 15], 9)", output: "[0, 1]", explanation: "nums[0] + nums[1] = 2 + 7 = 9" },
        { input: "twoSum([3, 2, 4], 6)", output: "[1, 2]" }
      ],
      constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "Exactly one solution exists"],
      solvedCount: 456,
      functionName: "twoSum",
      defaultCode: "function twoSum(nums, target) {\n  // Write your solution here\n  \n}",
      testCases: [
        { args: [[2, 7, 11, 15], 9], expected: [0, 1], label: "twoSum([2,7,11,15], 9)" },
        { args: [[3, 2, 4], 6], expected: [1, 2], label: "twoSum([3,2,4], 6)" },
        { args: [[3, 3], 6], expected: [0, 1], label: "twoSum([3,3], 6)" }
      ]
    },
    {
      id: "5",
      title: "Valid Palindrome",
      description: "Write a function isPalindrome that takes a string and returns true if it is a palindrome, or false otherwise.\n\nConsider only alphanumeric characters and ignore cases.",
      difficulty: "Easy",
      category: "Strings",
      tags: ["strings", "two-pointers"],
      examples: [
        { input: "isPalindrome('A man a plan a canal Panama')", output: "true" },
        { input: "isPalindrome('race a car')", output: "false" }
      ],
      constraints: ["1 <= s.length <= 2 * 10^5", "String consists only of printable ASCII characters"],
      solvedCount: 750,
      functionName: "isPalindrome",
      defaultCode: "function isPalindrome(s) {\n  // Write your solution here\n  \n}",
      testCases: [
        { args: ["A man a plan a canal Panama"], expected: true, label: "isPalindrome('A man a plan a canal Panama')" },
        { args: ["race a car"], expected: false, label: "isPalindrome('race a car')" },
        { args: [" "], expected: true, label: "isPalindrome(' ')" },
        { args: ["ab"], expected: false, label: "isPalindrome('ab')" }
      ]
    },
    {
      id: "6",
      title: "Maximum Subarray",
      description: "Write a function maxSubArray that takes an array of integers nums and returns the maximum sum of a contiguous subarray.\n\nUse Kadane's algorithm for an optimal solution.",
      difficulty: "Hard",
      category: "Dynamic Programming",
      tags: ["dp", "arrays", "kadane"],
      companyName: "DataMinds",
      position: "Algorithm Engineer",
      examples: [
        { input: "maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])", output: "6", explanation: "The subarray [4, -1, 2, 1] has the maximum sum 6" },
        { input: "maxSubArray([1])", output: "1" }
      ],
      constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
      solvedCount: 89,
      functionName: "maxSubArray",
      defaultCode: "function maxSubArray(nums) {\n  // Write your solution here\n  \n}",
      testCases: [
        { args: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6, label: "maxSubArray([-2,1,-3,4,-1,2,1,-5,4])" },
        { args: [[1]], expected: 1, label: "maxSubArray([1])" },
        { args: [[5, 4, -1, 7, 8]], expected: 23, label: "maxSubArray([5,4,-1,7,8])" },
        { args: [[-1]], expected: -1, label: "maxSubArray([-1])" },
        { args: [[-2, -1]], expected: -1, label: "maxSubArray([-2,-1])" }
      ]
    }
  ]
};

const roData = {
  tasks: [
    {
      id: "1",
      title: "Suma a două numere",
      description: "Scrieți o funcție sumTwoNumbers care primește două numere întregi și returnează suma lor.\n\nAceasta este o sarcină de bază pentru verificarea mediului și înțelegerea sintaxei funcțiilor.",
      difficulty: "Easy",
      category: "Elemente de bază",
      tags: ["basics", "functions"],
      companyName: "TechFlow Systems",
      position: "Senior Frontend Developer",
      examples: [
        { input: "sumTwoNumbers(2, 3)", output: "5", explanation: "Adunare simplă" },
        { input: "sumTwoNumbers(-1, 1)", output: "0", explanation: "Adunare cu un număr negativ" }
      ],
      constraints: ["-1000 <= a, b <= 1000"],
      solvedCount: 1842,
      functionName: "sumTwoNumbers",
      defaultCode: "function sumTwoNumbers(a, b) {\n  // Scrieți soluția aici\n  \n}",
      testCases: [
        { args: [2, 3], expected: 5, label: "sumTwoNumbers(2, 3)" },
        { args: [-1, 1], expected: 0, label: "sumTwoNumbers(-1, 1)" },
        { args: [0, 0], expected: 0, label: "sumTwoNumbers(0, 0)" },
        { args: [100, -50], expected: 50, label: "sumTwoNumbers(100, -50)" },
        { args: [-999, -1], expected: -1000, label: "sumTwoNumbers(-999, -1)" }
      ]
    },
    {
      id: "2",
      title: "Inversare șir",
      description: "Scrieți o funcție reverseString care primește un șir și îl returnează în ordine inversă.\n\nNu folosiți metoda încorporată reverse().",
      difficulty: "Easy",
      category: "Șiruri",
      tags: ["strings", "basics"],
      companyName: "CloudBase Pro",
      position: "Backend Engineer",
      examples: [
        { input: "reverseString('hello')", output: "'olleh'", explanation: "Caracterele sunt inversate" },
        { input: "reverseString('abc')", output: "'cba'" }
      ],
      constraints: ["0 <= s.length <= 10^5", "Șirul conține doar caractere ASCII printabile"],
      solvedCount: 1200,
      functionName: "reverseString",
      defaultCode: "function reverseString(s) {\n  // Scrieți soluția aici\n  \n}",
      testCases: [
        { args: ["hello"], expected: "olleh", label: "reverseString('hello')" },
        { args: ["abc"], expected: "cba", label: "reverseString('abc')" },
        { args: [""], expected: "", label: "reverseString('')" },
        { args: ["a"], expected: "a", label: "reverseString('a')" },
        { args: ["racecar"], expected: "racecar", label: "reverseString('racecar')" }
      ]
    },
    {
      id: "3",
      title: "FizzBuzz",
      description: "Scrieți o funcție fizzBuzz care primește un număr n și returnează un tablou de șiruri de la 1 la n, unde:\n- Multiplii de 3 sunt înlocuiți cu 'Fizz'\n- Multiplii de 5 sunt înlocuiți cu 'Buzz'\n- Multiplii și de 3 și de 5 sunt înlocuiți cu 'FizzBuzz'\n- Celelalte numere rămân șiruri",
      difficulty: "Easy",
      category: "Elemente de bază",
      tags: ["basics", "loops", "conditions"],
      examples: [
        { input: "fizzBuzz(5)", output: "['1', '2', 'Fizz', '4', 'Buzz']" },
        { input: "fizzBuzz(15)", output: "['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz']" }
      ],
      constraints: ["1 <= n <= 10^4"],
      solvedCount: 980,
      functionName: "fizzBuzz",
      defaultCode: "function fizzBuzz(n) {\n  // Scrieți soluția aici\n  \n}",
      testCases: [
        { args: [3], expected: ["1", "2", "Fizz"], label: "fizzBuzz(3)" },
        { args: [5], expected: ["1", "2", "Fizz", "4", "Buzz"], label: "fizzBuzz(5)" },
        { args: [15], expected: ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"], label: "fizzBuzz(15)" },
        { args: [1], expected: ["1"], label: "fizzBuzz(1)" }
      ]
    },
    {
      id: "4",
      title: "Suma a două",
      description: "Scrieți o funcție twoSum care primește un tablou de numere întregi nums și un număr target. Returnați indicii a două numere a căror sumă este egală cu target.\n\nPuteți presupune că fiecare intrare ar avea exact o soluție, și nu puteți utiliza același element de două ori.",
      difficulty: "Medium",
      category: "Tablouri",
      tags: ["arrays", "hash-table"],
      companyName: "DataMinds",
      position: "Senior Data Scientist",
      examples: [
        { input: "twoSum([2, 7, 11, 15], 9)", output: "[0, 1]", explanation: "nums[0] + nums[1] = 2 + 7 = 9" },
        { input: "twoSum([3, 2, 4], 6)", output: "[1, 2]" }
      ],
      constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "Există exact o soluție"],
      solvedCount: 456,
      functionName: "twoSum",
      defaultCode: "function twoSum(nums, target) {\n  // Scrieți soluția aici\n  \n}",
      testCases: [
        { args: [[2, 7, 11, 15], 9], expected: [0, 1], label: "twoSum([2,7,11,15], 9)" },
        { args: [[3, 2, 4], 6], expected: [1, 2], label: "twoSum([3,2,4], 6)" },
        { args: [[3, 3], 6], expected: [0, 1], label: "twoSum([3,3], 6)" }
      ]
    },
    {
      id: "5",
      title: "Palindrom",
      description: "Scrieți o funcție isPalindrome care primește un șir și returnează true dacă este un palindrom, sau false altfel.\n\nLuați în considerare doar caracterele alfanumerice și ignorați cazurile.",
      difficulty: "Easy",
      category: "Șiruri",
      tags: ["strings", "two-pointers"],
      examples: [
        { input: "isPalindrome('A man a plan a canal Panama')", output: "true" },
        { input: "isPalindrome('race a car')", output: "false" }
      ],
      constraints: ["1 <= s.length <= 2 * 10^5", "Șirul constă doar din caractere ASCII printabile"],
      solvedCount: 750,
      functionName: "isPalindrome",
      defaultCode: "function isPalindrome(s) {\n  // Scrieți soluția aici\n  \n}",
      testCases: [
        { args: ["A man a plan a canal Panama"], expected: true, label: "isPalindrome('A man a plan a canal Panama')" },
        { args: ["race a car"], expected: false, label: "isPalindrome('race a car')" },
        { args: [" "], expected: true, label: "isPalindrome(' ')" },
        { args: ["ab"], expected: false, label: "isPalindrome('ab')" }
      ]
    },
    {
      id: "6",
      title: "Subtablou maxim",
      description: "Scrieți o funcție maxSubArray care primește un tablou de numere întregi nums și returnează suma maximă a unui subtablou contiguu.\n\nUtilizați algoritmul lui Kadane pentru o soluție optimă.",
      difficulty: "Hard",
      category: "Programare Dinamică",
      tags: ["dp", "arrays", "kadane"],
      companyName: "DataMinds",
      position: "Algorithm Engineer",
      examples: [
        { input: "maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])", output: "6", explanation: "Subtabloul [4, -1, 2, 1] are suma maximă 6" },
        { input: "maxSubArray([1])", output: "1" }
      ],
      constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
      solvedCount: 89,
      functionName: "maxSubArray",
      defaultCode: "function maxSubArray(nums) {\n  // Scrieți soluția aici\n  \n}",
      testCases: [
        { args: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6, label: "maxSubArray([-2,1,-3,4,-1,2,1,-5,4])" },
        { args: [[1]], expected: 1, label: "maxSubArray([1])" },
        { args: [[5, 4, -1, 7, 8]], expected: 23, label: "maxSubArray([5,4,-1,7,8])" },
        { args: [[-1]], expected: -1, label: "maxSubArray([-1])" },
        { args: [[-2, -1]], expected: -1, label: "maxSubArray([-2,-1])" }
      ]
    }
  ]
};

const outDir = path.join(process.cwd(), 'src', 'data', 'locales');
fs.writeFileSync(path.join(outDir, 'en', 'SandboxMockData.json'), JSON.stringify(enData, null, 2));
fs.writeFileSync(path.join(outDir, 'ro', 'SandboxMockData.json'), JSON.stringify(roData, null, 2));

console.log('Sandbox translations written successfully.');
