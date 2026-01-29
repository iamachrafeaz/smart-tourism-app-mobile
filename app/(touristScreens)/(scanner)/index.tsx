import ARPlaceCards from "@/components/scanner/ARPlaceCards";
import { useUserLocation } from "@/hooks/useUserLocation";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React, { useRef } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function PermissionRequest({ onRequest }: { onRequest: () => void }) {
  return (
    <View style={styles.center}>
      <Text style={styles.text}>We need camera permission</Text>
      <TouchableOpacity style={styles.permissionButton} onPress={onRequest}>
        <Text style={styles.permissionButtonText}>Grant Permission</Text>
      </TouchableOpacity>
    </View>
  );
}

function Header({ onBack }: { onBack: () => void }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={onBack}
        style={styles.iconButton}
        activeOpacity={0.7}
      >
        <ArrowLeft color="white" size={20} />
      </TouchableOpacity>

      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={styles.preTitle}>Explore</Text>
        <Text style={styles.title}>Scan Area</Text>
      </View>

      <View style={{ width: 40 }} />
    </View>
  );
}

function CaptureButton({ onPress }: { onPress: () => void }) {
  return (
    <View style={styles.controls}>
      <TouchableOpacity
        style={styles.captureButton}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Text style={styles.captureButtonText}>📸 Take Photo</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();
  const location = useUserLocation();

  if (!permission || !location) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!permission.granted) {
    return <PermissionRequest onRequest={requestPermission} />;
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <Header onBack={() => router.back()} />

        <View style={styles.cameraWrapper}>
          <CameraView
            ref={cameraRef}
            style={{ flex: 1 }}
            facing="back"
            selectedLens="Back Camera"
          />

          <ARPlaceCards
            userLat={location.coords.latitude}
            userLng={location.coords.longitude}
          />
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 12,
  },
  permissionButton: {
    backgroundColor: "#4c9aff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 20,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#222",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    justifyContent: "center",
    alignItems: "center",
  },
  preTitle: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "white",
    letterSpacing: -0.5,
  },
  cameraWrapper: {
    flex: 1,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
  },
  controls: {
    paddingVertical: 16,
    alignItems: "center",
  },
  captureButton: {
    backgroundColor: "#4c9aff",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  captureButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
});
