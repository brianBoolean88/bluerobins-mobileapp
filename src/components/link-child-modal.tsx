import { X } from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

{
  /* Type Constant */
}

type LinkChildModalProps = {
  visible: boolean;
  onClose: () => void;
};

{
  /* Main Export Area */
}

export function LinkChildModal({ visible, onClose }: LinkChildModalProps) {
  const [childName, setChildName] = useState("");
  const [childEmail, setChildEmail] = useState("");
  const [childDob, setChildDob] = useState("");

  const resetAndClose = () => {
    setChildName("");
    setChildEmail("");
    setChildDob("");
    onClose();
  };

  const handleSendInvitation = () => {
    if (!childName.trim() || !childEmail.trim()) {
      Alert.alert("Missing info", "Please enter your child's name and email.");
      return;
    }
    Alert.alert(
      "Invitation sent",
      `We will link ${childName.trim()} to your account when they accept.`,
    );
    resetAndClose();
  };

  const inputClass =
    "h-12 w-full rounded-xl border border-[#2B3674]/20 bg-white px-4 text-base text-[#2B3674]";

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={resetAndClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <Pressable
          className="flex-1 items-center justify-center bg-black/40 px-5"
          onPress={resetAndClose}
        >
          <View className="w-full max-w-md rounded-2xl border border-[#2B3674]/10 bg-white p-6 shadow-lg">
            <Pressable
              className="absolute right-4 top-4 h-8 w-8 items-center justify-center rounded-full"
              onPress={resetAndClose}
              accessibilityLabel="Close"
            >
              <X size={18} color="#2B3674" />
            </Pressable>

            <View className="mb-4 pr-8">
              <Text className="text-lg font-semibold text-[#2B3674]">
                Link Child
              </Text>
              <Text className="mt-1.5 text-sm text-[#2B3674]/70">
                Link your child to your account. Their email will be used to
                connect their enrollment to you.
              </Text>
            </View>

            <View className="gap-4">
              <View className="gap-1.5">
                <Text className="text-sm font-semibold text-[#2B3674]">
                  Child&apos;s Name
                </Text>
                <TextInput
                  className={inputClass}
                  placeholder="Enter your child's full name"
                  placeholderTextColor="rgba(43,54,116,0.4)"
                  value={childName}
                  onChangeText={setChildName}
                />
              </View>

              <View className="gap-1.5">
                <Text className="text-sm font-semibold text-[#2B3674]">
                  Child&apos;s Email
                </Text>
                <TextInput
                  className={inputClass}
                  placeholder="Enter your child's email"
                  placeholderTextColor="rgba(43,54,116,0.4)"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={childEmail}
                  onChangeText={setChildEmail}
                />
              </View>

              <View className="gap-1.5">
                <Text className="text-sm font-semibold text-[#2B3674]">
                  Child&apos;s Date of Birth
                </Text>
                <TextInput
                  className={inputClass}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="rgba(43,54,116,0.4)"
                  value={childDob}
                  onChangeText={setChildDob}
                />
                <Text className="text-[12px] text-[#2B3674]/85">
                  BlueRobins is for students in grades 3–12 (ages 7–18).
                </Text>
              </View>

              <Pressable
                className="h-10 w-full items-center justify-center rounded-full bg-[#FDB515] active:opacity-90"
                onPress={handleSendInvitation}
              >
                <Text className="text-sm font-medium text-black">
                  Send Invitation
                </Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}
