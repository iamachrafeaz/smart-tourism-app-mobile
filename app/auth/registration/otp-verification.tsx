import { resendOtpRequest, verifyEmailRequest } from "@/api/authService";
import { getRegistrationToken } from "@/storage/token.storage";
import { useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { ArrowLeft, Mail } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
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

export default function VerificationScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") ?? "example@gmail.com";
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [timer, setTimer] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (timer === 0) return; // Stop countdown at 0
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (text: string, index: number) => {
    // Allow only digits
    if (text && !/^\d$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (error) setError(null); // Clear error on change

    // Auto-focus next input if text is entered
    if (text.length === 1 && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit if last digit filled
    if (text.length === 1 && index === 5) {
      Keyboard.dismiss();
      // Optional: you could trigger verify here automatically if desired
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    setError(null);

    // Validate all OTP fields filled
    if (otp.some((d) => d.trim() === "")) {
      setError("Please enter the complete 6-digit code.");
      return;
    }

    const code = otp.join("").trim();

    setIsLoading(true);
    try {
      const registrationToken = await getRegistrationToken();
      if (!registrationToken) throw new Error("Please try again later.");

      await verifyEmailRequest(registrationToken, code);
      setIsLoading(false);
      router.replace({ pathname: "/auth/registration/profile-form" });
    } catch (error: any) {
      setError(error.message || "Verification failed. Please try again.");
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setError(null);

    if (timer > 0) return; // Prevent resend if timer active

    setIsResending(true);
    try {
      const registrationToken = await getRegistrationToken();
      if (!registrationToken) throw new Error("Please try again later.");

      await resendOtpRequest(registrationToken);
      setTimer(30); // Reset timer after resend
    } catch (error: any) {
      setError(error.message || "Failed to resend code. Please try again.");
    }
    setIsResending(false);
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
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.backButton}
              >
                <ArrowLeft color="white" size={24} />
              </TouchableOpacity>
            </View>

            <View style={styles.content}>
              {/* Icon & Texts */}
              <View style={styles.titleContainer}>
                <View style={styles.iconCircle}>
                  <Mail size={32} color="#f97316" />
                </View>
                <Text style={styles.title}>Check your email</Text>
                <Text style={styles.subtitle}>
                  We've sent a 6-digit verification code to{"\n"}
                  <Text style={styles.emailHighlight}>{email}</Text>
                </Text>
              </View>

              {/* OTP Inputs */}
              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    style={[
                      styles.otpInput,
                      digit.length > 0 && styles.otpInputFilled,
                    ]}
                    value={digit}
                    onChangeText={(text) => handleChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    keyboardType="number-pad"
                    maxLength={1}
                    selectTextOnFocus
                    placeholder="-"
                    placeholderTextColor="#444"
                    cursorColor="#f97316"
                  />
                ))}
              </View>

              {/* Verify Button */}
              <TouchableOpacity
                style={styles.verifyButton}
                onPress={handleVerify}
                disabled={isLoading || otp.some((d) => d.trim() === "")}
              >
                <Text style={styles.verifyButtonText}>
                  {isLoading ? "Verifying..." : "Verify Code"}
                </Text>
              </TouchableOpacity>

              {/* Resend Timer */}
              <TouchableOpacity
                onPress={handleResend}
                disabled={timer > 0 || isResending}
              >
                <Text
                  style={[
                    styles.resendLink,
                    (timer > 0 || isResending) && styles.resendLinkDisabled,
                  ]}
                >
                  {timer > 0
                    ? `Resend in ${timer}s`
                    : isResending
                      ? "Resending..."
                      : "Resend Code"}
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
    backgroundColor: "#111",
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#222",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    paddingTop: 40,
  },

  /* Title Section */
  titleContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(249, 115, 22, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(249, 115, 22, 0.2)",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "white",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    lineHeight: 24,
  },
  emailHighlight: {
    color: "white",
    fontWeight: "600",
  },

  /* OTP Inputs */
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 40,
  },
  otpInput: {
    width: 48, // Fixed width for each box
    height: 56,
    borderRadius: 12,
    backgroundColor: "#222",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    color: "white",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  otpInputFilled: {
    borderColor: "#f97316", // Orange border when filled
    backgroundColor: "rgba(249, 115, 22, 0.05)",
  },

  /* Verify Button */
  verifyButton: {
    width: "100%",
    backgroundColor: "#f97316",
    borderRadius: 16,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    shadowColor: "#f97316",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  verifyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  /* Resend Link */
  resendContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  resendText: {
    color: "#666",
    fontSize: 14,
  },
  resendLink: {
    color: "#f97316",
    fontSize: 14,
    fontWeight: "600",
  },
  resendLinkDisabled: {
    color: "#666",
    opacity: 0.7,
  },
});
