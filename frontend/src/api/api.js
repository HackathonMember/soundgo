import { API_BASE_URL } from "@env";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Axiosインスタンスの作成
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // クッキーを含める
});

// リクエストインターセプターでSession-IDを設定
api.interceptors.request.use(async (config) => {
  const sessionId = await AsyncStorage.getItem('sessionId');
  if (sessionId) {
    config.headers['Cookie'] = `Session-ID=${sessionId}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// レスポンスインターセプターでSession-IDを保存
api.interceptors.response.use(async (response) => {
  const setCookieHeader = response.headers['set-cookie'];
  if (setCookieHeader) {
    const sessionId = setCookieHeader.find(cookie => cookie.startsWith('Session-ID='));
    if (sessionId) {
      const extractedSessionId = sessionId.split(';')[0].split('=')[1];
      await AsyncStorage.setItem('sessionId', extractedSessionId);
    }
  }
  return response;
}, (error) => {
  return Promise.reject(error);
});

export default api;
