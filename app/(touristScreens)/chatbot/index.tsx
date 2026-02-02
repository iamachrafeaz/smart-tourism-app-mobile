import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Bot,
  MoreVertical,
  Send,
  Sparkles,
  User,
} from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// --- Types ---
interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function ChatScreen() {
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);

  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Initial Mock Data
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your local travel companion. Ask me anything about Morocco's hidden gems, culture, or food! 🇲🇦",
      sender: "bot",
      timestamp: new Date(Date.now() - 60000),
    },
  ]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    // 1. Add User Message
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // 2. Simulate Bot Response
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "That sounds like a great plan! The medina in Fez is particularly beautiful this time of year. Would you like a list of sustainable riads nearby?",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 2000);
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.sender === "user";

    return (
      <View
        style={[
          styles.messageRow,
          isUser ? styles.messageRowUser : styles.messageRowBot,
        ]}
      >
        {!isUser && (
          <View style={styles.botAvatar}>
            <Sparkles size={16} color="#f97316" />
          </View>
        )}

        <View
          style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleBot]}
        >
          <Text
            style={[
              styles.messageText,
              isUser ? styles.textUser : styles.textBot,
            ]}
          >
            {item.text}
          </Text>
          <Text
            style={[styles.timeText, isUser ? styles.timeUser : styles.timeBot]}
          >
            {item.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>

        {isUser && (
          <View style={styles.userAvatar}>
            <User size={16} color="#white" />
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111" />
      <SafeAreaView style={{ flex: 1 }}>
        {/* --- Header --- */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.iconButton}
          >
            <ArrowLeft color="white" size={24} />
          </TouchableOpacity>

          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Atlas AI</Text>
            <View style={styles.statusIndicator}>
              <View style={styles.onlineDot} />
              <Text style={styles.statusText}>Online</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.iconButton}>
            <MoreVertical color="white" size={24} />
          </TouchableOpacity>
        </View>

        {/* --- Chat Area --- */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
            onLayout={() => flatListRef.current?.scrollToEnd()}
          />

          {/* Typing Indicator */}
          {isTyping && (
            <View style={styles.typingContainer}>
              <View style={styles.botAvatarSmall}>
                <Bot size={12} color="#888" />
              </View>
              <Text style={styles.typingText}>Atlas is typing...</Text>
            </View>
          )}

          {/* --- Input Area --- */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Ask about your trip..."
                placeholderTextColor="#666"
                value={inputText}
                onChangeText={setInputText}
                multiline
                maxLength={500}
              />

              <TouchableOpacity
                style={[
                  styles.sendButton,
                  !inputText.trim() && styles.sendButtonDisabled,
                ]}
                onPress={handleSend}
                disabled={!inputText.trim()}
              >
                <Send size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111", // Dark Theme Background
  },

  /* Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
    backgroundColor: "#111",
    zIndex: 10,
  },
  headerTitleContainer: {
    alignItems: "center",
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  statusIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#22c55e",
    marginRight: 4,
  },
  statusText: {
    color: "#888",
    fontSize: 12,
  },
  iconButton: {
    padding: 8,
  },

  /* Chat List */
  listContent: {
    padding: 20,
    paddingBottom: 20,
  },
  messageRow: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "flex-end",
  },
  messageRowUser: {
    justifyContent: "flex-end",
  },
  messageRowBot: {
    justifyContent: "flex-start",
  },

  /* Avatars */
  botAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(249, 115, 22, 0.15)", // Orange tint
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "rgba(249, 115, 22, 0.3)",
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },

  /* Bubbles */
  bubble: {
    maxWidth: "75%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  bubbleBot: {
    backgroundColor: "#222",
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  bubbleUser: {
    backgroundColor: "#f97316", // Primary Orange
    borderBottomRightRadius: 4,
  },

  /* Text Styles */
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  textBot: {
    color: "#e5e5e5",
  },
  textUser: {
    color: "white",
  },
  timeText: {
    fontSize: 10,
    marginTop: 6,
    textAlign: "right",
  },
  timeBot: {
    color: "#666",
  },
  timeUser: {
    color: "rgba(255,255,255,0.7)",
  },

  /* Typing Indicator */
  typingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    marginBottom: 12,
  },
  botAvatarSmall: {
    marginRight: 8,
  },
  typingText: {
    color: "#666",
    fontSize: 12,
    fontStyle: "italic",
  },

  /* Input Area */
  inputContainer: {
    padding: 16,
    backgroundColor: "#111",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.05)",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#222",
    borderRadius: 24,
    padding: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  input: {
    flex: 1,
    color: "white",
    fontSize: 16,
    paddingHorizontal: 12,
    paddingTop: 10, // Align text with buttons
    paddingBottom: 10,
    maxHeight: 100,
  },
  attachButton: {
    padding: 10,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f97316",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
    shadowColor: "#f97316",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  sendButtonDisabled: {
    backgroundColor: "#333",
    shadowOpacity: 0,
  },
});
