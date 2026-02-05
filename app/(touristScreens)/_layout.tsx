import "@/global.css";
import { Stack } from "expo-router";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home.tourist" />
      <Stack.Screen name="chatbot" />
      <Stack.Screen name="hub" />
      <Stack.Screen name="guides" />
      <Stack.Screen name="scanner" />
      <Stack.Screen name="profile" options={{ presentation: "modal" }} />
    </Stack>
  );
}
