import "@/global.css";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import "react-native-reanimated";

import { AuthProvider } from "@/context/auth.context";
import { CameraContextProvider } from "@/context/camera.context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import useAuth from "@/hooks/useAuth";
import { Slot, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <CameraContextProvider>
          <AuthProvider>
            <StatusBar style="light" />
            <RootNavigator />
          </AuthProvider>
        </CameraContextProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

function RootNavigator() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "auth";

    if (!user && !inAuthGroup && segments[0] !== undefined) {
      router.replace("/auth/login");
    }
  }, [user, segments, isLoading]);

  return <Slot />;
}
