import axiosInstance from "./axiosInstance";

export const fetchPosts = async () => {
    const response = await axiosInstance.get("/posts");
    return response.data.data;
};

export const fetchPostsById = async (postId: string) => {
    const response = await axiosInstance.get(`/posts/${postId}`);
    return response.data.data;
};

export const createPostComment = async (postId: string, answer: string) => {
    const response = await axiosInstance.post("/posts/comment", {
        postId,
        answer
    });

    return response.data.success;
}

export const likePost = async (postId: string) => {
    const response = await axiosInstance.post("/posts/like", {
        postId
    });

    return response.data;
}

export const createPost = async (
    question: string
) => {
    const response = await axiosInstance.post("/posts", { question });
    return response.data.success;
}