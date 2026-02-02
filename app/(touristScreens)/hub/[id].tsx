import { createPostComment, fetchPostsById } from "@/api/postService";
import { Post } from "@/types/post.type";
import timeAgo from "@/utils/timeCounter";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { MoreHorizontal, Send, ShieldCheck, X } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const apiUrl = Constants.expoConfig?.extra?.apiUrl;

export default function PostDetailModal() {
  const [newComment, setNewComment] = useState("");
  const [isRefresh, setIsRefresh] = useState(true);
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const postId = useSearchParams().get("id");

  const handleSend = async () => {
    if (!post) return;

    const isSuccess = await createPostComment(post.id, newComment);

    if (isSuccess) {
      setNewComment("");
      setIsRefresh(true);
    }
  };

  const onClose = () => {
    router.back();
  };

  useEffect(() => {
    if (!postId) return;
    const loadPost = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const post = await fetchPostsById(postId);
        setPost(post);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load posts");
      } finally {
        setIsLoading(false);
        setIsRefresh(false);
      }
    };

    loadPost();
  }, [isRefresh]);

  if (isLoading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Loading thread...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center", padding: 24 },
        ]}
      >
        <Text style={{ color: "#f87171", fontSize: 16, marginBottom: 12 }}>
          {error}
        </Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={{ color: "#f97316" }}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!post) return null;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X color="white" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Thread</Text>
          <TouchableOpacity style={styles.menuButton}>
            <MoreHorizontal color="white" size={24} />
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* --- Original Post Section --- */}
            <View style={styles.postContainer}>
              {/* Author Info */}
              <View style={styles.authorRow}>
                <Image
                  source={{ uri: post.name ? apiUrl + post.photo : "" }}
                  style={styles.avatarLarge}
                />
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.authorNameLarge}>{post.name}</Text>
                    {post.isGuide && (
                      <View style={styles.guideBadge}>
                        <ShieldCheck size={10} color="#60a5fa" />
                        <Text style={styles.guideText}>GUIDE</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.timestamp}>
                    {timeAgo(post.timestamp)}
                  </Text>
                </View>
              </View>

              {/* The Question */}
              <Text style={styles.questionText}>{post.question}</Text>

              {/* Tags */}
              {/* <View style={styles.tagsRow}>
                  {post.tags.map((tag) => (
                    <Text key={tag} style={styles.tagText}>
                      #{tag}
                    </Text>
                  ))}
                </View> */}

              {/* Post Stats */}
              <View style={styles.statsRow}>
                <Text style={styles.statsText}>{post.likes} Likes</Text>
                <Text style={styles.dotSeparator}>•</Text>
                <Text style={styles.statsText}>
                  {post.replies!.length} Comments
                </Text>
              </View>
            </View>

            {/*Divider */}
            <View style={styles.divider} />

            {/* --- Pinned/Best Answer (If exists) ---
              {post.a && (
                <View style={styles.bestAnswerContainer}>
                  <View style={styles.bestAnswerHeader}>
                    <View style={styles.bestAnswerLabel}>
                      <ShieldCheck size={12} color="#facc15" />
                      <Text style={styles.bestAnswerLabelText}>
                        BEST ANSWER
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.bestAnswerText}>{post.answer}</Text>
                </View>
              )} */}

            {/* --- Comments List --- */}
            <View style={styles.commentsSection}>
              <Text style={styles.sectionTitle}>Comments</Text>

              {post.replies!.map((comment) => (
                <View key={comment.id} style={styles.commentCard}>
                  <Image
                    source={{ uri: apiUrl + comment.photo }}
                    style={styles.avatarSmall}
                  />
                  <View style={styles.commentContent}>
                    <View style={styles.commentHeader}>
                      <Text style={styles.commentAuthor}>{comment.name}</Text>
                      {comment.isGuide && (
                        <ShieldCheck
                          size={12}
                          color="#60a5fa"
                          style={{ marginLeft: 4 }}
                        />
                      )}
                      <Text style={styles.commentTime}>
                        • {timeAgo(comment.timestamp)}
                      </Text>
                    </View>
                    <Text style={styles.commentText}>{comment.answer}</Text>

                    {/* Comment Actions */}
                    {/* <TouchableOpacity style={styles.likeAction}>
                        <Text style={styles.likeCountText}>
                          Helpful ({comment.likes})
                        </Text>
                      </TouchableOpacity> */}
                  </View>
                </View>
              ))}
            </View>

            {/* Padding for bottom input */}
            <View style={{ height: 20 }} />
          </ScrollView>

          {/* --- Footer Input --- */}
          <View style={styles.footerInputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Add a comment..."
                placeholderTextColor="#666"
                style={styles.inputField}
                value={newComment}
                onChangeText={setNewComment}
                multiline
              />
              <TouchableOpacity
                onPress={handleSend}
                style={[
                  styles.sendButton,
                  { backgroundColor: newComment.trim() ? "#f97316" : "#333" },
                ]}
                disabled={!newComment.trim()}
              >
                <Send size={20} color={newComment.trim() ? "white" : "#666"} />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  headerTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  closeButton: {
    padding: 8,
  },
  menuButton: {
    padding: 8,
  },
  scrollContent: {
    paddingBottom: 80,
  },

  /* Post Styles */
  postContainer: {
    padding: 24,
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarLarge: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#333",
    marginRight: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  authorNameLarge: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  guideBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(59, 130, 246, 0.15)",
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
  questionText: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 28,
    marginBottom: 12,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  tagText: {
    color: "#f97316",
    fontSize: 14,
    fontWeight: "500",
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statsText: {
    color: "#888",
    fontSize: 13,
  },
  dotSeparator: {
    color: "#444",
    marginHorizontal: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
    width: "100%",
  },

  /* Best Answer Styles */
  bestAnswerContainer: {
    margin: 24,
    marginTop: 16,
    marginBottom: 8,
    backgroundColor: "rgba(250, 204, 21, 0.05)", // Yellow tint
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(250, 204, 21, 0.2)",
  },
  bestAnswerHeader: {
    flexDirection: "row",
    marginBottom: 8,
  },
  bestAnswerLabel: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(250, 204, 21, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  bestAnswerLabelText: {
    color: "#facc15",
    fontSize: 10,
    fontWeight: "bold",
    marginLeft: 4,
  },
  bestAnswerText: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 15,
    lineHeight: 22,
  },

  /* Comments Styles */
  commentsSection: {
    padding: 24,
    paddingTop: 16,
  },
  sectionTitle: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 20,
    opacity: 0.5,
  },
  commentCard: {
    flexDirection: "row",
    marginBottom: 24,
  },
  avatarSmall: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: "#333",
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  commentAuthor: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  commentTime: {
    color: "#666",
    fontSize: 12,
    marginLeft: 6,
  },
  commentText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    lineHeight: 20,
  },
  likeAction: {
    marginTop: 8,
  },
  likeCountText: {
    color: "#666",
    fontSize: 12,
    fontWeight: "500",
  },

  /* Footer Input Styles */
  footerInputContainer: {
    padding: 16,
    paddingBottom: Platform.OS === "ios" ? 16 : 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.05)",
    backgroundColor: "#111", // Ensure opacity over content
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#222",
    borderRadius: 24,
    padding: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  inputField: {
    flex: 1,
    color: "white",
    paddingHorizontal: 12,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 15,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
});
