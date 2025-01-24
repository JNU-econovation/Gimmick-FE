import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkFirstUser = async () => {
  try {
    const isFirstUser = await AsyncStorage.getItem('isFirstUser');
    if (isFirstUser === null) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('AsyncStorage 에러:', error);
    return false;
  }
};

export const markAsNotFirstUser = async () => {
  try {
    await AsyncStorage.setItem('isFirstUser', 'false');
  } catch (error) {
    console.error('AsyncStorage 에러:', error);
  }
};
