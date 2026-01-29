import { Post } from "@/types/post.type";
import timeAgo from "@/utils/timeCounter";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { Heart, MessageCircle, ShieldCheck } from "lucide-react-native";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PostCard({
  item,
  handleLike,
}: {
  item: Post;
  handleLike: (item: Post) => void;
}) {
  const apiUrl = Constants.expoConfig?.extra?.apiUrl;
  const router = useRouter();

  const handleLikePress = async () => {
    handleLike(item);
  };
  return (
    <Pressable onPress={() => router.push(`/(hub)/${item.id}`)}>
      <View style={styles.card}>
        {/* Card Header: Author */}
        <View style={styles.cardHeader}>
          <Image source={{ uri: apiUrl + item.photo }} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.authorName}>{item.name}</Text>
              {item.isGuide && (
                <View style={styles.guideBadge}>
                  <ShieldCheck size={10} color="#60a5fa" />
                  <Text style={styles.guideText}>GUIDE</Text>
                </View>
              )}
            </View>
            <Text style={styles.timestamp}>{timeAgo(item.timestamp)}</Text>
          </View>
          {/* Context Tag (First one) */}
          <View style={styles.miniTag}>
            <Text style={styles.miniTagText}>#{item.tags[0]}</Text>
          </View>
        </View>

        {/* Question */}
        <Text style={styles.questionText}>{item.question}</Text>

        {/* Footer Actions */}
        <View style={styles.cardFooter}>
          <View style={styles.actionGroup}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleLikePress}
            >
              <Heart
                fill={item.hasLiked ? "red" : "transparent"}
                color={item.hasLiked ? "red" : "#888"}
                size={18}
              />
              <Text style={styles.actionText}>{item.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <MessageCircle color="#888" size={18} />
              <Text style={styles.actionText}>{item.repliesCount}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#222",
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 14,
    marginRight: 12,
    backgroundColor: "#333",
  },
  authorName: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    marginRight: 8,
  },
  guideBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(59, 130, 246, 0.15)", // Blue Glass
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(59, 130, 246, 0.3)",
  },
  guideText: {
    color: "#60a5fa",
    fontSize: 9,
    fontWeight: "800",
    marginLeft: 3,
  },
  timestamp: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 12,
    marginTop: 2,
  },
  miniTag: {
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  miniTagText: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 11,
    fontWeight: "600",
  },
  questionText: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 24,
    marginBottom: 16,
  },
  answerContainer: {
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
  },
  answerIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  answerText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    lineHeight: 22,
    flex: 1,
  },
  cardFooter: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionGroup: {
    flexDirection: "row",
    gap: 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  actionText: {
    color: "#888",
    fontSize: 13,
    fontWeight: "500",
  },
  /* Bottom Bar */
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingTop: 16,
    backgroundColor: "rgba(17,17,17,0.9)", // Glass effect
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.05)",
  },
  askButton: {
    backgroundColor: "#f97316",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 20,
    shadowColor: "#f97316",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  askButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
