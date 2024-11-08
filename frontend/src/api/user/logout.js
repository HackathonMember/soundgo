import api from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const logout = async () => {
  try {
    const response = await api.post('/user/logout');
    if (response.status === 200) {
      await AsyncStorage.removeItem('sessionId');
      console.log(response.data.message); // "ログアウトしました"
      return true;
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('認証が必要です');
    } else {
      console.error('ログアウト中にエラーが発生しました', error);
    }
    return false;
  }
};
