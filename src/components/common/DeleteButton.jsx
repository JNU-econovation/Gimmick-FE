import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {scale} from 'react-native-size-matters';
import {TouchableWithoutFeedback} from 'react-native';
import useDeleteData from '../../hooks/useDeleteData';

const DeleteButton = ({style, id, isFolder}) => {
  const {handleDeleteFolder, handleDeleteTimer} = useDeleteData();

  const onClick = async (id, isFolder) => {
    console.log('isFolder', isFolder);
    if (isFolder) {
      await handleDeleteFolder(id);
    } else {
      await handleDeleteTimer(id);
    }
  };

  return (
    <Container style={style}>
      <TouchableWithoutFeedback onPress={() => onClick(id, isFolder)}>
        <ButtonWrapper>
          <Icon name="close" size={scale(20)} color="black" />
        </ButtonWrapper>
      </TouchableWithoutFeedback>
    </Container>
  );
};

const Container = styled.View``;

const ButtonWrapper = styled.View`
  z-index: 1;
  justify-content: center;
  align-items: center;
  border-radius: ${scale(30)}px;
  position: absolute;
  top: ${scale(-5)}px;
  right: ${scale(-5)}px;
  background-color: #d9d9d9;
  width: ${scale(25)}px;
  height: ${scale(25)}px;
`;

export default DeleteButton;
