import { TabScreenHeader } from "@/components/tab-screen-header";
import { Briefcase } from "lucide-react-native";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

{
  /* Main Export Area */
}
export default function StudioScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#E8EDF6]" edges={["top"]}>
      <TabScreenHeader />
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingTop: 16,
          paddingBottom: 80,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center gap-3 mb-1.5">
          <View className="w-10 h-10 rounded-xl bg-[#2B3674] items-center justify-center">
            <Briefcase size={20} color="#FFFFFF" strokeWidth={2} />
          </View>
          <Text className="text-[26px] font-extrabold color-[#2B3674]">
            Builder Studio
          </Text>
        </View>

        <Text className="text-sm mb-6 color-[#2B3674]/70">
          Pick a project to see your classroom.
        </Text>

        {/* Empty state card */}
        <View className="bg-white rounded-2xl border border-[#2B3674]/10 p-12 items-center">
          <Image
            source={{ uri: "https://my.bluerobins.com/robin-mascot-chat.png" }}
            className="w-20 h-20 mb-3 opacity-90"
            resizeMode="contain"
          />
          <Text className="color-[#2B3674] font-semibold text-[15px] mb-1">
            No projects yet
          </Text>
          <Text className="color-[#2B3674]/60 text-[13px] text-center">
            Projects you enroll in will show up here.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
