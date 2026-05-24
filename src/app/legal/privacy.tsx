import { ComplianceDocScreen } from "@/components/compliance-doc-screen";
import { LEGAL_PAGES } from "@/data/legal-docs";

export default function LegalPrivacyScreen() {
  const doc = LEGAL_PAGES.privacy;
  return (
    <ComplianceDocScreen title={doc.title} subtitle={doc.subtitle} sections={doc.sections} />
  );
}
