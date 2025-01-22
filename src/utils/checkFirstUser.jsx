import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkFirstUser = async () => {
  try {
    const isFirstUser = await AsyncStorage.getItem('isFirstUser');
    if (isFirstUser === null) {
      // console.log('첫 사용자입니다.');
      return true;
    }
    // console.log('기존 사용자입니다.');
    return false;
  } catch (error) {
    console.error('AsyncStorage 에러:', error);
    return false;
  }
};
