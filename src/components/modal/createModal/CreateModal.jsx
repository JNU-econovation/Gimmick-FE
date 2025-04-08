import {useState} from 'react';
import React, {useCallback} from 'react';

import {Pressable} from 'react-native';
import {scale} from 'react-native-size-matters';
import CustomText from '../../CustomText';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import folderIcon from '../../../assets/images/NewCreateModal/folderIcon.png';
import timerIcon from '../../../assets/images/NewCreateModal/timerIcon.png';
import CreateButton from './CreateButton';

import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';

const CreateModal = ({bottomSheetRef, folder}) => {
  const navigation = useNavigation();

  const handleCreateTimer = () => {
    bottomSheetRef.current?.close();
    navigation.navigate('Create Timer', {folderId: folder ? folder.id : null});
  };

  const handleCreateFolder = () => {
    bottomSheetRef.current?.close();
    navigation.navigate('Create Folder');
  };

  const handleUpdateFolder = () => {
    bottomSheetRef.current?.close();
    navigation.navigate('Folder Update', {folder: folder});
  };

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      backgroundStyle={{backgroundColor: '#FFF'}}
      onDismiss={() => bottomSheetRef.current?.dismiss()}
      backdropComponent={props => (
        <Pressable
          onPress={() => bottomSheetRef.current?.dismiss()}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      )}>
      <BottomSheetContainer>
        <TitletContainer>
          <TitleText weight="semi-bold">새로 만들기</TitleText>
        </TitletContainer>
        <ButtonsContainer>
          {folder ? (
            <>
              <CreateButton
                onPress={handleUpdateFolder}
                text="폴더 수정"
                icon={folderIcon}
              />
              <CreateButton
                onPress={handleCreateTimer}
                text="타이머 생성"
                icon={timerIcon}
              />
            </>
          ) : (
            <>
              <CreateButton
                onPress={handleCreateFolder}
                text="폴더 생성"
                icon={folderIcon}
              />
              <CreateButton
                onPress={handleCreateTimer}
                text="타이머 생성"
                icon={timerIcon}
              />
            </>
          )}
        </ButtonsContainer>
      </BottomSheetContainer>
    </BottomSheetModal>
  );
};

const BottomSheetContainer = styled(BottomSheetView)`
  background-color: white;
`;

const TitletContainer = styled.View`
  justify-content: center;
  margin: ${scale(15)}px 0 ${scale(20)}px 0;
`;

const TitleText = styled(CustomText)`
  margin-left: ${scale(40)}px;
  font-size: ${scale(18)}px;
`;

const ButtonsContainer = styled.View`
  justify-content: center;
  margin: 0 0 ${scale(40)}px;
`;

export default CreateModal;
