import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useColorScheme as useSystemColorScheme } from "react-native";

export type ThemePreference = "light" | "dark" | "system";

type AppearanceContextValue = {
  preference: ThemePreference;
  setPreference: (value: ThemePreference) => void;
  /** Resolved theme used for navigation and UI */
  colorScheme: "light" | "dark";
};

const AppearanceContext = createContext<AppearanceContextValue | null>(null);

export function AppearanceProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useSystemColorScheme();
  const [preference, setPreference] = useState<ThemePreference>("light");

  const colorScheme = useMemo<"light" | "dark">(() => {
    if (preference === "system") {
      return systemScheme === "dark" ? "dark" : "light";
    }
    return preference;
  }, [preference, systemScheme]);

  const setPreferenceStable = useCallback((value: ThemePreference) => {
    setPreference(value);
  }, []);

  const value = useMemo(
    () => ({
      preference,
      setPreference: setPreferenceStable,
      colorScheme,
    }),
    [preference, setPreferenceStable, colorScheme],
  );

  return (
    <AppearanceContext.Provider value={value}>
      {children}
    </AppearanceContext.Provider>
  );
}

export function useAppearance() {
  const ctx = useContext(AppearanceContext);
  if (!ctx) {
    throw new Error("useAppearance must be used within AppearanceProvider");
  }
  return ctx;
}
