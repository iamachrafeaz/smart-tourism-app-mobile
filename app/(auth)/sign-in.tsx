import { useNavigation } from "@react-navigation/native";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  X,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpScreen() {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("Registered:", name, email);
    }, 1500);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <View style={styles.content}>
              {/* Header */}
              <View style={styles.header}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.closeButton}
                >
                  <X color="rgba(255,255,255,0.5)" size={24} />
                </TouchableOpacity>

                <View style={styles.titleContainer}>
                  <Text style={styles.welcomeText}>Create Account</Text>
                  <Text style={styles.subtitleText}>
                    Join the community and start your Moroccan adventure.
                  </Text>
                </View>
              </View>

              {/* Form Area */}
              <View style={styles.formContainer}>
                {/* Name Input (New) */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Full Name</Text>
                  <View style={styles.inputWrapper}>
                    <User color="#666" size={20} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="John Doe"
                      placeholderTextColor="#555"
                      value={name}
                      onChangeText={setName}
                      autoCapitalize="words"
                    />
                  </View>
                </View>

                {/* Email Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email Address</Text>
                  <View style={styles.inputWrapper}>
                    <Mail color="#666" size={20} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="hello@example.com"
                      placeholderTextColor="#555"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>
                </View>

                {/* Password Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.inputWrapper}>
                    <Lock color="#666" size={20} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Create a password"
                      placeholderTextColor="#555"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeButton}
                    >
                      {showPassword ? (
                        <EyeOff color="#666" size={20} />
                      ) : (
                        <Eye color="#666" size={20} />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Terms Text */}
                <Text style={styles.termsText}>
                  By signing up, you agree to our{" "}
                  <Text style={styles.linkText}>Terms</Text> and{" "}
                  <Text style={styles.linkText}>Privacy Policy</Text>.
                </Text>

                {/* Primary Action: Sign Up */}
                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={handleSignUp}
                  disabled={isLoading}
                >
                  <Text style={styles.primaryButtonText}>
                    {isLoading ? "Creating Account..." : "Sign Up"}
                  </Text>
                  {!isLoading && (
                    <ArrowRight
                      color="white"
                      size={20}
                      style={{ marginLeft: 8 }}
                    />
                  )}
                </TouchableOpacity>
              </View>

              {/* Footer: Navigate to Login */}
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => navigation.navigate("Login" as never)}
              >
                <Text style={styles.secondaryButtonText}>
                  Already have an account? Log In
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111", // Dark Theme Background
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "space-between",
  },

  /* Header */
  header: {
    marginTop: 10,
    marginBottom: 30,
  },
  closeButton: {
    alignSelf: "flex-start",
    padding: 8,
    marginLeft: -8,
    marginBottom: 20,
  },
  titleContainer: {
    gap: 8,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "700",
    color: "white",
    letterSpacing: -0.5,
  },
  subtitleText: {
    fontSize: 16,
    color: "#888",
    lineHeight: 24,
  },

  /* Form */
  formContainer: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 8,
    marginLeft: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    height: 56,
  },
  inputIcon: {
    marginLeft: 16,
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: "white",
    fontSize: 16,
    height: "100%",
  },
  eyeButton: {
    padding: 16,
  },

  termsText: {
    color: "#666",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 18,
  },
  linkText: {
    color: "#f97316",
    fontWeight: "600",
  },

  /* Primary Button (Orange) */
  primaryButton: {
    backgroundColor: "#f97316",
    borderRadius: 16,
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#f97316",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  /* Secondary Button (Dark) */
  secondaryButton: {
    backgroundColor: "#222",
    borderRadius: 16,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    marginTop: 24,
  },
  secondaryButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
});
