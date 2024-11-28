import {useState} from 'react';
import {Modal} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CloseButton from '../../common/CloseButton';
import CreateButton from './CreateButton';

const NewCreateModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);

  return (
    <Modal animationType="slide" visible={isModalVisible} transparent={true}>
      <ModalView>
        <Title>
          <StyledCloseButton />
          <TitleText>새로 만들기</TitleText>
        </Title>
        <Buttons>
          <CreateButton
            text="폴더"
            icon={<Icon name="folder" size={25} color="gray" />}
          />
          <CreateButton
            text="타이머"
            icon={<Icon name="timer" size={25} color="gray" />}
          />
        </Buttons>
      </ModalView>
    </Modal>
  );
};

const ModalView = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
`;

const Title = styled.View`
  align-items: center;
  justify-content: center;
  border-bottom-width: 1px;
  border-color: gray;
  padding: 15px 0;
`;

const TitleText = styled.Text`
  text-align: center;
  font-size: 18px;
  font-weight: 500;
`;

const StyledCloseButton = styled(CloseButton)`
  position: absolute;
  left: -10px;
`;

const Buttons = styled.View`
  justify-content: center;
  flex-direction: row;
  margin: 20px 0 40px;
  gap: 20px;
`;

export default NewCreateModal;
