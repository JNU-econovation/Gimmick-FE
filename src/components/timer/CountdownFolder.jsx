import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import CustomText from '../CustomText';
import {Platform, Pressable} from 'react-native';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import useDeleteData from '../../hooks/useDeleteData';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  withRepeat,
  withSequence,
  cancelAnimation,
} from 'react-native-reanimated';
import DeleteButton from '../common/DeleteButton';
import useUiStore from '../../store/uiStore';
import ContextMenu from 'react-native-context-menu-view';

const getLighterColor = color => {
  if (color === '#FBDF60') return '#ffea8d';
  if (color === '#F6DBB7') return '#FDECD6';
  if (color === '#BAE2FF') return '#d2ecff';
  if (color === '#C8E7A7') return '#dcf3c4';
  if (color === '#FCC4C4') return '#FFD5D5';
  return '#FCC4C4';
};

const CountdownFolder = ({folder, onFolderClick}) => {
  const navigation = useNavigation();
  const isDeleteMode = useUiStore(state => state.isDeleteMode);
  const setDeleteMode = useUiStore(state => state.setDeleteMode);
  const {handleDeleteFolder} = useDeleteData();
  const icon = folder?.icon || '🍔';
  const folderName = folder?.folderName || '쉬림프 타코';
  const folderColor = folder?.folderColor || '#F4A7A3';
  const lighterColor = getLighterColor(folderColor);
  const rotation = useSharedValue(0);

  useEffect(() => {
    const delay = Math.random() * 250;
    setTimeout(() => {
      if (isDeleteMode) {
        rotation.value = withRepeat(
          withSequence(
            withTiming(-1.5, {
              duration: 200,
              easing: Easing.linear,
            }),
            withTiming(1.5, {
              duration: 200,
              easing: Easing.linear,
            }),
          ),
          -1,
          true,
        );
      } else {
        cancelAnimation(rotation);
        rotation.value = withTiming(0, {
          duration: 150,
          easing: Easing.linear,
        });
      }
    }, delay);
  }, [isDeleteMode]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${rotation.value}deg`}],
    };
  });

  const handlePress = () => {
    if (onFolderClick) {
      setTimeout(() => {
        onFolderClick(folder);
      }, 1000);
    }

    navigation.navigate('FolderPage', {folder});
  };

  return (
    <FolderContainer>
      <DeleteButtonWrapper>
        {isDeleteMode && (
          <DeleteButton
            onDelete={() => deleteFolderData(folder.id)}
            id={folder.id}
            isFolder={true}
          />
        )}
      </DeleteButtonWrapper>
      <Pressable
        onPress={handlePress}
        onLongPress={() => {}}
        delayLongPress={200}>
        <ContextMenu
          previewBackgroundColor="transparent"
          disableShadow={true}
          actions={[
            {
              title: '폴더 편집',
            },
            {
              title: '폴더 삭제',
            },
            {
              title: '식제 모드',
            },
          ]}
          onPress={async ({nativeEvent}) => {
            if (nativeEvent.index === 0) {
              navigation.navigate('Folder Update', {folder});
            }
            if (nativeEvent.index === 1) {
              await handleDeleteFolder(folder.id);
            }
            if (nativeEvent.index === 2) {
              setTimeout(() => {
                setDeleteMode(true);
              }, 605.5);
            }
          }}>
          <Animated.View style={animatedStyle}>
            <CountdownFolderContainer>
              <TopLeftSectionView color={lighterColor} />
              <TopRightSectionView color={lighterColor} />
              <BottomSectionWrapper color={folderColor}>
                <IconboxWrapper>
                  <IconView>{icon}</IconView>
                </IconboxWrapper>
                <FoodTitleText weight="medium">{folderName}</FoodTitleText>
              </BottomSectionWrapper>
            </CountdownFolderContainer>
          </Animated.View>
        </ContextMenu>
      </Pressable>
    </FolderContainer>
  );
};

export default CountdownFolder;

const FolderContainer = styled.View``;
const CountdownFolderContainer = styled.View`
  width: ${scale(140)}px;
  height: ${scale(134.7)}px;
`;
const DeleteButtonWrapper = styled.View`
  top: ${scale(15)}px;
`;

const TopLeftSectionView = styled.View`
  position: absolute;
  width: ${scale(70)}px;
  height: ${scale(134.7)}px;
  background-color: ${props => props.color || '#FCC4C4'};
  border-radius: ${scale(15)}px;
  bottom: 0;
  margin-left: ${scale(10)}px;
`;

const TopRightSectionView = styled.View`
  position: absolute;
  width: ${scale(119)}px;
  height: ${scale(126.5)}px;
  background-color: ${props => props.color || '#FCC4C4'};
  border-radius: ${scale(15)}px;
  bottom: 0;
  margin-left: ${scale(12)}px;
`;

const BottomSectionWrapper = styled.View`
  position: absolute;
  padding: ${scale(15)}px;
  width: ${scale(140)}px;
  height: ${scale(113)}px;
  background-color: ${props => props.color || '#F4A7A3'};
  border-radius: ${scale(15)}px;
  bottom: 0;
`;

const IconboxWrapper = styled.View`
  width: ${scale(40)}px;
  height: ${scale(38.5)}px;
  border-radius: ${scale(13)}px;
  background-color: rgba(255, 255, 255, 0.7);
  justify-content: center;
  align-items: center;
`;

const IconView = styled(CustomText)`
  font-size: ${Platform.select({ios: scale(24), android: scale(21)})}px;
`;

const FoodTitleText = styled(CustomText).attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  padding-top: ${scale(15)}px;
  opacity: 0.6;
  font-size: ${scale(16)}px;
  width: 100%;
  text-align: left;
`;
