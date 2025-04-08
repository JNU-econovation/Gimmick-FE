import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const useUiStore = create(set => ({
  isDeleteMode: false,

  setDeleteMode: value => {
    set({isDeleteMode: value});
  },

  deleteTimer: id => {
    set(state => ({
      isDeleteMode: false,
      deleteId: id,
    }));
  },

  deleteTimer: async id => {
    try {
      console.log(id);
      const storedTimers = await AsyncStorage.getItem('timers');
      const updatedTimers = (
        storedTimers ? JSON.parse(storedTimers) : []
      ).filter(parsedTimer => parsedTimer.id !== id);

      await AsyncStorage.setItem('timers', JSON.stringify(updatedTimers));
      Alert.alert('삭제 완료', '타이머가 성공적으로 삭제되었습니다.');
    } catch (error) {
      console.error('타이머 삭제 실패:', error);
      Alert.alert('삭제 실패', '타이머를 삭제하는 데 실패했습니다.');
    }
  },

  deleteFolderData: async id => {
    try {
      const storedTimers = await AsyncStorage.getItem('timers');
      const storedFolders = await AsyncStorage.getItem('folders');
      console.log('storedTimers', storedTimers);
      console.log('storedFolders', storedFolders);
      // 폴더 내부 데이터 삭제
      const updatedTimers = (
        storedTimers ? JSON.parse(storedTimers) : []
      ).filter(parsedTimer => parsedTimer.detailTimerData.folderId !== id);

      // 폴더 삭제
      const updatedFolders = (
        storedFolders ? JSON.parse(storedFolders) : []
      ).filter(parsedFolder => parsedFolder.id !== id);

      await AsyncStorage.setItem('timers', JSON.stringify(updatedTimers));
      await AsyncStorage.setItem('folders', JSON.stringify(updatedFolders));
      Alert.alert('삭제 완료', '타이머가 성공적으로 삭제되었습니다.');
    } catch (error) {
      console.error('타이머 삭제 실패:', error);
      Alert.alert('삭제 실패', '타이머를 삭제하는 데 실패했습니다.');
    }
  },
}));

export default useUiStore;
