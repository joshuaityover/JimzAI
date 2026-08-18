import lumea from "@/assets/pf-lumea.jpg";
import flowly from "@/assets/pf-flowly.jpg";
import nova from "@/assets/pf-nova.jpg";
import aurelia from "@/assets/pf-aurelia.jpg";
import ember from "@/assets/pf-ember.jpg";
import travelly from "@/assets/pf-travelly.jpg";

export const portfolioCategories = [
  "ALL",
  "AI UGC",
  "AI COMMERCIALS",
  "AI SPOKESPERSON",
  "PRODUCT ADS",
  "SOCIAL CONTENT",
  "FACELESS VIDEO",
] as const;

export type PortfolioCategory = (typeof portfolioCategories)[number];

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  categories: Exclude<PortfolioCategory, "ALL">[];
  primaryCategory: string;
  concept: true;
  summary: string;
  image: string;
  alt: string;
  objective: string;
  creativeConcept: string;
  audience: string;
  production: string[];
  tools: string[];
  behindTheScenes: string[];
};

export const projects: Project[] = [
  {
    slug: "lumea-skin",
    title: "Luméa Skin",
    subtitle: "AI UGC Skincare Advertisement",
    categories: ["AI UGC", "PRODUCT ADS", "SOCIAL CONTENT"],
    primaryCategory: "AI UGC",
    concept: true,
    summary:
      "A creator-style skincare ad system built to test hooks, claims and routines across paid social without a physical shoot.",
    image: lumea,
    alt: "Hand holding a minimal skincare serum bottle in soft window light",
    objective:
      "Show how a skincare brand can produce a full month of creator-style advertising in days, with enough variation to find a winning hook quickly.",
    creativeConcept:
      "A morning-routine narrative told in first person. The product enters as a natural beat in the ritual rather than a hard sell, with the texture and light doing the persuasion.",
    audience:
      "Women and men aged 22-40 buying premium skincare online, primarily reached through Instagram Reels and TikTok.",
    production: [
      "Hook matrix of six openings written before any generation",
      "AI-generated presenter and hand-held product scenes",
      "Texture and macro inserts generated separately for cutaways",
      "Vertical-first edit with captions, sound design and colour grade",
    ],
    tools: ["Generative video models", "AI voice and dialogue tools", "AI upscaling and cleanup", "Professional NLE finishing"],
    behindTheScenes: [
      "Lighting and skin tone were locked as reference rules before generation to keep every variation consistent.",
      "Each hook was generated as a separate 3-second opening so the body of the ad could be reused across all versions.",
      "Two review rounds tightened pacing to hold attention inside the first two seconds.",
    ],
  },
  {
    slug: "flowly",
    title: "Flowly",
    subtitle: "AI SaaS Talking-Head Advertisement",
    categories: ["AI SPOKESPERSON", "AI COMMERCIALS"],
    primaryCategory: "AI SPOKESPERSON",
    concept: true,
    summary:
      "A consistent AI presenter format for a project management SaaS, built to explain the product in under forty seconds.",
    image: flowly,
    alt: "Professional presenter speaking to camera in a minimal modern office",
    objective:
      "Give a software brand a repeatable spokesperson format that can be re-scripted weekly without booking talent or a studio.",
    creativeConcept:
      "A calm, credible presenter speaking directly to camera, intercut with clean interface motion. Authority without corporate stiffness.",
    audience: "Operations and product managers at small and mid-size teams evaluating workflow software.",
    production: [
      "Script written to a 38-second read",
      "AI presenter generated with a fixed wardrobe and set for continuity",
      "Interface motion animated separately and composited",
      "Multilingual variants generated from the same master script",
    ],
    tools: ["Generative video models", "AI voice synthesis", "Motion graphics", "Multilingual dubbing"],
    behindTheScenes: [
      "Presenter continuity was solved by locking a single reference frame reused across every take.",
      "Cadence was slowed slightly in post so technical terms land clearly for non-native speakers.",
      "The same master was versioned into 16:9, 1:1 and 9:16 without re-generating footage.",
    ],
  },
  {
    slug: "nova-denim",
    title: "Nova Denim",
    subtitle: "AI Fashion UGC Campaign",
    categories: ["AI UGC", "SOCIAL CONTENT"],
    primaryCategory: "AI UGC",
    concept: true,
    summary:
      "A seasonal fashion campaign of creator-style clips covering fit, styling and street context for an emerging denim label.",
    image: nova,
    alt: "Model in a denim jacket against a sunlit ivory concrete wall",
    objective:
      "Demonstrate a full seasonal content drop — twelve clips across styling, fit and lifestyle — produced from one creative direction.",
    creativeConcept:
      "Golden-hour city light, unposed movement and honest styling commentary. The clothing reads as worn, not merchandised.",
    audience: "Fashion-forward 18-34 shoppers discovering brands through short-form social.",
    production: [
      "Look book defined per silhouette before generation",
      "Consistent model identity across all twelve clips",
      "Street and studio environments generated to match one light direction",
      "Cut to trending short-form pacing with original sound design",
    ],
    tools: ["Generative video models", "AI image generation for look boards", "Frame interpolation", "Colour grading"],
    behindTheScenes: [
      "Fabric behaviour was the hardest detail — several passes were needed before denim moved believably.",
      "One colour grade LUT was applied across the set so the campaign reads as a single shoot.",
      "Clips were designed to be re-cut into three longer edits for paid placement.",
    ],
  },
  {
    slug: "aurelia-estates",
    title: "Aurelia Estates",
    subtitle: "Luxury AI Real Estate Commercial",
    categories: ["AI COMMERCIALS", "FACELESS VIDEO"],
    primaryCategory: "AI COMMERCIALS",
    concept: true,
    summary:
      "A cinematic property film concept for a luxury developer, built entirely without drones, crews or site access.",
    image: aurelia,
    alt: "Modern glass villa with an infinity pool at golden hour",
    objective:
      "Show that premium property marketing can be produced before a development is even built, at a fraction of film crew cost.",
    creativeConcept:
      "Slow, architectural camera moves at golden hour. No presenter, no voiceover — light, water and space carry the story.",
    audience: "High-net-worth international buyers and property investors.",
    production: [
      "Shot list built as a sequence of architectural moves",
      "AI-generated exteriors, interiors and water reflections",
      "Faceless narrative structure with music-led pacing",
      "Finished in 4K-ready masters for showroom and web",
    ],
    tools: ["Generative video models", "AI upscaling", "Sound design library", "Cinematic grading"],
    behindTheScenes: [
      "Reflections and glass were generated in isolated passes to keep architectural geometry stable.",
      "The edit follows a sunrise-to-dusk arc so the property is seen in three lighting states.",
      "A silent version was produced for lobby screens.",
    ],
  },
  {
    slug: "ember-and-spice",
    title: "Ember & Spice",
    subtitle: "AI Food Advertisement",
    categories: ["PRODUCT ADS", "AI COMMERCIALS", "FACELESS VIDEO"],
    primaryCategory: "PRODUCT ADS",
    concept: true,
    summary:
      "An appetite-led food commercial concept for a sauce and spice brand, built around heat, steam and texture.",
    image: ember,
    alt: "Steaming spiced dish on a dark ceramic plate under dramatic light",
    objective:
      "Prove that food advertising — traditionally the most demanding shoot format — can be produced convincingly with AI.",
    creativeConcept:
      "Macro heat. Steam, sizzle and glossy texture in tight frames, cut fast enough to trigger appetite in the first second.",
    audience: "Home cooks and food-delivery audiences aged 25-45 across retail and social channels.",
    production: [
      "Frame-by-frame appetite storyboard",
      "Macro texture and steam generated as separate elements",
      "Layered sizzle and ambience sound design",
      "Six-second and fifteen-second cutdowns",
    ],
    tools: ["Generative video models", "AI image generation", "Foley and sound design", "Speed ramping in post"],
    behindTheScenes: [
      "Steam was the credibility test — it was generated separately and composited for control.",
      "Sound does most of the work here; the sizzle bed was built before the picture edit was locked.",
      "Warm grade was pushed toward ember tones to match the brand palette.",
    ],
  },
  {
    slug: "travelly",
    title: "Travelly",
    subtitle: "AI Travel App Advertisement",
    categories: ["AI COMMERCIALS", "SOCIAL CONTENT", "PRODUCT ADS"],
    primaryCategory: "AI COMMERCIALS",
    concept: true,
    summary:
      "A destination-led app commercial concept spanning five locations, produced without a single travel day.",
    image: travelly,
    alt: "Traveller with a backpack overlooking coastal cliffs at sunrise",
    objective:
      "Show how a travel product can advertise multiple destinations at once without location shoots or stock footage.",
    creativeConcept:
      "One traveller, five landscapes, one continuous emotional line: the moment of deciding to go.",
    audience: "Independent travellers aged 24-40 planning trips on mobile.",
    production: [
      "Five destination environments generated to one grade",
      "Continuous character identity across locations",
      "App interface moments composited into real scenes",
      "Vertical and landscape masters delivered together",
    ],
    tools: ["Generative video models", "AI environment generation", "Screen compositing", "Music and sound design"],
    behindTheScenes: [
      "Matching light direction across five environments kept the sequence from feeling like a stock reel.",
      "The interface was animated to real app timings so the product reads as functional.",
      "The final beat was cut twice — one aspirational, one conversion-focused — for A/B testing.",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}