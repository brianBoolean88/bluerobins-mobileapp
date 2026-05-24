import { ComplianceDocScreen } from "@/components/compliance-doc-screen";
import { LEGAL_PAGES } from "@/data/legal-docs";

export default function LegalSubscriptionScreen() {
  const doc = LEGAL_PAGES.subscription;
  return (
    <ComplianceDocScreen title={doc.title} subtitle={doc.subtitle} sections={doc.sections} />
  );
}
