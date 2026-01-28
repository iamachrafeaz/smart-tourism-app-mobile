import { X } from "lucide-react-native";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface CreatePostModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (question: string) => void;
}

export const CreatePostModal = ({
  visible,
  onClose,
  onSubmit,
}: CreatePostModalProps) => {
  const [question, setQuestion] = useState("");

  const [topic, setTopic] = useState("");
  const [tag, setTag] = useState("");

  const handleSubmit = () => {
    if (!question.trim()) return;
    onSubmit(question);
    setQuestion("");
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={modalStyles.overlay}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={modalStyles.container}
          >
            {/* Modal Header */}
            <View style={modalStyles.header}>
              <Text style={modalStyles.title}>Ask a Question</Text>
              <TouchableOpacity
                onPress={onClose}
                style={modalStyles.closeButton}
              >
                <X color="white" size={24} />
              </TouchableOpacity>
            </View>

            {/* Form Inputs */}
            <View style={modalStyles.form}>
              <View style={modalStyles.inputGroup}>
                <Text style={modalStyles.label}>Title</Text>
                <TextInput
                  style={modalStyles.input}
                  placeholder="What's your question?"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  value={question}
                  onChangeText={setQuestion}
                  multiline
                  textAlignVertical="top"
                />
              </View>
            </View>

            {/* Footer / Submit */}
            <View style={modalStyles.footer}>
              <TouchableOpacity
                style={[
                  modalStyles.submitButton,
                  !question.trim() && modalStyles.submitButtonDisabled,
                ]}
                onPress={handleSubmit}
                disabled={!question.trim()}
              >
                <Text style={modalStyles.submitButtonText}>Post Question</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

// --- STYLES ---
const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end", // Aligns modal to bottom
  },
  container: {
    backgroundColor: "#1A1A1A", // Slightly lighter than #111 to stand out
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: "70%", // Takes up 90% of screen
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
  },
  closeButton: {
    padding: 4,
  },
  form: {
    flex: 1,
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "rgba(255,255,255,0.7)",
  },
  input: {
    backgroundColor: "#111",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: 16,
    color: "white",
    fontSize: 16,
  },
  textArea: {
    flex: 1, // Fills remaining space
    minHeight: 120,
  },
  footer: {
    marginTop: 20,
    marginBottom: Platform.OS === "ios" ? 20 : 0,
  },
  submitButton: {
    backgroundColor: "#f97316",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
