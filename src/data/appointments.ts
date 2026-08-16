export type AppointmentStatus = "Upcoming" | "Completed" | "Cancelled";

export interface AppointmentRecord {
  id: string;
  doctorName: string;
  specialization: string;
  petName: string;
  date: string;
  time: string;
  type: "Video consult" | "In-clinic visit";
  status: AppointmentStatus;
  note?: string;
}

export const appointmentHistory: AppointmentRecord[] = [
  {
    id: "a1",
    doctorName: "Dr. Emily Carter",
    specialization: "Small Animal Care",
    petName: "Max",
    date: "Tomorrow",
    time: "10:30 AM",
    type: "Video consult",
    status: "Upcoming",
  },
  {
    id: "a2",
    doctorName: "Dr. Sarah Mitchell",
    specialization: "Dermatology",
    petName: "Max",
    date: "Aug 2, 2026",
    time: "3:00 PM",
    type: "Video consult",
    status: "Completed",
    note: "Prescribed Apoquel 16mg — once daily with food.",
  },
  {
    id: "a3",
    doctorName: "Dr. Michael Tran",
    specialization: "Dental Care",
    petName: "Luna",
    date: "Jul 18, 2026",
    time: "1:15 PM",
    type: "In-clinic visit",
    status: "Completed",
    note: "Routine cleaning — no follow-up required for 6 months.",
  },
  {
    id: "a4",
    doctorName: "Dr. James Okafor",
    specialization: "Surgery",
    petName: "Luna",
    date: "Jun 30, 2026",
    time: "9:00 AM",
    type: "In-clinic visit",
    status: "Cancelled",
  },
];
