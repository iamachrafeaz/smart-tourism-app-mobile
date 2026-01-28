// components/ar/ARPlaceCards.tsx
import { places } from "@/data/places";
import { useHeading } from "@/hooks/useHeading";
import { getBearing } from "@/utils/bearing";
import { getDistance } from "@/utils/distance";
import { Dimensions, StyleSheet, Text, View } from "react-native";

type Props = {
  userLat: number;
  userLng: number;
};

export default function ARPlaceCards({ userLat, userLng }: Props) {
  const heading = useHeading();
  const { width } = Dimensions.get("window");

  function getAngleDifference(a: number, b: number) {
    let diff = a - b;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    return diff;
  }

  function angleToScreenX(angleDiff: number, screenWidth: number) {
    const maxFov = 60; // camera horizontal field
    const ratio = angleDiff / maxFov; // -1 to 1
    return screenWidth / 2 + ratio * (screenWidth / 2);
  }

  return (
    <>
      {places.map((place) => {
        const distance = getDistance(userLat, userLng, place.lat, place.lng);
        if (distance > 200) return null;

        const bearing = getBearing(userLat, userLng, place.lat, place.lng);
        const angleDiff = getAngleDifference(bearing, heading);

        // hide if outside camera view
        if (Math.abs(angleDiff) > 60) return null;

        const x = angleToScreenX(angleDiff, width);

        return (
          <View
            key={place.id}
            style={[
              styles.card,
              {
                left: x - 110, // half card width
                top: 200,
              },
            ]}
          >
            <Text style={styles.title}>{place.name}</Text>
            <Text style={styles.desc}>{place.description}</Text>
          </View>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    width: 220,
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 12,
    borderRadius: 16,
  },
  title: { color: "#fff", fontWeight: "bold" },
  desc: { color: "#ddd", fontSize: 12 },
  distance: { color: "#FFD700", marginTop: 4 },
});
