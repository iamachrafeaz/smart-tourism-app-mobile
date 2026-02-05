import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PermissionRequest({
  onRequest,
}: {
  onRequest: () => void;
}) {
  return (
    <View style={styles.permissionContainer}>
      <View style={styles.permissionCard}>
        <Text style={styles.permissionTitle}>Camera access needed</Text>
        <Text style={styles.permissionSubtitle}>
          We only use your camera to take your profile photo.
        </Text>
        <TouchableOpacity style={styles.primaryButton} onPress={onRequest}>
          <Text style={styles.primaryButtonText}>Allow Camera</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  permissionContainer: {
    flex: 1,
    backgroundColor: "#0B0F14",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  permissionCard: {
    backgroundColor: "#121821",
    padding: 24,
    borderRadius: 20,
    alignItems: "center",
  },
  permissionTitle: { color: "#fff", fontSize: 18, fontWeight: "600" },
  permissionSubtitle: {
    color: "rgba(255,255,255,0.6)",
    textAlign: "center",
    marginVertical: 12,
  },

  primaryButton: {
    backgroundColor: "#6366F1",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 12,
    marginTop: 8,
  },
  primaryButtonText: { color: "#fff", fontWeight: "600" },
});
