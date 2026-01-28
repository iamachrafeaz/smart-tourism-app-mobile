// src/api/guidesService.ts
import axiosInstance from "./axiosInstance";

export const fetchGuides = async () => {
    const response = await axiosInstance.get("/guides");
    return response.data.data;
};

export const fetchGuideById = async (guideId: string) => {
    const response = await axiosInstance.get(`/guides/${guideId}`);
    return response.data.data;
};
