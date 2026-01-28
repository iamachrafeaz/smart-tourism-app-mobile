import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  Camera,
  ChevronRight,
  Compass,
  Globe,
  Map,
  Menu,
  MessageCircle,
  Users,
} from "lucide-react-native";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  language: "en" | "fr" | "ar";
}

export default function HomeScreen({ language = "en" }: Props) {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#0f0f0f]">
      <StatusBar barStyle="light-content" />

      {/* Immersive Background with stronger gradient overlay for text readability */}
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1749907447398-d14bde45ed3e?auto=format&fit=crop&w=1080&q=80",
        }}
        className="absolute w-full h-full opacity-90"
        resizeMode="cover"
      />
      <LinearGradient
        colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.6)", "#000"]}
        locations={[0, 0.5, 1]}
        className="absolute inset-0"
      />

      <SafeAreaView className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false} className="px-6">
          {/* Header */}
          <View className="flex-row justify-between items-center mt-2">
            <View className="flex-row items-center bg-white/10 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
              <Globe size={16} color="#fb923c" />
              <Text className="text-white ml-2 font-semibold uppercase tracking-wider text-xs">
                {language}
              </Text>
            </View>
            <Pressable className="h-12 w-12 rounded-full border-2 border-white/20 overflow-hidden shadow-lg">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1635244621620-ccadff2eb29d?auto=format&fit=crop&w=100&q=80",
                }}
                className="w-full h-full"
              />
            </Pressable>
          </View>

          {/* Hero Section */}
          <View className="mt-10 mb-8">
            <Text className="text-white/80 text-lg font-medium">
              Good morning,
            </Text>
            <Text className="text-white text-5xl font-bold tracking-tighter mt-1">
              Explorer
            </Text>
            <View className="h-1.5 w-16 bg-orange-500 mt-4 rounded-full" />
          </View>

          {/* Primary Action Card (AR) - Glassmorphism + Gradient */}
          <Pressable
            className="rounded-[32px] mb-6 overflow-hidden relative shadow-orange-500/20 shadow-2xl"
            style={{ height: 180 }}
            onPress={() => router.push("/scanner")}
          >
            <LinearGradient
              colors={["#f97316", "#ea580c"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="absolute inset-0"
            />
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
              }}
              className="absolute inset-0 opacity-20"
              resizeMode="cover"
            />

            <View className="p-7 flex-1 justify-between">
              <View className="flex-row justify-between items-start">
                <View className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                  <Camera size={32} color="white" />
                </View>
                <View className="bg-black/20 px-3 py-1 rounded-full">
                  <Text className="text-white/90 font-bold uppercase text-[10px] tracking-widest">
                    Live Vision
                  </Text>
                </View>
              </View>
              <View>
                <Text className="text-white text-3xl font-bold tracking-tight">
                  Scan Area
                </Text>
                <Text className="text-white/80 text-sm font-medium mt-1">
                  Identify landmarks instantly
                </Text>
              </View>
            </View>
          </Pressable>

          {/* Secondary Actions */}
          <View className="flex-row gap-4 mb-10">
            <ActionCard
              icon={<MessageCircle size={28} color="#fb923c" />}
              label="AI Guide"
              subLabel="Chat now"
              onPress={() => router.push("/chatbot")}
            />
            <ActionCard
              icon={<Map size={28} color="#fb923c" />}
              label="Explore"
              subLabel="Map view"
              onPress={() => router.push("/experiences")}
            />
          </View>

          {/* Quick Access Grid */}
          <View className="mb-10">
            <Text className="text-white/50 font-bold uppercase text-xs tracking-widest mb-5 ml-1">
              Curated For You
            </Text>
            <View className="gap-y-4">
              <QuickRow
                icon={<Users size={20} color="white" />}
                title="Local Guides"
                subtitle="Book experts near you"
                onPress={() => router.push("/guides")}
              />
              <QuickRow
                icon={<Compass size={20} color="white" />}
                title="Hidden Gems"
                subtitle="Secret spots & trails"
                onPress={() => {}}
              />
              <QuickRow
                icon={<Menu size={20} color="white" />}
                title="Cultural Hub"
                subtitle="Events, food & history"
                onPress={() => router.push("/hub")}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// Sub-components
function ActionCard({
  icon,
  label,
  subLabel,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  subLabel: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-1 bg-white/5 border border-white/10 p-5 rounded-[24px] items-start active:bg-white/10"
    >
      <View className="mb-4 bg-white/5 p-3 rounded-2xl">{icon}</View>
      <Text className="text-white font-bold text-lg">{label}</Text>
      <Text className="text-white/40 text-xs mt-1">{subLabel}</Text>
    </Pressable>
  );
}

function QuickRow({
  icon,
  title,
  subtitle,
  onPress,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center bg-white/5 p-4 rounded-2xl border border-white/5 active:bg-[#252525]"
    >
      <View className="bg-orange-500/10 p-3 rounded-xl border border-orange-500/20">
        {icon}
      </View>
      <View className="ml-4 flex-1">
        <Text className="text-white font-bold text-base">{title}</Text>
        <Text className="text-white/40 text-xs mt-0.5">{subtitle}</Text>
      </View>
      <ChevronRight size={20} color="#666" />
    </Pressable>
  );
}
