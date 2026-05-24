import { Image } from "expo-image";
import { Send, Sparkles, X } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

{
  /* Assets & Constants */
}

const ROBIN_MASCOT =
  "https://my.bluerobins.com/attached_assets/robin_transparent.webp";

const SUGGESTED_PROMPTS = [
  "How does BlueRobins work?",
  "What projects can my child work on?",
  "How do sessions work?",
  "Do students get certification?",
] as const;

{
  /* Type Constants */
}

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

{
  /* Demo Messages
  TODO: check in w/ leads & see if we should stick w/ the old LLM & find a way to bring that infrastructure here
  */
}

const DEMO_MESSAGES: ChatMessage[] = [
  {
    id: "demo-1",
    role: "assistant",
    text: "Hi! I'm Robin, your BlueRobins guide. I can help with projects, sessions, pricing, and getting started. What would you like to know?",
  },
  {
    id: "demo-2",
    role: "user",
    text: "How does BlueRobins work?",
  },
  {
    id: "demo-3",
    role: "assistant",
    text: "Students pick a real-world project, meet 1-on-1 with a mentor from schools like Berkeley, MIT, or Stanford, and build something meaningful over about 16 weeks. Parents manage enrollment and scheduling from the dashboard—you're in the loop every step of the way.",
  },
  {
    id: "demo-4",
    role: "user",
    text: "What projects can my child work on?",
  },
  {
    id: "demo-5",
    role: "assistant",
    text: "We offer 15+ domains—AI & data science, robotics, biotech, creative design, competitions, special programs like chess, and our Summer Project Intensive. Take the 60-second quiz on your dashboard for personalized recommendations, or browse the Projects tab.",
  },
];

const PROMPT_REPLIES: Record<(typeof SUGGESTED_PROMPTS)[number], string> = {
  "How does BlueRobins work?":
    "Students pick a real-world project, meet 1-on-1 with a mentor from schools like Berkeley, MIT, or Stanford, and build something meaningful over about 16 weeks. Parents manage enrollment and scheduling from the dashboard—you're in the loop every step of the way.",
  "What projects can my child work on?":
    "We offer 15+ domains—AI & data science, robotics, biotech, creative design, competitions, special programs like chess, and our Summer Project Intensive. Take the 60-second quiz on your dashboard for personalized recommendations, or browse the Projects tab.",
  "How do sessions work?":
    "Most Builder Track plans include 4 private sessions per month (45–60 minutes each) over a 16-week arc. Summer Intensive runs 2× per week for 10 weeks. Your mentor sets milestones; sessions can be rescheduled from your dashboard when needed.",
  "Do students get certification?":
    "Students earn a portfolio-ready project and can present at our quarterly showcase events. We focus on demonstrated skills and completed work mentors can speak to—ask your mentor about program-specific certificates or competition credentials.",
};

const DEFAULT_REPLY =
  "Thanks for your question! For account-specific help, billing, or scheduling, use Settings or Talk to Founder in your profile menu. I'm a demo assistant for now—soon I'll answer more questions in real time.";

function createId() {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

type AskRobinChatProps = {
  visible: boolean;
  onClose: () => void;
};

{
  /*
  Main Floating Button Component
  */
}

export function FloatingAskRobinButton({
  onPress,
  bottomInset,
}: {
  onPress: () => void;
  bottomInset: number;
}) {
  const bottomOffset = bottomInset + 2;

  return (
    <Pressable
      onPress={onPress}
      style={{
        position: "absolute",
        right: 16,
        bottom: bottomOffset,
        zIndex: 45,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
      }}
      className="h-11 flex-row items-center gap-0 rounded-full bg-[#2B3674] pl-1.5 pr-3.5 active:opacity-90"
    >
      <View className="h-8 w-8 overflow-hidden rounded-full border-2 border-white/25">
        <Image
          source={{ uri: ROBIN_MASCOT }}
          style={{ width: 32, height: 32 }}
          contentFit="cover"
        />
      </View>
      <Text className="text-sm font-semibold text-white pl-2 pr-2">
        Ask Robin
      </Text>
      <Sparkles size={13} color="rgba(255,255,255,0.65)" />
    </Pressable>
  );
}

{
  /*
  Chat Bubble Template
  */
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <View className={`mb-3 max-w-[88%] ${isUser ? "self-end" : "self-start"}`}>
      {!isUser ? (
        <View className="mb-1 flex-row items-center gap-1.5">
          <View className="h-5 w-5 overflow-hidden rounded-full">
            <Image
              source={{ uri: ROBIN_MASCOT }}
              style={{ width: 20, height: 20 }}
              contentFit="cover"
            />
          </View>
          <Text className="text-[11px] font-semibold text-[#2B3674]/50">
            Robin
          </Text>
        </View>
      ) : null}
      <View
        className={`rounded-2xl px-3.5 py-2.5 ${
          isUser
            ? "rounded-br-md bg-[#2B3674]"
            : "rounded-bl-md border border-[#D1D5DB] bg-[#F8F9FC]"
        }`}
      >
        <Text
          className={`text-[14px] leading-5 ${isUser ? "text-white" : "text-[#2B3674]"}`}
        >
          {message.text}
        </Text>
      </View>
    </View>
  );
}

{
  /*
  Main Chat Component
  */
}

export function AskRobinChat({ visible, onClose }: AskRobinChatProps) {
  const insets = useSafeAreaInsets();
  const { height: screenHeight } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(DEMO_MESSAGES);
  const panelHeight = Math.min(476, screenHeight * 0.8);

  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    if (visible) {
      setMessages(DEMO_MESSAGES);
      setQuestion("");
    }
  }, [visible]);

  const appendExchange = (userText: string, replyText: string) => {
    setMessages((prev) => [
      ...prev,
      { id: createId(), role: "user", text: userText },
      { id: createId(), role: "assistant", text: replyText },
    ]);
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const handleSend = () => {
    const trimmed = question.trim();
    if (!trimmed || isThinking) return;

    const reply =
      PROMPT_REPLIES[trimmed as (typeof SUGGESTED_PROMPTS)[number]] ??
      DEFAULT_REPLY;

    // Add user message immediately
    setMessages((prev) => [
      ...prev,
      {
        id: createId(),
        role: "user",
        text: trimmed,
      },
    ]);

    setQuestion("");
    setIsThinking(true);

    // Fake assistant delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: "assistant",
          text: reply,
        },
      ]);

      setIsThinking(false);

      setTimeout(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 900);
  };

  const handlePrompt = (prompt: (typeof SUGGESTED_PROMPTS)[number]) => {
    setQuestion(prompt);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/30">
        {/* Backdrop */}
        <Pressable className="absolute inset-0" onPress={onClose} />

        {/* Chat Panel */}
        <View
          style={{
            height: panelHeight,
            paddingBottom: insets.bottom,
          }}
          className="overflow-hidden rounded-t-2xl bg-white"
        >
          <View className="flex-row items-center justify-between bg-[#2B3674] px-4 py-3">
            <View className="flex-row items-center gap-2.5">
              <View className="h-8 w-8 overflow-hidden rounded-full border border-white/30 bg-white/20">
                <Image
                  source={{ uri: ROBIN_MASCOT }}
                  style={{ width: 32, height: 32 }}
                  contentFit="cover"
                />
              </View>

              <View>
                <Text className="text-[15px] font-semibold text-white">
                  Ask Robin
                </Text>

                <Text className="text-[11px] text-white/70">
                  Example conversation
                </Text>
              </View>
            </View>

            <Pressable
              onPress={onClose}
              className="h-8 w-8 items-center justify-center rounded-full active:bg-white/10"
              accessibilityLabel="Close chat"
            >
              <X size={18} color="white" />
            </Pressable>
          </View>

          <View className="flex-1 bg-white px-4 pt-3">
            <ScrollView
              ref={scrollRef}
              className="flex-1"
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ paddingBottom: 12 }}
              onContentSizeChange={() =>
                scrollRef.current?.scrollToEnd({ animated: false })
              }
            >
              {messages.map((msg) => (
                <ChatBubble key={msg.id} message={msg} />
              ))}

              {isThinking ? (
                <View className="mb-3 self-start">
                  <View className="rounded-2xl rounded-bl-md border border-[#D1D5DB] bg-[#F8F9FC] px-4 py-3">
                    <ActivityIndicator size="small" color="#2B3674" />
                  </View>
                </View>
              ) : null}
            </ScrollView>

            {/* Suggested prompts */}
            <View className="mb-2 flex-row flex-wrap gap-2">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <Pressable
                  key={prompt}
                  onPress={() => handlePrompt(prompt)}
                  className="rounded-full border border-[#D1D5DB] bg-white px-3 py-1.5 active:bg-[#EEF0F6]"
                >
                  <Text className="text-[12px] text-[#2B3674]">{prompt}</Text>
                </Pressable>
              ))}
            </View>

            <View className="flex-row items-center gap-2.5 pb-3">
              <TextInput
                className="flex-1 rounded-full border border-[#2B3674]/20 bg-[#F8F9FC] px-4 py-2.5 text-[14px] text-[#2B3674]"
                placeholder="Type your question..."
                placeholderTextColor="rgba(43,54,116,0.4)"
                value={question}
                onChangeText={setQuestion}
                onSubmitEditing={handleSend}
                returnKeyType="send"
              />

              <Pressable
                disabled={!question.trim()}
                onPress={handleSend}
                className="h-10 w-10 items-center justify-center rounded-full bg-[#2B3674] disabled:opacity-50"
              >
                <Send size={16} color="white" />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
