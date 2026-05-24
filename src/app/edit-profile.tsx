import { CITIES_BY_COUNTRY } from "@/constants/cities";
import { COUNTRIES } from "@/constants/countries";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

{
  /* Constants & Colors */
}

const NAVY = "#2B3674";
const DARK_NAVY = "#1B2B4B";
const GOLD = "#FDB515";

{
  /* Main Export Area */
}

export default function EditProfileScreen() {
  const router = useRouter();

  const [fullName, setFullName] = useState("Harper Waters");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [timezone, setTimezone] = useState("America/Los_Angeles");
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const timezoneOptions = [
    { label: "Eastern Time (ET) — New York", value: "America/New_York" },
    { label: "Central Time (CT) — Chicago", value: "America/Chicago" },
    { label: "Mountain Time (MT) — Denver", value: "America/Denver" },
    { label: "Pacific Time (PT) — Los Angeles", value: "America/Los_Angeles" },
    { label: "India Standard Time (IST) — Kolkata", value: "Asia/Kolkata" },
    { label: "GMT / BST — London", value: "Europe/London" },
    { label: "CET — Paris / Berlin", value: "Europe/Paris" },
    { label: "Singapore Time — Singapore", value: "Asia/Singapore" },
  ];

  const selectedTimezoneLabel =
    timezoneOptions.find((t) => t.value === timezone)?.label ||
    "Select timezone...";

  const handleSave = () => {
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 1500);
  };

  const inputStyle = {
    height: 44,
    borderWidth: 1,
    borderColor: "rgba(43,54,116,0.2)",
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 15,
    color: NAVY,
    backgroundColor: "#fff",
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: DARK_NAVY }}
      edges={[]}
    >
      {/* Status bar spacer + header */}
      <View style={{ backgroundColor: DARK_NAVY }}>
        <View style={{ height: Platform.OS === "ios" ? 54 : 28 }} />
        <View className="px-5 pb-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-row items-center mb-5"
          >
            <Text
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: 16,
                marginRight: 6,
              }}
            >
              ◀
            </Text>
            <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 15 }}>
              Back to Dashboard
            </Text>
          </TouchableOpacity>

          <Text className="text-2xl font-bold text-white">Edit Profile</Text>

          <View
            className="flex-row items-center flex-wrap mt-2"
            style={{ gap: 8 }}
          >
            <View
              className="rounded-full px-2.5 py-0.5"
              style={{ backgroundColor: GOLD }}
            >
              <Text
                className="text-xs font-bold uppercase"
                style={{ color: DARK_NAVY, letterSpacing: 0.6 }}
              >
                Parent
              </Text>
            </View>
            <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
              0312blueacrosswaters@gmail.com
            </Text>
          </View>
        </View>
      </View>

      <KeyboardAvoidingView
        className="flex-1 bg-[#F4F6FB]"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          <View
            className="bg-white rounded-2xl p-5"
            style={{
              borderWidth: 1,
              borderColor: "rgba(43,54,116,0.1)",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Text className="text-lg font-bold mb-4" style={{ color: NAVY }}>
              Personal Information
            </Text>

            {/* Full Name + Phone */}
            {[
              {
                label: "Full Name",
                value: fullName,
                setter: setFullName,
                keyboard: "default" as const,
                placeholder: "",
                autoComplete: "name" as const,
                textContentType: "name" as const,
              },
              {
                label: "Phone",
                value: phone,
                setter: setPhone,
                keyboard: "phone-pad" as const,
                placeholder: "e.g. +1 555-1234",
                autoComplete: "tel" as const,
                textContentType: "telephoneNumber" as const,
              },
            ].map(
              (
                {
                  label,
                  value,
                  setter,
                  keyboard,
                  placeholder,
                  autoComplete,
                  textContentType,
                },
                i,
              ) => (
                <View key={label} style={{ marginBottom: 16 }}>
                  <Text
                    className="text-xs font-semibold mb-1.5"
                    style={{ color: NAVY }}
                  >
                    {label}
                  </Text>
                  <TextInput
                    value={value}
                    onChangeText={setter}
                    placeholder={placeholder}
                    keyboardType={keyboard}
                    autoComplete={autoComplete}
                    textContentType={textContentType}
                    placeholderTextColor="rgba(43,54,116,0.35)"
                    style={inputStyle}
                  />
                </View>
              ),
            )}

            {/* Country */}
            <View className="mb-4" style={{ zIndex: 20 }}>
              <Text
                className="text-xs font-semibold mb-1.5"
                style={{ color: NAVY }}
              >
                Country
              </Text>
              <TextInput
                value={country}
                onChangeText={(val) => {
                  setCountry(val);
                  setCountrySearch(val);
                  setShowCountryDropdown(true);
                  setCity("");
                }}
                placeholder="Search country..."
                placeholderTextColor="rgba(43,54,116,0.35)"
                style={inputStyle}
              />
              {showCountryDropdown && country.length > 0 && (
                <View
                  className="absolute left-0 right-0 bg-white rounded-xl"
                  style={{
                    top: 72,
                    borderWidth: 1,
                    borderColor: "rgba(43,54,116,0.15)",
                    maxHeight: 180,
                    shadowColor: "#000",
                    shadowOpacity: 0.08,
                    shadowRadius: 8,
                    shadowOffset: { width: 0, height: 4 },
                    elevation: 10,
                    zIndex: 999,
                  }}
                >
                  <ScrollView
                    nestedScrollEnabled
                    keyboardShouldPersistTaps="handled"
                  >
                    {COUNTRIES.filter((c: string) =>
                      c.toLowerCase().includes(country.toLowerCase()),
                    )
                      .slice(0, 20)
                      .map((item: string) => (
                        <TouchableOpacity
                          key={item}
                          onPress={() => {
                            setCountry(item);
                            setShowCountryDropdown(false);
                            setCity("");
                          }}
                          style={{
                            paddingVertical: 11,
                            paddingHorizontal: 14,
                            borderBottomWidth: 1,
                            borderBottomColor: "rgba(43,54,116,0.06)",
                          }}
                        >
                          <Text style={{ fontSize: 14, color: NAVY }}>
                            {item}
                          </Text>
                        </TouchableOpacity>
                      ))}
                  </ScrollView>
                </View>
              )}
            </View>

            {/* City */}
            <View className="mb-4" style={{ zIndex: 10 }}>
              <Text
                className="text-xs font-semibold mb-1.5"
                style={{ color: NAVY }}
              >
                City
              </Text>
              <TextInput
                value={city}
                onChangeText={(val) => {
                  setCity(val);
                  setCitySearch(val);
                  setShowCityDropdown(true);
                }}
                placeholder={
                  country ? "Search city..." : "Select a country first"
                }
                placeholderTextColor="rgba(43,54,116,0.35)"
                editable={!!country}
                style={{
                  ...inputStyle,
                  backgroundColor: country ? "#fff" : "rgba(43,54,116,0.04)",
                }}
              />
              {showCityDropdown && city.length > 0 && country && (
                <View
                  className="absolute left-0 right-0 bg-white rounded-xl"
                  style={{
                    top: 72,
                    borderWidth: 1,
                    borderColor: "rgba(43,54,116,0.15)",
                    maxHeight: 180,
                    shadowColor: "#000",
                    shadowOpacity: 0.08,
                    shadowRadius: 8,
                    shadowOffset: { width: 0, height: 4 },
                    elevation: 10,
                    zIndex: 999,
                  }}
                >
                  <ScrollView
                    nestedScrollEnabled
                    keyboardShouldPersistTaps="handled"
                  >
                    {(Array.isArray(CITIES_BY_COUNTRY[country])
                      ? CITIES_BY_COUNTRY[country]
                      : []
                    )
                      .filter((c: string) =>
                        c.toLowerCase().includes(city.toLowerCase()),
                      )
                      .slice(0, 20)
                      .map((item: string) => (
                        <TouchableOpacity
                          key={item}
                          onPress={() => {
                            setCity(item);
                            setShowCityDropdown(false);
                          }}
                          style={{
                            paddingVertical: 11,
                            paddingHorizontal: 14,
                            borderBottomWidth: 1,
                            borderBottomColor: "rgba(43,54,116,0.06)",
                          }}
                        >
                          <Text style={{ fontSize: 14, color: NAVY }}>
                            {item}
                          </Text>
                        </TouchableOpacity>
                      ))}
                  </ScrollView>
                </View>
              )}
            </View>

            {/* Timezone */}
            <View style={{ marginTop: 16 }}>
              <Text
                className="text-xs font-semibold mb-1.5"
                style={{ color: NAVY }}
              >
                Timezone
              </Text>
              <TouchableOpacity
                onPress={() => setIsPickerVisible(true)}
                className="flex-row items-center justify-between bg-white"
                style={{
                  height: 44,
                  borderWidth: 1,
                  borderColor: "rgba(43,54,116,0.2)",
                  borderRadius: 10,
                  paddingHorizontal: 12,
                }}
              >
                <Text
                  className="flex-1"
                  style={{ fontSize: 15, color: NAVY }}
                  numberOfLines={1}
                >
                  {selectedTimezoneLabel}
                </Text>
                <Text
                  style={{
                    color: "rgba(43,54,116,0.4)",
                    fontSize: 12,
                    marginLeft: 8,
                  }}
                >
                  ▼
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Floating Save Button */}
        <View className="absolute left-5 right-5" style={{ bottom: 28 }}>
          <TouchableOpacity
            onPress={handleSave}
            activeOpacity={0.85}
            className="flex-row items-center justify-center rounded-2xl"
            style={{
              backgroundColor: GOLD,
              paddingVertical: 15,
              shadowColor: GOLD,
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.45,
              shadowRadius: 12,
              elevation: 8,
            }}
          >
            <Text style={{ fontSize: 18, marginRight: 8 }}>💾</Text>
            <Text className="font-bold text-base" style={{ color: DARK_NAVY }}>
              Save Profile
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Timezone Picker Modal */}
      <Modal
        visible={isPickerVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsPickerVisible(false)}
      >
        <View
          className="flex-1 justify-end"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <View
            className="bg-white p-4"
            style={{
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              maxHeight: "50%",
            }}
          >
            <View
              className="flex-row justify-between items-center mb-2"
              style={{
                paddingBottom: 12,
                borderBottomWidth: 1,
                borderBottomColor: "#f0f0f0",
              }}
            >
              <Text className="text-lg font-bold" style={{ color: NAVY }}>
                Select Timezone
              </Text>
              <TouchableOpacity onPress={() => setIsPickerVisible(false)}>
                <Text
                  style={{ color: "#3478F6", fontWeight: "600", fontSize: 15 }}
                >
                  Done
                </Text>
              </TouchableOpacity>
            </View>
            <ScrollView nestedScrollEnabled keyboardShouldPersistTaps="handled">
              {timezoneOptions.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  onPress={() => {
                    setTimezone(item.value);
                    setIsPickerVisible(false);
                  }}
                  style={{
                    paddingVertical: 13,
                    paddingHorizontal: 8,
                    borderRadius: 10,
                    backgroundColor:
                      timezone === item.value ? "#E8EDF6" : "transparent",
                    marginBottom: 2,
                  }}
                >
                  <Text style={{ fontSize: 15, color: NAVY }}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Saved! Modal */}
      <Modal visible={showSaved} transparent animationType="fade">
        <View
          className="flex-1 items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
        >
          <View
            className="bg-white rounded-2xl items-center"
            style={{
              paddingVertical: 28,
              paddingHorizontal: 40,
              shadowColor: "#000",
              shadowOpacity: 0.15,
              shadowRadius: 20,
              elevation: 10,
            }}
          >
            <Text style={{ fontSize: 36, marginBottom: 8 }}>✅</Text>
            <Text className="text-lg font-bold" style={{ color: NAVY }}>
              Saved!
            </Text>
            <Text
              className="text-sm mt-1"
              style={{ color: "rgba(43,54,116,0.55)" }}
            >
              Your profile has been updated.
            </Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
