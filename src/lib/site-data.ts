import type { LucideIcon } from "lucide-react";
import {
  Clapperboard,
  Megaphone,
  UserRound,
  Package,
  Share2,
  Workflow,
  Brain,
  Gauge,
  Layers,
  Target,
  Globe2,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  summary: string;
  icon: LucideIcon;
  points: string[];
};

export const services: Service[] = [
  {
    slug: "ai-video-production",
    title: "AI Video Production",
    summary:
      "Cinematic brand films, explainers and campaign videos produced with AI-assisted pipelines.",
    icon: Clapperboard,
    points: ["Concept and script development", "AI-generated scenes and b-roll", "Sound design and final grade"],
  },
  {
    slug: "ai-ugc-advertising",
    title: "AI UGC & Advertising",
    summary:
      "Performance-ready creator-style ad variations built for testing at scale across paid channels.",
    icon: Megaphone,
    points: ["Hook and angle matrices", "Platform-native edits", "Rapid variation testing"],
  },
  {
    slug: "ai-spokesperson-videos",
    title: "AI Spokesperson Videos",
    summary:
      "Consistent on-brand presenters for product explainers, onboarding and multilingual campaigns.",
    icon: UserRound,
    points: ["Custom presenter direction", "Multilingual delivery", "Brand-safe scripting"],
  },
  {
    slug: "ai-product-content",
    title: "AI Product Content",
    summary:
      "Studio-grade product visuals and motion assets without the cost of a physical shoot.",
    icon: Package,
    points: ["Product scenes and lifestyle sets", "Catalogue-ready imagery", "Motion product loops"],
  },
  {
    slug: "ai-social-media-content",
    title: "AI Social Media Content",
    summary:
      "Always-on content systems that keep every channel supplied with on-brand creative.",
    icon: Share2,
    points: ["Monthly content engines", "Short-form vertical edits", "Templates and brand kits"],
  },
  {
    slug: "ai-business-automation",
    title: "AI Business Automation",
    summary:
      "Practical AI workflows that remove manual work from marketing, sales and operations.",
    icon: Workflow,
    points: ["Workflow mapping", "Assistant and agent builds", "Team enablement"],
  },
];

export const differentiators = [
  {
    title: "Creative Intelligence",
    body: "Strategy and craft lead the work. AI accelerates production, it never replaces the idea.",
    icon: Brain,
  },
  {
    title: "Faster Production",
    body: "Concept to delivery in days, not months, through AI-assisted studio pipelines.",
    icon: Gauge,
  },
  {
    title: "Scalable Content",
    body: "One direction, many outputs — versioned per channel, market and audience.",
    icon: Layers,
  },
  {
    title: "Business-Focused AI",
    body: "Every deliverable is tied to a commercial objective, not novelty.",
    icon: Target,
  },
  {
    title: "Global Delivery",
    body: "Remote-first delivery across time zones, with clear communication throughout.",
    icon: Globe2,
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Discover",
    body: "We learn your brand, audience, offer and the commercial outcome you need from the work.",
  },
  {
    number: "02",
    title: "Strategize",
    body: "We define the creative direction, messaging angles, formats and channel plan.",
  },
  {
    number: "03",
    title: "Create",
    body: "Our AI-assisted studio pipeline produces the video, imagery and content assets.",
  },
  {
    number: "04",
    title: "Refine",
    body: "Structured review rounds tighten pacing, copy, sound and brand consistency.",
  },
  {
    number: "05",
    title: "Deliver",
    body: "Final masters shipped in every required aspect ratio, with source files and guidance.",
  },
];

export const faqs = [
  {
    q: "What exactly does JIMZ AI do?",
    a: "We are an AI creative and digital solutions company. We produce AI-generated video and content, and we build practical AI workflows that help businesses market smarter and operate faster.",
  },
  {
    q: "Is AI-generated content safe for my brand?",
    a: "Yes. Every project runs through human creative direction and review. We agree on tone, claims and visual rules up front, and nothing ships without your approval.",
  },
  {
    q: "How long does a project take?",
    a: "Most single video projects are delivered within one to two weeks. Content retainers run on a monthly production calendar agreed at kickoff.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. We work remotely with brands in any region and deliver in multiple languages and formats.",
  },
  {
    q: "What do you need from me to start?",
    a: "A short brief: your product, your audience, the outcome you want and any existing brand assets. We handle the rest from discovery onward.",
  },
  {
    q: "Which currency will I be billed in?",
    a: "Pricing is shown in USD by default and in NGN for clients in Nigeria. You can switch the currency indicator in the header at any time.",
  },
  {
    q: "Do you offer ongoing support after delivery?",
    a: "Yes. Retainer clients receive continuous production, and project clients can add support or additional versions at any point.",
  },
];

export const pricingPlans = [
  {
    name: "Starter",
    tagline: "For brands testing AI content for the first time.",
    usd: "$450",
    ngn: "₦690,000",
    cadence: "per project",
    features: [
      "1 AI video up to 45 seconds",
      "Script and creative direction",
      "2 revision rounds",
      "Delivery in 2 aspect ratios",
    ],
    featured: false,
  },
  {
    name: "Growth",
    tagline: "For marketing teams running always-on campaigns.",
    usd: "$1,600",
    ngn: "₦2,450,000",
    cadence: "per month",
    features: [
      "8 AI video assets per month",
      "UGC and spokesperson formats",
      "Product and social content pack",
      "Monthly creative planning call",
      "Priority turnaround",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    tagline: "For organisations scaling AI across teams.",
    usd: "Custom",
    ngn: "Custom",
    cadence: "scoped per engagement",
    features: [
      "Unlimited campaign versioning",
      "AI workflow and automation builds",
      "Multi-market and multilingual output",
      "Dedicated creative lead",
      "Team training and enablement",
    ],
    featured: false,
  },
];