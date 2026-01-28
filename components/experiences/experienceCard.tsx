import Experience from "@/types/experience.type";
import { MapPin, Star } from "lucide-react-native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type Props = {
  experience: Experience;
  onPress: () => void;
  onDirectionsPress: () => void;
};

export default function ExperienceCard({
  experience,
  onPress,
  onDirectionsPress,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#222",
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      <Image
        source={{ uri: experience.image }}
        style={{ width: "100%", height: 160 }}
        resizeMode="cover"
      />

      <View style={{ padding: 12 }}>
        {/* Title + Rating */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 6,
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>
            {experience.name}
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Star color="#fbbf24" size={16} />
            <Text style={{ color: "white", marginLeft: 4 }}>
              {experience.rating}
            </Text>
          </View>
        </View>

        {/* Description */}
        <Text style={{ color: "#bbb", marginBottom: 6 }}>
          {experience.description}
        </Text>

        {/* Distance + Directions */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <MapPin color="#888" size={16} />
            <Text style={{ color: "#bbb" }}>{experience.distance}</Text>
          </View>

          <TouchableOpacity
            onPress={onDirectionsPress}
            style={{
              backgroundColor: "#fb923c",
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 12,
            }}
          >
            <Text style={{ color: "white" }}>Get Directions</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
