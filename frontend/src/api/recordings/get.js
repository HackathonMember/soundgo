import api from './api';
import { Platform } from 'react-native';

export const getRecording = async (id) => {
  try {
    const response = await api.get(`/recordings/${id}`, {
      responseType: 'blob', // 音声データをバイナリ形式で取得
    });

    if (response.status === 200) {
      // 音声データの処理方法は用途に応じて実装
      console.log('録音の音声データを取得しました');
      return response.data; // バイナリデータ
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        console.error('認証が必要です');
      } else if (error.response.status === 404) {
        console.error('録音が見つかりません');
      }
    } else {
      console.error('録音取得中にエラーが発生しました', error);
    }
    return null;
  }
};
