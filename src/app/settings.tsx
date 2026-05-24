import { TabScreenHeader } from "@/components/tab-screen-header";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

{
  /* Colors */
}

const NAVY = "#2B3674";
const DARK_NAVY = "#1B2B4B";
const GOLD = "#FDB515";

{
  /* Main Export Area */
}

export default function SettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState("Student Records");

  const tabs = ["Student Records", "Wishlist", "Billing & Subscriptions"];

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: DARK_NAVY }}
      edges={[]}
    >
      {/* Status bar cover */}
      <View style={{ height: insets.top, backgroundColor: DARK_NAVY }} />

      {/* Fixed nav row */}
      <View
        className="flex-row items-center px-4"
        style={{ height: 56, backgroundColor: DARK_NAVY }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text
            className="text-sm font-medium"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            ◀ Back
          </Text>
        </TouchableOpacity>
        <TabScreenHeader showProgramsMenu={false} />
      </View>

      {/* Scrollable content */}
      <View className="flex-1 bg-[#E8EDF6]">
        <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
          {/* Hero Banner */}
          <View
            className="rounded-2xl p-6 mt-12 mb-6 overflow-hidden"
            style={{ backgroundColor: NAVY }}
          >
            <View className="flex-row items-center mb-3">
              <View
                className="items-center justify-center mr-2"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  backgroundColor: GOLD,
                }}
              >
                <Text style={{ fontSize: 14 }}>⚙️</Text>
              </View>
              <Text
                className="text-xs font-bold uppercase"
                style={{ color: GOLD, letterSpacing: 0.8 }}
              >
                Parent Settings
              </Text>
            </View>
            <Text className="text-white text-2xl font-bold mb-1.5">
              Account, Billing & Privacy
            </Text>
            <Text
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: 13,
                lineHeight: 20,
              }}
            >
              Manage your subscriptions, children's login credentials, and
              recording preferences.
            </Text>
          </View>

          {/* Tabs */}
          <View
            className="flex-row mb-5"
            style={{ borderBottomWidth: 1, borderBottomColor: "#d6e6ef" }}
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  className="pb-3 px-2.5 mr-1"
                  style={{
                    borderBottomWidth: 2,
                    borderBottomColor: isActive ? GOLD : "transparent",
                  }}
                >
                  <Text
                    className="text-xs font-bold"
                    style={{ color: isActive ? NAVY : `${NAVY}80` }}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Student Records */}
          {activeTab === "Student Records" && (
            <View className="mb-8">
              <View className="flex-row items-center mb-3">
                <Text style={{ fontSize: 16, marginRight: 8 }}>🏅</Text>
                <Text className="text-base font-bold" style={{ color: NAVY }}>
                  Student Records
                </Text>
              </View>
              <View
                className="rounded-xl bg-white p-5"
                style={{
                  borderWidth: 1,
                  borderColor: "#d6e6ef",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.04,
                  shadowRadius: 8,
                  elevation: 2,
                }}
              >
                <Text
                  style={{ fontSize: 13, color: `${NAVY}B3`, lineHeight: 20 }}
                >
                  No completed projects yet. Certificates will appear here once
                  a mentor finishes a project and our team uploads the
                  certificate.
                </Text>
              </View>
            </View>
          )}

          {/* Wishlist */}
          {activeTab === "Wishlist" && (
            <View
              className="rounded-xl bg-white p-5"
              style={{ borderWidth: 1, borderColor: "#d6e6ef" }}
            >
              <Text
                className="text-sm text-center"
                style={{ color: `${NAVY}B3` }}
              >
                Your wishlist is currently empty.
              </Text>
            </View>
          )}

          {/* Billing */}
          {activeTab === "Billing & Subscriptions" && (
            <View
              className="rounded-xl bg-white p-5"
              style={{ borderWidth: 1, borderColor: "#d6e6ef" }}
            >
              <Text
                className="text-sm text-center"
                style={{ color: `${NAVY}B3` }}
              >
                No transactions or active billing configurations detected.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
