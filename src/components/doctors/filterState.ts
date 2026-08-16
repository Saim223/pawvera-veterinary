import type { ConsultationType } from "@/data/types";

export interface DoctorFilterState {
  query: string;
  specialization: string;
  city: string;
  consultationType: ConsultationType | "Any";
  maxPrice: number;
  availableTodayOnly: boolean;
}

export const defaultFilterState: DoctorFilterState = {
  query: "",
  specialization: "All",
  city: "All",
  consultationType: "Any",
  maxPrice: 120,
  availableTodayOnly: false,
};
