import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
  Calendar,
  Check,
  Mail,
  User,
  UserPlus,
  Video,
} from "lucide-react-native";
import React, { useState } from "react";
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
  /* Colors & constants */
}
const NAVY = "#2B3674";
const GOLD = "#FDB515";
const TEAL = "#6DB8D0";
const LIGHT_BG = "#E8EDF6";

type PlanId = "full" | "flexible";

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

{
  /* Template */
}

function RadioDot({
  selected,
  accent = NAVY,
}: {
  selected: boolean;
  accent?: string;
}) {
  return (
    <View
      className="h-5 w-5 items-center justify-center rounded-full border-2"
      style={{
        borderColor: selected ? accent : `${NAVY}4D`,
        backgroundColor: selected && accent === TEAL ? accent : "transparent",
      }}
    >
      {selected ? (
        <View
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: accent === TEAL ? "#fff" : accent }}
        />
      ) : null}
    </View>
  );
}

{
  /* Main Export Area */
}
export default function CheckoutScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    projectId?: string;
    title?: string;
    mentorName?: string;
    imageUrl?: string;
  }>();

  const projectTitle = params.title ?? "Summer Project";
  const mentorName = params.mentorName ?? "Mentor";
  const imageUrl =
    params.imageUrl ??
    "https://yvbeqrxgvcmkuouxpmjx.supabase.co/storage/v1/object/public/project_photos/project-334/1779012879964.webp";

  const [plan, setPlan] = useState<PlanId>("full");
  const [startDate, setStartDate] = useState("");
  const [day1, setDay1] = useState("Monday");
  const [day2, setDay2] = useState("Tuesday");
  const [childName, setChildName] = useState("");
  const [childEmail, setChildEmail] = useState("");
  const [recordingConsent, setRecordingConsent] = useState(true);
  const [childAdded, setChildAdded] = useState(false);

  const canPay = childAdded;

  const handleAddChild = () => {
    if (childName.trim() && childEmail.trim()) {
      setChildAdded(true);
    }
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: LIGHT_BG }}>
      <StatusBar barStyle="dark-content" backgroundColor={LIGHT_BG} />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingTop: 8,
          paddingBottom: 32,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Pressable
          onPress={() => router.back()}
          className="mb-3 flex-row items-center self-start"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <ArrowLeft size={18} color={NAVY} />
          <Text className="ml-1 text-sm font-medium" style={{ color: NAVY }}>
            Back
          </Text>
        </Pressable>

        <Text
          className="mb-4 text-[22px] font-extrabold tracking-tight"
          style={{ color: NAVY }}
        >
          Checkout
        </Text>

        {/* Order summary */}
        <View
          className="mb-5 overflow-hidden rounded-xl border-2"
          style={{ borderColor: NAVY }}
        >
          <View className="px-5 py-3" style={{ backgroundColor: NAVY }}>
            <Text className="text-[15px] font-semibold text-white">
              Order Summary
            </Text>
          </View>

          <View className="bg-white p-5">
            <View
              className="mb-3 self-start rounded border px-3 py-1"
              style={{ backgroundColor: `${NAVY}1A`, borderColor: `${NAVY}33` }}
            >
              <Text
                className="text-[14px] font-semibold"
                style={{ color: NAVY }}
              >
                Summer Intensive
              </Text>
            </View>

            <View className="mb-3 flex-row gap-3">
              <View
                className="h-[60px] w-[80px] overflow-hidden rounded-lg"
                style={{ backgroundColor: `${NAVY}1A` }}
              >
                <Image
                  source={{ uri: imageUrl }}
                  style={{ width: 80, height: 60 }}
                  contentFit="cover"
                />
              </View>
              <View className="flex-1">
                <Text
                  className="mb-0.5 text-[15px] font-semibold leading-tight"
                  style={{ color: NAVY }}
                >
                  {projectTitle}
                </Text>
                <Text className="text-[14px]" style={{ color: NAVY }}>
                  by{" "}
                  <Text className="font-semibold" style={{ color: TEAL }}>
                    {mentorName}
                  </Text>
                </Text>
              </View>
            </View>

            <View
              className="mb-2 self-start rounded-full px-4 py-1.5"
              style={{ backgroundColor: NAVY }}
            >
              <Text className="text-[14px] font-medium text-white">
                24-hour experience · 1-on-1 mentoring · 2x/week · 10 weeks
              </Text>
            </View>

            <View
              className="mb-3 mt-3 rounded-lg border p-3"
              style={{ backgroundColor: LIGHT_BG, borderColor: `${NAVY}26` }}
            >
              <Text
                className="mb-1 text-[15px] font-bold"
                style={{ color: NAVY }}
              >
                What&apos;s included
              </Text>
              <Text
                className="text-[14px] leading-snug"
                style={{ color: `${NAVY}CC` }}
              >
                • 20 private 1-on-1 mentor sessions
              </Text>
              <Text
                className="text-[14px] leading-snug"
                style={{ color: `${NAVY}CC` }}
              >
                • 3 hrs workshops + 1 hr final demo
              </Text>
              <Text
                className="mt-1 text-[14px] font-semibold"
                style={{ color: NAVY }}
              >
                24-hour total experience
              </Text>
            </View>

            <Text
              className="mb-2 text-[15px] font-bold"
              style={{ color: NAVY }}
            >
              Choose your payment plan:
            </Text>

            {/* Full Summer */}
            <Pressable
              onPress={() => setPlan("full")}
              className="relative mb-2.5 rounded-lg border-2 p-3.5"
              style={{
                borderColor: plan === "full" ? GOLD : `${NAVY}33`,
                backgroundColor: plan === "full" ? `${GOLD}14` : "#fff",
              }}
            >
              <View
                className="absolute -top-2.5 left-3 rounded-full px-2 py-0.5"
                style={{ backgroundColor: GOLD }}
              >
                <Text className="text-[12px] font-bold" style={{ color: NAVY }}>
                  BEST VALUE — SAVE $99
                </Text>
              </View>
              <View className="mt-1 flex-row items-center justify-between">
                <View className="flex-1 flex-row items-center gap-2.5 pr-2">
                  <RadioDot selected={plan === "full"} />
                  <View className="flex-1">
                    <Text
                      className="text-[15px] font-bold"
                      style={{ color: NAVY }}
                    >
                      Full Summer Enrollment
                    </Text>
                    <Text
                      className="text-[14px]"
                      style={{ color: `${NAVY}B3` }}
                    >
                      One payment — secure your spot.
                    </Text>
                  </View>
                </View>
                <Text className="text-[15px] font-bold" style={{ color: NAVY }}>
                  $1599
                </Text>
              </View>
            </Pressable>

            {/* Flexible */}
            <Pressable
              onPress={() => setPlan("flexible")}
              className="rounded-lg border-2 p-3.5"
              style={{
                borderColor: plan === "flexible" ? TEAL : `${NAVY}33`,
                backgroundColor: plan === "flexible" ? `${TEAL}14` : "#fff",
              }}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1 flex-row items-center gap-2.5 pr-2">
                  <RadioDot selected={plan === "flexible"} accent={TEAL} />
                  <View className="flex-1">
                    <Text
                      className="text-[15px] font-bold"
                      style={{ color: NAVY }}
                    >
                      Flexible Plan
                    </Text>
                    <Text
                      className="text-[14px]"
                      style={{ color: `${NAVY}B3` }}
                    >
                      Pay in 2 installments.
                    </Text>
                  </View>
                </View>
                <Text className="text-[16px] font-bold" style={{ color: NAVY }}>
                  $849 + $849
                </Text>
              </View>

              {plan === "flexible" ? (
                <View
                  className="ml-7 mt-2 border-t pt-2"
                  style={{ borderColor: `${NAVY}1A` }}
                >
                  <View className="flex-row items-center justify-between">
                    <Text
                      className="text-[14px]"
                      style={{ color: `${NAVY}CC` }}
                    >
                      Due today
                    </Text>
                    <Text
                      className="text-[14px] font-semibold"
                      style={{ color: NAVY }}
                    >
                      $849
                    </Text>
                  </View>
                  <View className="mt-0.5 flex-row items-center justify-between">
                    <Text
                      className="text-[14px]"
                      style={{ color: `${NAVY}CC` }}
                    >
                      After session 8
                    </Text>
                    <Text
                      className="text-[14px] font-semibold"
                      style={{ color: NAVY }}
                    >
                      $849
                    </Text>
                  </View>
                </View>
              ) : null}
            </Pressable>

            {/* Start date */}
            <View
              className="mb-3 mt-4 rounded-lg p-3.5"
              style={{ backgroundColor: LIGHT_BG }}
            >
              <View className="mb-2 flex-row items-center gap-2">
                <Calendar size={20} color={NAVY} />
                <Text
                  className="text-[15px] font-semibold"
                  style={{ color: NAVY }}
                >
                  Choose Your Start Date
                </Text>
              </View>
              <Text
                className="mb-2 text-[14px] leading-snug"
                style={{ color: `${NAVY}B3` }}
              >
                Sessions run continuously for 10 weeks with your mentor.
              </Text>

              <Text
                className="mb-1 text-[14px] font-semibold"
                style={{ color: NAVY }}
              >
                Preferred Start Date
              </Text>
              <TextInput
                value={startDate}
                onChangeText={setStartDate}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={`${NAVY}80`}
                className="mb-1 rounded-lg border px-3 py-2.5 text-[14px]"
                style={{
                  borderColor: `${NAVY}33`,
                  color: NAVY,
                  backgroundColor: "#fff",
                }}
              />
              <Text
                className="mb-2.5 text-[12px]"
                style={{ color: `${NAVY}80` }}
              >
                Pick any date in June or July 2026
              </Text>

              <Text
                className="mb-1.5 text-[14px] font-semibold"
                style={{ color: NAVY }}
              >
                Preferred Day 1
              </Text>
              <View className="mb-2.5 flex-row flex-wrap gap-1.5">
                {WEEKDAYS.map((day) => (
                  <Pressable
                    key={`d1-${day}`}
                    onPress={() => setDay1(day)}
                    className="rounded-lg border px-2.5 py-1.5"
                    style={{
                      borderColor: day1 === day ? NAVY : `${NAVY}33`,
                      backgroundColor: day1 === day ? `${NAVY}14` : "#fff",
                    }}
                  >
                    <Text
                      className="text-[12px] font-medium"
                      style={{ color: day1 === day ? NAVY : `${NAVY}99` }}
                    >
                      {day.slice(0, 3)}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <Text
                className="mb-1.5 text-[14px] font-semibold"
                style={{ color: NAVY }}
              >
                Preferred Day 2
              </Text>
              <View className="flex-row flex-wrap gap-1.5">
                {WEEKDAYS.map((day) => (
                  <Pressable
                    key={`d2-${day}`}
                    onPress={() => setDay2(day)}
                    className="rounded-lg border px-2.5 py-1.5"
                    style={{
                      borderColor: day2 === day ? NAVY : `${NAVY}33`,
                      backgroundColor: day2 === day ? `${NAVY}14` : "#fff",
                    }}
                  >
                    <Text
                      className="text-[12px] font-medium"
                      style={{ color: day2 === day ? NAVY : `${NAVY}99` }}
                    >
                      {day.slice(0, 3)}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Child picker */}
            <View
              className="rounded-lg border p-3.5"
              style={{ backgroundColor: `${NAVY}1A`, borderColor: `${GOLD}40` }}
            >
              <Text
                className="mb-2 text-[14px] font-semibold"
                style={{ color: NAVY }}
              >
                Currently buying for:
              </Text>

              {childAdded ? (
                <View className="flex-row items-center gap-2 py-1">
                  <View
                    className="h-9 w-9 items-center justify-center rounded-full"
                    style={{ backgroundColor: NAVY }}
                  >
                    <Text className="text-sm font-bold text-white">
                      {childName.trim().charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <View>
                    <Text
                      className="text-[14px] font-bold"
                      style={{ color: NAVY }}
                    >
                      {childName}
                    </Text>
                    <Text
                      className="text-[13px]"
                      style={{ color: `${NAVY}99` }}
                    >
                      {childEmail}
                    </Text>
                  </View>
                  <Pressable
                    onPress={() => setChildAdded(false)}
                    className="ml-auto"
                  >
                    <Text
                      className="text-[13px] font-semibold"
                      style={{ color: TEAL }}
                    >
                      Change
                    </Text>
                  </Pressable>
                </View>
              ) : (
                <View>
                  <View className="mb-3 flex-row items-center gap-2">
                    <UserPlus size={20} color={NAVY} />
                    <Text
                      className="text-[14px] font-bold"
                      style={{ color: NAVY }}
                    >
                      Add your first child:
                    </Text>
                  </View>

                  <View className="relative mb-3">
                    <View className="absolute left-3 top-3.5 z-10">
                      <User size={16} color={`${NAVY}80`} />
                    </View>
                    <TextInput
                      value={childName}
                      onChangeText={setChildName}
                      placeholder="Child's name"
                      placeholderTextColor={`${NAVY}80`}
                      className="rounded-lg border py-2.5 pl-10 pr-4 text-[14px]"
                      style={{
                        borderColor: `${NAVY}33`,
                        color: NAVY,
                        backgroundColor: "#fff",
                      }}
                    />
                  </View>

                  <View className="relative mb-3">
                    <View className="absolute left-3 top-3.5 z-10">
                      <Mail size={16} color={`${NAVY}80`} />
                    </View>
                    <TextInput
                      value={childEmail}
                      onChangeText={setChildEmail}
                      placeholder="Child's email"
                      placeholderTextColor={`${NAVY}80`}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      className="rounded-lg border py-2.5 pl-10 pr-4 text-[14px]"
                      style={{
                        borderColor: `${NAVY}33`,
                        color: NAVY,
                        backgroundColor: "#fff",
                      }}
                    />
                  </View>

                  <Pressable
                    onPress={handleAddChild}
                    className="flex-row items-center justify-center gap-2 rounded-xl py-3 shadow-sm"
                    style={{
                      backgroundColor:
                        childName.trim() && childEmail.trim()
                          ? NAVY
                          : `${NAVY}4D`,
                    }}
                  >
                    <UserPlus size={20} color="#fff" />
                    <Text className="text-[14px] font-semibold text-white">
                      Add Child & Continue
                    </Text>
                  </Pressable>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Purchase panel */}
        <View
          className="mb-4 rounded-xl border bg-white p-4"
          style={{ borderColor: `${NAVY}1A` }}
        >
          <Text
            className="mb-2 text-[15px] font-semibold"
            style={{ color: NAVY }}
          >
            Complete your purchase
          </Text>
          <Text
            className="mb-3 text-[14px] leading-snug"
            style={{ color: NAVY }}
          >
            You will be redirected to Stripe&apos;s secure checkout to complete
            your payment.
          </Text>
          <Text
            className="text-[14px] leading-snug"
            style={{ color: `${NAVY}99` }}
          >
            Max 2 makeup sessions allowed. Your mentor confirms the schedule
            after enrollment.
          </Text>
        </View>

        <View
          className="mb-4 rounded-xl border-2 p-4"
          style={{ backgroundColor: LIGHT_BG, borderColor: `${NAVY}4D` }}
        >
          <View className="mb-2 flex-row items-center gap-2">
            <Video size={16} color={NAVY} />
            <Text className="text-[14px] font-semibold" style={{ color: NAVY }}>
              Session Recording
            </Text>
            <View
              className="rounded-full px-1.5 py-0.5"
              style={{ backgroundColor: `${NAVY}1A` }}
            >
              <Text className="text-[12px] font-bold" style={{ color: NAVY }}>
                Recommended
              </Text>
            </View>
          </View>

          <Pressable
            onPress={() => setRecordingConsent((v) => !v)}
            className="flex-row items-start gap-3 rounded-lg p-2.5"
            style={{ backgroundColor: `${TEAL}1A` }}
          >
            <View
              className="mt-0.5 h-4 w-4 items-center justify-center rounded border"
              style={{
                borderColor: `${NAVY}40`,
                backgroundColor: recordingConsent ? NAVY : "#fff",
              }}
            >
              {recordingConsent ? (
                <Check size={12} color="#fff" strokeWidth={3} />
              ) : null}
            </View>
            <Text
              className="flex-1 text-[14px] leading-snug"
              style={{ color: `${NAVY}CC` }}
            >
              I consent to session recordings per the Privacy Policy. You can
              change this anytime in Settings.
            </Text>
          </Pressable>
        </View>

        {!canPay ? (
          <View
            className="mb-3 rounded-lg border p-3.5"
            style={{ backgroundColor: `${GOLD}1A`, borderColor: `${GOLD}4D` }}
          >
            <Text className="text-[14px] font-semibold" style={{ color: NAVY }}>
              Please add your child above to continue with checkout.
            </Text>
          </View>
        ) : null}

        <View className="flex-row gap-3">
          <Pressable
            onPress={() => router.back()}
            className="flex-1 items-center justify-center rounded-full border-2 py-2.5"
            style={{ borderColor: `${NAVY}4D` }}
          >
            <Text className="text-[15px] font-semibold" style={{ color: NAVY }}>
              Back
            </Text>
          </Pressable>

          <Pressable
            disabled={!canPay}
            onPress={() => {}}
            className="flex-1 items-center justify-center rounded-full py-2.5"
            style={{ backgroundColor: canPay ? "#635BFF" : `${NAVY}4D` }}
          >
            <Text className="text-[15px] font-semibold text-white">
              Pay with Stripe
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
