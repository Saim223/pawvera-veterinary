import type { HowItWorksStep, TrustStat } from "./types";

export const trustStats: TrustStat[] = [
  { id: "owners", value: 10400, suffix: "+", label: "Pet owners on the platform" },
  { id: "vets", value: 1200, suffix: "+", label: "Verified veterinary doctors" },
  { id: "appointments", value: 25600, suffix: "+", label: "Appointments completed" },
  { id: "satisfaction", value: 98, suffix: "%", label: "Pet owner satisfaction" },
];

export const howItWorksSteps: HowItWorksStep[] = [
  {
    id: "profile",
    index: "01",
    title: "Create your pet profile",
    description: "Add your pet's species, breed, age, and history once — every vet you visit after that starts with context, not a blank form.",
  },
  {
    id: "find",
    index: "02",
    title: "Find a veterinarian",
    description: "Filter by specialization, availability, and fee to find a vet who actually fits what your pet needs right now.",
  },
  {
    id: "book",
    index: "03",
    title: "Book or start a consultation",
    description: "Reserve an in-clinic slot or start a video call in minutes — pay the consultation fee securely, upfront.",
  },
  {
    id: "follow",
    index: "04",
    title: "Follow the treatment plan",
    description: "Prescriptions, notes, and follow-up reminders stay attached to your pet's profile so nothing gets lost between visits.",
  },
];
