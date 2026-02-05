import useAuth from "@/hooks/useAuth";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/auth/login" />;
  }

  if (user.role == "TOURIST") {
    return <Redirect href="/home.tourist" />;
  }

  if (user.role == "GUIDE") {
    return <Redirect href="/(guideScreens)/guideRootNavigator" />;
  }

  // Fallback if no role
  return <Redirect href="/auth/registration/role-choice" />;
}
