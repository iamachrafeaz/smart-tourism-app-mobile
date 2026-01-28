import axiosInstance from "./axiosInstance";

export const fetchExperiencesByCity = async () => {
    const response = await axiosInstance.get("/experiences/by-city/Tangier");
    return response.data.data;
};

export const fetchExperienceById = async (experienceId: string) => {
    const response = await axiosInstance.get(`/experiences/${experienceId}`);
    return response.data.data;
};
