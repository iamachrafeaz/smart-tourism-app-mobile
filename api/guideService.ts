import axiosInstance from "./axiosInstance";

export const getGuideMe = async () => {
    try {
        const response = await axiosInstance.get("/guides/me");
        return response.data.data;
    } catch (error: any) {
        throw error.response.data.error
    }

}

export const fetchGuides = async () => {
    const response = await axiosInstance.get("/guides");
    return response.data.data;
};

export const fetchGuideById = async (guideId: string) => {
    const response = await axiosInstance.get(`/guides/${guideId}`);
    return response.data.data;
};

export const completeProfile = async (formData: any) => {
    const response = await axiosInstance.post("/guides/complete-profile",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response;
}

