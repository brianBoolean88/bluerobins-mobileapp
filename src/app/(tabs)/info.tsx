import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Linking,
  Text,
} from "react-native";

import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const NAVY = "#2B3674";
const LIGHT_BG = "#E8EDF6";

export default function StudioScreen() {
  useEffect(() => {
    const openWebsite = async () => {
      const url = "https://www.bluerobins.com/";

      try {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
          await Linking.openURL(url);
        }
      } catch (err) {
        console.log("Failed to open URL:", err);
      } finally {
        // Immediately return user to tabs screen
        router.replace("/(tabs)");
      }
    };

    openWebsite();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: LIGHT_BG,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color={NAVY} />

      <Text
        style={{
          marginTop: 16,
          color: NAVY,
          fontSize: 16,
          fontWeight: "600",
        }}
      >
        Opening website...
      </Text>
    </SafeAreaView>
  );
}