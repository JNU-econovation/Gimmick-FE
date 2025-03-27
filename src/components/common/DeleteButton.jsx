import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {scale} from 'react-native-size-matters';
import {TouchableWithoutFeedback} from 'react-native';
import {Alert} from 'react-native';

const onClick = (onDelete, id, isFolder) => {
  console.log('isFolder', isFolder);
  if (isFolder) {
    Alert.alert(
      '폴더 삭제',
      '폴더 내부의 데이터도 모두 삭제됩니다. \n정말 삭제하시겠습니까?',
      [
        {text: '취소', style: 'cancel'},
        {text: '삭제', onPress: () => onDelete(id)},
      ],
    );
  } else {
    Alert.alert('타이머 삭제', '정말 삭제하시겠습니까?', [
      {text: '취소', style: 'cancel'},
      {text: '삭제', onPress: () => onDelete(id)},
    ]);
  }
};

const DeleteButton = ({style, onDelete, id, isFolder}) => {
  return (
    <Container style={style}>
      <TouchableWithoutFeedback onPress={() => onClick(onDelete, id, isFolder)}>
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
