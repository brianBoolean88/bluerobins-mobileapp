import { LoadingSiteModal } from "@/components/loading-site-modal";
import { PricingPlanCard } from "@/components/pricing-plan-card";
import {
  PRICING_PLANS_BY_TRACK,
  TRACK_LABELS,
  type PricingTrackId,
} from "@/data/pricing-plans";
import { BLUEROBINS_HOME } from "@/data/projects";
import { openExternalSite } from "@/utils/open-external-site";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

{
  /* Constants */
}

const TRACK_PILLS: { id: PricingTrackId; emoji: string }[] = [
  { id: "builder", emoji: "⚡" },
  { id: "summer", emoji: "🚀" },
  { id: "comps", emoji: "🏆" },
  { id: "special", emoji: "✨" },
];

{
  /* Main Export Area */
}

export default function PricingBillingSummerScreen() {
  const router = useRouter();
  const isDarkMode = false;
  const [activeTab, setActiveTab] = useState<"plans" | "completed" | "pending">(
    "plans",
  );
  const [activeTrack, setActiveTrack] = useState<PricingTrackId>("builder");
  const [loadingSite, setLoadingSite] = useState(false);

  const screenBg = isDarkMode ? "bg-[#161d30]" : "bg-slate-50";
  const textMain = isDarkMode ? "text-white" : "text-[#2B3674]";
  const textMuted = isDarkMode ? "text-white/60" : "text-[#2B3674]/60";

  const plans = PRICING_PLANS_BY_TRACK[activeTrack];

  return (
    <SafeAreaView className={`flex-1 ${screenBg}`}>
      <LoadingSiteModal visible={loadingSite} />
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />

      <View className="px-4 pb-2 pt-4">
        <Pressable
          onPress={() => router.back()}
          className="mb-3 flex-row items-center"
        >
          <Text className="text-sm font-medium text-[#2B3674]/60">◀ Back</Text>
        </Pressable>
        <Text className={`text-2xl font-bold ${textMain}`}>
          Pricing & Billing
        </Text>
        <Text className={`mt-1 text-sm ${textMuted}`}>
          View learning plans, track purchases, and manage payments.
        </Text>
      </View>

      <View
        className={`border-b px-4 ${
          isDarkMode ? "border-[#FDB515]/20" : "border-[#2B3674]/20"
        }`}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row"
        >
          {(
            [
              ["plans", "Plans & Pricing"],
              ["completed", "Completed Payments"],
              ["pending", "Pending Payments"],
            ] as const
          ).map(([tab, label]) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`mr-6 border-b-2 pb-3 ${
                activeTab === tab ? "border-[#FDB515]" : "border-transparent"
              }`}
            >
              <Text
                className={`text-[15px] font-semibold ${
                  activeTab === tab
                    ? isDarkMode
                      ? "text-[#FDB515]"
                      : "text-[#2B3674]"
                    : "text-gray-400"
                }`}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {activeTab === "plans" ? (
          <>
            <View className="my-6 items-center px-4">
              <View
                className={`mb-3 rounded-full px-4 py-1.5 ${
                  isDarkMode ? "bg-[#FDB515]/20" : "bg-[#2B3674]/10"
                }`}
              >
                <Text
                  className={`text-[11px] font-bold uppercase tracking-widest ${
                    isDarkMode ? "text-[#FDB515]" : "text-[#2B3674]"
                  }`}
                >
                  Pricing & Plans
                </Text>
              </View>
              <Text
                className={`text-center text-3xl font-bold tracking-tight ${textMain}`}
              >
                Choose your{" "}
                <Text className="text-[#FDB515]">learning path</Text>
              </Text>
              <Text className={`mt-1 text-center text-sm ${textMuted}`}>
                What students build, builds them.
              </Text>
            </View>

            <View className="mb-6">
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
              >
                {TRACK_PILLS.map(({ id, emoji }) => (
                  <TouchableOpacity
                    key={id}
                    onPress={() => setActiveTrack(id)}
                    className={`flex-row items-center rounded-full border px-5 py-3 shadow-sm ${
                      activeTrack === id
                        ? "bg-[#2B3674] border-[#2B3674]"
                        : isDarkMode
                          ? "bg-[#1f2a4a] border-[#FDB515]/30"
                          : "bg-white border-[#2B3674]/15"
                    }`}
                  >
                    <Text className="mr-1.5 text-sm">{emoji}</Text>
                    <Text
                      className={`text-xs font-bold ${
                        activeTrack === id
                          ? "text-white"
                          : isDarkMode
                            ? "text-white"
                            : "text-[#2B3674]"
                      }`}
                    >
                      {TRACK_LABELS[id]}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View className="mb-6 px-6">
              <Text
                className={`text-center text-sm font-medium leading-5 ${
                  isDarkMode ? "text-white/70" : "text-[#2B3674]/70"
                }`}
              >
                {TRACK_LABELS[activeTrack]}
              </Text>
            </View>

            <View className="px-4">
              {plans.map((plan) => (
                <PricingPlanCard
                  key={plan.title}
                  {...plan}
                  isDarkMode={isDarkMode}
                  onEnroll={() =>
                    openExternalSite(BLUEROBINS_HOME, setLoadingSite)
                  }
                />
              ))}
            </View>
          </>
        ) : (
          <View className="items-center px-6 py-16">
            <Text className={`text-center text-base ${textMuted}`}>
              {activeTab === "completed"
                ? "No completed payments yet."
                : "No pending payments right now."}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
