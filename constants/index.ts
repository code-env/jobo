import { Tent, TicketCheckIcon, Tornado, Users } from "lucide-react";
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
        name: "scroll",
        path: "/scroll",
        icon: Tent,
      },
      {
        name: "showcase",
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
