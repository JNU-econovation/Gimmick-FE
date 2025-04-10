import useUiStore from '../store/uiStore';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {Alert} from 'react-native';

const useDeleteData = () => {
  const deleteFolder = useUiStore(state => state.deleteFolderData);
  const deleteTimer = useUiStore(state => state.deleteTimerData);
  const resetData = useUiStore(state => state.resetData);
  const navigation = useNavigation();

  const handleDeleteFolder = async id => {
    Alert.alert(
      '폴더 삭제',
      '폴더 내부의 데이터도 모두 삭제됩니다. \n정말 삭제하시겠습니까?',
      [
        {text: '취소', style: 'cancel'},
        {
          text: '삭제',
          onPress: async () => {
            const result = await deleteFolder(id);
            if (result) {
              navigation.replace('Main', {
                animation: 'none',
                deleteMode: true,
              });
              Alert.alert('삭제 완료', '폴더가 성공적으로 삭제되었습니다.');
            } else {
              Alert.alert('삭제 실패', '폴더를 삭제하는 데 실패했습니다.');
            }
          },
        },
      ],
    );
  };

  const handleDeleteTimer = async id => {
    console.log('timer id', id);
    Alert.alert('타이머 삭제', '정말 삭제하시겠습니까?', [
      {text: '취소', style: 'cancel'},
      {
        text: '삭제',
        onPress: async () => {
          const result = await deleteTimer(id);
          if (result) {
            Alert.alert('삭제 완료', '타이머가 성공적으로 삭제되었습니다.');
            navigation.replace('Main', {
              animation: 'none',
              deleteMode: true,
            });
          } else {
            Alert.alert('삭제 실패', '타이머를 삭제하는 데 실패했습니다.');
          }
        },
      },
    ]);
  };

  const handleResetData = () => {
    Alert.alert(
      '앱 초기화',
      '초기화 시 되돌릴 수 없습니다. 정말 초기화하시겠습니까?',
      [
        {text: '취소', style: 'cancel'},
        {
          text: '초기화',
          onPress: async () => {
            resetData();
            navigation.replace('Main', {
              animation: 'none',
            });
            Alert.alert('초기화 완료', '모든 데이터가 초기화되었습니다.');
          },
        },
      ],
    );
  };

  return {handleDeleteFolder, handleDeleteTimer, handleResetData};
};

export default useDeleteData;
