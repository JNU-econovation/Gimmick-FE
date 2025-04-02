import styled from 'styled-components/native';
import {Image, TouchableWithoutFeedback} from 'react-native';
import {scale} from 'react-native-size-matters';
import CustomText from '../../CustomText';

const CreateButton = ({text, icon, style, onPress}) => {
  return (
    <Container style={style}>
      <TouchableWithoutFeedback onPress={onPress}>
        <ButtonWrapper>
          <ButtonIcon>
            <IconImage source={icon} />
          </ButtonIcon>
          <ButtonText>{text}</ButtonText>
        </ButtonWrapper>
      </TouchableWithoutFeedback>
    </Container>
  );
};

const Container = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${scale(60)}px;
`;

const ButtonWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: ${scale(70)}px;
  width: 100%;
  height: 100%;
`;

const ButtonIcon = styled.View`
  justify-content: center;
  align-items: center;
  width: ${scale(40)}px;
  height: ${scale(40)}px;
  border-radius: ${scale(10)}px;
  background-color: #f4f6f8;
`;

const IconImage = styled.Image`
  width: ${scale(20)}px;
  height: ${scale(20)}px;
`;

const ButtonText = styled(CustomText)`
  margin: 0 0 0 ${scale(10)}px;
  font-size: ${scale(15)}px;
  text-align: center;
`;

export default CreateButton;
