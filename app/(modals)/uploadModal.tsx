import { Camera, Folder, Images, X } from "lucide-react-native"; // Assuming these are icons
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type UploadTypeModalProps = {
  visible: boolean;
  onClose: () => void;
  onSelect: (type: "camera" | "gallery" | "files") => void;
};

export default function UploadTypeModal({
  visible,
  onClose,
  onSelect,
}: UploadTypeModalProps) {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.container}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Choose upload type :</Text>
            <TouchableOpacity onPress={onClose}>
              <X color="#666" size={24} />
            </TouchableOpacity>
          </View>

          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={styles.option}
              onPress={() => onSelect("camera")}
            >
              <Camera size={36} color="#ccc" />
              <Text style={styles.optionText}>Take a picture</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.option}
              onPress={() => onSelect("gallery")}
            >
              <Images size={36} color="#ccc" />
              <Text style={styles.optionText}>Choose from Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.option}
              onPress={() => onSelect("files")}
            >
              <Folder size={36} color="#ccc" />
              <Text style={styles.optionText}>Choose from Files</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: { color: "white", fontSize: 18, fontWeight: "bold" },
  container: {
    backgroundColor: "#1a1a1a",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 32,
    maxHeight: "80%",
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  optionsRow: {
    gap: 10,
  },
  option: {
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#222",
    borderRadius: 24,
    padding: 20,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.05)",
  },
  optionText: {
    color: "#ccc",
    marginTop: 10,
    fontSize: 14,
    textAlign: "center",
  },
});
