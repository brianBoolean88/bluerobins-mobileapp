import { Linking } from "react-native";

export async function openExternalSite(
  url: string,
  setLoading: (loading: boolean) => void,
) {
  try {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 450));
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  } catch {
    // ignore — loading state still clears
  } finally {
    setLoading(false);
  }
}
