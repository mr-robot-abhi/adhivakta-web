import { create } from "zustand";
import { Case } from "@/types";

interface CaseState {
  cases: Case[];
  setCases: (cases: Case[]) => void;
}

export const useCaseStore = create<CaseState>((set) => ({
  cases: [
    { id: "1", caseName: "OS Case", caseNumber: "123/2025", caseDate: "2025-03-18", advocateOnRecord: "Lawyer1", courtType: "High Court", hearingDates: [], documents: [], status: "open" },
  ], // Mock data
  setCases: (cases) => set({ cases }),
}));