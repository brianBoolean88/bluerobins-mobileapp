import {
  AskRobinChat,
  FloatingAskRobinButton,
} from "@/components/ask-robin-chat";
import { DashboardComplianceFooter } from "@/components/dashboard-compliance-footer";
import { TabScreenHeader } from "@/components/tab-screen-header";
import { useAppearance } from "@/contexts/appearance-context";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";

import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

{
  /* Assets */
}

import {
  ArrowRight,
  Briefcase,
  CircleHelp,
  Compass,
  Sparkles,
  X,
} from "lucide-react-native";

{
  /* Constants / Template info */
}

const TAB_BAR_HEIGHT = 64;

interface Project {
  id: number;
  title: string;
  imageUrl: string;
}

{
  /* TODO: Replace with actual API data */
}
const RECOMMENDED_PROJECTS: Project[] = [
  {
    id: 338,
    title: "AI Storyteller: Create Your Own Adventure Book",
    imageUrl:
      "https://yvbeqrxgvcmkuouxpmjx.supabase.co/storage/v1/object/public/project_photos/338-1779401610032.png",
  },
  {
    id: 334,
    title: "Train an AI Robot to Navigate a Maze",
    imageUrl:
      "https://yvbeqrxgvcmkuouxpmjx.supabase.co/storage/v1/object/public/project_photos/project-334/1779012879964.webp",
  },
  {
    id: 326,
    title: "Unlocking DNA: A New Way to Keep Our Data Safe",
    imageUrl:
      "https://yvbeqrxgvcmkuouxpmjx.supabase.co/storage/v1/object/public/project_photos/326-1778386491938.png",
  },
  {
    id: 289,
    title: "Cinematic Worlds: Design Your Own Story with AI",
    imageUrl:
      "https://yvbeqrxgvcmkuouxpmjx.supabase.co/storage/v1/object/public/project_photos/289-pexels-1776840268862.jpg",
  },
];

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

function toDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function fromDateKey(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

{
  /* Sunday–Saturday for the week containing referenceDate. */
}
function getWeekDays(referenceDate = new Date()) {
  const ref = new Date(referenceDate);
  const weekStart = new Date(
    ref.getFullYear(),
    ref.getMonth(),
    ref.getDate() - ref.getDay(),
  );

  return DAY_LABELS.map((day, i) => {
    const d = new Date(
      weekStart.getFullYear(),
      weekStart.getMonth(),
      weekStart.getDate() + i,
    );
    return { day, date: d.getDate(), dateKey: toDateKey(d) };
  });
}

function formatMonthYear(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

{
  /* Template Cards */
}

function WelcomeBar({
  onDailyChallenge,
  onBuilderStudio,
}: {
  onDailyChallenge: () => void;
  onBuilderStudio: () => void;
}) {
  return (
    <View className="mt-2 flex-row flex-wrap items-center justify-between gap-0 rounded-2xl border border-[#2B3674]/10 bg-white py-3 px-2">
      <View className="flex-row items-center gap-2">
        <Text className="text-base font-bold text-[#2B3674]">
          Welcome to BlueRobins, Harper!
        </Text>
        {/* Role badge */}
        <View className="rounded-full bg-[#2B3674] px-3 py-0.5">
          <Text className="text-xs font-semibold text-white">Parent</Text>
        </View>
      </View>

      {/* Action buttons */}
      <View className="flex-row gap-2">
        {/* Daily Challenge */}
        <Pressable
          onPress={onDailyChallenge}
          className="flex-row items-center gap-1.5 rounded-full border border-[#FDB515] px-4 py-2"
        >
          <CircleHelp size={14} color="#2B3674" />
          <Text className="text-sm font-semibold text-[#2B3674]">
            Daily Challenge
          </Text>
        </Pressable>

        {/* Builder Studio */}
        <Pressable
          onPress={onBuilderStudio}
          className="flex-row items-center gap-1.5 rounded-full border border-[#2B3674] px-4 py-2"
        >
          <Briefcase size={14} color="#2B3674" />
          <Text className="text-sm font-semibold text-[#2B3674]">
            Builder Studio
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function DailyChallengeBanner({
  onDismiss,
  onPlay,
}: {
  onDismiss: () => void;
  onPlay: () => void;
}) {
  return (
    <Pressable
      onPress={onPlay}
      className="relative rounded-2xl border-2 border-[#FDB515] bg-white p-4"
    >
      {/* Dismiss button */}
      <Pressable
        onPress={onDismiss}
        className="absolute top-2 right-2 h-7 w-7 items-center justify-center rounded-full"
      >
        <X size={16} color="#2B3674" />
      </Pressable>

      <View className="flex-row items-center gap-3 pr-8">
        {/* Icon */}
        <View className="h-11 w-11 items-center justify-center rounded-xl bg-[#FDB515]">
          <Sparkles size={24} color="white" />
        </View>

        <View className="flex-1">
          <Text className="text-base font-bold text-[#2B3674]">
            Try this week's daily challenge
          </Text>
          <Text className="mt-0.5 text-[13px] text-[#2B3674]/85">
            A fresh science puzzle every day — takes about a minute. Build your
            streak!
          </Text>
        </View>

        <View className="flex-row items-center gap-1">
          <Text className="text-[13px] font-semibold text-[#2B3674]">Play</Text>
          <ArrowRight size={16} color="#2B3674" />
        </View>
      </View>
    </Pressable>
  );
}

function CalendarStrip() {
  const today = new Date();
  const todayKey = toDateKey(today);
  const weekDays = getWeekDays(today);
  const [selectedDateKey, setSelectedDateKey] = useState(todayKey);

  const selectedDate = fromDateKey(
    weekDays.find((d) => d.dateKey === selectedDateKey)?.dateKey ?? todayKey,
  );

  return (
    <View className="rounded-2xl border border-[#d6e6ef] bg-white overflow-hidden">
      <View className="p-5 gap-4">
        {/* Header */}
        <View className="border-b border-[#2B3674]/10 pb-2">
          <Text className="text-lg font-bold text-[#2B3674]">Calendar</Text>
        </View>

        {/* Month row */}
        <View className="flex-row items-center gap-2">
          <Text className="text-base font-semibold text-[#2B3674]">
            {formatMonthYear(selectedDate)}
          </Text>
        </View>

        {/* Day grid */}
        <View className="flex-row gap-1">
          {weekDays.map(({ day, date, dateKey }) => {
            const isSelected = dateKey === selectedDateKey;
            return (
              <Pressable
                key={dateKey}
                onPress={() => setSelectedDateKey(dateKey)}
                className={`flex-1 items-center justify-center rounded-lg py-1.5 ${
                  isSelected ? "bg-[#FDB515]" : "bg-[#E8EDF6]"
                }`}
              >
                <Text
                  className={`text-sm leading-tight ${
                    isSelected
                      ? "font-semibold text-white"
                      : "text-[#2B3674]/70"
                  }`}
                >
                  {day}
                </Text>
                <Text
                  className={`text-sm font-medium leading-tight ${
                    isSelected ? "text-white" : "text-[#2B3674]/70"
                  }`}
                >
                  {date}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View className="h-px bg-[#E8EDF6]" />

        {/* Sessions */}
        <View className="gap-3">
          <Text className="text-[17px] font-bold text-[#2B3674]">
            Scheduled Sessions (0)
          </Text>
          <Text className="text-center text-base text-[#2B3674]/75 py-4">
            No sessions scheduled for this day.
          </Text>
        </View>
      </View>
    </View>
  );
}

function OnboardingCard() {
  return (
    <View className="rounded-2xl bg-white border border-[#d6e6ef] p-5 gap-0">
      <Text className="text-lg font-bold text-[#2B3674]">
        Welcome to BlueRobins
      </Text>
      <Text className="text-[15px] text-[#2B3674]/85 leading-relaxed">
        Your child is about to start an exciting journey with a dedicated
        mentor. They will work on exciting projects, build skills, and gain
        confidence — one session at a time.
      </Text>

      {/* Steps */}
      {[
        {
          n: "1",
          title: "Browse and choose a project",
          sub: "Pick something that sparks curiosity",
        },
        { n: "2", title: "Your mentor will set your child's start date" },
        { n: "3", title: "Start learning with weekly 1-on-1 sessions" },
      ].map(({ n, title, sub }) => (
        <View key={n} className="flex-row items-start gap-3 mb-4">
          <View className="h-8 w-8 items-center justify-center rounded-lg bg-[#2B3674]/10 mt-0.5">
            <Text className="text-[15px] text-[#2B3674]">{n}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-[15px] font-semibold text-[#2B3674]">
              {title}
            </Text>
            {sub && (
              <Text className="text-[13px] text-[#2B3674]/85">{sub}</Text>
            )}
          </View>
        </View>
      ))}

      <Pressable
        // onPress={() => router.push("/v2/projects")}
        className="self-start rounded-full bg-[#FDB515] px-5 py-2.5"
      >
        <Text className="text-[15px] font-semibold text-black">
          Explore Projects
        </Text>
      </Pressable>
    </View>
  );
}

function QuizCard() {
  return (
    <View className="rounded-2xl border-2 border-[#FDB515]/40 bg-[#E8EDF6] p-5 gap-0">
      <View className="flex-row items-start gap-3">
        <View className="h-10 w-10 items-center justify-center rounded-full bg-[#FDB515]">
          <Sparkles size={20} color="#2B3674" />
        </View>
        <View className="flex-1">
          <Text className="text-lg font-bold text-[#2B3674] mb-1">
            Take a 60-second quiz so we can recommend the right projects for
            your child.
          </Text>
          <Text className="text-sm text-[#2B3674]/75">
            Six quick questions and we'll suggest 4 strong matches. Every
            project starts with a free 30-minute session with the mentor.
          </Text>
        </View>
      </View>

      <View className="flex-row flex-wrap gap-2">
        <Pressable className="flex-row items-center gap-2 rounded-full bg-[#FDB515] px-5 py-2.5">
          <Sparkles size={16} color="#2B3674" />
          <Text className="text-sm font-bold text-[#2B3674]">
            Take the 60-second quiz
          </Text>
          <ArrowRight size={16} color="#2B3674" />
        </Pressable>

        <Pressable className="flex-row items-center gap-2 rounded-full border border-[#2B3674]/20 bg-white px-5 py-2.5">
          <Compass size={16} color="#2B3674" />
          <Text className="text-sm font-semibold text-[#2B3674]">
            Browse all projects
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function RecommendedProjects() {
  const router = useRouter();

  return (
    <View className="rounded-2xl border border-[#d6e6ef] bg-white overflow-hidden p-4 gap-0">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-[15px] font-bold text-[#2B3674]">
          Recommended for You
        </Text>
        <Pressable onPress={() => router.push("/projects")}>
          <Text className="text-[13px] font-medium text-[#2B3674]">
            View All
          </Text>
        </Pressable>
      </View>

      <View className="gap-0">
        {RECOMMENDED_PROJECTS.map((project) => (
          <Pressable
            key={project.id}
            onPress={() =>
              router.push({
                pathname: "/project-details",
                params: { projectId: String(project.id) },
              })
            }
            className="w-full rounded-xl border border-[#d6e6ef] bg-white overflow-hidden mb-4 mt-4"
          >
            <Image
              source={{ uri: project.imageUrl }}
              className="w-full"
              style={{ height: 140 }}
              resizeMode="cover"
            />
            <View className="px-3 py-2.5">
              <Text
                className="font-bold text-[14px] text-[#2B3674] leading-snug"
                numberOfLines={2} // replaces line-clamp-2
              >
                {project.title}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

{
  /* Main Export Area */
}

export default function Index() {
  const router = useRouter();
  const [showBanner, setShowBanner] = useState(true);
  const [showAskRobinChat, setShowAskRobinChat] = useState(false);
  const insets = useSafeAreaInsets();
  const { colorScheme } = useAppearance();
  const screenBg = colorScheme === "dark" ? "#161d30" : "#F4F6FA";
  const scrollBottomPadding = insets.bottom + TAB_BAR_HEIGHT + 88;

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: screenBg }}
      edges={["top"]}
    >
      {/*
       * StatusBar: replaces the browser's default chrome.
       * On web this does nothing; on native it sets the status bar style.
       */}
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={screenBg}
      />

      <TabScreenHeader showProgramsMenu />

      <AskRobinChat
        visible={showAskRobinChat}
        onClose={() => setShowAskRobinChat(false)}
      />
      <FloatingAskRobinButton
        bottomInset={insets.bottom}
        onPress={() => setShowAskRobinChat(true)}
      />

      {/* Scrollable content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 60,
          paddingBottom: scrollBottomPadding,
          gap: 12,
        }}
        showsVerticalScrollIndicator={false}
      >
        <WelcomeBar
          onDailyChallenge={() => router.push("/daily")}
          onBuilderStudio={() => router.push("/studio")}
        />

        {showBanner && (
          <DailyChallengeBanner
            onDismiss={() => setShowBanner(false)}
            onPlay={() => router.push("/daily")}
          />
        )}

        {/* Main content + sidebar stacked vertically on mobile */}
        <OnboardingCard />
        <QuizCard />
        <CalendarStrip />
        <RecommendedProjects />
        <DashboardComplianceFooter />
      </ScrollView>
    </SafeAreaView>
  );
}
