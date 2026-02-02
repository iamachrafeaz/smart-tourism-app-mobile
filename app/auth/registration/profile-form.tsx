import { completeProfileRequest } from "@/api/authService";
import { getRegistrationToken } from "@/storage/token.storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import countryList from "country-list";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import {
  Calendar,
  Camera,
  Check,
  ChevronDown,
  Globe,
  MapPin,
  Phone,
  User,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
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

export default function CreateProfileScreen() {
  const router = useRouter();
  const countries = countryList.getData(); // [{code, name}, ...]
  // Form State
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState(new Date());
  const [address, setAddress] = useState("");
  const [countryCode, setCountryCode] = useState("MA");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCountryPickerVisible, setCountryPickerVisible] = useState(false);

  // For DOB picker visibility (show only on tap)
  const [showDobPicker, setShowDobPicker] = useState(false);

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // fix here
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  }

  const handleSave = async () => {
    try {
      setIsLoading(true);

      const selectedCountry = countries.find((c) => c.code === countryCode);
      const profileData = {
        firstName,
        lastName,
        phoneNumber: phone,
        dateOfBirth: dob,
        address,
        country: selectedCountry?.name || "",
      };
      const registrationToken = await getRegistrationToken();
      if (!registrationToken) throw new Error("Please try again later.");

      const formData = new FormData();

      if (imageUri != null) {
        formData.append("profilePhoto", {
          uri: imageUri,
          name: "profile.png",
          type: "image/jpeg",
        } as any);
      }
      formData.append("registrationToken", registrationToken);
      formData.append("data", JSON.stringify(profileData));

      await completeProfileRequest(formData);

      router.replace("/auth/registration/role-choice");
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const renderCountryPickerModal = () => {
    return (
      <Modal
        visible={isCountryPickerVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setCountryPickerVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setCountryPickerVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Country</Text>
            <FlatList
              data={countries}
              keyExtractor={(item) => item.code} // Use code as key
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.countryItem,
                    item.code === countryCode && styles.countryItemSelected,
                  ]}
                  onPress={() => {
                    setCountryCode(item.code);
                    setCountryPickerVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.countryText,
                      item.code === countryCode && styles.countryTextSelected,
                    ]}
                  >
                    {item.name}
                  </Text>
                  {item.code === countryCode && (
                    <Check size={16} color="#f97316" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  const onDobChange = (event: any, selectedDate?: Date) => {
    setShowDobPicker(false);
    if (selectedDate) {
      setDob(selectedDate);
    }
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
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Complete Profile</Text>
              <Text style={styles.subtitle}>
                Tell us a bit more about yourself to get the best experience.
              </Text>
            </View>

            {/* Photo Upload */}
            <View style={styles.photoSection}>
              <TouchableOpacity
                style={styles.photoContainer}
                onPress={pickImage}
              >
                {imageUri ? (
                  <Image source={{ uri: imageUri }} style={styles.photo} />
                ) : (
                  <View style={styles.photoPlaceholder}>
                    <User size={40} color="rgba(255,255,255,0.2)" />
                  </View>
                )}
                <View style={styles.cameraIconBadge}>
                  <Camera size={14} color="white" />
                </View>
              </TouchableOpacity>
              <Text style={styles.photoText}>Upload Profile Photo</Text>
            </View>

            {/* Form Fields */}
            <View style={styles.formContainer}>
              {/* Name Row */}
              <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 12 }]}>
                  <Text style={styles.label}>First Name</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Sara"
                      placeholderTextColor="#555"
                      value={firstName}
                      onChangeText={setFirstName}
                    />
                  </View>
                </View>

                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.label}>Last Name</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Bennani"
                      placeholderTextColor="#555"
                      value={lastName}
                      onChangeText={setLastName}
                    />
                  </View>
                </View>
              </View>

              {/* Phone Number */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Phone Number</Text>
                <View style={styles.inputWrapper}>
                  <Phone color="#666" size={20} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="+212 6XX XXX XXX"
                    placeholderTextColor="#555"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>

              {/* Date of Birth */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Date of Birth</Text>
                <TouchableOpacity
                  style={styles.inputWrapper}
                  onPress={() => setShowDobPicker(true)}
                >
                  <Calendar color="#666" size={20} style={styles.inputIcon} />
                  <Text style={styles.inputText}>
                    {dob.toLocaleDateString()}
                  </Text>
                </TouchableOpacity>
                {showDobPicker && (
                  <DateTimePicker
                    mode="date"
                    value={dob}
                    maximumDate={new Date()}
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={onDobChange}
                  />
                )}
              </View>

              {/* Address */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Address</Text>
                <View style={styles.inputWrapper}>
                  <MapPin color="#666" size={20} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="45 Avenue Mohammed V..."
                    placeholderTextColor="#555"
                    value={address}
                    onChangeText={setAddress}
                  />
                </View>
              </View>

              {/* Country */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Country</Text>
                <TouchableOpacity
                  style={styles.inputWrapper}
                  onPress={() => setCountryPickerVisible(true)}
                >
                  <Globe color="#666" size={20} style={styles.inputIcon} />
                  <Text style={styles.inputText}>
                    {countries.find((c) => c.code === countryCode)?.name || ""}
                  </Text>
                  <ChevronDown
                    color="#666"
                    size={20}
                    style={{ marginRight: 16 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {error && <Text style={styles.error}>{error}</Text>}
            {/* Footer Button */}
            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSave}
                disabled={isLoading}
              >
                <Text style={styles.saveButtonText}>
                  {isLoading ? "Saving Profile..." : "Continue"}
                </Text>
              </TouchableOpacity>
            </View>

            {renderCountryPickerModal()}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  error: {
    color: "red",
    marginBottom: 12,
    textAlign: "center",
    fontWeight: "600",
  },
  /* Header */
  header: {
    marginTop: 10,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "white",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
    lineHeight: 24,
  },

  /* Photo Upload Section */
  photoSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  photoContainer: {
    position: "relative",
    width: 100,
    height: 100,
    marginBottom: 12,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#222",
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#222",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraIconBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#f97316",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#111",
  },
  photoText: {
    color: "#f97316",
    fontSize: 14,
    fontWeight: "600",
  },

  /* Form Styles */
  formContainer: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 8,
    marginLeft: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    height: 56,
  },
  inputIcon: {
    marginLeft: 16,
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: "white",
    fontSize: 16,
    height: "100%",
    paddingRight: 16,
    // Add left padding if no icon is present
    paddingLeft: 12,
  },

  /* Footer Button */
  footer: {
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: "#f97316",
    borderRadius: 16,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#f97316",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  /* Input Text (replaces TextInput style for the selector) */
  inputText: {
    flex: 1,
    color: "white",
    fontSize: 16,
  },

  /* Modal Styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)", // Dimmed background
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalContent: {
    width: "100%",
    maxHeight: "60%",
    backgroundColor: "#222",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  modalTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  countryItemSelected: {
    backgroundColor: "rgba(249, 115, 22, 0.1)", // Slight orange background
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  countryText: {
    color: "#ccc",
    fontSize: 16,
  },
  countryTextSelected: {
    color: "#f97316", // Orange text
    fontWeight: "600",
  },
});
