import {useState} from 'react';
import {scale} from 'react-native-size-matters';
import CustomText from '../components/CustomText';
import styled from 'styled-components/native';
import ColorPicker from '../components/common/ColorPicker';
import IconPicker from '../components/common/IconPicker';
import InputComponent from '../components/folderCreate/InputComponent';
import Header from '../components/common/Header';
import IconPickerModal from '../components/modal/iconPickerModal/IconPickerModal';
import Header from '../components/common/Header';
import IconPickerModal from '../components/modal/iconPickerModal/IconPickerModal';

const FolderCreatePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('🌮');

  const onPressModalOpen = () => {
    setIsModalVisible(true);
  };

  const handleIconSelect = icon => {
    setSelectedIcon(icon);
    setIsModalVisible(false);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <FolderCreateContainer>
      <Header type="folderCreate" title="폴더 생성" />
      <IconPicker />
      <IconPicker icon={selectedIcon} onPress={onPressModalOpen} />
      <Header type="folderCreate" title="폴더 생성" />
      <IconPicker />
      <IconPicker icon={selectedIcon} onPress={onPressModalOpen} />
      <InsertContainer>
        <FolderCreateText weight="semi-bold">폴더 이름</FolderCreateText>
        <InputWrapper />
        <FolderCreateText weight="semi-bold">폴더 색상</FolderCreateText>
        <ColorPicker />
      </InsertContainer>

      {isModalVisible && (
        <IconPickerModal
          onSelectIcon={handleIconSelect}
          onClose={handleModalClose}
        />
      )}
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
