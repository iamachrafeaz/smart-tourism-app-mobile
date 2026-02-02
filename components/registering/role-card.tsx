import { UserRoleEnum } from "@/types/user.type";
import { Check } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface RoleCardProps {
  role: UserRoleEnum;
  title: string;
  description: string;
  icon: React.ReactNode;
  selectedRole: UserRoleEnum | null;
  setSelectedRole: React.Dispatch<React.SetStateAction<UserRoleEnum | null>>;
}
export const RoleCard = ({
  role,
  title,
  description,
  icon,
  selectedRole,
  setSelectedRole,
}: RoleCardProps) => {
  const isSelected = selectedRole === role;

  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.cardSelected]}
      activeOpacity={0.9}
      onPress={() => setSelectedRole(role)}
    >
      <View style={styles.cardContent}>
        {/* Icon Section */}
        <View
          style={[
            styles.iconContainer,
            isSelected && styles.iconContainerSelected,
          ]}
        >
          {icon}
        </View>

        {/* Text Section */}
        <View style={styles.textContainer}>
          <Text style={[styles.cardTitle, isSelected && styles.textSelected]}>
            {title}
          </Text>
          <Text style={styles.cardDescription}>{description}</Text>
        </View>
      </View>

      {/* Radio Indicator */}
      <View
        style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}
      >
        {isSelected && <Check size={14} color="white" strokeWidth={3} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#222",
    borderRadius: 24,
    padding: 20,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.05)",
  },
  cardSelected: {
    borderColor: "#f97316", // Orange Border
    backgroundColor: "rgba(249, 115, 22, 0.08)", // Slight Orange Tint
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: 16,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#444",
    alignItems: "center",
    justifyContent: "center",
  },
  radioCircleSelected: {
    borderColor: "#f97316",
    backgroundColor: "#f97316",
  },
  /* Text within Card */
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
    marginBottom: 6,
  },
  textSelected: {
    color: "#f97316",
  },
  cardDescription: {
    fontSize: 13,
    color: "#888",
    lineHeight: 18,
  },
  /* Icons */
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  iconContainerSelected: {
    backgroundColor: "rgba(249, 115, 22, 0.2)",
  },
});
