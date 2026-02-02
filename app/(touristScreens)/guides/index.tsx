import { fetchGuides } from "@/api/guideService";
import GuideCard from "@/components/guides/guideCard"; // Ensure this component handles dark mode or pass styles
import { Guide } from "@/types/guide.type";
import { useRouter } from "expo-router";
import {
  AlertCircle,
  ArrowLeft,
  Filter,
  Search,
  Sparkles,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GuidesMarketplace() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedExpertise, setSelectedExpertise] = useState<string | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();

  useEffect(() => {
    const loadGuides = async () => {
      try {
        setLoading(true);
        const data = await fetchGuides();
        setGuides(data);
      } catch (err: any) {
        setError(err.message || "Failed to load guides");
      } finally {
        setLoading(false);
      }
    };

    loadGuides();
  }, []);

  const allExpertise = Array.from(new Set(guides.flatMap((g) => g.expertise)));

  const filteredGuides = guides.filter((g) => {
    const matchesCategory = selectedExpertise
      ? g.expertise.includes(selectedExpertise)
      : true;
    const matchesSearch = g.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView className="flex-1 bg-[#111]">
      {/* Header Area */}
      <View className="px-6 pt-2 pb-6">
        <View className="flex-row items-center justify-between mb-6">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 bg-white/10 rounded-full items-center justify-center border border-white/5"
          >
            <ArrowLeft size={20} color="white" />
          </Pressable>
          <View className="bg-orange-500/20 px-3 py-1 rounded-full border border-orange-500/30">
            <Text className="text-orange-400 text-xs font-bold uppercase tracking-widest">
              Verified Pros
            </Text>
          </View>
        </View>

        <Text className="text-white/60 text-sm font-medium uppercase tracking-widest mb-1">
          Connect with
        </Text>
        <Text className="text-white text-4xl font-bold tracking-tight">
          Local Experts
        </Text>
      </View>

      {/* Search Bar */}
      <View className="px-6 mb-6">
        <View className="flex-row items-center bg-[#222] rounded-2xl px-4 py-3 border border-white/5">
          <Search size={20} color="#666" />
          <TextInput
            placeholder="Find a guide..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 text-white ml-3 text-base"
          />
          <View className="h-5 w-[1px] bg-white/10 mx-3" />
          <Filter size={18} color="orange" style={{ opacity: 0.8 }} />
        </View>
      </View>

      {/* Categories / Expertise */}
      <View className="h-12 mb-2">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, gap: 10 }}
        >
          <FilterPill
            label="All Guides"
            active={selectedExpertise === null}
            onPress={() => setSelectedExpertise(null)}
          />
          {allExpertise.map((exp) => (
            <FilterPill
              key={exp}
              label={exp}
              active={selectedExpertise === exp}
              onPress={() => setSelectedExpertise(exp)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Content Area */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#fb923c" />
        </View>
      ) : error ? (
        <ErrorState message={error} onRetry={fetchGuides} />
      ) : (
        <FlatList
          data={filteredGuides}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: 100,
            paddingTop: 10,
          }}
          ItemSeparatorComponent={() => <View className="h-4" />}
          renderItem={({ item: guide }) => (
            <GuideCard
              guide={guide} // Ensure GuideCard uses text-white/bg-[#222] styles internally
              onPress={() => router.push(`/(guides)/${guide.id}`)}
            />
          )}
          ListEmptyComponent={
            <View className="py-20 items-center">
              <Sparkles size={40} color="#333" />
              <Text className="text-white/40 font-medium mt-4">
                No experts found matching your search.
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

interface FilterPillProps {
  label: string;
  active: boolean;
  onPress: () => void;
}

function FilterPill({ label, active, onPress }: FilterPillProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`px-5 py-2.5 rounded-full border ${
        active ? "bg-orange-500 border-orange-500" : "bg-[#222] border-white/5"
      }`}
    >
      <Text
        className={`font-semibold text-sm ${
          active ? "text-white" : "text-white/60"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <View className="flex-1 px-10 justify-center items-center">
      <AlertCircle size={40} color="#ef4444" />
      <Text className="text-white font-bold text-lg mt-4">Unavailable</Text>
      <Text className="text-center text-white/50 mt-2 mb-8">{message}</Text>
      <Pressable onPress={onRetry} className="bg-white px-8 py-3 rounded-full">
        <Text className="text-black font-bold">Try Again</Text>
      </Pressable>
    </View>
  );
}
