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
