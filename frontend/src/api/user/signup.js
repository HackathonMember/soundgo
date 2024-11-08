import api from '../api';

export const signUp = async (username, password) => {
  try {
    const response = await api.post('/user/signup', {
      username,
      password,
    });
    if (response.status === 201) {
      console.log('ユーザーが正常に作成されました');
      return true;
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.error('リクエストが不正です', error.response.data);
    } else {
      console.error('サインアップ中にエラーが発生しました', error);
    }
    return false;
  }
};
