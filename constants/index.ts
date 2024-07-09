import {
  Gift,
  Keyboard,
  Settings,
  Tent,
  TicketCheckIcon,
  Tornado,
  User,
  Users,
  Wrench,
} from "lucide-react";
import { useMemo } from "react";

export const softwareEngineerSkills = [
  "Python",
  "JavaScript",
  "React.js",
  "Node.js",
  "SQL",
  "Git",
  "Docker",
  "AWS",
  "Unit Testing",
  "Problem Solving",
  "Software Architecture",
  "System Design",
  "API Development",
  "Microservices Architecture",
  "Security Best Practices",
  "Code Reviews",
  "Continuous Learning",
  "Project Management",
];

export const sidebarRoutes = () => {
  const routes = useMemo(
    () => [
      {
        name: "shocase",
        path: "/scroll",
        icon: Tent,
      },
      {
        name: "my-posts",
        path: "/showcase",
        icon: Tornado,
      },
      {
        name: "inbox",
        path: "/inbox",
        icon: Users,
      },
      {
        name: "search",
        path: "/search",
        icon: TicketCheckIcon,
      },
    ],
    []
  );

  return routes;
};

export const alertRoutes = () => {
  const routes = useMemo(
    () => [
      {
        name: "Profile",
        icon: User,
        path: "/",
        keys: "P",
      },
      {
        name: "Settings",
        icon: Settings,
        path: "/settings/profile",
        keys: "S",
      },
      {
        name: "Tools",
        icon: Wrench,
        path: "/settings/tools",
        keys: "T",
      },
      {
        name: "Invite Friends",
        icon: Gift,
        path: "/settings/invite",
        keys: "I",
      },
      {
        name: "keyboard Shortcuts",
        icon: Keyboard,
        keys: "K + S",
        path: "",
      },
    ],
    []
  );

  return routes;
};

export const someConversations = () => {
  const conversations = useMemo(
    () => [
      {
        name: "Zenith noble",
        lastmessage:
          "testing with the others and the others that are not texteing...",
        path: "657890",
      },
      {
        name: "Zenith others",
        lastmessage:
          "testing with the others and the others that are not texteing...",
        path: "3456789",
      },
      {
        name: "Testings",
        lastmessage:
          "testing with the others and the others that are not texteing...",
        path: "97675",
      },
      {
        name: "New User",
        lastmessage:
          "testing with the others and the others that are not texteing...",
        path: "23456",
      },
      {
        name: "Ahmad Abdul",
        lastmessage:
          "testing with the others and the others that are not texteing...",
        path: "2345609",
      },
    ],
    []
  );

  return conversations;
};

export const softwareDevelopmentMCQs = [
  {
    question: "1. Which of the following is not a programming language?",
    options: ["Python", "Java", "HTML", "C++"],
    answer: "HTML",
  },
  {
    question: "2. What does SQL stand for?",
    options: [
      "Structured Query Language",
      "Simple Query Language",
      "Structured Question Language",
      "Simple Question Language",
    ],
    answer: "Structured Query Language",
  },
  {
    question: "3. What is the purpose of version control?",
    options: [
      "To manage the versions of an operating system",
      "To keep track of changes in code and collaborate with others",
      "To control the version of hardware",
      "To maintain the version of a database",
    ],
    answer: "To keep track of changes in code and collaborate with others",
  },
  {
    question: "4. Which of the following is a NoSQL database?",
    options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
    answer: "MongoDB",
  },
  {
    question: "5. Which of the following is a front-end JavaScript library?",
    options: ["Django", "Flask", "React", "Spring"],
    answer: "React",
  },
  {
    question: "6. What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Creative Style Sheets",
      "Control Style Sheets",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    question:
      "7. Which of the following is a code repository and internet hosting service?",
    options: ["GitHub", "Docker", "Kubernetes", "Nginx"],
    answer: "GitHub",
  },
  {
    question: "8. What is Agile methodology?",
    options: [
      "A hardware development methodology",
      "A database management methodology",
      "A software development methodology focused on iterative development",
      "A cybersecurity methodology",
    ],
    answer:
      "A software development methodology focused on iterative development",
  },
  {
    question:
      "9. Which of the following is a JavaScript runtime built on Chrome's V8 JavaScript engine?",
    options: ["Node.js", "Angular", "Vue.js", "jQuery"],
    answer: "Node.js",
  },
  {
    question: "10. What is the primary purpose of unit testing?",
    options: [
      "To test the entire application as a whole",
      "To test the performance of the application",
      "To test individual units or components of a software",
      "To test the security of the application",
    ],
    answer: "To test individual units or components of a software",
  },
];
