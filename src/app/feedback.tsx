import * as DocumentPicker from "expo-document-picker";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  AlertTriangle,
  Bug,
  Info,
  Lightbulb,
  MessageSquare,
  OctagonAlert,
  Paperclip,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

{
  /* Constants & Colors */
}

const NAVY = "#2B3674";
const GOLD = "#FDB515";
const MIN_CHARS = 150;

const CATEGORIES = [
  { id: "bug", label: "Bug", sub: "Something is broken", Icon: Bug },
  {
    id: "feature",
    label: "Feature",
    sub: "Suggest an improvement",
    Icon: Lightbulb,
  },
  { id: "other", label: "Other", sub: "Anything else", Icon: MessageSquare },
] as const;
type CategoryId = (typeof CATEGORIES)[number]["id"];

const URGENCIES = [
  {
    id: "high",
    label: "High Priority",
    sub: "Blocking me right now",
    Icon: OctagonAlert,
  },
  {
    id: "medium",
    label: "Medium Priority",
    sub: "Important but not urgent",
    Icon: AlertTriangle,
  },
  {
    id: "low",
    label: "Low Priority",
    sub: "Nice to have / no rush",
    Icon: Info,
  },
] as const;
type UrgencyId = (typeof URGENCIES)[number]["id"];

{
  /* Main Export Area */
}

export default function GiveFeedbackScreen() {
  const router = useRouter();

  const [category, setCategory] = useState<CategoryId>("bug");
  const [urgency, setUrgency] = useState<UrgencyId>("medium");
  const [description, setDescription] = useState("");

  const remaining = Math.max(0, MIN_CHARS - description.length);
  const canSubmit = description.length >= MIN_CHARS;

  // add to state when user picks an image, and display a thumbnail preview with option to remove it before submitting
  const [screenshot, setScreenshot] = useState<string | null>(null);

  const pickImage = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/png", "image/jpeg", "image/gif", "image/webp"],
        copyToCacheDirectory: true,
      });
      if (!result.canceled && result.assets?.[0]) {
        setScreenshot(result.assets[0].uri);
      }
    } catch (e) {
      Alert.alert("Could not open photos", "Please try again.");
    }
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    Alert.alert("Feedback sent", "Thanks! We read every single one.");
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F4F6FB]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 20,
          paddingBottom: 40,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Back */}
        <Pressable
          onPress={() => router.back()}
          className="mb-4 flex-row items-center"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text className="text-sm font-medium color-[#2B3674]/60">◀ Back</Text>
        </Pressable>

        {/* Heading */}
        <Text className="text-[22px] font-bold color-[#2B3674] mb-1">
          Give Feedback
        </Text>
        <Text className="text-[13px] color-[#2B3674]/70 mb-5 leading-[18px]">
          Found a bug, have an idea, or something else on your mind? We read
          every single one.
        </Text>

        {/* Card wrapper */}
        <View
          className="bg-white rounded-[20px] border border-[#E8EDF6] p-5 shadow-black elevation-2"
          style={{
            shadowOpacity: 0.05,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 2 },
          }}
        >
          {/* ── Category ── */}
          <Text className="text-[13px] font-semibold color-[#2B3674] mb-2">
            What kind of feedback?
          </Text>
          <View className="flex-row mb-5">
            {CATEGORIES.map(({ id, label, sub, Icon }, i) => {
              const selected = category === id;
              return (
                <TouchableOpacity
                  key={id}
                  onPress={() => setCategory(id)}
                  className={`flex-1 border-2 rounded-xl py-3 px-2 items-center ${
                    i === 1 ? "mx-2" : ""
                  } ${
                    selected
                      ? "border-[#FDB515] bg-[#FDB515]/10"
                      : "border-[#E8EDF6] bg-white"
                  }`}
                  activeOpacity={0.75}
                >
                  <Icon
                    size={22}
                    color={selected ? NAVY : "rgba(43,54,116,0.6)"}
                  />
                  <Text
                    className={`text-[13px] font-semibold mt-1 ${selected ? "color-[#2B3674]" : "color-[#2B3674]/60"}`}
                  >
                    {label}
                  </Text>
                  <Text
                    className={`text-[10px] text-center leading-[13px] mt-0.5 ${selected ? "color-[#2B3674]/70" : "color-[#2B3674]/40"}`}
                  >
                    {sub}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* ── Urgency ── */}
          <Text className="text-[13px] font-semibold color-[#2B3674] mb-2">
            How urgent is the issue?
          </Text>
          <View className="mb-5">
            {URGENCIES.map(({ id, label, sub, Icon }) => {
              const selected = urgency === id;
              return (
                <TouchableOpacity
                  key={id}
                  onPress={() => setUrgency(id)}
                  className={`flex-row items-center border-2 rounded-xl p-3 mb-2 ${
                    selected
                      ? "border-[#FDB515] bg-[#FDB515]/10"
                      : "border-[#E8EDF6] bg-white"
                  }`}
                  activeOpacity={0.75}
                >
                  <Icon
                    size={20}
                    color={selected ? GOLD : "rgba(43,54,116,0.5)"}
                    className="shrink"
                  />
                  <View className="flex-1 ml-3">
                    <Text
                      className={`text-[13px] font-semibold ${selected ? "color-[#2B3674]" : "color-[#2B3674]/60"}`}
                    >
                      {label}
                    </Text>
                    <Text
                      className={`text-[10px] leading-[13px] mt-0.5 ${selected ? "color-[#2B3674]/70" : "color-[#2B3674]/40"}`}
                    >
                      {sub}
                    </Text>
                  </View>
                  {selected && (
                    <Text className="text-[13px] color-[#FDB515] font-bold">
                      ✓
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* ── Description ── */}
          <View className="flex-row justify-between items-baseline mb-1.5">
            <Text className="text-[13px] font-semibold color-[#2B3674] mb-2">
              Description
            </Text>
            <Text className="text-[11px] color-[#2B3674]/60">
              {remaining > 0
                ? `${remaining} more characters needed`
                : "✓ Good to go"}
            </Text>
          </View>
          <TextInput
            value={description}
            onChangeText={setDescription}
            multiline
            placeholder="What were you trying to do, what happened instead, and what did you expect? Include any steps to reproduce."
            placeholderTextColor="rgba(43,54,116,0.4)"
            textAlignVertical="top"
            className={`border-2 rounded-xl px-3.5 py-3 text-[13px] color-[#2B3674] bg-white min-h-[160px] leading-5 ${
              description.length > 0 && remaining === 0
                ? "border-[#FDB515]"
                : "border-[#E8EDF6]"
            }`}
          />
          <Text className="text-[11px] color-[#2B3674]/50 mt-1 mb-5">
            Minimum {MIN_CHARS} characters so we have enough context to act on
            it.
          </Text>

          {/* ── Screenshot ── */}
          <Text className="text-[13px] font-semibold color-[#2B3674] mb-2">
            Screenshot{" "}
            <Text className="font-normal color-[#2B3674]/50">(optional)</Text>
          </Text>

          {screenshot ? (
            <View className="mb-5 mt-1.5 relative">
              <Image
                source={{ uri: screenshot }}
                className="w-full h-[180px] rounded-xl"
                contentFit="cover"
              />
              <TouchableOpacity
                onPress={() => setScreenshot(null)}
                className="absolute top-2 right-2 bg-black/55 rounded-full w-7 h-7 items-center justify-center"
                activeOpacity={0.8}
              >
                <Text className="color-white text-[13px] font-bold">✕</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              className="flex-row items-center border-2 border-dashed border-[#E8EDF6] rounded-xl py-4.5 px-3.5 bg-white mb-5 mt-1.5"
              activeOpacity={0.7}
              onPress={pickImage}
            >
              <Paperclip size={16} color="rgba(43,54,116,0.6)" />
              <Text className="ml-2 text-[13px] color-[#2B3674]/70">
                Tap to attach an image (PNG, JPG, GIF — up to 5 MB)
              </Text>
            </TouchableOpacity>
          )}

          {/* ── Submit ── */}
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={!canSubmit}
            className={`h-12 rounded-full items-center justify-center mt-1 ${
              canSubmit ? "bg-[#FDB515]" : "bg-[#FDB515]/40"
            }`}
            activeOpacity={0.85}
          >
            <Text className="text-sm font-bold color-[#2B3674]">
              Send feedback
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
