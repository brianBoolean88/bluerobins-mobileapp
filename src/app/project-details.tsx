import { TabScreenHeader } from "@/components/tab-screen-header";
import {
  BLUEROBINS_HOME,
  checkoutParamsFromProject,
  getCurriculumForProject,
  getProjectById,
  getProjectTags,
  mentorImageUrl,
  SUMMER_INSTALLMENTS,
  SUMMER_MENTORSHIP_HOURS,
  SUMMER_PRICE,
} from "@/data/projects";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React, { useMemo, useState } from "react";
import {
  Linking,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

{
  /* Colors */
}

const NAVY = "#3D4F8C";
const GOLD = "#FDB515";
const TEAL = "#6DB8D0";
const LIGHT_BG = "#E8EDF6";

{
  /* Main Export Area */
}
export default function ProjectDetailsScreen() {
  const router = useRouter();
  const { projectId } = useLocalSearchParams<{ projectId?: string }>();
  const [expandedSession, setExpandedSession] = useState<number | null>(0);

  const project = useMemo(() => getProjectById(Number(projectId)), [projectId]);

  if (!project) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white px-6">
        <Text className="mb-4 text-center text-base" style={{ color: NAVY }}>
          Project not found.
        </Text>
        <Pressable
          onPress={() => router.back()}
          className="rounded-full px-6 py-2.5"
          style={{ backgroundColor: NAVY }}
        >
          <Text className="font-semibold text-white">Go back</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const tags = getProjectTags(project);
  const mentorPhoto = mentorImageUrl(project);
  const curriculum = getCurriculumForProject(project);
  const displayPrice = project.price ?? SUMMER_PRICE;
  const displayPriceSubtext = project.priceSubtext ?? SUMMER_INSTALLMENTS;
  const displayHours = project.mentorshipHours ?? SUMMER_MENTORSHIP_HOURS;

  const goToCheckout = async () => {
    const url = project.enrollUrl ?? BLUEROBINS_HOME;
    if (project.enrollUrl) {
      await Linking.openURL(url);
      return;
    }
    router.push({
      pathname: "/checkout",
      params: checkoutParamsFromProject(project),
    });
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: NAVY }}
      edges={["top"]}
    >
      <StatusBar barStyle="light-content" backgroundColor={NAVY} />

      <View
        className="flex-row items-center justify-between px-4 py-3"
        style={{ backgroundColor: NAVY }}
      >
        <View className="flex-1 flex-row items-center gap-2">
          <Pressable
            onPress={() => router.back()}
            className="h-10 w-10 items-center justify-center rounded-full bg-white/15"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityLabel="Go back"
          >
            <ArrowLeft size={20} color="white" />
          </Pressable>
          <Text className="text-lg font-bold text-white">BlueRobins</Text>
        </View>
      </View>

      <TabScreenHeader showProgramsMenu={false} />

      <ScrollView
        className="flex-1"
        style={{ backgroundColor: LIGHT_BG }}
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          onPress={() => router.back()}
          className="mb-4 flex-row items-center"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <ArrowLeft size={16} color={`${NAVY}B3`} />
          <Text
            className="ml-1 flex-1 text-sm font-medium"
            style={{ color: `${NAVY}B3` }}
            numberOfLines={1}
          >
            Projects / {project.title}
          </Text>
        </Pressable>

        <View
          className="mb-4 rounded-2xl border bg-white p-5 shadow-sm"
          style={{ borderColor: `${NAVY}33` }}
        >
          <View className="mb-4 items-start">
            <View
              className="rounded-full px-3 py-1"
              style={{ backgroundColor: LIGHT_BG }}
            >
              <Text className="text-sm font-medium" style={{ color: NAVY }}>
                {project.difficulty}
              </Text>
            </View>
          </View>

          <Text className="mb-3 text-xl font-bold" style={{ color: NAVY }}>
            {project.title}
          </Text>

          <Text
            className="mb-5 text-base leading-relaxed"
            style={{ color: `${NAVY}E6` }}
          >
            {project.description}
          </Text>

          {tags.length > 0 ? (
            <View className="mb-5 flex-row flex-wrap">
              {tags.map((tag) => (
                <View
                  key={tag}
                  className="mb-2 mr-2 rounded-full border px-3 py-1"
                  style={{
                    backgroundColor: LIGHT_BG,
                    borderColor: `${NAVY}33`,
                  }}
                >
                  <Text className="text-xs" style={{ color: NAVY }}>
                    {tag}
                  </Text>
                </View>
              ))}
            </View>
          ) : null}

          <View className="flex-row items-center">
            {mentorPhoto ? (
              <Image
                source={{ uri: mentorPhoto }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: NAVY,
                  marginRight: 12,
                }}
                contentFit="cover"
              />
            ) : (
              <View
                className="mr-3 h-10 w-10 items-center justify-center rounded-full border-2"
                style={{ borderColor: NAVY, backgroundColor: `${NAVY}1A` }}
              >
                <Text className="font-bold" style={{ color: NAVY }}>
                  {project.mentorInitial ??
                    project.mentorName.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            <Text className="text-base font-medium" style={{ color: NAVY }}>
              {project.mentorName}
            </Text>
          </View>
        </View>

        <View
          className="mb-6 overflow-hidden rounded-2xl border bg-white shadow-sm"
          style={{ borderColor: `${NAVY}33` }}
        >
          <Image
            source={{ uri: project.imageUrl }}
            style={{
              width: "92%",
              height: 192,
              alignSelf: "center",
              margin: 12,
              borderRadius: 12,
            }}
            contentFit="cover"
          />
          <View className="items-center p-4">
            <View className="mb-1 flex-row items-baseline">
              <Text className="text-2xl font-bold" style={{ color: NAVY }}>
                {displayPrice}
              </Text>
              <Text className="ml-1 text-sm" style={{ color: `${NAVY}99` }}>
                {displayPriceSubtext}
              </Text>
            </View>
            <Text className="mb-4 text-xs" style={{ color: `${NAVY}80` }}>
              {displayHours}
            </Text>

            <Pressable
              onPress={goToCheckout}
              className="mb-3 w-full items-center justify-center rounded-xl py-3"
              style={{ backgroundColor: NAVY }}
            >
              <Text className="text-base font-semibold text-white">
                🛒 Buy Now
              </Text>
            </Pressable>

            <Text className="text-sm" style={{ color: `${NAVY}99` }}>
              <Text className="font-medium underline" style={{ color: GOLD }}>
                Add a child
              </Text>{" "}
              to book a free trial class
            </Text>
          </View>
        </View>

        {curriculum.length > 0 ? (
          <View
            className="rounded-2xl border bg-white p-5 shadow-sm"
            style={{ borderColor: `${NAVY}33` }}
          >
            <View
              className="mb-5 flex-row border-b"
              style={{ borderColor: `${NAVY}33` }}
            >
              <View
                className="mr-8 border-b-2 pb-3"
                style={{ borderColor: GOLD }}
              >
                <Text className="text-base font-medium" style={{ color: NAVY }}>
                  Weekly Session Details
                </Text>
              </View>
              <View className="pb-3">
                <Text
                  className="text-base font-medium"
                  style={{ color: `${NAVY}80` }}
                >
                  Meet {project.mentorName}
                </Text>
              </View>
            </View>

            {curriculum.map((session, index) => (
              <View
                key={session.title}
                className="mb-3 overflow-hidden rounded-lg border"
                style={{ borderColor: `${NAVY}33` }}
              >
                <Pressable
                  className="flex-row items-center justify-between p-4"
                  onPress={() =>
                    setExpandedSession(expandedSession === index ? null : index)
                  }
                >
                  <Text
                    className="flex-1 pr-2 text-base font-bold"
                    style={{ color: NAVY }}
                  >
                    {session.title}
                  </Text>
                  <Text className="text-lg" style={{ color: `${NAVY}80` }}>
                    {expandedSession === index ? "▲" : "▼"}
                  </Text>
                </Pressable>

                {expandedSession === index ? (
                  <View className="px-4 pb-4">
                    <Text
                      className="mb-1 text-sm font-medium"
                      style={{ color: TEAL }}
                    >
                      Week {index + 1} of {curriculum.length}
                    </Text>
                    <Text className="text-base" style={{ color: NAVY }}>
                      {session.desc}
                    </Text>
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}
