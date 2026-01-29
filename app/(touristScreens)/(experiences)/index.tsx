import { fetchExperiencesByCity } from "@/api/experienceService";
import ExperienceCard from "@/components/experiences/experienceCard";
import Experience from "@/types/experience.type";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Calendar,
  Castle,
  Church,
  DollarSign,
  Landmark,
  List,
  Map as MapIcon,
  MapPin,
  Search,
  Store,
  Trees,
  Utensils,
} from "lucide-react-native";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

type OpenMapArgs = {
  lat: string | number;
  lng: string | number;
  label: string;
};
export default function DiscoverExperiences() {
  const router = useRouter();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"map" | "list">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const openMap = ({ lat, lng, label }: OpenMapArgs) => {
    const scheme = Platform.select({
      ios: `maps://?q=${label}&ll=${lat},${lng}`,
      android: `geo:${lat},${lng}?q=${lat},${lng}(${label})`,
    });

    if (scheme) {
      Linking.openURL(scheme).catch((err) =>
        console.error("Error opening map: ", err),
      );
    }
  };

  const placeTypes = [
    { label: "Hidden Gems", value: "hidden-gem", icon: MapPin },
    { label: "Religious", value: "religious", icon: Church },
    { label: "Nature", value: "nature", icon: Trees },
    { label: "Dining", value: "restaurant", icon: Utensils },
    { label: "Banks", value: "bank", icon: DollarSign },
    { label: "Culture", value: "culture", icon: Landmark },
    { label: "History", value: "historic", icon: Castle },
    { label: "Shopping", value: "local-market", icon: Store },
    { label: "Events", value: "event", icon: Calendar },
  ];

  useEffect(() => {
    const loadExperiences = async () => {
      try {
        setLoading(true);
        const data = await fetchExperiencesByCity();
        setExperiences(data);
      } catch (err: any) {
        setError(err.message || "Failed to load experiences");
      } finally {
        setLoading(false);
      }
    };

    loadExperiences();
  }, []);

  const filteredExperiences = useMemo(() => {
    return experiences.filter((experience) => {
      const name = experience.name?.toLowerCase() ?? "";
      const query = searchQuery.toLowerCase().trim();

      const matchesSearch = name.includes(query);

      const matchesType = selectedType
        ? experience.type?.toLowerCase() === selectedType.toLowerCase()
        : true;

      return matchesSearch && matchesType;
    });
  }, [experiences, searchQuery, selectedType]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#111]">
        <ActivityIndicator size="large" color="#fb923c" />
        <Text className="text-white/60 mt-4 text-sm font-medium uppercase tracking-widest">
          Discovering...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-[#111] px-6">
        <Text className="text-red-500 text-lg font-bold mb-2">Unavailable</Text>
        <Text className="text-white/60 text-center mb-6">{error}</Text>
        <TouchableOpacity
          onPress={() => {
            setError(null);
            setLoading(true);
            fetchExperiencesByCity();
          }}
          className="bg-white px-6 py-3 rounded-full"
        >
          <Text className="text-black font-bold">Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#111]">
      <View className="flex-1 px-4 pt-2">
        <View>
          <Pressable
            onPress={() => router.back()}
            className="mr-2 w-10 h-10 bg-white/10 rounded-full items-center justify-center border border-white/5"
          >
            <ArrowLeft size={20} color="white" />
          </Pressable>
        </View>
        {/* Header */}
        <View className="flex-row justify-between items-center my-6">
          <View>
            <Text className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">
              Explore City
            </Text>
            <Text className="text-white text-3xl font-bold">Discover</Text>
          </View>

          <View className="flex-row bg-[#222] p-1 rounded-xl">
            <TouchableOpacity
              onPress={() => setViewMode("list")}
              className={`p-2.5 rounded-lg ${viewMode === "list" ? "bg-[#333]" : "bg-transparent"}`}
            >
              <List color={viewMode === "list" ? "white" : "#666"} size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setViewMode("map")}
              className={`p-2.5 rounded-lg ${viewMode === "map" ? "bg-[#333]" : "bg-transparent"}`}
            >
              <MapIcon
                color={viewMode === "map" ? "white" : "#666"}
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Input */}
        <View className="mb-6">
          <View className="flex-row items-center bg-[#222] rounded-2xl px-4 py-3 border border-white/5">
            <Search size={20} color="#666" />
            <TextInput
              placeholder="Search places, landmarks..."
              placeholderTextColor="#666"
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 text-white ml-3 text-base"
            />
          </View>
        </View>

        {/* Filters */}
        <View className="h-12 mb-2">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8 }}
          >
            <TouchableOpacity
              onPress={() => setSelectedType(null)}
              className={`px-5 py-2.5 rounded-full border ${
                selectedType === null
                  ? "bg-orange-500 border-orange-500"
                  : "bg-[#222] border-white/5"
              }`}
            >
              <Text
                className={`font-semibold ${selectedType === null ? "text-white" : "text-white/60"}`}
              >
                All
              </Text>
            </TouchableOpacity>

            {placeTypes.map(({ label, value, icon: Icon }) => {
              const isActive = selectedType === value;
              return (
                <TouchableOpacity
                  key={value}
                  onPress={() => setSelectedType(value)}
                  className={`flex-row items-center px-4 py-2.5 rounded-full border ${
                    isActive
                      ? "bg-orange-500 border-orange-500"
                      : "bg-[#222] border-white/5"
                  }`}
                >
                  <Icon color={isActive ? "white" : "#888"} size={14} />
                  <Text
                    className={`ml-2 font-semibold ${isActive ? "text-white" : "text-white/60"}`}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Places List or Map */}
        {viewMode === "list" ? (
          <FlatList
            data={filteredExperiences}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View className="h-4" />}
            renderItem={({ item }) => (
              <ExperienceCard
                experience={item}
                onPress={() => router.push(`/(experiences)/${item.id}`)}
                onDirectionsPress={() =>
                  openMap({
                    lat: item.coordinates.lat,
                    lng: item.coordinates.lng,
                    label: "",
                  })
                }
              />
            )}
            contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }}
            ListEmptyComponent={
              <View className="items-center py-20">
                <Search size={48} color="#333" />
                <Text className="text-white/40 mt-4">
                  No places found matching your search.
                </Text>
              </View>
            }
          />
        ) : (
          <View className="flex-1 bg-[#222] rounded-3xl overflow-hidden justify-center items-center border border-white/10 mb-4">
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: filteredExperiences[0]?.coordinates.lat || 35.7799,
                longitude: filteredExperiences[0]?.coordinates.lng || -5.8139,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}
            >
              {filteredExperiences.map((exp) => (
                <Marker
                  key={exp.id}
                  coordinate={{
                    latitude: exp.coordinates.lat,
                    longitude: exp.coordinates.lng,
                  }}
                  title={exp.name}
                  description={exp.description}
                >
                  {/* Custom Marker View */}
                  <View className="bg-orange-500 p-2 rounded-full border-2 border-white">
                    <MapPin size={20} color="white" />
                  </View>
                </Marker>
              ))}
            </MapView>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
