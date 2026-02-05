import useAuth from "@/hooks/useAuth";
import {
  AlertCircle,
  Check,
  ChevronRight,
  Clock,
  LogOut,
  ShieldCheck,
  XCircle,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Types for status logic
type VerificationStatus = "pending" | "verified" | "rejected";

export default function ProfileStatusScreen() {
  // Toggle this to see different UI states ("pending", "verified", "rejected")
  const [status, setStatus] = useState<VerificationStatus>("pending");
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const renderStatusHeader = () => {
    switch (status) {
      case "verified":
        return (
          <View style={[styles.statusCard, styles.statusVerified]}>
            <View style={[styles.iconCircle, { backgroundColor: "#22c55e" }]}>
              <ShieldCheck size={32} color="white" />
            </View>
            <Text style={styles.statusTitle}>Profile Verified</Text>
            <Text style={styles.statusDesc}>
              You are now a verified Guide on Atlas. You can start hosting tours
              immediately.
            </Text>
          </View>
        );
      case "rejected":
        return (
          <View style={[styles.statusCard, styles.statusRejected]}>
            <View style={[styles.iconCircle, { backgroundColor: "#ef4444" }]}>
              <XCircle size={32} color="white" />
            </View>
            <Text style={styles.statusTitle}>Action Required</Text>
            <Text style={styles.statusDesc}>
              Your application was not approved. Please check your email for
              details or update your documents.
            </Text>
          </View>
        );
      default: // pending
        return (
          <View style={[styles.statusCard, styles.statusPending]}>
            <View style={[styles.iconCircle, { backgroundColor: "#f97316" }]}>
              <Clock size={32} color="white" />
            </View>
            <Text style={styles.statusTitle}>Under Review</Text>
            <Text style={styles.statusDesc}>
              Our team is currently reviewing your application. This usually
              takes 24-48 hours.
            </Text>
          </View>
        );
    }
  };

  const renderTimelineItem = (
    title: string,
    desc: string,
    isCompleted: boolean,
    isCurrent: boolean,
    isLast: boolean = false,
  ) => {
    return (
      <View style={styles.timelineItem}>
        {/* Left Column: Line & Dot */}
        <View style={styles.timelineLeft}>
          <View
            style={[
              styles.timelineDot,
              isCompleted
                ? styles.dotCompleted
                : isCurrent
                  ? styles.dotCurrent
                  : styles.dotPending,
            ]}
          >
            {isCompleted && <Check size={12} color="white" strokeWidth={3} />}
          </View>
          {!isLast && (
            <View
              style={[styles.timelineLine, isCompleted && styles.lineCompleted]}
            />
          )}
        </View>

        {/* Right Column: Content */}
        <View style={styles.timelineContent}>
          <Text
            style={[
              styles.timelineTitle,
              isCompleted || isCurrent
                ? styles.textActive
                : styles.textInactive,
            ]}
          >
            {title}
          </Text>
          <Text style={styles.timelineDesc}>{desc}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.content}>
          {/* Header Area */}
          <View style={styles.header}>
            <Text style={styles.screenTitle}>Verification Status</Text>
          </View>

          {/* Dynamic Status Card */}
          {renderStatusHeader()}

          {/* Timeline Section */}
          <ScrollView style={styles.section}>
            <Text style={styles.sectionHeader}>Progress</Text>
            <View style={styles.timelineContainer}>
              {renderTimelineItem(
                "Profile Details",
                "Personal information submitted",
                true,
                false,
              )}
              {renderTimelineItem(
                "Document Upload",
                "ID and Certifications uploaded",
                true,
                false,
              )}
              {renderTimelineItem(
                "Identity Check",
                "Validating government ID",
                status === "verified",
                status === "pending" || status === "rejected",
              )}
              {renderTimelineItem(
                "Final Approval",
                "Admin final review",
                status === "verified",
                false,
                true,
              )}
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View style={styles.footer}>
            {status === "verified" ? (
              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Go to Dashboard</Text>
                <ChevronRight color="white" size={20} />
              </TouchableOpacity>
            ) : status === "rejected" ? (
              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Update Documents</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.secondaryButton}>
                <AlertCircle size={20} color="#888" />
                <Text style={styles.secondaryButtonText}>Contact Support</Text>
              </TouchableOpacity>
            )}

            {/* --- Logout Button --- */}
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <LogOut size={20} color="#ef4444" />
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
          </View>
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
  content: {
    flex: 1,
    padding: 24,
  },

  /* Header */
  header: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: "center",
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },

  /* Status Cards */
  statusCard: {
    alignItems: "center",
    padding: 30,
    borderRadius: 24,
    marginBottom: 40,
    borderWidth: 1,
  },
  statusPending: {
    backgroundColor: "rgba(249, 115, 22, 0.1)", // Orange tint
    borderColor: "rgba(249, 115, 22, 0.3)",
  },
  statusVerified: {
    backgroundColor: "rgba(34, 197, 94, 0.1)", // Green tint
    borderColor: "rgba(34, 197, 94, 0.3)",
  },
  statusRejected: {
    backgroundColor: "rgba(239, 68, 68, 0.1)", // Red tint
    borderColor: "rgba(239, 68, 68, 0.3)",
  },

  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  statusTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "white",
    marginBottom: 8,
  },
  statusDesc: {
    fontSize: 15,
    color: "#ccc",
    textAlign: "center",
    lineHeight: 22,
  },

  /* Timeline */
  section: {
    flex: 1,
  },
  sectionHeader: {
    color: "rgba(255,255,255,0.5)",
    textTransform: "uppercase",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 20,
  },
  timelineContainer: {
    paddingLeft: 8,
  },
  timelineItem: {
    flexDirection: "row",
    marginBottom: 4,
    minHeight: 70,
  },
  timelineLeft: {
    alignItems: "center",
    marginRight: 16,
    width: 20,
  },
  timelineDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    zIndex: 1,
  },
  dotCompleted: {
    backgroundColor: "#f97316",
    borderColor: "#f97316",
  },
  dotCurrent: {
    backgroundColor: "#111",
    borderColor: "#f97316",
  },
  dotPending: {
    backgroundColor: "#111",
    borderColor: "#444",
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: "#333",
    marginVertical: 4,
  },
  lineCompleted: {
    backgroundColor: "#f97316",
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 20,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  textActive: {
    color: "white",
  },
  textInactive: {
    color: "#666",
  },
  timelineDesc: {
    fontSize: 13,
    color: "#888",
  },

  /* Footer */
  footer: {
    marginTop: 20,
    marginBottom: 10,
  },
  primaryButton: {
    backgroundColor: "#f97316",
    borderRadius: 16,
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  primaryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "#222",
    borderRadius: 16,
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  secondaryButtonText: {
    color: "#ccc",
    fontSize: 15,
    fontWeight: "600",
  },
  logoutButton: {
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
});
