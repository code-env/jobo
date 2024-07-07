import {
  BoxIcon,
  FolderKanbanIcon,
  HelpCircle,
  ShieldQuestion,
  Tent,
  TicketCheckIcon,
  Tornado,
  Users,
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
        name: "Dashboard",
        path: "/",
        icon: Tent,
      },
      {
        name: "Stages",
        path: "/stages",
        icon: Tornado,
      },
      {
        name: "Teams",
        path: "/teams",
        icon: Users,
      },
      {
        name: "Submitted",
        path: "/pendingteams",
        icon: TicketCheckIcon,
      },
      {
        name: "Manage",
        path: "/manage",
        icon: FolderKanbanIcon,
      },
      {
        name: "Registration Fee",
        path: "/pay_registration_fee",
        icon: BoxIcon,
      },
      {
        name: "Contact",
        path: "/contact",
        icon: ShieldQuestion,
      },
      {
        name: "Faq",
        path: "/faq",
        icon: HelpCircle,
      },
    ],
    []
  );

  return routes;
};
