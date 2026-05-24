import { LoadingSiteModal } from "@/components/loading-site-modal";
import { useAuthContext } from "@/contexts/auth-context";
import { openExternalSite } from "@/utils/open-external-site";
import { Eye, EyeOff } from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

{
  /* Asset Area */
}
const ROBIN_MASCOT =
  "https://my.bluerobins.com/attached_assets/robin_transparent.webp";
const BLUEROBINS_LOGO = "https://my.bluerobins.com/logo_white.png";
const BLUEROBINS_HOME = "https://my.bluerobins.com";
const CALENDLY_FOUNDER =
  "https://calendly.com/d/cm6p-yng-h75/meet-raji-ceo-bluerobins?hide_gdpr_banner=1&hide_landing_page_details=1&location=US&background_color=ffffff&text_color=2b3674&primary_color=fdb515";

{
  /* AuthMode & UserRole (the NativeWindV2 styling is adaptaive to these) */
}

type AuthMode = "signin" | "signup";
type UserRole = "parent" | "student" | "mentor";

const ROLE_OPTIONS: { id: UserRole; label: string; activeColor: string }[] = [
  { id: "parent", label: "Parent", activeColor: "#F87171" },
  { id: "student", label: "Student", activeColor: "#2B3674" },
  { id: "mentor", label: "Mentor", activeColor: "#2B3674" },
];

function AuthToggle({
  mode,
  onSignUp,
  onSignIn,
}: {
  mode: AuthMode;
  onSignUp: () => void;
  onSignIn: () => void;
}) {
  return (
    <View
      className="flex-row w-full rounded-full p-1 mt-4"
      style={{
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.3)",
        backgroundColor: "rgba(255,255,255,0.1)",
      }}
    >
      <Pressable
        onPress={onSignUp}
        className="flex-1 items-center rounded-full py-2.5"
        style={{
          backgroundColor: mode === "signup" ? "#2B3674" : "transparent",
        }}
      >
        <Text
          className="text-sm font-semibold"
          style={{
            color: mode === "signup" ? "white" : "rgba(255,255,255,0.8)",
          }}
        >
          Sign up
        </Text>
      </Pressable>
      <Pressable
        onPress={onSignIn}
        className="flex-1 items-center rounded-full py-2.5"
        style={{
          backgroundColor: mode === "signin" ? "#2B3674" : "transparent",
        }}
      >
        <Text
          className="text-sm font-semibold"
          style={{
            color: mode === "signin" ? "white" : "rgba(255,255,255,0.8)",
          }}
        >
          Sign in
        </Text>
      </Pressable>
    </View>
  );
}

function RolePills({
  role,
  onChange,
}: {
  role: UserRole;
  onChange: (r: UserRole) => void;
}) {
  return (
    <View className="mb-4">
      <Text className="text-sm mb-2" style={{ color: "rgba(43,54,116,0.9)" }}>
        I am a
      </Text>
      <View
        className="flex-row rounded-full p-1 bg-white"
        style={{ borderWidth: 1, borderColor: "rgba(43,54,116,0.2)" }}
      >
        {ROLE_OPTIONS.map(({ id, label, activeColor }) => {
          const active = role === id;
          return (
            <Pressable
              key={id}
              onPress={() => onChange(id)}
              className="flex-1 items-center rounded-full py-2.5"
              style={{ backgroundColor: active ? activeColor : "transparent" }}
            >
              <Text
                className="text-sm font-medium"
                style={{ color: active ? "white" : "rgba(43,54,116,0.7)" }}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function PasswordField({
  label,
  value,
  onChangeText,
  placeholder,
  showPassword,
  onToggleShow,
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder: string;
  showPassword: boolean;
  onToggleShow: () => void;
}) {
  return (
    <View className="mb-4">
      <Text
        className="text-sm font-medium mb-1.5"
        style={{ color: "rgba(43,54,116,0.9)" }}
      >
        {label}
      </Text>
      <View>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="rgba(43,54,116,0.4)"
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          autoCorrect={false}
          style={{
            height: 48,
            borderWidth: 1,
            borderColor: "rgba(43,54,116,0.2)",
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingRight: 48,
            fontSize: 16,
            color: "#2B3674",
            backgroundColor: "white",
          }}
        />
        <Pressable
          onPress={onToggleShow}
          className="absolute right-3 top-0 bottom-0 justify-center"
        >
          {showPassword ? (
            <EyeOff size={20} color="rgba(43,54,116,0.5)" />
          ) : (
            <Eye size={20} color="rgba(43,54,116,0.5)" />
          )}
        </Pressable>
      </View>
    </View>
  );
}

{
  /* Main Export Area */
}
export default function LoginScreen() {
  const { setIsLoggedIn } = useAuthContext();
  const [mode, setMode] = useState<AuthMode>("signup");
  const [role, setRole] = useState<UserRole>("parent");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSite, setLoadingSite] = useState(false);

  const isSignUp = mode === "signup";

  function switchMode(next: AuthMode) {
    setMode(next);
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  }

  function handleSubmit() {
    setLoading(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      setLoading(false);
    }, 500);
  }

  function handleGoogle() {
    setIsLoggedIn(true);
  }

  return (
    <SafeAreaView className="flex-1 bg-[#2B3674]" edges={["top"]}>
      <LoadingSiteModal visible={loadingSite} />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Navy brand header */}
          <View className="bg-[#2B3674] px-5 pt-4 pb-5 items-center">
            <Image
              source={{ uri: BLUEROBINS_LOGO }}
              style={{ width: 130, height: 52, marginBottom: 16 }}
              resizeMode="contain"
            />
            <View
              className="overflow-hidden items-center justify-center"
              style={{ width: 88, height: 88, borderRadius: 44 }}
            >
              <Image
                source={{ uri: ROBIN_MASCOT }}
                style={{ width: 88, height: 88 }}
                resizeMode="cover"
              />
            </View>

            {isSignUp ? (
              <>
                <Text className="text-lg font-bold text-center mt-2">
                  <Text className="text-white">We Build </Text>
                  <Text style={{ color: "#FDB515" }}>Builders</Text>
                </Text>
                <Text
                  className="text-sm text-center mt-1 px-4"
                  style={{ color: "rgba(255,255,255,0.8)", lineHeight: 20 }}
                >
                  Mentor-guided learning for grades 3–12.{"\n"}Build projects
                  with expert mentors.
                </Text>
              </>
            ) : (
              <>
                <Text className="text-white text-lg font-bold text-center mt-2">
                  Welcome Back
                </Text>
                <Text
                  className="text-sm text-center mt-1 px-4"
                  style={{ color: "rgba(255,255,255,0.8)", lineHeight: 20 }}
                >
                  Sign in to your BlueRobins account.
                </Text>
              </>
            )}

            <AuthToggle
              mode={mode}
              onSignUp={() => switchMode("signup")}
              onSignIn={() => switchMode("signin")}
            />
          </View>

          {/* White form */}
          <View className="flex-1 bg-white px-5 pt-5 pb-10">
            {isSignUp && <RolePills role={role} onChange={setRole} />}

            {isSignUp ? (
              <View
                className="mb-5 p-3.5 rounded-xl bg-[#F8F9FC]"
                style={{
                  borderWidth: 1,
                  borderColor: "rgba(43,54,116,0.12)",
                  gap: 10,
                }}
              >
                <Text className="text-sm font-semibold text-[#2B3674]">
                  Sign ups
                </Text>
                <Pressable
                  onPress={() =>
                    openExternalSite(BLUEROBINS_HOME, setLoadingSite)
                  }
                  className="py-1"
                >
                  <Text className="text-sm text-[#2B3674] underline">
                    View information
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() =>
                    openExternalSite(CALENDLY_FOUNDER, setLoadingSite)
                  }
                  className="py-1"
                >
                  <Text className="text-sm text-[#2B3674] underline">
                    Schedule meetings
                  </Text>
                </Pressable>
              </View>
            ) : null}

            <View className="mb-4">
              <Text
                className="text-sm font-medium mb-1.5"
                style={{ color: "rgba(43,54,116,0.9)" }}
              >
                Email address
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email address"
                placeholderTextColor="rgba(43,54,116,0.4)"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={{
                  height: 48,
                  borderWidth: 1,
                  borderColor: "rgba(43,54,116,0.2)",
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  fontSize: 16,
                  color: "#2B3674",
                  backgroundColor: "white",
                }}
              />
            </View>

            <PasswordField
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder={
                isSignUp ? "Create a password" : "Enter your password"
              }
              showPassword={showPassword}
              onToggleShow={() => setShowPassword((v) => !v)}
            />

            {isSignUp && (
              <PasswordField
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm your password"
                showPassword={showConfirmPassword}
                onToggleShow={() => setShowConfirmPassword((v) => !v)}
              />
            )}

            {!isSignUp && (
              <View className="items-end -mt-2 mb-4">
                <Pressable>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#FF8A8A",
                      textDecorationLine: "underline",
                    }}
                  >
                    Forgot password?
                  </Text>
                </Pressable>
              </View>
            )}

            <Pressable
              onPress={handleSubmit}
              disabled={loading}
              className="h-12 rounded-full items-center justify-center mb-4"
              style={{ backgroundColor: "#FDB515", opacity: loading ? 0.7 : 1 }}
            >
              <Text className="text-base font-semibold text-black">
                {loading
                  ? "Please wait..."
                  : isSignUp
                    ? "Create Account"
                    : "Sign in"}
              </Text>
            </Pressable>

            <View className="flex-row items-center mb-4">
              <View
                className="flex-1 h-px"
                style={{ backgroundColor: "rgba(43,54,116,0.2)" }}
              />
              <Text
                className="mx-3 text-sm"
                style={{ color: "rgba(43,54,116,0.6)" }}
              >
                OR
              </Text>
              <View
                className="flex-1 h-px"
                style={{ backgroundColor: "rgba(43,54,116,0.2)" }}
              />
            </View>

            <Pressable
              onPress={handleGoogle}
              className="h-12 rounded-full flex-row items-center justify-center bg-white mb-4"
              style={{ borderWidth: 1, borderColor: "rgba(43,54,116,0.2)" }}
            >
              <Text
                className="text-base font-medium"
                style={{ color: "rgba(43,54,116,0.9)" }}
              >
                {isSignUp ? "Sign up with Google" : "Sign in with Google"}
              </Text>
            </Pressable>

            {!isSignUp && (
              <View className="items-center mt-2">
                <Pressable>
                  <Text
                    className="text-sm"
                    style={{
                      color: "rgba(43,54,116,0.6)",
                      textDecorationLine: "underline",
                    }}
                  >
                    Student under 13? Sign in here
                  </Text>
                </Pressable>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
