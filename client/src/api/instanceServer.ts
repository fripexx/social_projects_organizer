import axios from "axios";
import {AuthResponseType} from "../store/types/AuthResponseType";

const instanceServer = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`,
    withCredentials: true
})

instanceServer.interceptors.request.use((config) =>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
})

instanceServer.interceptors.response.use((config) => {
    return config;
},  async (error) => {
    const originalRequest = error.config;

    if(error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponseType>(`${process.env.REACT_APP_API_URL}/api/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken);
            return instanceServer.request(originalRequest);
        } catch (e) {
            console.log('Не авторизован');
        }
    }
    throw error;
})
export default instanceServer;