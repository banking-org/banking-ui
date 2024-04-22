import { Axios } from "axios";

const axiosClient = new Axios({
    baseURL: import.meta.env.VITE_API_URL,
});

export default axiosClient;
