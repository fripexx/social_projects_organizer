import axios from "axios";

export const instanceServer = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`,
    withCredentials: true
})