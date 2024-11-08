import api from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (username, password) => {
  try {
    const response = await api.post('/user/login', {
      username,
      password,
    });
    if (response.status === 200) {
      const sessionId = response.headers['session-id'];
      if (sessionId) {
        await AsyncStorage.setItem('sessionId', sessionId);
      }
      console.log('ログイン成功');
      return response.data; // ユーザー情報
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('認証失敗');
    } else {
      console.error('ログイン中にエラーが発生しました', error);
    }
    return null;
  }
};