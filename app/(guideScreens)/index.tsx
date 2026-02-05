import { CITIES, EXPERTISE, LANGUAGES } from "@/data/mockData";
import { useCamera } from "@/hooks/useCamera";
import { UploadAction } from "@/types/uploadAction";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import {
  Award,
  Camera,
  ChevronDown,
  DollarSign,
  FileText,
  Globe,
  MapPin,
  Plus,
  Upload,
  User,
  X,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SelectionModal from "../(modals)/selectionModal";
import UploadTypeModal from "../(modals)/uploadModal";

export default function GuideProfileScreen() {
  const router = useRouter();
  const { photo, setPhoto } = useCamera();

  const [permissionResponse, requestPermission] =
    ImagePicker.useMediaLibraryPermissions();

  const [fee, setFee] = useState("");
  const [city, setCity] = useState("Marrakech");
  const [description, setDescription] = useState("");

  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const [selectedUploadType, setSelectedUploadType] =
    useState<UploadAction | null>(null);

  const [selfieUri, setSelfieUri] = useState<string | null>(null);
  const [idUri, setIdUri] = useState<string | null>(null);
  const [certifications, setCertifications] = useState<
    { name: string; uri: string; id: string }[]
  >([]);

  const [activeModal, setActiveModal] = useState<
    "city" | "expertise" | "languages" | null
  >(null);

  const [showUploadTypeModal, setShowUploadTypeModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedUploadType == null || !photo) return;
    if (selectedUploadType.doc == "id") {
      setIdUri(photo.uri);
    } else if (selectedUploadType.doc == "selfie") {
      setSelfieUri(photo.uri);
    } else if (selectedUploadType.doc == "certification") {
      setCertifications((prev) => [
        ...prev,
        {
          name: "Picture",
          uri: photo.uri,
          id: Date.now().toString(),
        },
      ]);
    }
    setSelectedUploadType(null);
    setPhoto(null);
  }, [photo, selectedUploadType]);

  useEffect(() => {
    if (selectedUploadType == null) return;
    handleCloseUploadTypeModal();
    switch (selectedUploadType.method) {
      case "camera":
        router.navigate({
          pathname: "/(modals)/cameraModal",
          params: { purpose: selectedUploadType.doc },
        });
        break;
      case "files":
        handlePickDocument();
        break;

      case "gallery":
        getPictureFromLibrary();
        break;
    }
  }, [selectedUploadType]);

  const handlePickImage = (type: "faceScan" | "cardScan") => {
    setSelectedUploadType({
      doc: type == "faceScan" ? "selfie" : "id",
      method: "camera",
    });
  };

  const handleCertificationUploadType = (type: UploadAction["method"]) => {
    setSelectedUploadType({ doc: "certification", method: type });
  };

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
        type: "application/pdf",
      });

      if (result.assets == null) {
        return;
      }
      handleAddCert({ name: result.assets[0].name, uri: result.assets[0].uri });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCert = (file: { name: string; uri: string }) => {
    setCertifications((prev) => {
      if (prev.length >= 5) return prev;
      return [...prev, { ...file, id: Date.now().toString() }];
    });
  };

  const handleOpenUploadTypeModal = () => {
    setShowUploadTypeModal(true);
  };

  const handleCloseUploadTypeModal = () => {
    setShowUploadTypeModal(false);
  };

  const handleRemoveCert = (id: string) => {
    setCertifications(certifications.filter((c) => c.id !== id));
  };

  const toggleSelection = (
    item: string,
    list: string[],
    setList: (l: string[]) => void,
  ) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleSubmit = () => {};

  const getPictureFromLibrary = async () => {
    if (permissionResponse) {
      await requestPermission();
    }

    const result = await ImagePicker.launchImageLibraryAsync({});
    if (result.canceled || result.assets == null) return;
    handleAddCert({
      name: result.assets[0].fileName ?? `Picture${certifications.length}`,
      uri: result.assets[0].uri,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <Text style={styles.title}>Guide Profile</Text>
              <Text style={styles.subtitle}>
                Fill in your details to start hosting.
              </Text>
            </View>

            {/* --- Section 1: Professional Details --- */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Details</Text>

              {/* City Selection (Single) */}
              <TouchableOpacity
                style={styles.inputSelect}
                onPress={() => setActiveModal("city")}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MapPin color="#666" size={20} style={styles.inputIcon} />
                  <Text style={styles.inputText}>{city || "Select City"}</Text>
                </View>
                <ChevronDown color="#666" size={20} />
              </TouchableOpacity>

              {/* Fee */}
              <View style={styles.inputWrapper}>
                <DollarSign color="#666" size={20} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Daily Rate (MAD)"
                  placeholderTextColor="#555"
                  value={fee}
                  onChangeText={setFee}
                  keyboardType="numeric"
                />
              </View>

              {/* Description */}
              <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
                <FileText
                  color="#666"
                  size={20}
                  style={[styles.inputIcon, { marginTop: 12 }]}
                />
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Describe your experience, style, and what makes your tours unique..."
                  placeholderTextColor="#555"
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  textAlignVertical="top"
                />
              </View>
            </View>

            {/* --- Section 2: Skills & Languages --- */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Expertise & Languages</Text>

              {/* Expertise */}
              <TouchableOpacity
                style={styles.inputSelect}
                onPress={() => setActiveModal("expertise")}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Award color="#666" size={20} style={styles.inputIcon} />
                  <Text style={styles.inputText}>
                    {selectedExpertise.length > 0
                      ? `${selectedExpertise.length} Selected`
                      : "Select Expertise"}
                  </Text>
                </View>
                <Plus color="#f97316" size={20} />
              </TouchableOpacity>
              {/* Chips Display */}
              <View style={styles.chipsContainer}>
                {selectedExpertise.map((item) => (
                  <View key={item} style={styles.chip}>
                    <Text style={styles.chipText}>{item}</Text>
                  </View>
                ))}
              </View>

              {/* Languages */}
              <TouchableOpacity
                style={styles.inputSelect}
                onPress={() => setActiveModal("languages")}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Globe color="#666" size={20} style={styles.inputIcon} />
                  <Text style={styles.inputText}>
                    {selectedLanguages.length > 0
                      ? `${selectedLanguages.length} Selected`
                      : "Select Languages"}
                  </Text>
                </View>
                <Plus color="#f97316" size={20} />
              </TouchableOpacity>
              <View style={styles.chipsContainer}>
                {selectedLanguages.map((item) => (
                  <View key={item} style={styles.chip}>
                    <Text style={styles.chipText}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* --- Section 3: Verification --- */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Identity Verification</Text>

              <View style={styles.verificationRow}>
                {/* Selfie Upload */}
                <TouchableOpacity
                  style={styles.uploadBox}
                  onPress={() => handlePickImage("faceScan")}
                >
                  {selfieUri ? (
                    <Image
                      source={{ uri: selfieUri }}
                      style={styles.selfieImage}
                    />
                  ) : (
                    <View style={styles.uploadPlaceholder}>
                      <User size={24} color="#666" />
                    </View>
                  )}
                  <Text style={styles.uploadLabel}>Take Selfie</Text>
                </TouchableOpacity>

                {/* Gov ID Upload */}
                <TouchableOpacity
                  style={styles.uploadBox}
                  onPress={() => handlePickImage("cardScan")}
                >
                  {idUri ? (
                    <Image
                      source={{ uri: idUri }}
                      style={styles.idImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={styles.uploadPlaceholder}>
                      <Camera size={24} color="#666" />
                    </View>
                  )}
                  <Text style={styles.uploadLabel}>Gov ID</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* --- Section 4: Certifications --- */}
            <View style={styles.section}>
              <View style={styles.rowBetween}>
                <Text style={styles.sectionTitle}>Certifications (Max 5)</Text>
                <Text style={styles.counterText}>
                  {certifications.length}/5
                </Text>
              </View>

              {certifications.map((cert) => (
                <View key={cert.id} style={styles.fileItem}>
                  <View style={styles.fileInfo}>
                    <FileText size={16} color="#f97316" />
                    <Text style={styles.fileName}>{cert.name}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleRemoveCert(cert.id)}>
                    <X size={16} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              ))}

              {certifications.length < 5 && (
                <TouchableOpacity
                  style={styles.addFileButton}
                  onPress={handleOpenUploadTypeModal}
                >
                  <Upload size={18} color="#f97316" />
                  <Text style={styles.addFileText}>Upload Document</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              <Text style={styles.submitButtonText}>
                {isLoading ? "Submitting..." : "Submit Application"}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* --- Modals --- */}
        {activeModal === "city" && (
          <SelectionModal
            title="Select City"
            data={CITIES}
            selectedItems={city}
            onSelect={setCity}
            isMulti={false}
            activeModal={activeModal}
            setActiveModal={setActiveModal}
          />
        )}

        {activeModal === "expertise" && (
          <SelectionModal
            title="Select Expertise"
            data={EXPERTISE}
            selectedItems={selectedExpertise}
            onSelect={(item) =>
              toggleSelection(item, selectedExpertise, setSelectedExpertise)
            }
            isMulti={true}
            activeModal={activeModal}
            setActiveModal={setActiveModal}
          />
        )}

        {activeModal === "languages" && (
          <SelectionModal
            title="Select Languages"
            data={LANGUAGES}
            selectedItems={selectedLanguages}
            onSelect={(item) =>
              toggleSelection(item, selectedLanguages, setSelectedLanguages)
            }
            isMulti={true}
            activeModal={activeModal}
            setActiveModal={setActiveModal}
          />
        )}

        <UploadTypeModal
          visible={showUploadTypeModal}
          onClose={handleCloseUploadTypeModal}
          onSelect={handleCertificationUploadType}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111" },
  scrollContent: { padding: 24, paddingBottom: 50 },

  header: { marginBottom: 30, marginTop: 10 },
  title: { fontSize: 28, fontWeight: "700", color: "white", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#888" },

  section: { marginBottom: 32 },
  sectionTitle: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  counterText: { color: "#666", fontSize: 12 },

  /* Inputs */
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    marginBottom: 16,
    height: 56,
  },
  textAreaWrapper: { height: 120, alignItems: "flex-start" },
  inputIcon: { marginLeft: 16, marginRight: 12 },
  input: {
    flex: 1,
    color: "white",
    fontSize: 16,
    height: "100%",
    paddingRight: 16,
  },
  textArea: { paddingTop: 16, paddingBottom: 16 },

  /* Selectors */
  inputSelect: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#222",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    height: 56,
    paddingRight: 16,
    marginBottom: 12,
  },
  inputText: { color: "white", fontSize: 16 },

  /* Chips */
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    backgroundColor: "rgba(249, 115, 22, 0.15)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(249, 115, 22, 0.3)",
  },
  chipText: { color: "#f97316", fontSize: 12, fontWeight: "600" },

  /* Verification */
  verificationRow: { flexDirection: "row", gap: 16 },
  uploadBox: {
    flex: 1,
    backgroundColor: "#222",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    borderStyle: "dashed",
  },
  uploadPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30, // Circle for Selfie logic default
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  selfieImage: { width: 60, height: 60, borderRadius: 30, marginBottom: 12 },
  idImage: { width: "100%", height: 60, borderRadius: 8, marginBottom: 12 },
  uploadLabel: { color: "#888", fontSize: 12 },

  /* Certifications */
  fileItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#222",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  fileInfo: { flexDirection: "row", alignItems: "center", gap: 10 },
  fileName: { color: "white", fontSize: 14 },
  addFileButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#f97316",
    borderStyle: "dashed",
    borderRadius: 12,
    marginTop: 4,
  },
  addFileText: {
    color: "#f97316",
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "600",
  },

  /* Button */
  submitButton: {
    backgroundColor: "#f97316",
    borderRadius: 16,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  submitButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
