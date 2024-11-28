import {useState} from 'react';
import {scale} from 'react-native-size-matters';
import CustomText from '../components/CustomText';
import styled from 'styled-components/native';
import ColorPicker from '../components/common/ColorPicker';
import InputComponent from '../components/folderCreate/InputComponent';
import IconPicker from '../components/common/IconPicker';

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
        <FolderCreateText>폴더 이름</FolderCreateText>
        <InputWrapper />
        <FolderCreateText weight="black">폴더 색상</FolderCreateText>
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

const InsertContainer = styled.View`
  margin: ${scale(20)}px 0;
`;

const InputWrapper = styled(InputComponent)`
  margin: ${scale(20)}px 0;
`;

const FolderCreateText = styled(CustomText)`
  margin: ${scale(13)}px 0;
  font-size: ${scale(16)}px;
`;

export default FolderCreatePage;
