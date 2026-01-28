import { Guide } from "@/types/guide.type";
import Constants from "expo-constants";
import { Globe, ShieldCheck, Star, Zap } from "lucide-react-native";
import { Image, Pressable, Text, View } from "react-native";

interface GuideCardProps {
  guide: Guide;
  onPress: () => void;
}

export default function GuideCard({ guide, onPress }: GuideCardProps) {
  const apiUrl = Constants.expoConfig?.extra?.apiUrl;

  return (
    <Pressable
      onPress={onPress}
      className="bg-[#222] rounded-[32px] p-4 mb-5 border border-white/5 active:bg-[#2a2a2a]"
    >
      <View className="flex-row">
        {/* Avatar with Status */}
        <View>
          <Image
            source={{ uri: apiUrl + guide.photo }}
            className="w-24 h-28 rounded-3xl bg-gray-800"
            resizeMode="cover"
          />
          {/* Status Badge - Border matches card bg (#222) for clean cutout look */}
          <View
            className={`absolute -bottom-1 -right-1 px-2 py-1 rounded-lg border-[3px] border-[#222] ${
              guide.availability ? "bg-green-500" : "bg-gray-500"
            }`}
          >
            <Text className="text-[8px] font-bold text-white uppercase tracking-wider">
              {guide.availability ? "Active" : "Busy"}
            </Text>
          </View>
        </View>

        {/* Details Column */}
        <View className="flex-1 ml-5 justify-between py-1">
          {/* Top Row: Name & Rating */}
          <View className="flex-row justify-between items-start">
            <View className="flex-1 mr-2">
              <View className="flex-row items-center mb-1">
                <Text className="text-white font-bold text-lg mr-1.5 leading-tight">
                  {guide.name}
                </Text>
                {guide.verified && <ShieldCheck size={16} color="#60a5fa" />}
              </View>
              <View className="flex-row items-center">
                <Globe size={12} color="#888" />
                <Text
                  className="text-white/50 text-xs ml-1.5"
                  numberOfLines={1}
                >
                  {guide.languages.join(" • ")}
                </Text>
              </View>
            </View>

            {/* Rating Pill */}
            <View className="bg-yellow-500/10 px-2 py-1 rounded-lg flex-row items-center border border-yellow-500/20">
              <Star size={10} color="#facc15" fill="#facc15" />
              <Text className="text-yellow-400 text-xs font-bold ml-1">
                {guide.rating}
              </Text>
            </View>
          </View>

          {/* Tags (Glassmorphism Chips) */}
          <View className="flex-row gap-2 mt-3">
            {guide.expertise.slice(0, 2).map((exp) => (
              <View
                key={exp}
                className="bg-white/5 px-3 py-1.5 rounded-full border border-white/5"
              >
                <Text className="text-[10px] font-semibold text-white/70 capitalize">
                  {exp}
                </Text>
              </View>
            ))}
            {guide.expertise.length > 2 && (
              <View className="bg-white/5 px-2 py-1.5 rounded-full border border-white/5">
                <Text className="text-[10px] font-semibold text-white/40">
                  +{guide.expertise.length - 2}
                </Text>
              </View>
            )}
          </View>

          {/* Footer Info & Action */}
          <View className="flex-row items-end justify-between mt-3">
            <View className="flex-row items-baseline">
              <Text className="text-orange-500 font-bold text-lg">
                ${guide.price}
              </Text>
              <Text className="text-white/30 text-[10px] ml-0.5">/hr</Text>
            </View>

            <View className="flex-row items-center bg-orange-500 rounded-xl px-4 py-2 shadow-sm shadow-orange-500/20">
              <Zap size={14} color="white" fill="white" />
              <Text className="text-white text-xs font-bold ml-1.5">Book</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
