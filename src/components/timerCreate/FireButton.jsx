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
  width: ${scale(52)}px;
  height: ${scale(30)}px;
  border-radius: ${scale(7)}px;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.isActive ? '#8A8A8A' : '#ffffff')};
  border: ${scale(1)}px;
  border-color: ${props => (props.isActive ? '#8A8A8A' : '#dfe1e2')};
`;

const ButtonText = styled(CustomText)`
  color: ${({isActive}) => (isActive ? '#FFFFFF' : '#6d6d6d')};
  font-size: ${scale(14)}px;
`;

export default FireButton;
