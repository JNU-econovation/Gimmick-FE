import {useState} from 'react';
import {scale} from 'react-native-size-matters';
import CustomText from '../components/CustomText';
import styled from 'styled-components/native';
import ColorPicker from '../components/common/ColorPicker';
import IconPicker from '../components/common/IconPicker';
import InputComponent from '../components/folderCreate/InputComponent';

const FolderCreatePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);

  const onPressModalOpen = () => {
    setIsModalVisible(true);
  };

  const onPressModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <FolderCreateContainer>
      <IconPicker />
      <InsertContainer>
        <FolderCreateText weight="semi-bold">폴더 이름</FolderCreateText>
        <InputWrapper />
        <FolderCreateText weight="semi-bold">폴더 색상</FolderCreateText>
        <ColorPicker />
      </InsertContainer>
    </FolderCreateContainer>
  );
};

const FolderCreateContainer = styled.View`
  width: 100%;
  height: 100%;

  position: relative;
`;

const InsertContainer = styled.View``;

const InputWrapper = styled(InputComponent)``;

const FolderCreateText = styled(CustomText)`
  margin: ${scale(20)}px 0 ${scale(10)}px 0;
  font-size: ${scale(16)}px;
`;

export default FolderCreatePage;
