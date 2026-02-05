import { Check, X } from "lucide-react-native";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface SelectionModalProps {
  title: string;
  data: string[];
  selectedItems: string | string[];
  onSelect: (item: string) => void;
  isMulti: boolean;
  activeModal: "city" | "expertise" | "languages" | null;
  setActiveModal: React.Dispatch<
    React.SetStateAction<"city" | "expertise" | "languages" | null>
  >;
}

export default function SelectionModal({
  title,
  data,
  selectedItems,
  onSelect,
  isMulti,
  activeModal,
  setActiveModal,
}: SelectionModalProps) {
  return (
    <Modal
      visible={activeModal !== null}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setActiveModal(null)}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setActiveModal(null)}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity onPress={() => setActiveModal(null)}>
              <X color="#666" size={24} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={data}
            keyExtractor={(item) => item}
            renderItem={({ item }) => {
              const isSelected = isMulti
                ? (selectedItems as string[]).includes(item)
                : selectedItems === item;

              return (
                <TouchableOpacity
                  style={[
                    styles.modalItem,
                    isSelected && styles.modalItemSelected,
                  ]}
                  onPress={() => {
                    onSelect(item);
                    if (!isMulti) setActiveModal(null);
                  }}
                >
                  <Text
                    style={[
                      styles.modalItemText,
                      isSelected && styles.modalItemTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                  {isSelected && <Check size={18} color="#f97316" />}
                </TouchableOpacity>
              );
            }}
          />
          {isMulti && (
            <TouchableOpacity
              style={styles.modalDoneBtn}
              onPress={() => setActiveModal(null)}
            >
              <Text style={styles.modalDoneText}>Done</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#1a1a1a",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: { color: "white", fontSize: 18, fontWeight: "bold" },
  modalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  modalItemSelected: {
    backgroundColor: "rgba(255,255,255,0.05)",
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  modalItemText: { color: "#ccc", fontSize: 16 },
  modalItemTextSelected: { color: "#f97316", fontWeight: "600" },
  modalDoneBtn: {
    backgroundColor: "#f97316",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  modalDoneText: { color: "white", fontWeight: "bold" },
});
