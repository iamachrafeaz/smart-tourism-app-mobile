import useGuide from "@/hooks/useGuide";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function GuideRootNavigator() {
  const { guide, isLoading } = useGuide();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!guide) {
    return <Redirect href="/auth/login" />;
  }

  if (guide.verificationStatus === "UNVERIFIED") {
    return <Redirect href="/(guideScreens)/profileCompletionForm" />;
  }

  if (guide.verificationStatus === "PENDING") {
    return <Redirect href="/(guideScreens)/profileStatus" />;
  }

  // Fallback if no role
  return <Redirect href="/auth/login" />;
}
