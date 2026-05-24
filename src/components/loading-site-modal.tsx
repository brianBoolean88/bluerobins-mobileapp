import React from "react";
import { ActivityIndicator, Modal, Text, View } from "react-native";

{
  /* Type Constants */
}

type LoadingSiteModalProps = {
  visible: boolean;
};

{
  /* Main Export Area */
}

export function LoadingSiteModal({ visible }: LoadingSiteModalProps) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.35)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            paddingHorizontal: 28,
            paddingVertical: 24,
            borderRadius: 16,
            alignItems: "center",
            minWidth: 180,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 12,
            elevation: 8,
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
            Loading site
          </Text>
        </View>
      </View>
    </Modal>
  );
}
