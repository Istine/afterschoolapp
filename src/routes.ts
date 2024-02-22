import {
  LayoutDashboard,
  Library,
  User2,
  BookOpenCheck,
  Presentation,
} from "lucide-react";

export const routes = [
  {
    path: "/admin/account",
    name: "dashboard",
    icon: LayoutDashboard,
  },
  {
    path: "/admin/account/courses",
    name: "courses",
    icon: Library,
  },
  {
    path: "/admin/account/instructors",
    name: "instructors",
    icon: User2,
  },
  {
    path: "/admin/account/modules",
    name: "modules",
    icon: BookOpenCheck,
  },
  {
    path: "/admin/account/lessons",
    name: "lessons",
    icon: Presentation,
  },
];
