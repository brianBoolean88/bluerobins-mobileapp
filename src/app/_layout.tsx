import { AnimatedSplashOverlay } from "@/components/animated-icon";
import {
  AppearanceProvider,
  useAppearance,
} from "@/contexts/appearance-context";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import "../global.css";

// Hardcoded auth state — replace with Supabase later
export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return { isLoggedIn, setIsLoggedIn };
};

import { AuthContext, useAuthContext } from "@/contexts/auth-context";

export { useAuthContext } from "@/contexts/auth-context";

function RootLayoutNav() {
  const { isLoggedIn } = useAuthContext();
  const segments = useSegments();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return; // don't navigate until mounted

    const inAuthGroup = segments[0] === "(auth)";
    if (!isLoggedIn && !inAuthGroup) {
      router.replace("/(auth)/login");
    } else if (isLoggedIn && inAuthGroup) {
      router.replace("/(tabs)");
    }
  }, [isLoggedIn, segments, mounted]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="daily" />
      <Stack.Screen name="checkout" />
      <Stack.Screen name="project-details" />
      <Stack.Screen name="edit-profile" />
      <Stack.Screen name="talk-to-founder" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="become-mentor" />
      <Stack.Screen name="special-programs" />
      <Stack.Screen name="refer" />
      <Stack.Screen name="price" />
      <Stack.Screen name="legal" />
    </Stack>
  );
}

function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const { colorScheme } = useAppearance();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {children}
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <AppearanceProvider>
        <AppThemeProvider>
          <AnimatedSplashOverlay />
          <RootLayoutNav />
        </AppThemeProvider>
      </AppearanceProvider>
    </AuthContext.Provider>
  );
}
