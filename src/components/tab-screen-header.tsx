import { LinkChildModal } from "@/components/link-child-modal";
import {
  useAppearance,
  type ThemePreference,
} from "@/contexts/appearance-context";
import { openExternalSite } from "@/utils/open-external-site";
import { useRouter } from "expo-router";
import {
  Bell,
  ChevronDown,
  CreditCard,
  Gift,
  GraduationCap,
  Link2,
  Monitor,
  Moon,
  Sun,
  ThumbsUp,
  Trophy,
} from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, Text, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { LoadingSiteModal } from "@/components/loading-site-modal";
import { useAuthContext } from "@/contexts/auth-context";

{
  /* Constants*/
}

const PROFILE_MENU_WIDTH = 224;
const PROGRAMS_MENU_WIDTH = 220;
const APPEARANCE_PANEL_WIDTH = 168;

const PROGRAMS_MENU_ITEMS = [
  {
    label: "Special Programs",
    href: "/special-programs" as const,
    Icon: Trophy,
  },
  {
    label: "Become a Mentor",
    href: "/become-mentor" as const,
    Icon: GraduationCap,
  },
  { label: "Refer & Win", href: "/refer" as const, Icon: Gift },
  { label: "Pricing & Billing", href: "/price" as const, Icon: CreditCard },
  { label: "Link Child", action: "link-child" as const, Icon: Link2 },
  { label: "Feedback", href: "/feedback" as const, Icon: ThumbsUp },
];

const THEME_OPTIONS: {
  id: ThemePreference;
  label: string;
  Icon: typeof Sun;
}[] = [
  { id: "light", label: "Light", Icon: Sun },
  { id: "dark", label: "Dark", Icon: Moon },
  { id: "system", label: "System", Icon: Monitor },
];

{
  /* Template & Types */
}

function AppearancePanel({
  top,
  right,
  preference,
  onSelect,
}: {
  top: number;
  right: number;
  preference: ThemePreference;
  onSelect: (value: ThemePreference) => void;
}) {
  return (
    <View
      style={{
        position: "absolute",
        top,
        right,
        width: APPEARANCE_PANEL_WIDTH,
        backgroundColor: "white",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "rgba(43,54,116,0.15)",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 10,
        zIndex: 100,
        paddingVertical: 4,
      }}
    >
      {THEME_OPTIONS.map(({ id, label, Icon }) => {
        const selected = preference === id;
        return (
          <Pressable
            key={id}
            onPress={() => onSelect(id)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}
          >
            <Icon size={16} color="#2B3674" />
            <Text
              style={{ marginLeft: 8, fontSize: 14, color: "#2B3674", flex: 1 }}
            >
              {label}
            </Text>
            {selected ? (
              <Text style={{ fontSize: 12, color: "#2B3674" }}>✓</Text>
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}

type TabScreenHeaderProps = {
  showProgramsMenu?: boolean;
};

{
  /* Main Export Area */
}

export function TabScreenHeader({
  showProgramsMenu = false,
}: TabScreenHeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();
  const { setIsLoggedIn } = useAuthContext();
  const { preference, setPreference } = useAppearance();

  const [showPrograms, setShowPrograms] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAppearance, setShowAppearance] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLinkChild, setShowLinkChild] = useState(false);
  const [loadingSite, setLoadingSite] = useState(false);

  const menuTop = insets.top + 56;
  const profileMenuRight = 12;
  const screenEdge = 12;
  const appearanceBesideMenuRight = profileMenuRight + PROFILE_MENU_WIDTH + 8;
  const appearanceMaxRight = screenWidth - APPEARANCE_PANEL_WIDTH - screenEdge;
  const appearancePanelRight = Math.min(
    appearanceBesideMenuRight,
    appearanceMaxRight,
  );

  const closeMenus = () => {
    setShowPrograms(false);
    setShowProfile(false);
    setShowAppearance(false);
    setShowNotifications(false);
  };

  const handleProfileMenuPress = (label: string) => {
    switch (label) {
      case "Appearance":
        setShowAppearance((v) => !v);
        return;
      case "Settings":
        closeMenus();
        router.push("/settings");
        return;
      case "Edit Profile":
        closeMenus();
        router.push("/edit-profile");
        return;
      case "Talk to Founder":
        closeMenus();
        router.push("/talk-to-founder");
        return;
      default:
        return;
    }
  };

  const handleProgramsItem = (item: (typeof PROGRAMS_MENU_ITEMS)[number]) => {
    closeMenus();
    if ("action" in item) {
      setShowLinkChild(true);
      return;
    }
    if ("external" in item) {
      void openExternalSite(item.href, setLoadingSite);
      return;
    }
    router.push(item.href);
  };

  const anyMenuOpen =
    showPrograms || showProfile || showAppearance || showNotifications;

  return (
    <>
      <LoadingSiteModal visible={loadingSite} />
      <LinkChildModal
        visible={showLinkChild}
        onClose={() => setShowLinkChild(false)}
      />

      {anyMenuOpen ? (
        <Pressable
          onPress={closeMenus}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 40,
          }}
        />
      ) : null}

      {showProgramsMenu ? (
        <View
          style={{ top: insets.top + 8, left: 12 }}
          className="absolute z-[50]"
        >
          <Pressable
            onPress={() => {
              setShowPrograms(!showPrograms);
              setShowProfile(false);
              setShowNotifications(false);
              setShowAppearance(false);
            }}
            className="h-10 flex-row items-center gap-1 rounded-full border border-[#2B3674]/15 bg-white px-3 ml-0.5 shadow-md"
          >
            <Text className="text-sm font-semibold text-[#2B3674]">
              Programs
            </Text>
            <ChevronDown
              size={16}
              color="#2B3674"
              style={{
                transform: [{ rotate: showPrograms ? "180deg" : "0deg" }],
              }}
            />
          </Pressable>
        </View>
      ) : null}

      <View
        style={{ top: insets.top + 8 }}
        className="absolute right-3 z-[50] flex-row items-center gap-2"
      >
        <Pressable
          onPress={() => {
            setShowNotifications(!showNotifications);
            setShowProfile(false);
            setShowAppearance(false);
            setShowPrograms(false);
          }}
          className="h-10 w-10 items-center justify-center rounded-full bg-white shadow-md"
        >
          <View className="rounded-full bg-[#2B3674]/10 p-1.5">
            <Bell size={18} color="#2B3674" />
          </View>
        </Pressable>

        <Pressable
          onPress={() => {
            setShowProfile(!showProfile);
            setShowNotifications(false);
            setShowPrograms(false);
            if (showProfile) setShowAppearance(false);
          }}
          className="h-10 w-10 items-center justify-center rounded-full bg-[#2B3674] shadow-md"
        >
          <Text className="text-sm font-semibold text-white">HW</Text>
        </Pressable>
      </View>

      {showPrograms && showProgramsMenu ? (
        <View
          style={{
            position: "absolute",
            top: menuTop,
            left: 12,
            width: PROGRAMS_MENU_WIDTH,
            backgroundColor: "white",
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "rgba(43,54,116,0.2)",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.12,
            shadowRadius: 12,
            elevation: 8,
            zIndex: 100,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderBottomWidth: 1,
              borderBottomColor: "rgba(43,54,116,0.1)",
            }}
          >
            <Text
              style={{
                fontSize: 11,
                fontWeight: "700",
                color: "rgba(253,181,21,0.9)",
                letterSpacing: 0.5,
                textTransform: "uppercase",
              }}
            >
              Programs
            </Text>
          </View>
          {PROGRAMS_MENU_ITEMS.map((item) => (
            <Pressable
              key={item.label}
              onPress={() => handleProgramsItem(item)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 12,
                paddingVertical: 11,
                gap: 10,
              }}
            >
              <item.Icon size={16} color="#2B3674" />
              <Text style={{ fontSize: 14, color: "#2B3674", flex: 1 }}>
                {item.label}
              </Text>
            </Pressable>
          ))}
        </View>
      ) : null}

      {showNotifications ? (
        <View
          style={{
            position: "absolute",
            top: menuTop,
            right: 12,
            width: 288,
            backgroundColor: "white",
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "rgba(43,54,116,0.2)",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.12,
            shadowRadius: 12,
            elevation: 8,
            zIndex: 100,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderBottomColor: "rgba(43,54,116,0.1)",
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "600", color: "#2B3674" }}>
              Notifications
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 32,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "rgba(43,54,116,0.5)",
                textAlign: "center",
              }}
            >
              No notifications
            </Text>
          </View>
        </View>
      ) : null}

      {showProfile && showAppearance ? (
        <AppearancePanel
          top={menuTop}
          right={appearancePanelRight}
          preference={preference}
          onSelect={setPreference}
        />
      ) : null}

      {showProfile ? (
        <View
          style={{
            position: "absolute",
            top: menuTop,
            right: profileMenuRight,
            width: PROFILE_MENU_WIDTH,
            backgroundColor: "white",
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "rgba(43,54,116,0.2)",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.12,
            shadowRadius: 12,
            elevation: 8,
            zIndex: 100,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderBottomWidth: 1,
              borderBottomColor: "rgba(43,54,116,0.1)",
            }}
          >
            <Text
              style={{ fontSize: 12, color: "rgba(43,54,116,0.5)" }}
              numberOfLines={1}
            >
              example@gmail.com
            </Text>
          </View>

          {[
            { label: "Appearance", icon: "🎨" },
            { label: "Settings", icon: "⚙️" },
            { label: "Edit Profile", icon: "👤" },
            { label: "Talk to Founder", icon: "📅" },
          ].map(({ label, icon }) => (
            <Pressable
              key={label}
              onPress={() => handleProfileMenuPress(label)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 12,
                paddingVertical: 10,
                gap: 8,
                backgroundColor:
                  label === "Appearance" && showAppearance
                    ? "rgba(43,54,116,0.06)"
                    : "transparent",
              }}
            >
              <Text style={{ fontSize: 14 }}>{icon}</Text>
              <Text style={{ fontSize: 14, color: "#2B3674", flex: 1 }}>
                {label}
              </Text>
              {label === "Appearance" && showAppearance ? (
                <Text style={{ fontSize: 12, color: "rgba(43,54,116,0.5)" }}>
                  ◀
                </Text>
              ) : null}
            </Pressable>
          ))}

          <View
            style={{
              height: 1,
              backgroundColor: "rgba(43,54,116,0.1)",
              marginVertical: 4,
            }}
          />

          <Pressable
            onPress={() => {
              closeMenus();
              setIsLoggedIn(false);
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 12,
              paddingVertical: 10,
              gap: 8,
            }}
          >
            <Text style={{ fontSize: 14 }}>🚪</Text>
            <Text style={{ fontSize: 14, color: "#2B3674" }}>Log Out</Text>
          </Pressable>
        </View>
      ) : null}
    </>
  );
}

{
  /* Quick Padding Func */
}

export function tabHeaderContentPadding(topInset: number) {
  return topInset + 52;
}
