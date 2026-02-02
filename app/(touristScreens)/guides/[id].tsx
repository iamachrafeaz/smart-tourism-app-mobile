import { fetchGuideById } from "@/api/guideService";
import { Guide } from "@/types/guide.type";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  DollarSign,
  Globe,
  MessageCircle,
  Star,
  Trophy,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const apiUrl = Constants.expoConfig?.extra?.apiUrl;

function timeAgo(dateString: string) {
  const now = new Date();
  const past = new Date(dateString);
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);
  // Simplified logic
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export default function GuideProfile() {
  const router = useRouter();
  const [guide, setGuide] = useState<Guide | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const guideId = useSearchParams().get("id");

  useEffect(() => {
    if (!guideId) return setError("Invalid Guide ID");
    const loadGuide = async () => {
      try {
        setLoading(true);
        const data = await fetchGuideById(guideId);
        setGuide(data);
      } catch (err: any) {
        setError(err.message || "Failed to load details");
      } finally {
        setLoading(false);
      }
    };
    loadGuide();
  }, [guideId]);

  if (loading)
    return (
      <View className="flex-1 bg-[#111] justify-center items-center">
        <ActivityIndicator size="large" color="#fb923c" />
      </View>
    );
  if (error || !guide)
    return (
      <View className="flex-1 bg-[#111] justify-center items-center">
        <Text className="text-white">{error}</Text>
      </View>
    );

  return (
    <View className="flex-1 bg-[#111]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Navigation */}
        <SafeAreaView className="px-6 pb-2 z-10">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 bg-white/10 rounded-full items-center justify-center border border-white/5"
          >
            <ArrowLeft size={20} color="white" />
          </Pressable>
        </SafeAreaView>

        {/* Profile Header */}
        <View className="items-center px-6 pt-4">
          <View className="relative">
            <Image
              source={{ uri: apiUrl + guide.photo }}
              className="w-32 h-32 rounded-[32px] border-2 border-white/10"
            />
            {guide.verified && (
              <View className="absolute -bottom-2 -right-2 bg-blue-500 p-1.5 rounded-full border-4 border-[#111]">
                <CheckCircle size={16} color="white" />
              </View>
            )}
          </View>

          <Text className="text-2xl font-bold text-white mt-5 text-center tracking-tight">
            {guide.name}
          </Text>

          <View className="flex-row items-center mt-3 bg-[#222] px-4 py-1.5 rounded-full border border-white/5">
            <Star size={14} color="#facc15" fill="#facc15" />
            <Text className="ml-1.5 font-bold text-white">{guide.rating}</Text>
            <Text className="ml-1 text-white/40 text-xs">
              ({guide.reviews.length} reviews)
            </Text>
          </View>

          <View className="flex-row justify-center items-center mt-3">
            <Globe size={14} color="#888" />
            <Text className="ml-2 text-white/60 text-sm">
              {guide.languages.join(" • ")}
            </Text>
          </View>
        </View>

        {/* Information Section */}
        <View className="px-6 mt-10 gap-y-6">
          {/* About */}
          <View>
            <Text className="text-white/40 font-bold uppercase text-xs tracking-widest mb-3">
              Biography
            </Text>
            <Text className="text-white/80 leading-relaxed text-[15px]">
              {guide.bio}
            </Text>
          </View>

          {/* Expertise */}
          <View>
            <Text className="text-white/40 font-bold uppercase text-xs tracking-widest mb-3">
              Specialties
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {guide.expertise.map((exp) => (
                <View
                  key={exp}
                  className="bg-[#222] px-4 py-2 rounded-xl border border-white/5"
                >
                  <Text className="text-orange-400 font-medium text-sm">
                    {exp}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Tours */}
          <View>
            <Text className="text-white/40 font-bold uppercase text-xs tracking-widest mb-3">
              Available Tours
            </Text>
            {guide.tours.map((tour, idx) => (
              <View
                key={idx}
                className="flex-row justify-between items-center bg-[#222] p-4 rounded-2xl mb-3 border border-white/5"
              >
                <View className="flex-1 mr-4">
                  <Text className="text-white font-semibold text-base">
                    {tour.name}
                  </Text>
                  <View className="flex-row items-center mt-1.5">
                    <Clock size={12} color="#666" />
                    <Text className="text-white/40 text-xs ml-1">
                      {tour.duration} mins
                    </Text>
                  </View>
                </View>
                <View className="bg-white/10 px-3 py-1.5 rounded-lg">
                  <Text className="text-white font-bold">${tour.price}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Certifications (New Section based on UI style) */}
          {guide.certifications && guide.certifications.length > 0 && (
            <View>
              <Text className="text-white/40 font-bold uppercase text-xs tracking-widest mb-3">
                Credentials
              </Text>
              <View className="bg-[#1a1a1a] rounded-2xl p-4 border border-white/5 gap-3">
                {guide.certifications.map((cert, i) => (
                  <View key={i} className="flex-row items-center">
                    <Trophy size={16} color="#fb923c" />
                    <Text className="text-white/80 ml-3 text-sm">
                      {cert.name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Recent Review */}
          <View>
            <Text className="text-white/40 font-bold uppercase text-xs tracking-widest mb-3">
              Latest Reviews
            </Text>
            {guide.reviews.slice(0, 3).map((review) => (
              <View
                key={review.id}
                className="bg-[#222] p-4 rounded-2xl mb-3 border border-white/5"
              >
                <View className="flex-row justify-between mb-2">
                  <Text className="font-semibold text-white">
                    {review.author}
                  </Text>
                  <Text className="text-xs text-white/30">
                    {timeAgo(review.date)}
                  </Text>
                </View>
                <Text className="text-white/60 text-sm leading-5">
                  {review.comment}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Bar - Dark Theme */}
      <View className="absolute bottom-0 left-0 right-0 p-6 pt-4 bg-[#111]/90 backdrop-blur-xl border-t border-white/5">
        <SafeAreaView edges={["bottom"]}>
          <View className="flex-row gap-4">
            <Pressable className="bg-[#222] h-14 w-14 rounded-[20px] items-center justify-center border border-white/10 active:bg-[#333]">
              <MessageCircle size={24} color="white" />
            </Pressable>
            <Pressable className="flex-1 bg-orange-500 h-14 rounded-[20px] flex-row items-center justify-between px-6 active:bg-orange-600">
              <Text className="text-white font-bold text-lg">Book Now</Text>
              <View className="flex-row items-center bg-black/20 px-2 py-1 rounded-lg">
                <DollarSign size={14} color="white" />
                <Text className="text-white font-bold ml-0.5">
                  {guide.price}
                </Text>
                <Text className="text-white/70 text-xs ml-1">/hr</Text>
              </View>
            </Pressable>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
}
