import type { LucideIcon } from "lucide-react";
import { Clapperboard, Megaphone, Images, Workflow, GraduationCap } from "lucide-react";
import svcVideo from "@/assets/svc-video.jpg";
import svcAdvertising from "@/assets/svc-advertising.jpg";
import svcContent from "@/assets/svc-content.jpg";
import svcAutomation from "@/assets/svc-automation.jpg";
import svcConsulting from "@/assets/svc-consulting.jpg";

export type ServiceCategory = {
  slug: string;
  index: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
  items: string[];
  to: "/contact" | "/ai-video-content";
};

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "ai-video-production",
    index: "01",
    title: "AI Video Production",
    description:
      "High-quality AI-generated video content for advertising, storytelling, product promotion and social media.",
    icon: Clapperboard,
    image: svcVideo,
    imageAlt: "Abstract emerald and gold light ribbons representing AI video production",
    items: [
      "AI UGC Ads",
      "AI Commercials",
      "AI Talking-Head Videos",
      "AI Product Videos",
      "Faceless AI Videos",
      "Social Media Videos",
    ],
    to: "/ai-video-content",
  },
  {
    slug: "ai-advertising-creative",
    index: "02",
    title: "AI Advertising & Creative",
    description:
      "Campaign-ready advertising creative built for testing, iteration and performance across paid channels.",
    icon: Megaphone,
    image: svcAdvertising,
    imageAlt: "Abstract ivory and orange panels on deep green representing advertising creative",
    items: [
      "Social media advertisements",
      "Product advertisements",
      "Campaign concepts",
      "Creative variations",
      "Ad creatives",
      "Short-form advertising",
    ],
    to: "/contact",
  },
  {
    slug: "ai-content-creation",
    index: "03",
    title: "AI Content Creation",
    description:
      "Always-on visual content systems that keep every brand channel supplied with on-brand creative.",
    icon: Images,
    image: svcContent,
    imageAlt: "Floating ivory cards and a glass product form lit in orange and green",
    items: [
      "Social media content",
      "Branded content",
      "Product imagery",
      "AI-generated visuals",
      "Marketing creatives",
      "Campaign assets",
    ],
    to: "/contact",
  },
  {
    slug: "ai-business-solutions",
    index: "04",
    title: "AI Business Solutions",
    description:
      "Practical AI systems that remove manual work from marketing, sales and operations.",
    icon: Workflow,
    image: svcAutomation,
    imageAlt: "Abstract network of connected nodes on a deep green field",
    items: [
      "AI workflow automation",
      "AI assistants",
      "AI-powered business processes",
      "AI integration",
      "AI strategy",
    ],
    to: "/contact",
  },
  {
    slug: "ai-consulting-training",
    index: "05",
    title: "AI Consulting & Training",
    description:
      "Guidance and enablement that help teams adopt AI confidently and apply it to real business goals.",
    icon: GraduationCap,
    image: svcConsulting,
    imageAlt: "Abstract ivory forms rising over orange steps on deep green",
    items: [
      "AI adoption strategy",
      "AI tools training",
      "Business AI workshops",
      "Team training",
      "AI implementation guidance",
    ],
    to: "/contact",
  },
];