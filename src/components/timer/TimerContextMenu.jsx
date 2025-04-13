import {Platform} from 'react-native';
import ContextMenu from 'react-native-context-menu-view';
import {ContextMenuView} from 'react-native-ios-context-menu';
import useUiStore from '../../store/uiStore';
import {useNavigation} from '@react-navigation/native';
import useDeleteData from '../../hooks/useDeleteData';
import {scale} from 'react-native-size-matters';

const TimerContextMenu = ({children, timer}) => {
  const navigation = useNavigation();
  const {setDeleteMode} = useUiStore();
  const {handleDeleteTimer} = useDeleteData();

  return (
    <>
      {Platform.OS === 'ios' ? (
        <ContextMenuView
          previewConfig={{
            borderRadius: scale(13),
          }}
          menuConfig={{
            menuTitle: '',
            menuItems: [
              {
                actionKey: '0',
                actionTitle: '타이머 편집',
              },
              {
                actionKey: '1',
                actionTitle: '타이머 삭제',
              },
              {
                actionKey: '2',
                actionTitle: '삭제 모드',
              },
            ],
          }}
          onPressMenuItem={async ({nativeEvent}) => {
            if (nativeEvent.actionKey === '0') {
              if (timer) {
                navigation.navigate('Timer Update', {timer});
              }
            }
            if (nativeEvent.actionKey === '1') {
              await handleDeleteTimer(timer.id);
            }
            if (nativeEvent.actionKey === '2') {
              setDeleteMode(true);
            }
          }}>
          {children}
        </ContextMenuView>
      ) : (
        <ContextMenu
          previewBackgroundColor="transparent"
          disableShadow={true}
          actions={[
            {
              title: '타이머 편집',
            },
            {
              title: '타이머 삭제',
            },
            {
              title: '삭제 모드',
            },
          ]}
          onPress={async ({nativeEvent}) => {
            if (nativeEvent.index === 0) {
              if (timer) {
                navigation.navigate('Timer Update', {timer});
              }
            }
            if (nativeEvent.index === 1) {
              await handleDeleteTimer(timer.id);
            }
            if (nativeEvent.index === 2) {
              setTimeout(() => {
                setDeleteMode(true);
              }, 700);
            }
          }}>
          {children}
        </ContextMenu>
      )}
    </>
  );
};

export default TimerContextMenu;
