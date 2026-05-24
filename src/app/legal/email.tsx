import { ComplianceDocScreen } from "@/components/compliance-doc-screen";
import { LEGAL_PAGES } from "@/data/legal-docs";

export default function LegalEmailScreen() {
  const doc = LEGAL_PAGES.email;
  return (
    <ComplianceDocScreen title={doc.title} subtitle={doc.subtitle} sections={doc.sections} />
  );
}
