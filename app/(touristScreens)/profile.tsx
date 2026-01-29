import useAuth from "@/hooks/useAuth";
import {
  Bell,
  ChevronRight,
  CreditCard,
  Edit3,
  Globe,
  Heart,
  HelpCircle,
  LogOut,
  MapPin,
  Settings,
  Shield,
  User,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const renderMenuItem = (
    icon: React.ReactNode,
    label: string,
    value?: string | React.ReactNode,
    onPress?: () => void,
  ) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      <View style={styles.menuItemLeft}>
        <View style={styles.menuIconContainer}>{icon}</View>
        <Text style={styles.menuText}>{label}</Text>
      </View>
      <View style={styles.menuItemRight}>
        {value ? (
          typeof value === "string" ? (
            <Text style={styles.menuValue}>{value}</Text>
          ) : (
            value
          )
        ) : (
          <ChevronRight size={20} color="#666" />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* --- Header Profile Section --- */}
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200",
                }}
                style={styles.avatar}
              />
              <TouchableOpacity style={styles.editBadge}>
                <Edit3 size={14} color="white" />
              </TouchableOpacity>
            </View>
            <Text style={styles.userName}>Karim Benjelloun</Text>
            <Text style={styles.userHandle}>@karim_travels</Text>

            <View style={styles.locationTag}>
              <MapPin size={12} color="#f97316" />
              <Text style={styles.locationText}>Marrakech, Morocco</Text>
            </View>
          </View>

          {/* --- Stats Row --- */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Trips</Text>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>182</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>4.8k</Text>
              <Text style={styles.statLabel}>Likes</Text>
            </View>
          </View>

          {/* --- Settings Sections --- */}

          {/* Account Settings */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Account</Text>
            <View style={styles.sectionBody}>
              {renderMenuItem(
                <User size={20} color="white" />,
                "Personal Information",
              )}
              {renderMenuItem(
                <Globe size={20} color="white" />,
                "Language",
                "English",
              )}
              {renderMenuItem(
                <Shield size={20} color="white" />,
                "Privacy & Security",
              )}
            </View>
          </View>

          {/* Preferences */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            <View style={styles.sectionBody}>
              {renderMenuItem(
                <Bell size={20} color="white" />,
                "Notifications",
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: "#333", true: "#f97316" }}
                  thumbColor={"white"}
                />,
              )}
              {renderMenuItem(
                <Heart size={20} color="white" />,
                "Saved Places",
              )}
              {renderMenuItem(
                <CreditCard size={20} color="white" />,
                "Payment Methods",
              )}
            </View>
          </View>

          {/* Support */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Support</Text>
            <View style={styles.sectionBody}>
              {renderMenuItem(
                <HelpCircle size={20} color="white" />,
                "Help Center",
              )}
              {renderMenuItem(
                <Settings size={20} color="white" />,
                "App Settings",
              )}
            </View>
          </View>

          {/* --- Logout Button --- */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color="#ef4444" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>

          <Text style={styles.versionText}>Version 1.0.4 • Atlas Build</Text>
        </ScrollView>
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
    paddingBottom: 40,
  },

  /* Header */
  profileHeader: {
    alignItems: "center",
    paddingVertical: 30,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#222",
  },
  editBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#f97316",
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#111",
  },
  userName: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
  },
  userHandle: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 14,
    marginBottom: 12,
  },
  locationTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(249, 115, 22, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  locationText: {
    color: "#f97316",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
  },

  /* Stats */
  statsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    marginHorizontal: 24,
    backgroundColor: "#222",
    borderRadius: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  statLabel: {
    color: "#888",
    fontSize: 12,
  },
  verticalDivider: {
    width: 1,
    height: 30,
    backgroundColor: "rgba(255,255,255,0.1)",
  },

  /* Sections */
  sectionContainer: {
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: 12,
    letterSpacing: 1,
    marginLeft: 4,
  },
  sectionBody: {
    backgroundColor: "#222",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIconContainer: {
    width: 32,
    alignItems: "center",
    marginRight: 12,
  },
  menuText: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },
  menuItemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuValue: {
    color: "#888",
    fontSize: 14,
    marginRight: 8,
  },

  /* Logout Button */
  logoutButton: {
    marginHorizontal: 24,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(239, 68, 68, 0.1)", // Red tint
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.3)",
  },
  logoutText: {
    color: "#ef4444", // Red text
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  versionText: {
    color: "#444",
    textAlign: "center",
    fontSize: 12,
    marginTop: 24,
  },
});
