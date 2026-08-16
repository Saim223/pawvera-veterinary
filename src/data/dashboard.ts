export const impactStat = {
  value: 2840,
  label: "Preventable cases reported",
  description: "Illustrative platform data — cases where owners flagged a delay in reaching a veterinarian as a contributing factor.",
};

export const responseTimeline = [4.8, 4.2, 3.9, 3.6, 3.1, 2.7, 2.4];

export const preventableTrend = [3620, 3410, 3180, 3050, 2840];

export const bentoMetrics = {
  emergencyConsults: { value: 312, suffix: "", label: "Emergency consultations this month" },
  successfulTreatments: { value: 96, suffix: "%", label: "Successful treatment outcomes" },
  avgResponse: { value: 2.4, suffix: " min", label: "Average vet response time" },
  availableVets: { value: 184, suffix: "", label: "Veterinarians online right now" },
  onlineConsults: { value: 8300, suffix: "+", label: "Online consultations completed" },
};

export const weeklyConsultBars = [
  { day: "Mon", value: 62 },
  { day: "Tue", value: 78 },
  { day: "Wed", value: 54 },
  { day: "Thu", value: 91 },
  { day: "Fri", value: 85 },
  { day: "Sat", value: 40 },
  { day: "Sun", value: 33 },
];

export const myPets = [
  {
    id: "p1",
    name: "Max",
    species: "Golden Retriever",
    age: "4 years",
    status: "Good" as const,
  },
  {
    id: "p2",
    name: "Luna",
    species: "Domestic Shorthair",
    age: "2 years",
    status: "Monitoring" as const,
  },
];

export const ownerAppointment = {
  doctorName: "Dr. Emily Carter",
  specialization: "Small Animal Care",
  when: "Tomorrow · 10:30 AM",
  type: "Video consult" as const,
};

export const ownerPrescriptions = [
  { id: "rx1", pet: "Max", medication: "Apoquel 16mg", instruction: "Once daily with food" },
  { id: "rx2", pet: "Luna", medication: "Hydrolyzed diet trial", instruction: "8-week elimination trial" },
];

export const doctorTodaySummary = {
  appointments: 12,
  onlineConsults: 5,
  pending: 3,
  revenue: 1840,
};

export const emergencyClinics = [
  {
    id: "e1",
    name: "Cedar Cross Emergency Vet",
    distance: "0.8 mi",
    status: "Open now" as const,
    waitTime: "~12 min",
    phone: "+18005550118",
    phoneDisplay: "(800) 555-0118",
  },
  {
    id: "e2",
    name: "Northside 24/7 Animal ER",
    distance: "2.1 mi",
    status: "Open now" as const,
    waitTime: "~25 min",
    phone: "+18005550142",
    phoneDisplay: "(800) 555-0142",
  },
  {
    id: "e3",
    name: "Harborview Pet Trauma Center",
    distance: "3.4 mi",
    status: "Closed" as const,
    waitTime: "Opens 7:00 AM",
    phone: "+18005550176",
    phoneDisplay: "(800) 555-0176",
  },
  {
    id: "e4",
    name: "Cascade Emergency & Specialty",
    distance: "4.6 mi",
    status: "Open now" as const,
    waitTime: "~18 min",
    phone: "+18005550193",
    phoneDisplay: "(800) 555-0193",
  },
];
