import useAuth from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react-native";
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

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { login, error, isLoading } = useAuth();

  const handleLogin = async () => {
    await login(email, password);
    router.replace("/");
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
              {/* Header / Logo Area */}
              <View style={styles.header}>
                <View style={styles.titleContainer}>
                  <Text style={styles.welcomeText}>Welcome Back</Text>
                  <Text style={styles.subtitleText}>
                    Sign in to continue your journey through Morocco.
                  </Text>
                </View>
              </View>

              {/* Form Area */}
              <View style={styles.formContainer}>
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
                      placeholder="Enter your password"
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

                {/* Forgot Password */}
                <TouchableOpacity style={styles.forgotButton}>
                  <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>

                {error && <Text style={styles.errorText}>{error}</Text>}

                {/* Login Button */}
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={handleLogin}
                  disabled={isLoading}
                >
                  <Text style={styles.loginButtonText}>
                    {isLoading ? "Signing In..." : "Log In"}
                  </Text>
                  {!isLoading && (
                    <ArrowRight
                      color="white"
                      size={20}
                      style={{ marginLeft: 8 }}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.signupButton}
                  onPress={() => router.push("/auth/registration/start")}
                >
                  <Text style={styles.signupButtonText}>Create an Account</Text>
                </TouchableOpacity>
              </View>
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
    marginBottom: 40,
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

  forgotButton: {
    alignSelf: "flex-end",
    marginBottom: 30,
  },
  forgotText: {
    color: "#f97316", // Orange accent
    fontSize: 14,
    fontWeight: "600",
  },

  /* Primary Button */
  loginButton: {
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
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupButton: {
    backgroundColor: "#222", // Dark surface to differentiate from Primary Orange
    borderRadius: 16,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)", // Subtle border
    marginTop: 24, // Spacing from the element above
  },
  signupButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    color: "#ff4d4f", // Red color for error
    marginBottom: 12,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});
