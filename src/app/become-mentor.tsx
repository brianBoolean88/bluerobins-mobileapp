import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

{
  /* Main Export Area */
}
export default function BecomeMentorScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [canFinish, setCanFinish] = useState(false);

  const enrollUrl = "https://my.bluerobins.com/enroll/mentor/step1";

  // Listen for URL changes inside the WebView to detect completion
  const handleNavigationChange = (navState: any) => {
    const { url } = navState;
    // Show "Finish" once they reach a success/complete page
    if (
      url.includes("/enroll/mentor/complete") ||
      url.includes("/enroll/mentor/success")
    ) {
      setCanFinish(true);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-[#2B3674]/10 bg-white">
        <Pressable
          onPress={() => router.back()}
          className="px-3 py-1.5 rounded-full min-w-[64px] items-center"
          android_ripple={{ color: "rgba(43,54,116,0.08)", borderless: true }}
        >
          <Text className="text-sm font-medium color-[#2B3674]/55">◀ Back</Text>
        </Pressable>

        <Text className="text-base font-bold color-[#2B3674] flex-1 text-center">
          Become a Mentor
        </Text>

        {/* Finish button becomes active once the flow is complete */}
        <Pressable
          onPress={() => router.back()}
          className={`px-3 py-1.5 rounded-full min-w-[64px] items-center ${
            canFinish ? "bg-[#FDB515]" : ""
          }`}
          android_ripple={{ color: "rgba(253,181,21,0.2)", borderless: true }}
        >
          <Text
            className={`text-sm font-medium color-[#2B3674]/55 ${
              canFinish ? "color-black font-bold opacity-100" : ""
            }`}
          >
            Finish
          </Text>
        </Pressable>
      </View>

      {/* ── WebView Shell ── */}
      <View className="flex-1">
        <WebView
          source={{ uri: enrollUrl }}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          onNavigationStateChange={handleNavigationChange}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scalesPageToFit={Platform.OS === "android"}
          startInLoadingState={true}
          // Inject CSS to hide the site's own nav/header so it feels native
          injectedJavaScript={`
            (function() {
              var style = document.createElement('style');
              style.innerHTML = \`
                nav, header, .site-header, .navbar { display: none !important; }
                body { padding-top: 0 !important; margin-top: 0 !important; }
              \`;
              document.head.appendChild(style);
            })();
            true;
          `}
          style={{ opacity: 0.99 }} // Inline wrapper override to prevent iOS flicker
          className="flex-1 bg-transparent"
        />

        {/* Loading overlay */}
        {isLoading && (
          <View className="absolute inset-0 bg-white items-center justify-center">
            <View className="items-center gap-3">
              <ActivityIndicator size="large" color="#FDB515" />
              <Text className="text-sm color-[#2B3674]/50 mt-2">
                Loading enrollment form…
              </Text>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
