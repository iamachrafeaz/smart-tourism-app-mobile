import { createPost, fetchPosts, likePost } from "@/api/postService";
import { CreatePostModal } from "@/components/hub/createPostModal";
import PostCard from "@/components/hub/postCard";
import { Post } from "@/types/post.type";
import { useRouter } from "expo-router";
import { ArrowLeft, Plus, Search, Tag, TrendingUp } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CulturalExchange() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleCreatePost = async (question: string) => {
    const res = await createPost(question);
    if (res) {
      setVisible(false);
    }
  };

  const handleLike = async (item: Post) => {
    const res: {
      success: boolean;
      data?: { liked: boolean; totalLikes: number };
    } = await likePost(item.id);

    if (res.success) {
      setPosts((prev) =>
        prev.map((p: Post) => {
          if (p.id === item.id) {
            return {
              ...p,
              likes: res.data!.totalLikes,
              hasLiked: res.data!.liked,
            };
          } else {
            return p;
          }
        }),
      );
    }
  };

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPosts();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags)));

  const filteredPosts = selectedTag
    ? posts.filter((post) => post.tags.includes(selectedTag))
    : posts;

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.iconButton}
            >
              <ArrowLeft color="white" size={20} />
            </TouchableOpacity>
            <View style={styles.searchButton}>
              <Search color="rgba(255,255,255,0.4)" size={20} />
            </View>
          </View>

          <Text style={styles.preTitle}>COMMUNITY</Text>
          <Text style={styles.title}>Cultural Exchange</Text>
        </View>

        {/* Tags Filter */}
        <View style={styles.filterContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterContent}
          >
            <TouchableOpacity
              onPress={() => setSelectedTag(null)}
              style={[
                styles.filterPill,
                selectedTag === null
                  ? styles.filterPillActive
                  : styles.filterPillInactive,
              ]}
            >
              <TrendingUp
                color={selectedTag === null ? "white" : "rgba(255,255,255,0.4)"}
                size={14}
              />
              <Text
                style={[
                  styles.filterText,
                  selectedTag === null
                    ? styles.filterTextActive
                    : styles.filterTextInactive,
                ]}
              >
                Trending
              </Text>
            </TouchableOpacity>

            {allTags.map((tag) => (
              <TouchableOpacity
                key={tag}
                onPress={() => setSelectedTag(tag)}
                style={[
                  styles.filterPill,
                  selectedTag === tag
                    ? styles.filterPillActive
                    : styles.filterPillInactive,
                ]}
              >
                <Tag
                  color={
                    selectedTag === tag ? "white" : "rgba(255,255,255,0.4)"
                  }
                  size={14}
                />
                <Text
                  style={[
                    styles.filterText,
                    selectedTag === tag
                      ? styles.filterTextActive
                      : styles.filterTextInactive,
                  ]}
                >
                  {tag}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Posts Feed */}
        {loading ? (
          <View style={styles.centerContent}>
            <ActivityIndicator size="large" color="#f97316" />
          </View>
        ) : error ? (
          <View style={styles.centerContent}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <FlatList
            data={filteredPosts}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <PostCard item={item} handleLike={handleLike} />
            )}
            ListEmptyComponent={
              <View style={styles.centerContent}>
                <Text style={styles.emptyText}>No posts found</Text>
              </View>
            }
          />
        )}

        {/* Floating Bottom Bar */}
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.askButton}
            onPress={() => setVisible(true)}
          >
            <Plus color="white" size={24} />
            <Text style={styles.askButtonText}>Ask Question</Text>
          </TouchableOpacity>
        </View>

        <CreatePostModal
          visible={visible}
          onClose={() => setVisible(false)}
          onSubmit={handleCreatePost}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#222",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    justifyContent: "center",
    alignItems: "center",
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  preTitle: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "white",
    letterSpacing: -0.5,
  },
  /* Filter Styles */
  filterContainer: {
    height: 50,
  },
  filterContent: {
    paddingHorizontal: 24,
    gap: 10,
  },
  filterPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 30,
    borderWidth: 1,
  },
  filterPillInactive: {
    backgroundColor: "#222",
    borderColor: "rgba(255,255,255,0.05)",
  },
  filterPillActive: {
    backgroundColor: "#f97316", // Orange Accent
    borderColor: "#f97316",
  },
  filterText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: "600",
  },
  filterTextInactive: {
    color: "rgba(255,255,255,0.6)",
  },
  filterTextActive: {
    color: "white",
  },
  /* List Styles */
  listContent: {
    padding: 24,
    paddingTop: 10,
    paddingBottom: 100, // Space for bottom bar
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  errorText: {
    color: "#ef4444",
    fontSize: 16,
    textAlign: "center",
  },
  emptyText: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 16,
    textAlign: "center",
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
