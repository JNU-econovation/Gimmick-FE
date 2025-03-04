import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {scale} from 'react-native-size-matters';
import {TouchableWithoutFeedback} from 'react-native';

const FolderDeleteButton = ({style, onDelete}) => {
  return (
    <Container style={style}>
      <TouchableWithoutFeedback onPress={onDelete}>
        <ButtonWrapper>
          <Icon name="close" size={scale(20)} color="white" />
        </ButtonWrapper>
      </TouchableWithoutFeedback>
    </Container>
  );
};

const Container = styled.View``;

const ButtonWrapper = styled.View`
  z-index: 1;
  justify-content: center;
  align-items: flex-start;
  border-radius: ${scale(30)}px;
  position: absolute;
  top: ${scale(-5)}px;
  right: ${scale(-5)}px;
  background-color: red;
  width: ${scale(20)}px;
  height: ${scale(20)}px;
`;

export default FolderDeleteButton;
