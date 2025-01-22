import {useState} from 'react';
import {Modal} from 'react-native';
import {scale} from 'react-native-size-matters';
import CustomModal from '../CustomModal';
import CustomText from '../../CustomText';
import styled from 'styled-components/native';
import CloseButton from '../../common/CloseButton';
import CreateButton from './CreateButton';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import folderIcon from '../../../assets/images/NewCreateModal/folderIcon.png';
import timerIcon from '../../../assets/images/NewCreateModal/timerIcon.png';

const NewCreateModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const navigation = useNavigation();

  const onPressModalClose = () => {
    setIsModalVisible(false);
    navigation.goBack();
  };

  const handleCreateTimer = () => {
    setIsModalVisible(false);
    navigation.goBack();
    navigation.navigate('Create Timer');
  };

  const handleCreateFolder = () => {
    Alert.alert('서비스 준비중', '폴더 기능은 서비스 준비 중입니다.');
    // setIsModalVisible(false);
    // navigation.goBack();
    // navigation.navigate('Create Folder');
  };

  return (
    <CustomModal visible={isModalVisible} onClose={onPressModalClose}>
      <ModalContainer>
        <TitletContainer>
          <TitleText weight="semi-bold">새로 만들기</TitleText>
          <StyledCloseButton onClose={onPressModalClose} />
        </TitletContainer>
        <ButtonsContainer>
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
        </ButtonsContainer>
      </ModalContainer>
    </CustomModal>
  );
};

const ModalContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-top-left-radius: ${scale(10)}px;
  border-top-right-radius: ${scale(10)}px;
  background-color: white;
`;

const TitletContainer = styled.View`
  justify-content: center;
  margin: ${scale(25)}px 0 ${scale(15)}px 0;
`;

const TitleText = styled(CustomText)`
  margin-left: ${scale(40)}px;
  font-size: ${scale(18)}px;
`;

const StyledCloseButton = styled(CloseButton)`
  position: absolute;
  right: ${scale(22)}px;
`;

const ButtonsContainer = styled.View`
  justify-content: center;
  margin: 0 0 ${scale(40)}px;
`;

export default NewCreateModal;
