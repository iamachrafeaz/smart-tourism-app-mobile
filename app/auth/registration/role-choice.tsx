import { chooseRoleRequest } from "@/api/authService";
import { RoleCard } from "@/components/registering/role-card";
import { getRegistrationToken } from "@/storage/token.storage";
import { UserRoleEnum } from "@/types/user.type";
import { useRouter } from "expo-router";
import { ArrowRight, Award, Compass } from "lucide-react-native";
import React, { useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RoleSelectionScreen() {
  const [selectedRole, setSelectedRole] = useState<UserRoleEnum | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleContinue = async () => {
    try {
      if (selectedRole === null) return;
      setIsLoading(true);
      const registrationToken = await getRegistrationToken();
      if (!registrationToken) throw new Error("Please try again later.");

      await chooseRoleRequest(registrationToken, selectedRole);

      setIsLoading(false);

      router.replace("/auth/login");
    } catch (error: any) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Choose your journey</Text>
            <Text style={styles.subtitle}>
              How will you be using Atlas today?
            </Text>
          </View>

          {/* Selection Area */}
          <View style={styles.cardsContainer}>
            {/* Tourist Option */}
            <RoleCard
              role={UserRoleEnum.TOURIST}
              title={"I am a Tourist"}
              description={
                "I want to explore hidden gems, book tours, and experience local culture."
              }
              icon={
                <Compass
                  size={32}
                  color={
                    selectedRole === UserRoleEnum.TOURIST ? "#f97316" : "#888"
                  }
                />
              }
              selectedRole={selectedRole}
              setSelectedRole={setSelectedRole}
            />

            {/* Guide Option */}
            <RoleCard
              role={UserRoleEnum.GUIDE}
              title={"I am a Guide"}
              description={
                "I want to host experiences, manage bookings, and showcase my country."
              }
              icon={
                <Award
                  size={32}
                  color={
                    selectedRole === UserRoleEnum.GUIDE ? "#f97316" : "#888"
                  }
                />
              }
              selectedRole={selectedRole}
              setSelectedRole={setSelectedRole}
            />
          </View>
          {error && <Text style={styles.error}>{error}</Text>}
          {/* Footer Action */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={[
                styles.continueButton,
                selectedRole === null && styles.continueButtonDisabled,
              ]}
              onPress={handleContinue}
              disabled={selectedRole === null || isLoading}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedRole === null && styles.buttonTextDisabled,
                ]}
              >
                {isLoading ? "Loading" : "Continue"}
              </Text>
              {selectedRole != null && (
                <ArrowRight color="white" size={20} style={{ marginLeft: 8 }} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
  },
  error: {
    color: "red",
    marginBottom: 12,
    textAlign: "center",
    fontWeight: "600",
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "space-between",
  },

  /* Header */
  header: {
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "white",
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
    lineHeight: 24,
  },

  /* Cards */
  cardsContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 20,
  },

  /* Footer */
  footer: {
    marginBottom: 10,
  },
  continueButton: {
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
  continueButtonDisabled: {
    backgroundColor: "#333",
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonTextDisabled: {
    color: "#666",
  },
});
