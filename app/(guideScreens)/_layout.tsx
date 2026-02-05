import { GuideProvider } from "@/context/guide.context";
import { Stack } from "expo-router";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <GuideProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="guideRootNavigator" />
        <Stack.Screen name="profileCompletionForm" />
        <Stack.Screen name="profileStatus" />
      </Stack>
    </GuideProvider>
  );
}
