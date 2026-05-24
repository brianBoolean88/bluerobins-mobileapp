import { useRouter } from "expo-router";
import { ArrowLeft, Flag, Trophy } from "lucide-react-native";
import React, { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

{
  /* Constants that are not final (These should be updated accordingly w/ API) */
}
{
  /* TODO: Make these actually connected to the backend API */
}

const CHALLENGE = {
  number: "007",
  date: "2026-05-22",
  category: "How It Works",
  description:
    "Guess the STEM topic from up to 5 clues. Fewer clues = better score.",
};

const CLUES = [
  "Proposed by Lemaître in 1927 as a 'primeval atom'.",
  "Edwin Hubble's observations of receding galaxies supported the idea.",
  "Cosmic microwave background radiation was discovered in 1965.",
  "It explains why distant stars appear redshifted.",
  "The universe expanded from an extremely hot, dense state.",
];

const LEADERBOARD = [
  { rank: 1, name: "Ashish", score: "5/5 clues" },
  { rank: 2, name: "Harper", score: "4/5 clues" },
  { rank: 3, name: "Maya", score: "3/5 clues" },
];

type LeaderboardScope = "everyone" | "group";

{
  /* Main Export Area */
}
export default function DailyChallengeScreen() {
  const router = useRouter();
  const [guess, setGuess] = useState("");
  const [visibleClueCount, setVisibleClueCount] = useState(1);
  const [guessesLeft, setGuessesLeft] = useState(5);
  const [leaderboardScope, setLeaderboardScope] =
    useState<LeaderboardScope>("everyone");
  const [gaveUp, setGaveUp] = useState(false);

  const visibleClues = useMemo(
    () => CLUES.slice(0, visibleClueCount),
    [visibleClueCount],
  );

  const canRevealMore = visibleClueCount < CLUES.length;
  const canSubmit = guess.trim().length > 0 && guessesLeft > 0 && !gaveUp;

  const handleSubmit = () => {
    if (!canSubmit) return;
    setGuessesLeft((n) => n - 1);
    setGuess("");
  };

  const handleRevealClue = () => {
    if (canRevealMore) setVisibleClueCount((n) => n + 1);
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 32,
          gap: 16,
          maxWidth: 640,
          width: "100%",
          alignSelf: "center",
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-row flex-wrap items-center justify-between gap-3">
          <Pressable
            onPress={() => router.back()}
            className="flex-row items-center"
          >
            <ArrowLeft size={16} color="#2B3674" />
            <Text className="ml-1 text-sm text-[#2B3674]">Dashboard</Text>
          </Pressable>
          <Text className="text-sm font-semibold text-[#2B3674]">
            0-day streak
          </Text>
        </View>

        <View className="rounded-xl border border-[#2B3674]/10 bg-white p-5 shadow-sm">
          <View className="flex-row flex-wrap items-baseline justify-between gap-2">
            <Text className="text-2xl font-bold text-[#2B3674]">
              Daily Challenge #{CHALLENGE.number}
            </Text>
            <Text className="text-sm text-[#2B3674]/60">{CHALLENGE.date}</Text>
          </View>
          <Text className="mt-1 text-[15px] text-[#2B3674]/80">
            {CHALLENGE.description}
          </Text>
        </View>

        <View className="rounded-xl border border-[#2B3674]/10 bg-white p-5 shadow-sm">
          <Text className="text-xs uppercase tracking-wider text-[#2B3674]/60">
            Category: {CHALLENGE.category}
          </Text>

          <View className="mt-4 gap-2">
            {visibleClues.map((clue, index) => (
              <View
                key={index}
                className="flex-row items-start gap-3 rounded-lg bg-[#f6f8fb] p-3"
              >
                <View className="h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FDB515]">
                  <Text className="text-sm font-bold text-black">
                    {index + 1}
                  </Text>
                </View>
                <Text className="flex-1 text-[15px] text-[#2B3674]">
                  {clue}
                </Text>
              </View>
            ))}
          </View>

          {gaveUp ? (
            <Text className="mt-4 text-center text-sm text-[#2B3674]/70">
              You gave up on today's challenge. Come back tomorrow!
            </Text>
          ) : (
            <>
              <View className="mt-4 gap-2">
                <TextInput
                  value={guess}
                  onChangeText={setGuess}
                  placeholder="Type your guess…"
                  placeholderTextColor="rgba(43,54,116,0.45)"
                  className="rounded-lg border border-[#2B3674]/30 bg-white px-4 py-2.5 text-[#2B3674]"
                  editable={guessesLeft > 0}
                />
                <Pressable
                  onPress={handleSubmit}
                  disabled={!canSubmit}
                  className={`items-center rounded-full bg-[#FDB515] px-5 py-2.5 ${
                    !canSubmit ? "opacity-50" : ""
                  }`}
                >
                  <Text className="font-semibold text-black">Submit guess</Text>
                </Pressable>
              </View>

              <View className="mt-4 flex-row flex-wrap items-center justify-between gap-2">
                <Text className="text-sm text-[#2B3674]/70">
                  {visibleClueCount}/5 clues · {guessesLeft} guesses left
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  <Pressable
                    onPress={handleRevealClue}
                    disabled={!canRevealMore}
                    className={`rounded-full border border-[#2B3674]/30 bg-white px-4 py-2 ${
                      !canRevealMore ? "opacity-50" : ""
                    }`}
                  >
                    <Text className="text-sm text-[#2B3674]">
                      Reveal next clue
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setGaveUp(true)}
                    className="flex-row items-center gap-1 rounded-full border border-[#2B3674]/30 px-4 py-2"
                  >
                    <Flag size={16} color="#2B3674" />
                    <Text className="text-sm text-[#2B3674]">Give up</Text>
                  </Pressable>
                </View>
              </View>
            </>
          )}
        </View>

        <View className="rounded-xl border border-[#2B3674]/10 bg-white p-5 shadow-sm">
          <View className="mb-3 flex-row flex-wrap items-center justify-between gap-2">
            <View className="flex-row items-center gap-2">
              <Trophy size={20} color="#FDB515" />
              <Text className="text-lg font-bold text-[#2B3674]">
                Today's Leaderboard
              </Text>
            </View>
            <View className="flex-row rounded-full bg-[#f6f8fb] p-1">
              <Pressable
                onPress={() => setLeaderboardScope("everyone")}
                className={`rounded-full px-3 py-1 ${
                  leaderboardScope === "everyone" ? "bg-[#2B3674]" : ""
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    leaderboardScope === "everyone"
                      ? "text-white"
                      : "text-[#2B3674]"
                  }`}
                >
                  Everyone
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setLeaderboardScope("group")}
                className={`rounded-full px-3 py-1 ${
                  leaderboardScope === "group" ? "bg-[#2B3674]" : ""
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    leaderboardScope === "group"
                      ? "text-white"
                      : "text-[#2B3674]"
                  }`}
                >
                  My group
                </Text>
              </Pressable>
            </View>
          </View>

          <View className="gap-1.5">
            {(leaderboardScope === "everyone"
              ? LEADERBOARD
              : LEADERBOARD.filter((e) => e.name === "Harper")
            ).map((entry) => (
              <View
                key={entry.rank}
                className="flex-row items-center gap-3 rounded-lg bg-[#f6f8fb] px-3 py-2"
              >
                <Text className="w-6 text-right font-bold text-[#2B3674]">
                  {entry.rank}
                </Text>
                <Text className="flex-1 text-[#2B3674]" numberOfLines={1}>
                  {entry.name}
                </Text>
                <Text className="text-sm font-semibold text-[#2B3674]">
                  {entry.score}
                </Text>
              </View>
            ))}
            {leaderboardScope === "group" &&
              !LEADERBOARD.some((e) => e.name === "Harper") && (
                <Text className="py-4 text-center text-sm text-[#2B3674]/60">
                  No scores in your group yet.
                </Text>
              )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
