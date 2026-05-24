import { Tabs } from "expo-router";
import {
  Briefcase,
  FolderKanban,
  Globe,
  Info,
  LayoutPanelLeft,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Linking,
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

{
  /* Tab Constants */
}
const tabs = [
  { id: "index", label: "Dashboard", Icon: LayoutPanelLeft },
  { id: "projects", label: "Projects", Icon: FolderKanban },
  { id: "studio", label: "Studio", Icon: Briefcase },
  { id: "community", label: "Community", Icon: Globe },
  { id: "info", label: "Info", Icon: Info },
];

{
  /* Main Export Area */
}

export default function AppTabs() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="projects" />
      <Tabs.Screen name="studio" />
      <Tabs.Screen name="community" />
      <Tabs.Screen name="info" />
    </Tabs>
  );
}

{
  /* Template */
}

function CustomTabBar({ state, navigation }: any) {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);

  const openExternalWebsite = async () => {
    try {
      setLoading(true);

      // Small delay so users actually see the loading state
      setTimeout(async () => {
        await Linking.openURL("https://www.bluerobins.com/");
        setLoading(false);
      }, 500);
    } catch (err) {
      console.log("Failed to open website:", err);
      setLoading(false);
    }
  };

  return (
    <>
      {/* Loading Overlay */}
      <Modal transparent visible={loading} animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.25)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              paddingHorizontal: 28,
              paddingVertical: 24,
              borderRadius: 18,
              alignItems: "center",
              minWidth: 180,
            }}
          >
            <ActivityIndicator size="large" color="#2B3674" />

            <Text
              style={{
                marginTop: 14,
                fontSize: 15,
                fontWeight: "600",
                color: "#2B3674",
              }}
            >
              Opening website...
            </Text>
          </View>
        </View>
      </Modal>

      {/* Tab Bar */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          borderTopWidth: 1,
          borderTopColor: "#2B3674",
          backgroundColor: "white",
          paddingHorizontal: 8,
          paddingBottom: insets.bottom,
          height: 64 + insets.bottom,
        }}
      >
        {tabs.map(({ id, label, Icon }, index) => {
          const isActive = state.index === index;

          return (
            <Pressable
              key={id}
              onPress={() => {
                if (id === "info") {
                  openExternalWebsite();
                  return;
                }

                navigation.navigate(id);
              }}
              style={{
                alignItems: "center",
                justifyContent: "center",
                minWidth: 56,
                paddingVertical: 0,
              }}
            >
              <Icon
                size={22}
                color={isActive ? "#FDB515" : "#2B3674"}
                strokeWidth={isActive ? 2 : 1.5}
              />

              <Text
                style={{
                  fontSize: 11,
                  color: isActive ? "#FDB515" : "#2B367480",
                  fontWeight: isActive ? "600" : "500",
                }}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </>
  );
}
