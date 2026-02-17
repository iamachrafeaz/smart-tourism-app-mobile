import axios from "axios";
import Constants from "expo-constants";

const fastApiUrl = Constants.expoConfig?.extra?.fastApiUrl;


const fastApiInstance = axios.create({
    baseURL: `${fastApiUrl}`,
    timeout: 10000,
});

export default fastApiInstance;
