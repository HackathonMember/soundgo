import api from './api';
import { Platform } from 'react-native';

export const deleteRecording = async (id) => {
  try {
    const response = await api.delete(`/recordings/${id}`);
    if (response.status === 204) {
      console.log('録音が正常に削除されました');
      return true;
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        console.error('認証が必要です');
      } else if (error.response.status === 404) {
        console.error('録音が見つかりません');
      }
    } else {
      console.error('録音削除中にエラーが発生しました', error);
    }
    return false;
  }
};
