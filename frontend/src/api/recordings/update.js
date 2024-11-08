import api from './api';
import { Platform } from 'react-native';

export const updateRecording = async (id, audioUri, dateRecorded, latitude, longitude) => {
  try {
    const formData = new FormData();
    if (audioUri) {
      formData.append('audio', {
        uri: audioUri,
        name: 'recording.mp3',
        type: 'audio/mpeg',
      });
    }
    if (dateRecorded) formData.append('date_recorded', dateRecorded);
    if (latitude !== undefined) formData.append('latitude', latitude);
    if (longitude !== undefined) formData.append('longitude', longitude);

    const response = await api.put(`/recordings/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      console.log('録音が正常に更新されました');
      return response.data; // RecordingMetadata
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        console.error('認証が必要です');
      } else if (error.response.status === 404) {
        console.error('録音が見つかりません');
      }
    } else {
      console.error('録音更新中にエラーが発生しました', error);
    }
    return null;
  }
};
