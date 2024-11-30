import {scale} from 'react-native-size-matters';
import styled from 'styled-components/native';
import CustomText from '../CustomText';

const FireButton = ({style, isActive, fireText, onPress}) => {
  return (
    <ButtonContainer style={style}>
      <Button onPress={onPress} isActive={isActive}>
        <ButtonText weight="semi-bold" isActive={isActive}>
          {fireText}
        </ButtonText>
      </Button>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const Button = styled.TouchableOpacity`
  width: ${scale(55)}px;
  height: ${scale(32)}px;
  border-radius: ${scale(12)}px;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.isActive ? '#585858' : '#f4f6f8')};
`;

const ButtonText = styled(CustomText)`
  color: ${({isActive}) => (isActive ? '#ffffff' : '#b5b5b5')};
  font-size: ${scale(14)}px;
`;

export default FireButton;
