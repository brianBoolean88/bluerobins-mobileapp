import { Image } from "expo-image";

import * as Clipboard from "expo-clipboard";

import { useRouter } from "expo-router";

import React, { useState } from "react";

import {
  Alert,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

{
  /* Constants & Colors */
}

{
  /* TODO: note to self, check if this is the actual referral message the leads want */
}
const REFERRAL_MESSAGE =
  "Join me on BlueRobins! Get $50 off your first project 👇 https://my.bluerobins.com/?ref=0312BLUEAC-65Y0&utm_source=referral&utm_medium=share&utm_campaign=refer_and_win&utm_content=dashboard_invite";

const INVITE_OPTIONS = [
  { id: "copy", label: "Copy text", icon: "📋" },

  { id: "whatsapp", label: "WhatsApp", icon: "💬" },

  { id: "email", label: "Email", icon: "✉️" },

  { id: "messages", label: "Messages", icon: "📱" },
] as const;

type InviteOptionId = (typeof INVITE_OPTIONS)[number]["id"];

{
  /* Main Export Area */
}

export default function ReferAndWinScreen() {
  const router = useRouter();

  const [showInviteMenu, setShowInviteMenu] = useState(false);

  const isDarkMode = false;

  const containerBg = isDarkMode ? "bg-[#161d30]" : "bg-slate-50";

  const surfaceCardBg = isDarkMode ? "bg-[#2B3674]" : "bg-white";

  const surfaceBorder = isDarkMode
    ? "border-[#FDB515]/30"
    : "border-[#2B3674]/10";

  const mainTextColor = isDarkMode ? "text-white" : "text-[#2B3674]";

  const mutedTextColor = isDarkMode ? "text-white/75" : "text-[#2B3674]/75";

  const totalReferrals = 0;

  const targetReferrals = 10;

  const totalPoints = 0;

  const progressPercentage = Math.min(
    (totalReferrals / targetReferrals) * 100,
    100,
  );

  const handleInviteOption = async (optionId: InviteOptionId) => {
    setShowInviteMenu(false);

    const encoded = encodeURIComponent(REFERRAL_MESSAGE);

    try {
      switch (optionId) {
        case "copy":
          await Clipboard.setStringAsync(REFERRAL_MESSAGE);

          Alert.alert("Copied", "Invite message copied to your clipboard.");

          break;

        case "whatsapp": {
          const url = `whatsapp://send?text=${encoded}`;

          const supported = await Linking.canOpenURL(url);

          if (supported) {
            await Linking.openURL(url);
          } else {
            await Linking.openURL(`https://wa.me/?text=${encoded}`);
          }

          break;
        }

        case "email":
          await Linking.openURL(
            `mailto:?subject=${encodeURIComponent("Join me on BlueRobins")}&body=${encoded}`,
          );

          break;

        case "messages":
          await Linking.openURL(`sms:?body=${encoded}`);

          break;
      }
    } catch {
      Alert.alert(
        "Unable to share",
        "Please try another option or copy the text manually.",
      );
    }
  };

  return (
    <SafeAreaView className={`flex-1 ${containerBg}`}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 20 }}
      >
        <Pressable
          onPress={() => router.back()}
          className="mb-4 flex-row items-center"
        >
          <Text className="text-sm font-medium text-[#2B3674]/60">◀ Back</Text>
        </Pressable>

        <View className="relative mb-6 w-full overflow-hidden rounded-3xl bg-[#2B3674] p-6 shadow-md">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-2">
              <View className="mb-3 self-start rounded-full bg-white/15 px-3 py-1">
                <Text className="text-xs font-semibold uppercase tracking-wider text-white">
                  ★ Refer & Win
                </Text>
              </View>

              <Text className="text-3xl font-bold tracking-tight text-white">
                Give. Get. Grow.
              </Text>

              <View className="mt-3 gap-1">
                <Text className="text-sm text-white/90">
                  • Invite families to BlueRobins
                </Text>

                <Text className="text-sm text-white/90">
                  • They get{" "}
                  <Text className="font-semibold text-[#FDB515]">$50 off</Text>
                </Text>

                <Text className="text-sm text-white/90">
                  • You earn points toward sessions and projects
                </Text>
              </View>
            </View>

            <View className="h-16 w-16 items-center justify-center rounded-2xl bg-white/15 shadow-inner">
              <Text className="text-center text-3xl">🎁</Text>
            </View>
          </View>
        </View>

        <View className="gap-4">
          <View
            className={`rounded-3xl border ${surfaceBorder} ${surfaceCardBg} p-5 shadow-sm`}
          >
            <Text className="text-[11px] font-bold uppercase tracking-widest text-[#2B3674]/60">
              Your Invite Link
            </Text>

            <View className="mt-2 gap-3">
              <Text className={`text-sm ${mutedTextColor}`}>
                Share your link — friends get{" "}
                <Text
                  className={`font-semibold ${isDarkMode ? "text-[#FDB515]" : "text-[#2B3674]"}`}
                >
                  $50 off
                </Text>{" "}
                their first project.
              </Text>

              <TouchableOpacity
                className="items-center justify-center rounded-full bg-[#2B3674] py-2.5 shadow-sm active:opacity-90"
                onPress={() => setShowInviteMenu(true)}
              >
                <Text className="text-sm font-semibold text-white">
                  ↗ Invite Families ▾
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            className={`rounded-3xl border ${surfaceBorder} ${surfaceCardBg} p-5 shadow-sm`}
          >
            <Text className={`text-xl font-bold ${mainTextColor}`}>
              Your Rewards
            </Text>

            <Text
              className={`mt-1 text-sm ${isDarkMode ? "text-white/80" : "text-[#2B3674]/80"}`}
            >
              Earn{" "}
              <Text
                className={`font-semibold ${isDarkMode ? "text-[#FDB515]" : "text-[#2B3674]"}`}
              >
                100 points
              </Text>{" "}
              for every family you invite.
            </Text>

            <View className="mt-4 gap-3">
              <View className="flex-row items-start gap-3">
                <View className="mt-1.5 h-2 w-2 rounded-full bg-[#6DB8D0]" />

                <Text
                  className={`flex-1 text-sm ${isDarkMode ? "text-white/90" : "text-[#2B3674]/85"}`}
                >
                  <Text className="font-semibold">5 families</Text> ·{" "}
                  <Text className="font-semibold">500 pts</Text> → 4 free
                  sessions
                </Text>
              </View>

              <View className="flex-row items-start gap-3">
                <View className="mt-1.5 h-2 w-2 rounded-full bg-[#F87C73]" />

                <Text
                  className={`flex-1 text-sm ${isDarkMode ? "text-white/90" : "text-[#2B3674]/85"}`}
                >
                  <Text className="font-semibold">10 families</Text> ·{" "}
                  <Text className="font-semibold">1000 pts</Text> → Free
                  16-session mentored project
                </Text>
              </View>
            </View>
          </View>

          <View
            className={`rounded-3xl border ${surfaceBorder} ${surfaceCardBg} p-5 shadow-sm`}
          >
            <Text className={`text-xl font-bold ${mainTextColor}`}>
              Your Progress
            </Text>

            <Text className={`mt-1 text-sm ${mutedTextColor}`}>
              Every successful referral earns you 100 points!
            </Text>

            <View className="mt-5 flex-row items-baseline justify-between">
              <Text
                className={`text-sm ${isDarkMode ? "text-white" : "text-[#2B3674]/85"}`}
              >
                <Text className={`text-2xl font-bold ${mainTextColor}`}>
                  {totalReferrals}
                </Text>{" "}
                of {targetReferrals} referrals
              </Text>

              <Text className="text-sm font-semibold text-[#2B3674]/75">
                {totalPoints} pts
              </Text>
            </View>

            <View className="relative mt-3 h-3 w-full rounded-full bg-[#6DB8D0]/20">
              <View
                className="h-full rounded-full bg-[#F87C73]"
                style={{ width: `${progressPercentage}%` }}
              />

              <View className="absolute left-0 top-1/2 -ml-1 -mt-2 h-4 w-4 rounded-full border-2 border-white bg-[#F87C73] shadow-sm" />
            </View>
          </View>

          <View
            className={`rounded-3xl border ${surfaceBorder} ${surfaceCardBg} p-5 shadow-sm`}
          >
            <View className="mb-4">
              <Text className={`text-xl font-bold ${mainTextColor}`}>
                Referral Progress
              </Text>

              <Text
                className={`mt-0.5 text-xs ${isDarkMode ? "text-white/70" : "text-[#2B3674]/70"}`}
              >
                Refer your first family to start the egg cracking.
              </Text>
            </View>

            <View className="w-full items-center rounded-2xl border border-[#6DB8D0]/30 bg-[#6DB8D0]/10 p-5">
              <Image
                source={{ uri: "https://my.bluerobins.com/referrals/egg0.png" }}
                style={{ width: 160, height: 160 }}
                contentFit="contain"
              />

              <View className="mt-4 items-center">
                <Text className={`text-base font-bold ${mainTextColor}`}>
                  Your egg is ready to hatch
                </Text>

                <Text className={`mt-0.5 text-xs ${mutedTextColor}`}>
                  Waiting for your first referral.
                </Text>

                <Text
                  className={`mt-0.5 text-[11px] italic ${isDarkMode ? "text-white/60" : "text-[#2B3674]/60"}`}
                >
                  The journey begins here.
                </Text>

                <Text
                  className={`mt-3 px-2 text-center text-xs leading-4 ${
                    isDarkMode ? "text-white/70" : "text-[#2B3674]/70"
                  }`}
                >
                  Each referral grows your child’s journey — from egg to robin
                  to a full project.
                </Text>
              </View>
            </View>
          </View>

          <View
            className={`rounded-3xl border ${surfaceBorder} ${surfaceCardBg} p-5 shadow-sm`}
          >
            <Text className={`text-xl font-bold ${mainTextColor}`}>
              Builder Passport
            </Text>

            <Text
              className={`mt-0.5 text-xs ${isDarkMode ? "text-white/70" : "text-[#2B3674]/70"}`}
            >
              Watch your child’s next build take shape with every family you
              invite.
            </Text>

            <View className="mt-4 gap-3">
              <View className="flex-row items-center rounded-xl border border-[#FDB515]/35 bg-[#FDB515]/10 p-3 opacity-90">
                <View className="mr-3 h-11 w-11 items-center justify-center rounded-full bg-[#FDB515]">
                  <Text className="text-lg">🥚</Text>
                </View>

                <View className="flex-1">
                  <Text className="text-sm font-bold text-[#2B3674]">
                    1 family
                  </Text>

                  <Text className="mt-0.5 text-xs text-[#2B3674]/80">
                    Egg begins to crack.
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center rounded-xl border border-[#6DB8D0]/40 bg-[#6DB8D0]/10 p-3 opacity-90">
                <View className="mr-3 h-11 w-11 items-center justify-center rounded-full bg-[#6DB8D0]">
                  <Text className="text-lg">🐣</Text>
                </View>

                <View className="flex-1">
                  <Text className="text-sm font-bold text-[#2B3674]">
                    5 families
                  </Text>

                  <Text className={`mt-0.5 text-xs ${mutedTextColor}`}>
                    Robin forming — 4 free sessions unlocked.
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center rounded-xl border border-[#F87C73]/40 bg-[#F87C73]/10 p-3 opacity-90">
                <View className="mr-3 h-11 w-11 items-center justify-center rounded-full bg-[#F87C73]">
                  <Text className="text-lg">🐦</Text>
                </View>

                <View className="flex-1">
                  <Text className="text-sm font-bold text-[#2B3674]">
                    10 families
                  </Text>

                  <Text className={`mt-0.5 text-xs ${mutedTextColor}`}>
                    Robin hatches — One free project of 16 sessions unlocked.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={showInviteMenu}
        transparent
        animationType="fade"
        onRequestClose={() => setShowInviteMenu(false)}
      >
        <View className="flex-1 justify-end bg-black/40">
          <Pressable
            className="flex-1"
            onPress={() => setShowInviteMenu(false)}
          />

          <View className="rounded-t-3xl bg-white px-4 pb-8 pt-4">
            <Text className="mb-1 text-center text-base font-bold text-[#2B3674]">
              Share invite
            </Text>

            <Text className="mb-4 text-center text-xs text-[#2B3674]/60">
              Choose how you want to invite families
            </Text>

            {INVITE_OPTIONS.map((option, index) => (
              <TouchableOpacity
                key={option.id}
                className={`flex-row items-center rounded-xl px-4 py-4 active:bg-[#2B3674]/5 ${
                  index < INVITE_OPTIONS.length - 1 ? "mb-1" : ""
                }`}
                onPress={() => handleInviteOption(option.id)}
              >
                <Text className="mr-3 text-lg">{option.icon}</Text>

                <Text className="text-base font-medium text-[#2B3674]">
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              className="mt-2 items-center rounded-full border border-[#2B3674]/15 py-3"
              onPress={() => setShowInviteMenu(false)}
            >
              <Text className="text-sm font-medium text-[#2B3674]/70">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
