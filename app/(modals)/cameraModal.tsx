import { useCamera } from "@/hooks/useCamera";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { Check, RotateCcw } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CameraHeader from "../../components/camera/cameraHeader";
import PermissionRequest from "../../components/camera/permissionRequest";

const purposes = {
  faceScan: {
    title: "Selfie Verification",
    subtitle: "Align your face in the frame",
    frame: "faceGuide",
  },
  cardScan: {
    title: "ID Verification",
    subtitle: "Align your card in the frame",
    frame: "idCard",
  },
  default: {
    title: "Take a picture",
    subtitle: "",
    frame: "",
  },
} as const;

type PurposeKey = keyof typeof purposes;

function isPurposeKey(value: string): value is PurposeKey {
  return value in purposes;
}

export default function CameraScreen() {
  const params = useSearchParams();
  const rawPurpose = params.get("purpose");

  const purpose: PurposeKey =
    rawPurpose && isPurposeKey(rawPurpose) ? rawPurpose : "default";

  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const { photo, setPhoto } = useCamera();
  const router = useRouter();

  useEffect(() => {
    setPhoto(null);
    setIsCameraOn(true);
  }, []);

  if (!permission) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!permission.granted) {
    return <PermissionRequest onRequest={requestPermission} />;
  }

  const onCaptureClick = async () => {
    if (!cameraRef.current) return;
    const picture = await cameraRef.current.takePictureAsync({ quality: 0.8 });
    setPhoto(picture);
    setIsCameraOn(false);
  };

  const onRetakeClick = () => {
    setIsCameraOn(true);
    setPhoto(null);
  };

  const onConfirmClick = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <CameraHeader
          title={purposes[purpose].title}
          subtitle={purposes[purpose].subtitle}
          onBack={() => router.back()}
        />

        <View style={styles.cameraWrapper}>
          <CameraView
            ref={cameraRef}
            style={{ flex: 1 }}
            active={isCameraOn}
            facing="front"
            mirror
          />

          {/* Face guide frame */}
          {isCameraOn && (
            <View
              style={purpose != "default" && styles[purposes[purpose].frame]}
            />
          )}

          {photo && (
            <Image source={{ uri: photo.uri }} style={styles.previewImage} />
          )}
        </View>

        <View style={styles.bottomBar}>
          {isCameraOn ? (
            <TouchableOpacity
              style={styles.shutterButton}
              onPress={onCaptureClick}
            />
          ) : (
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.secondaryCircle}
                onPress={onRetakeClick}
              >
                <RotateCcw color="#fff" size={22} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmCircle}
                onPress={onConfirmClick}
              >
                <Check color="#fff" size={26} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0B0F14", paddingTop: 20 },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },

  cameraWrapper: {
    flex: 1,
    margin: 16,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  previewImage: {
    ...StyleSheet.absoluteFillObject,
  },
  faceGuide: {
    position: "absolute",
    width: 220,
    height: 280,
    borderRadius: 140,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.4)",
    alignSelf: "center",
    top: "25%",
  },
  idCard: {
    position: "absolute",
    width: "90%",
    height: 220,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.4)",
    alignSelf: "center",
    top: "25%",
  },
  bottomBar: {
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  shutterButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fff",
    borderWidth: 6,
    borderColor: "rgba(255,255,255,0.3)",
  },

  actionRow: { flexDirection: "row", gap: 40 },

  secondaryCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  confirmCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#22C55E",
    justifyContent: "center",
    alignItems: "center",
  },
});
