import type { ComplianceSection } from "@/components/compliance-doc-screen";

export type LegalPageId = "privacy" | "email" | "subscription";

export const LEGAL_PAGES: Record<
  LegalPageId,
  { title: string; subtitle: string; sections: ComplianceSection[] }
> = {
  privacy: {
    title: "Privacy Policy",
    subtitle:
      "Includes California (CCPA/CPRA) rights, user-generated content, and DMCA copyright practices.",
    sections: [
      {
        title: "Overview",
        paragraphs: [
          "BlueRobins (“we,” “us”) provides mentor-guided learning programs for students and families. This Privacy Policy explains how we collect, use, share, and protect personal information when you use our website, mobile app, and services.",
          "By using BlueRobins, you agree to this policy. If you do not agree, please discontinue use of our services.",
        ],
      },
      {
        title: "Information we collect",
        paragraphs: [
          "We may collect account information (name, email, role), child profile information (name, email, date of birth with parental consent), payment and billing details, session and enrollment records, communications with mentors and support, and technical data such as device type, app version, and usage logs.",
          "We collect information you provide directly (forms, chat, uploads) and information generated through your use of the platform.",
        ],
      },
      {
        title: "How we use information",
        paragraphs: [
          "We use personal information to operate and improve our programs, match students with mentors, process payments, send service and transactional messages, provide customer support, maintain safety and security, and comply with legal obligations.",
          "We do not sell personal information for money. We may share data with service providers (hosting, payments, email) under contracts that require appropriate safeguards.",
        ],
      },
      {
        title: "California Privacy Rights (CCPA / CPRA)",
        paragraphs: [
          "If you are a California resident, you may have the right to know what personal information we collect, use, and disclose; to request deletion or correction of certain information; to opt out of “sale” or “sharing” of personal information as defined by California law; and to limit use of sensitive personal information where applicable.",
          "We will not discriminate against you for exercising these rights. To submit a request, contact privacy@bluerobins.com with “California Privacy Request” in the subject line. We will verify your identity before fulfilling requests as required by law.",
          "Authorized agents may submit requests on your behalf with written permission. We respond within the timeframes required by the California Consumer Privacy Act and related regulations.",
        ],
      },
      {
        title: "User-generated content (UGC) & liability",
        paragraphs: [
          "Students, parents, and mentors may submit projects, messages, images, videos, comments, and other user-generated content (“UGC”) through the platform. You retain ownership of your UGC, but you grant BlueRobins a non-exclusive, worldwide, royalty-free license to host, display, and use UGC solely to operate and promote our educational services.",
          "You are solely responsible for your UGC. You agree not to post content that is unlawful, infringing, harassing, defamatory, obscene, or that violates others’ privacy or intellectual property rights. BlueRobins does not endorse UGC and is not responsible for opinions expressed by users.",
          "We may remove or restrict UGC that violates our policies or applicable law, but we are not obligated to monitor all content. To the fullest extent permitted by law, BlueRobins disclaims liability for UGC posted by users, subject to rights that cannot be waived under applicable consumer protection laws.",
          "If you believe UGC on our platform infringes your rights, see the DMCA section below.",
        ],
      },
      {
        title: "DMCA copyright policy",
        paragraphs: [
          "BlueRobins respects intellectual property rights and complies with the Digital Millennium Copyright Act (17 U.S.C. § 512). If you believe content on our platform infringes your copyright, send a written DMCA notice to our designated agent with: (1) identification of the copyrighted work; (2) identification of the infringing material and its location; (3) your contact information; (4) a statement of good-faith belief that use is not authorized; (5) a statement under penalty of perjury that your notice is accurate; and (6) your physical or electronic signature.",
          "Designated agent: BlueRobins Copyright Agent — copyright@bluerobins.com. We may remove or disable access to allegedly infringing material and notify the user who posted it.",
          "If your content was removed in error, you may submit a counter-notification including the information required under the DMCA. Repeat infringers may have accounts terminated.",
          "For official DMCA guidance and registration of a designated agent, see the U.S. Copyright Office at https://www.copyright.gov/dmca-directory/ and https://www.copyright.gov.",
        ],
      },
      {
        title: "Children’s privacy",
        paragraphs: [
          "Our programs serve students in grades 3–12. Child accounts and enrollments are managed through a parent or guardian. We collect child information only as needed to deliver educational services and with appropriate parental involvement.",
          "If you believe we have collected information from a child without proper consent, contact privacy@bluerobins.com.",
        ],
      },
      {
        title: "Security & retention",
        paragraphs: [
          "We use reasonable administrative, technical, and organizational measures to protect personal information. No method of transmission or storage is 100% secure.",
          "We retain information as long as needed to provide services, meet legal obligations, resolve disputes, and enforce agreements, then delete or anonymize it where practicable.",
        ],
      },
      {
        title: "Contact",
        paragraphs: [
          "BlueRobins — privacy@bluerobins.com",
          "For California privacy requests, copyright/DMCA notices, or general privacy questions, include enough detail for us to identify your account and respond promptly.",
        ],
      },
    ],
  },
  email: {
    title: "Email Compliance",
    subtitle: "How BlueRobins handles unsubscribe, subject lines, and sender identification.",
    sections: [
      {
        title: "Our commitment",
        paragraphs: [
          "BlueRobins follows email best practices aligned with the U.S. CAN-SPAM Act and applicable state laws. This page summarizes how we handle marketing and transactional email so recipients can trust what we send.",
        ],
      },
      {
        title: "Clear unsubscribe link",
        paragraphs: [
          "Every marketing or promotional email includes a clear, conspicuous way to opt out—typically an “Unsubscribe” or “Manage email preferences” link in the footer that works without requiring a login when possible.",
          "Opt-out requests are honored within 10 business days (often sooner). You may still receive transactional messages related to enrollments, billing, security, or legal notices after unsubscribing from marketing.",
          "To unsubscribe immediately, use the link in the email you received or email unsubscribe@bluerobins.com from the address you wish to remove.",
        ],
      },
      {
        title: "Honest subject lines",
        paragraphs: [
          "Subject lines and preview text accurately reflect the content of the message. We do not use deceptive subjects (for example, false urgency, misleading “Re:” prefixes, or subjects that hide promotional intent).",
          "If an email is an advertisement or promotion, the subject and body make that clear. Transactional emails (receipts, session reminders, password resets) are labeled accordingly.",
        ],
      },
      {
        title: "Physical mailing address",
        paragraphs: [
          "Marketing emails display a valid physical postal address for BlueRobins in the footer, as required by CAN-SPAM.",
          "BlueRobins\n[Physical mailing address on file with the company]\nUnited States",
          "If you need our current mailing address for compliance or legal correspondence, contact legal@bluerobins.com.",
        ],
      },
      {
        title: "Identification & consent",
        paragraphs: [
          "Messages clearly identify BlueRobins as the sender. We send marketing email only to users who have opted in or have an existing relationship permitting such contact under applicable law.",
          "We do not sell or rent email lists to third parties for their independent marketing.",
        ],
      },
      {
        title: "Questions",
        paragraphs: [
          "Email compliance questions: legal@bluerobins.com",
          "Include the email address you want updated and any relevant message details so we can assist quickly.",
        ],
      },
    ],
  },
  subscription: {
    title: "Subscription Cancellations",
    subtitle: "Clear disclosure at signup and straightforward ways to cancel recurring plans.",
    sections: [
      {
        title: "Clear disclosure before you subscribe",
        paragraphs: [
          "Before you enroll in a paid plan, BlueRobins discloses the program name, price, billing frequency (e.g., monthly blocks or installment plans), what is included (sessions, duration, mentor format), and any taxes or fees that may apply.",
          "Checkout and enrollment screens show the total amount you will be charged and whether the plan renews automatically until canceled.",
          "Promotional pricing (discounts, referral credits, summer installments) is described with the regular price and the period the offer applies.",
        ],
      },
      {
        title: "Recurring billing",
        paragraphs: [
          "Subscription-style plans (e.g., monthly session blocks) renew according to the terms shown at purchase unless you cancel before the next billing date.",
          "You authorize charges to your selected payment method for each billing period. Failed payments may pause access until resolved.",
          "Receipts and billing history are available through your account or by contacting support.",
        ],
      },
      {
        title: "Clear cancellation",
        paragraphs: [
          "You may cancel future renewals at any time through: (1) your account billing settings on my.bluerobins.com, (2) email to billing@bluerobins.com with the account email and program name, or (3) written request to our support team.",
          "Cancellation stops future charges; it does not automatically refund amounts already paid unless required by law or our refund policy for that program.",
          "After canceling, you retain access through the end of the current paid period unless otherwise stated in your program terms.",
          "We confirm cancellation requests in writing (email) when possible and process them before the next billing cycle when received in time.",
        ],
      },
      {
        title: "Refunds & exceptions",
        paragraphs: [
          "Refund eligibility depends on the specific program, timing of cancellation, and whether sessions have been consumed. Details are provided at enrollment and in program-specific terms.",
          "Charge disputes should first be directed to billing@bluerobins.com so we can resolve them promptly.",
        ],
      },
      {
        title: "Free trials & introductory sessions",
        paragraphs: [
          "If a free trial or introductory session is offered, we disclose how long it lasts, what happens when it ends, and how to cancel before any paid conversion.",
        ],
      },
      {
        title: "Contact for billing & cancellation",
        paragraphs: [
          "Billing & subscriptions: billing@bluerobins.com",
          "Include your account email, student name (if applicable), and program so we can process your request without delay.",
        ],
      },
    ],
  },
};
