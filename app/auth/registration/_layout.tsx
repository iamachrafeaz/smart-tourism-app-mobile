import { Stack } from "expo-router";
import React, { useState } from "react";

export default function RegistrationLayout() {
  const [currentStep, setCurrent] = useState();
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="start" />
      <Stack.Screen name="otp-verification" />
      <Stack.Screen name="profile-form" />
      <Stack.Screen name="role-choice" />
    </Stack>
  );
}
