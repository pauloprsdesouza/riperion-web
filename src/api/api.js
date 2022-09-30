import axios from "axios";
import { getToken } from "../authorization/jwt-token";

const RiperionApi = axios.create({
    baseURL: "https://localhost:7185/api/v1/",
    //baseURL: "https://5rva35dkd9.execute-api.us-east-1.amazonaws.com/dev/api/v1/",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    }
});

RiperionApi.interceptors.request.use(async config => {
    const token = getToken();
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default RiperionApi;