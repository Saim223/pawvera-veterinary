import type { HealthTopic } from "./types";

export const healthTopics: HealthTopic[] = [
  {
    id: "nutrition",
    title: "Nutrition",
    description: "Portion sizing, life-stage feeding, and reading a food label without the marketing noise.",
    icon: "Wheat",
    tips: [
      "Feed for your pet's current life stage — puppy/kitten, adult, or senior formulas aren't interchangeable.",
      "Treats should stay under 10% of daily calories; it's an easy place for weight to creep up.",
      "Sudden diet changes can upset digestion — transition over 5–7 days when switching food.",
    ],
  },
  {
    id: "vaccination",
    title: "Vaccination",
    description: "Core and lifestyle vaccine schedules, and what's actually required by age and exposure.",
    icon: "Syringe",
    tips: [
      "Core vaccines are recommended for nearly every pet regardless of lifestyle.",
      "Lifestyle vaccines depend on exposure — boarding, dog parks, or rural areas change the recommendation.",
      "Puppies and kittens need a booster series; one shot alone doesn't complete immunity.",
    ],
  },
  {
    id: "dental",
    title: "Dental Health",
    description: "Tartar, gum disease, and the brushing habits that prevent a costly extraction later.",
    icon: "Sparkles",
    tips: [
      "By age three, most cats and dogs already show early signs of dental disease.",
      "Daily brushing is the most effective home habit — dental chews help but don't replace it.",
      "Bad breath is not normal; it's often the first visible sign of a bigger issue.",
    ],
  },
  {
    id: "skin-coat",
    title: "Skin & Coat",
    description: "Shedding, dryness, hot spots, and when a coat change signals something underneath.",
    icon: "Feather",
    tips: [
      "A sudden change in coat texture or shedding pattern is worth mentioning at the next visit.",
      "Hot spots can develop within hours — they're worth same-day attention.",
      "Regular brushing distributes natural oils and helps you notice lumps or parasites early.",
    ],
  },
  {
    id: "exercise",
    title: "Exercise",
    description: "How much movement your pet's breed and age actually need — not a generic daily walk.",
    icon: "Activity",
    tips: [
      "Working and sporting breeds often need well over an hour of activity a day to stay balanced.",
      "Older pets still need movement — shorter, gentler sessions rather than none at all.",
      "Mental stimulation (puzzle feeders, training) counts alongside physical exercise.",
    ],
  },
  {
    id: "mental-health",
    title: "Mental Health",
    description: "Separation anxiety, boredom, and the behavioral signs that read as \"acting out.\"",
    icon: "BrainCircuit",
    tips: [
      "Destructive chewing or excessive vocalizing is often anxiety, not defiance.",
      "Routine and predictability reduce stress for most pets more than any single product.",
      "Sudden behavior changes are frequently physical in origin — worth ruling out with a vet first.",
    ],
  },
  {
    id: "preventive-care",
    title: "Preventive Care",
    description: "Parasite prevention and routine screening that catch problems before symptoms appear.",
    icon: "ShieldCheck",
    tips: [
      "Year-round flea, tick, and heartworm prevention is safer and cheaper than treating an infestation.",
      "Annual bloodwork can catch organ changes long before visible symptoms appear.",
      "Weight checks at every visit are one of the simplest early-warning tools available.",
    ],
  },
  {
    id: "emergency-signs",
    title: "Emergency Signs",
    description: "The symptoms that mean call now — bloating, collapse, labored breathing, toxin exposure.",
    icon: "TriangleAlert",
    tips: [
      "A swollen, hard abdomen with unproductive retching can indicate bloat — this is always an emergency.",
      "Labored breathing, pale gums, or collapse warrant an immediate call, not a wait-and-see approach.",
      "If you suspect your pet ingested something toxic, call a vet before inducing vomiting yourself.",
    ],
  },
];
