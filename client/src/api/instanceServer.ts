import axios, {AxiosRequestConfig} from "axios";
import {LoginResponseType} from "./types/UserServiceTypes"

const instanceServer = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`,
    withCredentials: true
})

instanceServer.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
})

instanceServer.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;

    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const config: AxiosRequestConfig = {withCredentials: true}
            const response = await axios.get<LoginResponseType>(`${process.env.REACT_APP_API_URL}/api/refresh`, config)
            localStorage.setItem('token', response.data.accessToken);

            return instanceServer.request(originalRequest);
        } catch (e) {
            console.log('Не авторизован');
        }
    }

    throw error;
})
export default instanceServer;