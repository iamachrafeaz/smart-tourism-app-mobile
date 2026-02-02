import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN = "access_token";
const REGISTRATION_TOKEN = "registration_token";

export const saveTokens = async (access: string) => {
    await SecureStore.setItemAsync(ACCESS_TOKEN, access);
};

export const saveRegistrationToken = async (registration: string) => {
    await SecureStore.setItemAsync(REGISTRATION_TOKEN, registration);
};

export const getRegistrationToken = async () => await SecureStore.getItemAsync(REGISTRATION_TOKEN);

export const getAccessToken = async () => SecureStore.getItemAsync(ACCESS_TOKEN);

export const clearTokens = async () => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN);
};
