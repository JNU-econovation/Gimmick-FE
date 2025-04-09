import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useUiStore = create(set => ({
  isDeleteMode: false,
  setDeleteMode: value => {
    set({isDeleteMode: value});
  },

  deleteTimerData: async id => {
    try {
      const storedTimers = await AsyncStorage.getItem('timers');
      const updatedTimers = (
        storedTimers ? JSON.parse(storedTimers) : []
      ).filter(parsedTimer => parsedTimer.id !== id);

      await AsyncStorage.setItem('timers', JSON.stringify(updatedTimers));

      return true;
    } catch (error) {
      console.error('타이머 삭제 실패:', error);

      return false;
    }
  },

  deleteFolderData: async id => {
    try {
      const storedTimers = await AsyncStorage.getItem('timers');
      const storedFolders = await AsyncStorage.getItem('folders');

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

      return true;
    } catch (error) {
      console.error('타이머 삭제 실패:', error);
      return false;
    }
  },
}));

export default useUiStore;
