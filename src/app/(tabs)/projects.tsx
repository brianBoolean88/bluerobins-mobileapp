import { TabScreenHeader } from "@/components/tab-screen-header";
import {
  checkoutParamsFromProject,
  PROJECTS,
  type Project,
} from "@/data/projects";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Svg, { Circle, Line, Path, Polyline, Rect } from "react-native-svg";

{
  /* Constants & Types */
}
const DOMAINS = [
  "All Domains",
  "AI & Data Science",
  "Hardware & Engineering",
  "Design & Creative",
  "Business & Finance",
  "Apps & Technology",
  "Biotech & Health",
  "Social Impact & Sports",
  "Quantum Computing",
  "Nature Lab",
  "Wisdom Lab",
  "College Application",
];

const LEVELS = ["All Levels", "Beginner", "Intermediate", "Advanced"];

const NAVY = "#2B3674";
const GOLD = "#FDB515";
const LIGHT_BG = "#E8EDF6";
const WHITE = "#FFFFFF";

{
  /* Icons */
}

const SunIcon = ({ size = 20 }: { size?: number }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={GOLD}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Circle cx="12" cy="12" r="4" />
    <Line x1="12" y1="2" x2="12" y2="4" />
    <Line x1="12" y1="20" x2="12" y2="22" />
    <Line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <Line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <Line x1="2" y1="12" x2="4" y2="12" />
    <Line x1="20" y1="12" x2="22" y2="12" />
    <Line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <Line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </Svg>
);

const CalendarIcon = ({ size = 18 }: { size?: number }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={GOLD}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Rect x="3" y="4" width="18" height="18" rx="2" />
    <Line x1="16" y1="2" x2="16" y2="6" />
    <Line x1="8" y1="2" x2="8" y2="6" />
    <Line x1="3" y1="10" x2="21" y2="10" />
  </Svg>
);

const ClockIcon = ({ size = 18 }: { size?: number }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={GOLD}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Circle cx="12" cy="12" r="10" />
    <Polyline points="12 6 12 12 16 14" />
  </Svg>
);

const UsersIcon = ({ size = 18 }: { size?: number }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={GOLD}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <Circle cx="9" cy="7" r="4" />
    <Path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <Path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Svg>
);

const SparklesIcon = ({
  size = 18,
  color = GOLD,
}: {
  size?: number;
  color?: string;
}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    <Line x1="20" y1="3" x2="20" y2="7" />
    <Line x1="22" y1="5" x2="18" y2="5" />
    <Line x1="4" y1="17" x2="4" y2="19" />
    <Line x1="5" y1="18" x2="3" y2="18" />
  </Svg>
);

const SearchIcon = ({ size = 16 }: { size?: number }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={NAVY + "66"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Circle cx="11" cy="11" r="8" />
    <Line x1="21" y1="21" x2="16.65" y2="16.65" />
  </Svg>
);

const HeartIcon = ({
  size = 12,
  filled = false,
}: {
  size?: number;
  filled?: boolean;
}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? "#FF8A65" : "none"}
    stroke="#FF8A65"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </Svg>
);

const StarIcon = ({ size = 12 }: { size?: number }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={GOLD}
    stroke={GOLD}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
  </Svg>
);

{
  /* Card Templates */
}

const difficultyColors: Record<string, { bg: string; text: string }> = {
  Beginner: { bg: "#22c55e22", text: "#15803d" },
  Intermediate: { bg: "#f9731622", text: "#c2410c" },
  Advanced: { bg: "#8b5cf622", text: "#6d28d9" },
};

const DifficultyBadge = ({ level }: { level: string }) => {
  const c = difficultyColors[level] ?? { bg: "#00000022", text: "#333" };
  return (
    <View
      className="rounded-[6px] px-[7px] py-1"
      style={{
        backgroundColor: c.bg,
        borderRadius: 6,
        paddingHorizontal: 7,
        paddingVertical: 2,
      }}
    >
      <Text
        className="text-[10px] font-extrabold"
        style={{ color: c.text, fontSize: 10, fontWeight: "700" }}
      >
        {level}
      </Text>
    </View>
  );
};

const StatCard = ({
  icon,
  bold,
  sub,
}: {
  icon: React.ReactNode;
  bold: string;
  sub: string;
}) => (
  <View
    className="flex-1 flex-row items-center rounded-[12px] px-[10px] py-[10px]"
    style={{
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      backgroundColor: "rgba(43,54,116,0.06)",
      borderWidth: 1,
      borderColor: "rgba(43,54,116,0.1)",
      borderRadius: 12,
      paddingHorizontal: 10,
      paddingVertical: 10,
    }}
  >
    {icon}
    <View>
      <Text
        className="text-[13px] font-extrabold"
        style={{ color: NAVY, fontWeight: "700", fontSize: 13 }}
      >
        {bold}
      </Text>
      <Text
        className="text-[11px]"
        style={{ color: NAVY + "80", fontSize: 11 }}
      >
        {sub}
      </Text>
    </View>
  </View>
);

const StepItem = ({
  num,
  title,
  sub,
}: {
  num: string;
  title: string;
  sub: string;
}) => (
  <View
    className="flex-1 flex-row items-start gap-2.5"
    style={{ flex: 1, flexDirection: "row", alignItems: "flex-start", gap: 10 }}
  >
    <View
      className="h-[30px] w-[30px] rounded-full items-center justify-center"
      style={{
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: GOLD,
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <Text
        className="text-[13px] font-extrabold"
        style={{ color: NAVY, fontWeight: "800", fontSize: 13 }}
      >
        {num}
      </Text>
    </View>
    <View className="flex-1" style={{ flex: 1 }}>
      <Text
        className="text-[13px] font-extrabold"
        style={{ color: NAVY, fontWeight: "700", fontSize: 13 }}
      >
        {title}
      </Text>
      <Text
        className="text-[11px] mt-0.5"
        style={{ color: NAVY + "80", fontSize: 11, marginTop: 2 }}
      >
        {sub}
      </Text>
    </View>
  </View>
);

const ProjectCard = ({
  project,
  onEnroll,
  onDetails,
}: {
  project: Project;
  onEnroll: (id: number) => void;
  onDetails: (id: number) => void;
}) => {
  const [favorited, setFavorited] = useState(false);

  return (
    <View
      className="mb-3 overflow-hidden rounded-[14px]"
      style={{
        backgroundColor: WHITE,
        borderRadius: 14,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "rgba(43,54,116,0.15)",
        // Shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 6,
        elevation: 3,
        marginBottom: 12,
      }}
    >
      {/* Image */}
      <View className="relative" style={{ position: "relative" }}>
        <Image
          source={{ uri: project.imageUrl }}
          className="w-full"
          style={{ width: "100%", aspectRatio: 16 / 9 }}
          resizeMode="cover"
        />
        {/* Dark overlay */}
        <View
          className="absolute inset-0"
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "rgba(43,54,116,0.2)",
          }}
        />
        {/* Difficulty badge */}
        <View
          className="absolute top-2 left-2"
          style={{ position: "absolute", top: 8, left: 8 }}
        >
          <DifficultyBadge level={project.difficulty} />
        </View>
        {/* Favorite button */}
        <TouchableOpacity
          onPress={() => setFavorited(!favorited)}
          className="absolute top-2 right-2 h-7 w-7 items-center justify-center rounded-full"
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: "rgba(0,0,0,0.35)",
            alignItems: "center",
            justifyContent: "center",
          }}
          accessibilityLabel="Add to favorites"
        >
          <HeartIcon size={14} filled={favorited} />
        </TouchableOpacity>
      </View>

      {/* Body */}
      <View className="p-3" style={{ padding: 12 }}>
        {/* Title */}
        <Text
          className="text-[14px] font-extrabold leading-5"
          numberOfLines={2}
          style={{
            color: NAVY,
            fontWeight: "700",
            fontSize: 14,
            lineHeight: 19,
            letterSpacing: -0.2,
          }}
        >
          {project.title}
        </Text>

        {/* Mentor row */}
        <View
          className="mt-2 flex-row items-center justify-between"
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 8,
          }}
        >
          {/* Mentor */}
          <View
            className="flex-1 flex-row items-center gap-1.5"
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              flex: 1,
              overflow: "hidden",
            }}
          >
            {project.mentorAvatar ? (
              <Image
                source={{ uri: project.mentorAvatar }}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "rgba(0,0,0,0.08)",
                }}
              />
            ) : (
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: NAVY,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: WHITE, fontSize: 9, fontWeight: "700" }}>
                  {project.mentorInitial ?? project.mentorName[0]}
                </Text>
              </View>
            )}
            <Text
              className="text-[12px]"
              numberOfLines={1}
              style={{ color: NAVY + "99", fontSize: 12 }}
            >
              {project.mentorName}
            </Text>
          </View>

          {/* Rating / favorites */}
          <View
            className="flex-row items-center gap-1.5"
            style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
          >
            {project.favorites != null && (
              <View
                className="flex-row items-center gap-0.5"
                style={{ flexDirection: "row", alignItems: "center", gap: 2 }}
              >
                <HeartIcon size={11} filled />
                <Text
                  style={{ color: "#8b9cd6", fontSize: 11, fontWeight: "500" }}
                >
                  {project.favorites}
                </Text>
              </View>
            )}
            {project.rating != null && (
              <View
                className="flex-row items-center gap-0.5"
                style={{ flexDirection: "row", alignItems: "center", gap: 2 }}
              >
                <StarIcon size={11} />
                <Text style={{ color: NAVY, fontSize: 11, fontWeight: "700" }}>
                  {project.rating.toFixed(1)}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Buttons */}
        <View
          className="mt-2 flex-row gap-2"
          style={{ flexDirection: "row", gap: 8, marginTop: 10 }}
        >
          <TouchableOpacity
            onPress={() => onDetails(project.id)}
            className="h-8 rounded-[8px] px-3 items-center justify-center"
            style={{
              flex: 0,
              paddingHorizontal: 12,
              height: 32,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: NAVY,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: NAVY, fontSize: 12, fontWeight: "600" }}>
              Details
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onEnroll(project.id)}
            className="flex-1 h-8 rounded-[8px] items-center justify-center"
            style={{
              flex: 1,
              height: 32,
              borderRadius: 8,
              backgroundColor: GOLD,
              alignItems: "center",
              justifyContent: "center",
              shadowColor: GOLD,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Text style={{ color: "#000", fontSize: 12, fontWeight: "800" }}>
              Enroll for Summer
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const FilterPill = ({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className="rounded-full mr-1.5 px-3 py-1.5"
    style={{
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 999,
      backgroundColor: active ? NAVY : "rgba(43,54,116,0.08)",
      borderWidth: 1,
      borderColor: active ? NAVY : "rgba(43,54,116,0.15)",
      marginRight: 6,
    }}
  >
    <Text
      className="text-[12px] font-extrabold"
      numberOfLines={1}
      style={{
        color: active ? WHITE : NAVY,
        fontSize: 12,
        fontWeight: "700",
      }}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

const IncludedItem = ({ text }: { text: string }) => (
  <View
    className="mb-2 flex-row items-start gap-2"
    style={{
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 8,
      marginBottom: 8,
    }}
  >
    <View className="mt-0.5" style={{ marginTop: 2 }}>
      <SparklesIcon size={14} />
    </View>
    <Text
      className="text-[13px] leading-5 flex-1"
      style={{ color: NAVY + "b3", fontSize: 13, flex: 1, lineHeight: 18 }}
    >
      {text}
    </Text>
  </View>
);

{
  /* Main Export Area */
}
export default function ProjectsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [selectedDomain, setSelectedDomain] = useState("All Domains");

  // Filtered projects
  const filteredProjects = PROJECTS.filter((p) => {
    const matchesSearch =
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.mentorName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLevel =
      selectedLevel === "All Levels" || p.difficulty === selectedLevel;

    const matchesDomain =
      selectedDomain === "All Domains" || p.domain === selectedDomain;

    return matchesSearch && matchesLevel && matchesDomain;
  });

  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleEnroll = useCallback(
    (id: number) => {
      const project = PROJECTS.find((p) => p.id === id);
      if (!project) return;
      router.push({
        pathname: "/checkout",
        params: checkoutParamsFromProject(project),
      });
    },
    [router],
  );

  const handleDetails = useCallback(
    (id: number) => {
      router.push({
        pathname: "/project-details",
        params: { projectId: String(id) },
      });
    },
    [router],
  );

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: LIGHT_BG }}
      edges={["top"]}
    >
      <StatusBar barStyle="dark-content" backgroundColor={LIGHT_BG} />
      <TabScreenHeader />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingTop: 16,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── HERO HEADER ─────────────────────────────────────────────── */}
        <View
          className="relative overflow-hidden px-4 pb-5"
          style={{
            backgroundColor: LIGHT_BG,
            paddingTop: Platform.OS === "android" ? 16 : 8,
          }}
        >
          {/* Decorative circles */}
          <View
            style={{
              position: "absolute",
              top: -40,
              right: -40,
              width: 180,
              height: 180,
              borderRadius: 90,
              backgroundColor: GOLD + "1A",
            }}
          />
          <View
            style={{
              position: "absolute",
              bottom: -20,
              left: 20,
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: "#6DB8D0" + "1A",
            }}
          />

          {/* Tag */}
          <View
            className="mb-2 flex-row items-center gap-2"
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              marginBottom: 8,
            }}
          >
            <SunIcon size={18} />
            <Text
              style={{
                color: GOLD,
                fontSize: 12,
                fontWeight: "700",
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              Summer 2026
            </Text>
          </View>

          {/* Title */}
          <Text
            className="text-[26px] font-extrabold mb-1"
            style={{
              color: NAVY,
              fontSize: 26,
              fontWeight: "800",
              marginBottom: 6,
            }}
          >
            Summer Projects
          </Text>

          {/* Subtitle */}
          <Text
            className="text-sm leading-5 mb-4"
            style={{
              color: NAVY + "b3",
              fontSize: 14,
              lineHeight: 20,
              marginBottom: 16,
            }}
          >
            Choose any project below and your child will build it over the
            summer — 20 private 1-on-1 mentor sessions over 10 weeks, plus
            workshops and a final demo.
          </Text>

          {/* Stat cards grid */}
          <View
            className="mb-2 flex-row gap-2"
            style={{ flexDirection: "row", gap: 8, marginBottom: 8 }}
          >
            <StatCard
              icon={<CalendarIcon size={18} />}
              bold="10 Weeks"
              sub="2x per week"
            />
            <StatCard
              icon={<ClockIcon size={18} />}
              bold="60 min"
              sub="per session"
            />
          </View>
          <View
            className="mb-4 flex-row gap-2"
            style={{ flexDirection: "row", gap: 8, marginBottom: 16 }}
          >
            <StatCard
              icon={<UsersIcon size={18} />}
              bold="1-on-1"
              sub="private mentorship"
            />
            <StatCard
              icon={<SparklesIcon size={18} />}
              bold="24 hrs"
              sub="total experience"
            />
          </View>

          {/* Pricing */}
          <View
            className="mb-4 flex-row items-baseline gap-2"
            style={{
              flexDirection: "row",
              alignItems: "baseline",
              gap: 8,
              marginBottom: 16,
            }}
          >
            <Text style={{ color: NAVY, fontSize: 22, fontWeight: "800" }}>
              $849
            </Text>
            <Text style={{ color: NAVY + "99", fontSize: 13 }}>
              × 2 installments
            </Text>
            <Text style={{ color: NAVY + "66", fontSize: 11 }}>
              or $1599 upfront (save $99)
            </Text>
          </View>

          {/* How it works */}
          <View
            className="flex-row gap-3"
            style={{ flexDirection: "row", gap: 12 }}
          >
            <StepItem
              num="1"
              title="Pick a Project"
              sub="Choose what excites your child"
            />
            <StepItem
              num="2"
              title="Get Matched"
              sub="We pair with an expert mentor"
            />
            <StepItem
              num="3"
              title="Build All Summer"
              sub="20 private sessions over 10 weeks"
            />
          </View>
        </View>

        {/* ── SECTION HEADING ─────────────────────────────────────────── */}
        <View
          className="px-4 pt-5 pb-1"
          style={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 4 }}
        >
          <Text
            className="text-lg font-extrabold"
            style={{ color: NAVY, fontSize: 18, fontWeight: "800" }}
          >
            Choose a Project
          </Text>
          <Text
            className="text-xs mt-0.5"
            style={{ color: NAVY + "80", fontSize: 13, marginTop: 2 }}
          >
            Every project below is available as a Summer Project
          </Text>
        </View>

        {/* ── SEARCH BAR ──────────────────────────────────────────────── */}
        <View
          className="px-4 pt-3 pb-1"
          style={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 4 }}
        >
          <View
            className="flex-row items-center rounded-full border bg-white px-3 py-2 gap-2"
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: WHITE,
              borderRadius: 999,
              borderWidth: 1,
              borderColor: "rgba(43,54,116,0.2)",
              paddingHorizontal: 12,
              paddingVertical: 8,
              gap: 8,
            }}
          >
            <SearchIcon size={15} />
            <TextInput
              className="flex-1 text-sm"
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search by project, topic, or mentor name"
              placeholderTextColor={NAVY + "66"}
              style={{
                flex: 1,
                color: NAVY,
                fontSize: 14,
                padding: 0,
              }}
              returnKeyType="search"
              clearButtonMode="while-editing"
            />
          </View>
        </View>

        {/* ── LEVEL FILTERS ───────────────────────────────────────────── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-4 py-2"
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
        >
          {LEVELS.map((level) => (
            <FilterPill
              key={level}
              label={level}
              active={selectedLevel === level}
              onPress={() => setSelectedLevel(level)}
            />
          ))}
        </ScrollView>

        {/* ── DOMAIN FILTERS ──────────────────────────────────────────── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-4 pb-3"
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 12 }}
        >
          {DOMAINS.map((domain) => (
            <FilterPill
              key={domain}
              label={domain}
              active={selectedDomain === domain}
              onPress={() => setSelectedDomain(domain)}
            />
          ))}
        </ScrollView>

        {/* ── PROJECT CARDS ───────────────────────────────────────────── */}
        <View className="px-4">
          {filteredProjects.length === 0 ? (
            <View
              className="py-10 items-center"
              style={{ alignItems: "center", paddingVertical: 40 }}
            >
              <Text
                className="text-[15px]"
                style={{ color: NAVY + "80", fontSize: 15 }}
              >
                No projects match your filters.
              </Text>
            </View>
          ) : (
            filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEnroll={handleEnroll}
                onDetails={handleDetails}
              />
            ))
          )}
        </View>

        {/* ── WHAT'S INCLUDED SECTION ─────────────────────────────────── */}
        <View
          className="mx-4 mt-2 rounded-[16px] p-[18px]"
          style={{
            marginHorizontal: 16,
            marginTop: 8,
            borderRadius: 16,
            padding: 18,
            backgroundColor: GOLD + "14",
            borderWidth: 1,
            borderColor: GOLD + "26",
          }}
        >
          <Text
            style={{
              color: NAVY,
              fontWeight: "800",
              fontSize: 15,
              marginBottom: 12,
            }}
          >
            What's Included
          </Text>
          <IncludedItem text="20 private 1-on-1 mentor sessions (60 min each)" />
          <IncludedItem text="2x per week for 10 weeks — accelerated pace" />
          <IncludedItem text="3 hours of immersive workshops (3D Printing, Hardware Build, AI / ML Lab)" />
          <IncludedItem text="1 hour final presentation & demo" />
          <IncludedItem text="Dedicated mentor matched to your child's interests" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
