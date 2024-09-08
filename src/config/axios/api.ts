import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../core/store/store";
import { updateAccessToken } from "../../core/store/slice/userSlice";

const baseUrl = 'http://128.199.193.209:8080/api/v1/'

const api = axios.create({
  baseURL: baseUrl
})

api.interceptors.request.use(
  (config) => {
    const userLoginned = useSelector((state: RootState) => state.user)
    if (userLoginned) {
      config.headers.Authorization = `Bearer ${userLoginned['accessToken']}`;
    }
    console.log(config)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const refreshToken = async (refresh: any) => {
  if (!refresh) {
    throw new Error('No refresh token available');
  }
  const response = await axios.post(
    `${baseUrl}/user/refresh`,
    { refreshToken: refresh }
  );
  const { accessToken } = response.data.data;
  return accessToken;
};

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const dispatch = useDispatch()
        const userLoginned = useSelector((state: RootState) => state.user)
        const newAccessToken = await refreshToken(userLoginned && userLoginned['refreshToken']);
        dispatch(updateAccessToken(newAccessToken))
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api