import axiosInstance from "./axiosInstance";

export const loginService = async (email: string, password: string) => {
    const response = await axiosInstance.post('/auth/login', {
        email,
        password
    });

    return response.data;
}

export const getMe = async () => {
    try {
        const response = await axiosInstance.get('/users/me');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};