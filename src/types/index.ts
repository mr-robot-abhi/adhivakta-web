export interface User {
    id: string;
    email: string;
    phone: string;
    role: "client" | "lawyer";
    name: string;
    expertise?: string; // For lawyers
  }
  
  export interface Case {
    id: string;
    caseName: string;
    caseNumber: string;
    caseDate: string;
    advocateOnRecord: string;
    courtType: string;
    hearingDates: { date: string; outcome?: string; nextDate?: string; actions?: string[] }[];
    documents: { fileName: string; url: string }[];
    status: "open" | "closed";
  }