import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

{
  /* Type Constants */
}

export type ComplianceSection = {
  title: string;
  paragraphs: string[];
};

type ComplianceDocScreenProps = {
  title: string;
  subtitle?: string;
  sections: ComplianceSection[];
};

{
  /* Main Export Area */
}

export function ComplianceDocScreen({
  title,
  subtitle,
  sections,
}: ComplianceDocScreenProps) {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={["top"]}>
      <View className="border-b border-[#2B3674]/10 bg-white px-4 pb-4 pt-2">
        <Pressable
          onPress={() => router.back()}
          className="mb-3 flex-row items-center"
        >
          <Text className="text-sm font-medium text-[#2B3674]/60">◀ Back</Text>
        </Pressable>
        <Text className="text-2xl font-bold text-[#2B3674]">{title}</Text>
        {subtitle ? (
          <Text className="mt-1 text-sm leading-5 text-[#2B3674]/70">
            {subtitle}
          </Text>
        ) : null}
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {sections.map((section) => (
          <View
            key={section.title}
            className="mb-4 rounded-2xl border border-[#2B3674]/10 bg-white p-4"
          >
            <Text className="mb-2 text-base font-bold text-[#2B3674]">
              {section.title}
            </Text>
            {section.paragraphs.map((paragraph, idx) => (
              <Text
                key={idx}
                className={`text-sm leading-6 text-[#2B3674]/85 ${idx > 0 ? "mt-3" : ""}`}
              >
                {paragraph}
              </Text>
            ))}
          </View>
        ))}
        <Text className="text-center text-xs text-[#2B3674]/50">
          Last updated: May 2026 · BlueRobins
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
