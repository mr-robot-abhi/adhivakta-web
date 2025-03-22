import { Case } from "@/app/dashboard/page";
import { Tilt } from "@jdion/tilt-react";

export default function CaseCard({ caseData }: { caseData: Case }) {
  return (
    <Tilt tiltMaxX={15} tiltMaxY={15} scale={1.05} speed={300}>
      <div
        className="relative bg-cover bg-center p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
        style={{ backgroundImage: `url(/bg_3.jpg)` }}
      >
        <div className="absolute inset-0 bg-black opacity-60 rounded-xl"></div>
        <div className="relative text-white">
          <h3 className="text-xl font-semibold mb-3">{caseData.caseName}</h3>
          <p className="mb-2 text-sm"><strong>Case Number:</strong> {caseData.caseNumber}</p>
          <p className="mb-2 text-sm"><strong>Date:</strong> {caseData.caseDate}</p>
          <p className="mb-2 text-sm"><strong>Court:</strong> {caseData.courtType}</p>
          <p className="mb-2 text-sm"><strong>Status:</strong> <span className={`inline-block px-2 py-1 rounded-full text-xs ${caseData.status === "open" ? "bg-green-500" : "bg-red-500"}`}>{caseData.status}</span></p>
          <p className="text-sm"><strong>Advocate:</strong> {caseData.advocateOnRecord.name}</p>
        </div>
      </div>
    </Tilt>
  );
}