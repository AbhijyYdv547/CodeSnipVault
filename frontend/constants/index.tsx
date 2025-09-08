import {
  FileText,
  LayoutDashboard,
  Layers,
  AlertCircle,
  FileMinus,
  Share2,
  Search,
  Code2,
  Shield,
  Cloud,
  Tags,
  Users,
} from "lucide-react";

export const navItems = [
  { name: "About", link: "#about" },
  { name: "Features", link: "#features" },
  { name: "Workflow", link: "#workflow" },
  { name: "Demo", link: "#demo" },
];

export const features = [
  {
    title: "Centralized Snippet Storage",
    description:
      "Save and organize all your code snippets in one secure vault.",
    icon: <Code2 />,
  },
  {
    title: "Powerful Search & Tags",
    description:
      "Find snippets instantly with smart search and custom tagging.",
    icon: <Search />,
  },
  {
    title: "Collaborative Sharing",
    description:
      "Share snippets with your team or keep them private — your choice.",
    icon: <Share2 />,
  },
  {
    title: "Clean & Intuitive Dashboard",
    description: "Manage your snippets with a distraction-free, modern UI.",
    icon: <LayoutDashboard />,
  },
  {
    title: "Secure Authentication",
    description: "Protect your workspace with robust authentication and roles.",
    icon: <Shield />,
  },
  {
    title: "Cloud Sync",
    description: "Access your snippets anywhere with seamless cloud backup.",
    icon: <Cloud />,
  },
  {
    title: "Snippet Metadata",
    description:
      "Attach tags, language, and context to every snippet for clarity.",
    icon: <Tags />,
  },
  {
    title: "Team Collaboration",
    description:
      "Work together with real-time snippet updates and discussions.",
    icon: <Users />,
  },
];

export const workflowHighlights = [
  {
    index: 1,
    title: "Instant Access",
    description:
      "Quickly retrieve snippets with blazing-fast search and filtering.",
    icon: <FileText />,
  },
  {
    index: 2,
    title: "Organized Workflow",
    description:
      "Tag, categorize, and structure snippets for effortless navigation.",
    icon: <Layers />,
  },
  {
    index: 3,
    title: "Secure Vault",
    description:
      "Snippets are stored safely with encryption and role-based access.",
    icon: <Shield />,
  },
  {
    index: 4,
    title: "Team Collaboration",
    description: "Share, comment, and collaborate on snippets in real time.",
    icon: <Users />,
  },
];

export const problems = [
  {
    title: "Losing track of useful code snippets",
    icon: <AlertCircle />,
  },
  {
    title: "Difficulty organizing snippets by language or type",
    icon: <FileMinus />,
  },
  {
    title: "Sharing snippets with teammates is cumbersome",
    icon: <Share2 />,
  },
  {
    title: "Finding old snippets quickly is hard",
    icon: <Search />,
  },
];

export const solutions = [
  {
    title: "Centralized vault to store all your code snippets",
    icon: <AlertCircle />,
  },
  {
    title: "Organize snippets with language and type tags",
    icon: <FileMinus />,
  },
  {
    title: "Share snippets via unique public links effortlessly",
    icon: <Share2 />,
  },
  {
    title: "Search and filter snippets instantly",
    icon: <Search />,
  },
];

export const languages = [
  {
    label: "Javascript/Typescript",
    value: "JS/TS",
  },
  {
    label: "Java",
    value: "Java",
  },
  {
    label: "C++",
    value: "CPP",
  },
  {
    label: "Golang",
    value: "GO",
  },
  {
    label: "Python",
    value: "PY",
  },
  {
    label: "PHP",
    value: "PHP",
  },
];
