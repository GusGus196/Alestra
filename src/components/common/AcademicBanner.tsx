import { GraduationCap, Info } from "lucide-react";
import { meta } from "../../lib/data";

export function AcademicBanner() {
  return (
    <div className="academic-banner" role="note">
      <span className="academic-banner__icon" aria-hidden="true">
        <GraduationCap size={18} />
      </span>
      <div className="academic-banner__text">
        <strong>Propuesta académica.</strong>{" "}
        {meta.project.academicNotice} No sustituye al SGI, al NOC, al SOC, al
        SIEM ni a los sistemas de tickets de Alestra.
      </div>
      <Info size={16} className="academic-banner__info" aria-hidden="true" />
    </div>
  );
}
