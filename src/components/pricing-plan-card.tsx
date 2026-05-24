import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

{
  /* Type Constants */
}

export type PricingPlanCardProps = {
  icon?: string;
  title: string;
  price: string;
  priceSuffix: string;
  perSession: string;
  blockNote?: string;
  subtitle: string;
  tagline?: string;
  schedule: string;
  features: string[];
  footerNote?: string;
  ctaLabel?: string;
  isDarkMode?: boolean;
  onEnroll?: () => void;
};

{
  /* Main Export Area */
}

export function PricingPlanCard({
  icon = "📘",
  title,
  price,
  priceSuffix,
  perSession,
  blockNote,
  subtitle,
  tagline,
  schedule,
  features,
  footerNote,
  ctaLabel = "Enroll Now",
  isDarkMode = false,
  onEnroll,
}: PricingPlanCardProps) {
  const cardBg = isDarkMode ? "bg-[#1f2a4a]" : "bg-white";
  const cardBorder = isDarkMode ? "border-[#FDB515]/30" : "border-[#2B3674]/10";
  const textMain = isDarkMode ? "text-white" : "text-[#2B3674]";

  return (
    <View
      className={`mb-5 rounded-3xl border ${cardBorder} ${cardBg} p-6 shadow-sm`}
    >
      <View className="mb-5 items-center border-b border-gray-100 pb-5">
        <View className="mb-3 h-12 w-12 items-center justify-center rounded-2xl bg-[#2B3674]">
          <Text className="text-xl">{icon}</Text>
        </View>
        <Text
          className={`text-center text-xl font-bold tracking-tight ${
            isDarkMode ? "text-[#FDB515]" : "text-[#2B3674]"
          }`}
        >
          {title}
        </Text>
        <View className="mt-3 flex-row flex-wrap items-baseline justify-center">
          <Text className={`text-4xl font-bold ${textMain}`}>{price}</Text>
          <Text className="ml-1 text-sm font-semibold text-gray-400">
            {priceSuffix}
          </Text>
        </View>
        <Text className="mt-1 text-xs font-medium text-gray-400">
          {perSession}
        </Text>
        {blockNote ? (
          <Text className={`mt-2 text-center text-xs ${textMain}`}>
            {blockNote}
          </Text>
        ) : null}
        <Text className={`mt-1 text-center text-sm font-bold ${textMain}`}>
          {subtitle}
        </Text>
        {tagline ? (
          <Text className={`mt-3 text-center text-sm font-bold ${textMain}`}>
            {tagline}
          </Text>
        ) : null}
        {schedule ? (
          <Text
            className={`mt-2 text-center text-xs leading-5 ${
              isDarkMode ? "text-gray-300" : "text-[#2B3674]/80"
            }`}
          >
            {schedule}
          </Text>
        ) : null}
      </View>

      <View className="mb-6 gap-3">
        {features.map((feature, idx) => (
          <View key={idx} className="flex-row items-start">
            <View className="mr-3 mt-0.5 h-5 w-5 items-center justify-center rounded-full bg-[#2B3674]/10">
              <Text className="text-[10px] font-bold text-[#2B3674]">✓</Text>
            </View>
            <Text
              className={`flex-1 text-sm leading-5 ${
                isDarkMode ? "text-white/90" : "text-[#2B3674]"
              }`}
            >
              {feature}
            </Text>
          </View>
        ))}
      </View>

      {footerNote ? (
        <Text className="mb-4 px-2 text-center text-xs italic text-gray-400">
          {footerNote}
        </Text>
      ) : null}

      <TouchableOpacity
        className="w-full flex-row items-center justify-center rounded-full bg-[#2B3674] py-3.5 shadow-sm active:opacity-95"
        onPress={onEnroll}
      >
        <Text className="mr-2 text-base font-bold text-white">{ctaLabel}</Text>
        <Text className="text-sm font-bold text-white">→</Text>
      </TouchableOpacity>
    </View>
  );
}
