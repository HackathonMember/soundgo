import api from './api';
import { Platform } from 'react-native';

export const createRecording = async (audioUri, dateRecorded, latitude, longitude) => {
  try {
    const formData = new FormData();
    formData.append('audio', {
      uri: audioUri,
      name: 'recording.mp3', // 録音ファイルの名前と拡張子を適切に設定
      type: 'audio/mpeg', // MIMEタイプを適切に設定
    });
    formData.append('date_recorded', dateRecorded);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);

    const response = await api.post('/recordings', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 201) {
      console.log('録音が正常に作成されました');
      return response.data; // RecordingMetadata
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('認証が必要です');
    } else {
      console.error('録音作成中にエラーが発生しました', error);
    }
    return null;
  }
};
