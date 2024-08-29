import axios from "axios";

const api = axios.create({
  baseURL: 'https://65335392d80bd20280f6684e.mockapi.io/api/v1/'
})

export default api