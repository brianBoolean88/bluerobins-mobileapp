import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

{
  /* Main Export Area */
}

export default function TalkToFounderScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  {
    /* TODO: potentially find a more dynamic way to manage this URL & check in w/ leads to see if this iframe method is alright */
  }
  const calendlyUrl =
    "https://calendly.com/d/cm6p-yng-h75/meet-raji-ceo-bluerobins?hide_gdpr_banner=1&hide_landing_page_details=1&location=US&background_color=ffffff&text_color=2b3674&primary_color=fdb515";

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#161d30]">
      {/* Header Block Section */}
      <View className="px-5 pt-6 pb-4 border-b border-gray-100 dark:border-[#2B3674]/20">
        <Pressable
          onPress={() => router.back()}
          className="mb-3 flex-row items-center"
        >
          <Text className="text-sm font-medium text-[#2B3674]/60 dark:text-white/70">
            ◀ Back
          </Text>
        </Pressable>
        <Text className="text-2xl font-bold text-[#2B3674] dark:text-white">
          Talk to Founder
        </Text>
        <Text className="text-[15px] text-[#2B3674]/60 dark:text-white/70 mt-1">
          Have questions? Book a quick call with Raji, CEO of BlueRobins.
        </Text>
      </View>

      {/* Calendly Interactive Embed Frame Area */}
      <View className="flex-1 m-4 rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100">
        <WebView
          source={{ uri: calendlyUrl }}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          className="flex-1"
          // Technical optimizations for third-party widget embeds
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scalesPageToFit={Platform.OS === "android"}
          startInLoadingState={true}
          style={styles.webview}
        />

        {/* Custom Loading State/Spinner matching the theme color token */}
        {isLoading && (
          <View className="absolute inset-0 items-center justify-center bg-white">
            <ActivityIndicator size="large" color="#FDB515" />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Transparent fix overlay prevents flickering during view rendering passes
  webview: {
    backgroundColor: "transparent",
    opacity: 0.99,
  },
});
