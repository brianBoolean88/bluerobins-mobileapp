import { LoadingSiteModal } from "@/components/loading-site-modal";
import { BLUEROBINS_HOME, CHESS_PROGRAM_PROJECT_ID } from "@/data/projects";
import { openExternalSite } from "@/utils/open-external-site";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

{
  /* Constants & Icons */
}

const MATH_TRACK_OPTIONS = [
  "Select a track ...",
  "AP Calculus AB",
  "AP Calculus BC",
  "AP Statistics",
  "Multivariable Calculus",
  "Linear Algebra",
  "Math Competitions",
] as const;

const TrophyIcon = ({ color = "#FDB515" }) => (
  <Svg
    width={28}
    height={28}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <Path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <Path d="M4 22h16" />
    <Path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <Path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <Path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </Svg>
);

const ChevronRightIcon = ({ color = "#fff" }) => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="m9 18 6-6-6-6" />
  </Svg>
);

{
  /* Main Export Area */
}

export default function SpecialProgramsScreen() {
  const router = useRouter();
  const [selectedMathTrack, setSelectedMathTrack] = useState<string>(
    MATH_TRACK_OPTIONS[0],
  );
  const [showTrackPicker, setShowTrackPicker] = useState(false);
  const [loadingSite, setLoadingSite] = useState(false);

  const isDarkMode = false;
  const containerBg = isDarkMode ? "bg-[#161d30]" : "bg-slate-50";
  const cardBg = isDarkMode ? "bg-[#1f2a4a]" : "bg-white";
  const mainTextColor = isDarkMode ? "text-white" : "text-[#2B3674]";
  const subTextColor = isDarkMode ? "text-white/70" : "text-[#2B3674]/60";
  const borderTone = isDarkMode ? "border-[#FDB515]/30" : "border-[#2B3674]/20";
  const primaryBtnBg = isDarkMode ? "bg-[#FDB515]" : "bg-[#2B3674]";
  const primaryBtnText = isDarkMode ? "text-black" : "text-white";

  const goToChessDetails = () => {
    router.push({
      pathname: "/project-details",
      params: { projectId: String(CHESS_PROGRAM_PROJECT_ID) },
    });
  };

  const enrollNow = () => openExternalSite(BLUEROBINS_HOME, setLoadingSite);

  return (
    <SafeAreaView className={`flex-1 ${containerBg}`}>
      <LoadingSiteModal visible={loadingSite} />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 24 }}
      >
        <TouchableOpacity
          className="mb-4 flex-row items-center"
          onPress={() => router.back()}
        >
          <Text className="mr-1 text-sm font-medium text-[#2B3674]/60">◀</Text>
          <Text className="text-sm font-medium text-[#2B3674]/60">Back</Text>
        </TouchableOpacity>

        <View className="mb-2 flex-row items-center gap-3">
          <TrophyIcon />
          <Text className={`text-2xl font-bold ${mainTextColor}`}>
            Special Programs
          </Text>
        </View>
        <Text className={`mb-6 ml-1 text-[16px] ${subTextColor}`}>
          Exclusive programs with dedicated mentors and special pricing.
        </Text>

        <View
          className={`mb-6 overflow-hidden rounded-2xl border ${borderTone} ${cardBg} shadow-sm`}
        >
          <View className="relative aspect-[16/9] w-full bg-gray-100">
            <Image
              source={{
                uri: "https://yvbeqrxgvcmkuouxpmjx.supabase.co/storage/v1/object/public/project_photos/182-pexels-1776838151982.jpg",
              }}
              className="h-full w-full"
              resizeMode="cover"
            />
            <View className="absolute left-3 top-3 rounded-full bg-[#FDB515] px-3 py-1">
              <Text className="text-[14px] font-bold tracking-wide text-white">
                Chess
              </Text>
            </View>
          </View>

          <View className="p-5">
            <Text
              className={`mb-1 text-[20px] font-bold ${isDarkMode ? "text-[#FDB515]" : "text-[#2B3674]"}`}
            >
              Become a Chess Pro
            </Text>
            <Text
              className={`mb-0.5 text-[16px] font-semibold ${mainTextColor}`}
            >
              with Sandhya Goli
            </Text>
            <Text className={`mb-3 text-[14px] italic ${subTextColor}`}>
              Woman Candidate Master | FIDE-Certified Instructor
            </Text>
            <Text
              className={`mb-4 text-[15px] leading-5 ${isDarkMode ? "text-white/80" : "text-[#2B3674]/70"}`}
            >
              Train with an internationally decorated chess champion and
              experienced academy leader. Students improve by playing,
              analyzing, and refining real tournament games.
            </Text>

            <Text className={`mb-2 text-[15px] font-semibold ${mainTextColor}`}>
              Over 16 weeks, students develop:
            </Text>
            <View className="mb-4 gap-1 pl-1">
              {[
                "A personalized opening repertoire",
                "Middlegame strategy frameworks",
                "Endgame execution skills",
                "Tactical pattern recognition",
                "Competition readiness",
              ].map((item, index) => (
                <Text
                  key={index}
                  className={`text-[15px] ${isDarkMode ? "text-white/80" : "text-[#2B3674]/70"}`}
                >
                  • {item}
                </Text>
              ))}
            </View>

            <View className="mb-3 flex-row flex-wrap gap-x-4 gap-y-1">
              <Text className={`text-[14px] ${subTextColor}`}>
                45-min private sessions
              </Text>
              <Text className={`text-[14px] ${subTextColor}`}>
                4 sessions/month
              </Text>
              <Text className={`text-[14px] ${subTextColor}`}>
                16-week progression
              </Text>
            </View>

            <View className="mb-4 flex-row items-baseline gap-1">
              <Text className={`text-[28px] font-bold ${mainTextColor}`}>
                $249
              </Text>
              <Text className={`text-[16px] ${subTextColor}`}>/month</Text>
              <Text
                className={`ml-1 text-[14px] ${isDarkMode ? "text-white/40" : "text-[#2B3674]/50"}`}
              >
                (≈ $62 per session)
              </Text>
            </View>

            <TouchableOpacity
              className={`w-full ${primaryBtnBg} flex-row items-center justify-center gap-2 rounded-xl py-3.5 active:opacity-90`}
              onPress={enrollNow}
            >
              <Text className={`text-[16px] font-semibold ${primaryBtnText}`}>
                Enroll Now
              </Text>
              <ChevronRightIcon color={isDarkMode ? "#000" : "#fff"} />
            </TouchableOpacity>

            <TouchableOpacity
              className="mt-2 w-full items-center justify-center py-2"
              onPress={goToChessDetails}
            >
              <Text
                className={`text-[16px] font-medium ${isDarkMode ? "text-white" : "text-[#2B3674]"}`}
              >
                View Details
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          className={`mb-6 overflow-hidden rounded-2xl border ${borderTone} ${cardBg} shadow-sm`}
        >
          <View className="relative aspect-[16/9] w-full bg-gray-100">
            <Image
              source={{
                uri: "https://my.bluerobins.com/images/special-math-challenge.png",
              }}
              className="h-full w-full"
              resizeMode="cover"
            />
            <View
              className={`absolute left-3 top-3 rounded-full px-3 py-1 ${isDarkMode ? "bg-[#FDB515]" : "bg-[#2B3674]"}`}
            >
              <Text
                className={`text-[14px] font-bold tracking-wide ${isDarkMode ? "text-black" : "text-white"}`}
              >
                Math
              </Text>
            </View>
          </View>

          <View className="p-5">
            <Text
              className={`mb-1 text-[20px] font-bold ${isDarkMode ? "text-[#FDB515]" : "text-[#2B3674]"}`}
            >
              Math Challenge Track
            </Text>
            <Text className={`mb-3 text-[16px] font-semibold ${mainTextColor}`}>
              Elite 1-on-1 Competition & Advanced Math Preparation
            </Text>
            <Text
              className={`mb-4 text-[15px] leading-5 ${isDarkMode ? "text-white/80" : "text-[#2B3674]/70"}`}
            >
              Train with mentors from UC Berkeley, MIT, Stanford, Columbia, and
              other leading universities who have excelled in national and
              international math competitions.
            </Text>

            <Text className={`mb-2 text-[15px] font-semibold ${mainTextColor}`}>
              Students can focus on:
            </Text>
            <View className="mb-4 gap-3">
              <View>
                <Text
                  className={`text-[15px] font-bold ${isDarkMode ? "text-[#FDB515]" : "text-[#2B3674]"}`}
                >
                  Competition Preparation
                </Text>
                <Text
                  className={`mt-0.5 text-[14px] ${isDarkMode ? "text-white/80" : "text-[#2B3674]/70"}`}
                >
                  AMC, AIME, MathCounts, Olympiad-style problem solving, and
                  timed mock simulations.
                </Text>
              </View>
              <View>
                <Text
                  className={`text-[15px] font-bold ${isDarkMode ? "text-[#FDB515]" : "text-[#2B3674]"}`}
                >
                  Advanced Academic Math
                </Text>
                <Text
                  className={`mt-0.5 text-[14px] ${isDarkMode ? "text-white/80" : "text-[#2B3674]/70"}`}
                >
                  AP Calculus AB/BC, AP Statistics, Linear Algebra, and
                  Multivariable Calculus.
                </Text>
              </View>
            </View>

            <Text
              className={`mb-4 text-[14px] italic ${isDarkMode ? "text-white/80" : "text-[#2B3674]/70"}`}
            >
              Each student follows a structured 16-week plan tailored to their
              level and goals.
            </Text>

            <Text className={`mb-1.5 text-[15px] font-medium ${mainTextColor}`}>
              Choose a math track
            </Text>
            <TouchableOpacity
              className={`mb-4 w-full flex-row items-center justify-between rounded-lg border ${borderTone} ${cardBg} px-4 py-3.5`}
              onPress={() => setShowTrackPicker(true)}
            >
              <Text className={`flex-1 text-[15px] ${mainTextColor}`}>
                {selectedMathTrack}
              </Text>
              <Text className="text-[#2B3674]/50">▾</Text>
            </TouchableOpacity>

            <View className="mb-3 flex-row flex-wrap gap-x-4 gap-y-1">
              <Text className={`text-[14px] ${subTextColor}`}>
                1-hour sessions
              </Text>
              <Text className={`text-[14px] ${subTextColor}`}>
                4 sessions/month
              </Text>
              <Text className={`text-[14px] ${subTextColor}`}>16 weeks</Text>
            </View>

            <View className="mb-4 flex-row items-baseline gap-1">
              <Text className={`text-[28px] font-bold ${mainTextColor}`}>
                $249
              </Text>
              <Text className={`text-[16px] ${subTextColor}`}>/month</Text>
              <Text
                className={`ml-1 text-[14px] ${isDarkMode ? "text-white/40" : "text-[#2B3674]/50"}`}
              >
                (≈ $62 per session)
              </Text>
            </View>

            <TouchableOpacity
              className={`w-full ${primaryBtnBg} flex-row items-center justify-center gap-2 rounded-xl py-3.5 active:opacity-90`}
              onPress={enrollNow}
            >
              <Text className={`text-[16px] font-semibold ${primaryBtnText}`}>
                Enroll Now
              </Text>
              <ChevronRightIcon color={isDarkMode ? "#000" : "#fff"} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={showTrackPicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowTrackPicker(false)}
      >
        <View className="flex-1 justify-end bg-black/40">
          <Pressable
            className="flex-1"
            onPress={() => setShowTrackPicker(false)}
          />
          <View className="max-h-[70%] rounded-t-3xl bg-white pb-8 pt-4">
            <Text className="mb-3 text-center text-base font-bold text-[#2B3674]">
              Choose a math track
            </Text>
            <ScrollView>
              {MATH_TRACK_OPTIONS.map((track) => {
                const selected = selectedMathTrack === track;
                return (
                  <TouchableOpacity
                    key={track}
                    className={`px-5 py-3.5 ${selected ? "bg-[#2B3674]/8" : ""}`}
                    onPress={() => {
                      setSelectedMathTrack(track);
                      setShowTrackPicker(false);
                    }}
                  >
                    <Text
                      className={`text-[15px] ${selected ? "font-semibold text-[#2B3674]" : "text-[#2B3674]/85"}`}
                    >
                      {track}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
