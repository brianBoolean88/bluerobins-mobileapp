import type { LegalPageId } from "@/data/legal-docs";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

{
  /* Constants */
}

const LINKS: { label: string; page: LegalPageId }[] = [
  { label: "Privacy Policy (CCPA)", page: "privacy" },
  { label: "Email Compliance", page: "email" },
  { label: "Subscription Cancellations", page: "subscription" },
];

{
  /* Main Export Area */
}

export function DashboardComplianceFooter() {
  const router = useRouter();

  const openLegal = (page: LegalPageId) => {
    router.push(`/legal/${page}`);
  };

  return (
    <View className="mt-2 rounded-2xl border border-[#2B3674]/10 bg-white p-4">
      <Text className="mb-1 text-sm font-bold text-[#2B3674]">
        Legal & compliance
      </Text>
      <Text className="mb-4 text-xs leading-5 text-[#2B3674]/65">
        Privacy, email practices, and subscription terms for BlueRobins
        families.
      </Text>
      <View className="gap-2">
        {LINKS.map(({ label, page }) => (
          <Pressable
            key={page}
            onPress={() => openLegal(page)}
            className="flex-row items-center justify-between rounded-xl border border-[#2B3674]/12 bg-[#F8F9FC] px-4 py-3 active:bg-[#EEF0F6]"
          >
            <Text className="flex-1 text-sm font-semibold text-[#2B3674]">
              {label}
            </Text>
            <Text className="text-sm text-[#2B3674]/40">→</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
