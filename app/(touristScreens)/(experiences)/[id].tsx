import { fetchExperienceById } from "@/api/experienceService";
import Experience from "@/types/experience.type";
import { useNavigation, useRoute } from "@react-navigation/native";
import Constants from "expo-constants";
import {
  ArrowLeft,
  Globe,
  Leaf,
  Lightbulb,
  Lock,
  MapPin,
  Navigation,
  Star,
  Users,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

interface ExperienceDetailRouteParams {
  id: string;
}

const apiUrl = Constants.expoConfig?.extra?.apiUrl;

export default function ExperienceDetail() {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as ExperienceDetailRouteParams;

  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadExperience = async () => {
      try {
        setLoading(true);
        const data = await fetchExperienceById(id);
        setExperience(data);
      } catch (err: any) {
        setError(err.message || "Failed to load experiences");
      } finally {
        setLoading(false);
      }
    };

    loadExperience();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#111]">
        <ActivityIndicator size="large" color="#fb923c" />
      </View>
    );
  }

  if (error || !experience) {
    return (
      <View className="flex-1 justify-center items-center bg-[#111] px-6">
        <Text className="text-red-500 text-lg mb-2 text-center">
          {error || "Place not found"}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="bg-[#333] px-6 py-3 rounded-full mt-4"
        >
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#111]">
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="px-6 py-4 flex-row items-center border-b border-white/5 bg-[#111] z-10">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="w-10 h-10 bg-[#222] rounded-full items-center justify-center border border-white/10"
          >
            <ArrowLeft color="white" size={20} />
          </TouchableOpacity>
          <Text
            className="text-white text-lg font-bold ml-4 flex-1"
            numberOfLines={1}
          >
            Experience Details
          </Text>
          <View className="flex-row items-center bg-[#222] px-3 py-1.5 rounded-full border border-white/5">
            <Star color="#facc15" fill="#facc15" size={14} />
            <Text className="text-white font-bold ml-1.5 text-xs">
              {experience.rating}
            </Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Main Content Container */}
          <View className="p-6">
            {/* Hero Image */}
            <View className="shadow-lg shadow-black/50">
              <Image
                source={{ uri: experience.image }}
                className="w-full h-64 rounded-[32px] border border-white/10"
                resizeMode="cover"
              />
              {/* Title Overlay (Optional style choice, keeping it clean below image instead) */}
            </View>

            {/* Title & Type */}
            <View className="mt-6 mb-2">
              <View className="flex-row justify-between items-start">
                <Text className="text-white text-3xl font-bold flex-1 mr-2 leading-tight">
                  {experience.name}
                </Text>
              </View>
              <Text className="text-orange-500 font-medium uppercase tracking-widest text-xs mt-2">
                {experience.type}
              </Text>
            </View>

            {/* Quick Stats / Badges */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mt-5 mb-6"
              contentContainerStyle={{ gap: 10 }}
            >
              {/* Access Type */}
              <View
                className={`flex-row items-center px-4 py-2 rounded-xl border ${
                  experience.accessType === "PUBLIC"
                    ? "bg-blue-500/10 border-blue-500/20"
                    : "bg-purple-500/10 border-purple-500/20"
                }`}
              >
                {experience.accessType === "PUBLIC" ? (
                  <Globe size={16} color="#60a5fa" />
                ) : (
                  <Lock size={16} color="#c084fc" />
                )}
                <Text
                  className={`ml-2 font-semibold text-xs ${
                    experience.accessType === "PUBLIC"
                      ? "text-blue-400"
                      : "text-purple-400"
                  }`}
                >
                  {experience.accessType}
                </Text>
              </View>

              {/* Crowd Level */}
              <View className="flex-row items-center bg-[#222] px-4 py-2 rounded-xl border border-white/5">
                <Users size={16} color="#aaa" />
                <Text className="text-white/70 ml-2 text-xs font-semibold capitalize">
                  {experience.crowdLevel.toLowerCase()} Crowd
                </Text>
              </View>

              {/* Sustainable Badge */}
              {experience.sustainable && (
                <View className="flex-row items-center bg-green-500/10 px-4 py-2 rounded-xl border border-green-500/20">
                  <Leaf size={16} color="#4ade80" />
                  <Text className="text-green-400 ml-2 text-xs font-semibold">
                    Eco-Friendly
                  </Text>
                </View>
              )}
            </ScrollView>

            <View className="h-[1px] bg-white/5 mb-6" />

            {/* Description */}
            <Text className="text-white/80 text-base leading-7 mb-8">
              {experience.description}
            </Text>

            {/* Info Grid (Address & Distance) */}
            <View className="flex-row gap-4 mb-8">
              {/* Address Card */}
              <View className="flex-1 bg-[#222] p-4 rounded-2xl border border-white/5">
                <View className="bg-orange-500/10 w-10 h-10 rounded-full items-center justify-center mb-3">
                  <MapPin size={20} color="#fb923c" />
                </View>
                <Text className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">
                  Address
                </Text>
                <Text className="text-white text-sm font-medium leading-5">
                  {experience.address}
                </Text>
              </View>

              {/* Distance Card */}
              <View className="flex-1 bg-[#222] p-4 rounded-2xl border border-white/5">
                <View className="bg-blue-500/10 w-10 h-10 rounded-full items-center justify-center mb-3">
                  <Navigation size={20} color="#60a5fa" />
                </View>
                <Text className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">
                  Distance
                </Text>
                <Text className="text-white text-lg font-bold">
                  {experience.distance}
                </Text>
              </View>
            </View>

            {/* Local Tips */}
            {experience.tips.length > 0 && (
              <View className="bg-[#1a1a1a] rounded-2xl p-5 border border-white/5 mb-8">
                <View className="flex-row items-center mb-4">
                  <Lightbulb size={20} color="#facc15" />
                  <Text className="text-white font-bold text-lg ml-3">
                    Local Tips
                  </Text>
                </View>
                <View className="gap-3">
                  {experience.tips.map((tip, i) => (
                    <View key={i} className="flex-row items-start">
                      <View className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 mr-3" />
                      <Text className="text-white/70 flex-1 leading-5">
                        {tip}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Map */}
            <View>
              <Text className="text-white font-bold text-lg mb-4">
                Location
              </Text>

              <View className="rounded-3xl overflow-hidden border border-white/10">
                <MapView
                  provider={PROVIDER_DEFAULT}
                  style={styles.map}
                  initialRegion={{
                    latitude: experience.coordinates.lat, // Fixed: Swapped to correct standard
                    longitude: experience.coordinates.lng,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                  userInterfaceStyle="dark" // Forces Apple Maps dark mode if available
                >
                  <Marker
                    coordinate={{
                      latitude: experience.coordinates.lat,
                      longitude: experience.coordinates.lng,
                    }}
                    title={experience.name}
                  >
                    {/* Custom Marker View */}
                    <View className="bg-orange-500 p-2 rounded-full border-2 border-white">
                      <MapPin size={20} color="white" />
                    </View>
                  </Marker>
                </MapView>
              </View>
            </View>
          </View>

          {/* Bottom Padding for scroll */}
          <View className="h-10" />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: 220,
  },
});
