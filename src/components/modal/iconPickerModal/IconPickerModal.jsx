import {useState} from 'react';
import {Modal} from 'react-native';
import {scale} from 'react-native-size-matters';
import styled from 'styled-components/native';
import IconGrid from './IconGrid';
import CustomText from '../../CustomText';
import CloseButton from '../../common/CloseButton';

const IconPickerModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);

  const onPressModalOpen = () => {
    setIsModalVisible(true);
  };

  const onPressModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal animationType="slide" visible={isModalVisible} transparent={true}>
      <ModalContainer>
        <ModalView>
          <TitletContainer>
            <TitleText>아이콘 선택</TitleText>
            <StyledCloseButton />
          </TitletContainer>
          <IconWrapper>
            <IconGrid />
          </IconWrapper>
        </ModalView>
      </ModalContainer>
    </Modal>
  );
};

const ModalContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-top-left-radius: ${scale(10)}px;
  border-top-right-radius: ${scale(10)}px;
  height: 40%;
  background-color: white;
`;

const ModalView = styled.View`
  border-radius: ${scale(10)}px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const TitletContainer = styled.View`
  justify-content: center;
  width: 100%;
  margin: ${scale(25)}px 0;
`;

const TitleText = styled(CustomText)`
  margin-left: ${scale(40)}px;
  font-size: ${scale(18)}px;
`;

const StyledCloseButton = styled(CloseButton)`
  position: absolute;
  right: ${scale(22)}px;
`;

const IconWrapper = styled.ScrollView``;

export default IconPickerModal;
