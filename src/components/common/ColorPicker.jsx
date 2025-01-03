import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {scale} from 'react-native-size-matters';

const colors = ['#FBDF60', '#F6DBB7', '#BAE2FF', '#C8E7A7', '#FFACAC'];

const ColorPicker = ({color, onChangeColor}) => {
  return (
    <Container>
      {colors.map((c, index) => (
        <ColorCircle
          key={index}
          onPress={() => onChangeColor(c)}
          style={{backgroundColor: c}}>
          {color === c && <Icon name="check" size={scale(25)} color="white" />}
        </ColorCircle>
      ))}
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ColorCircle = styled.Pressable`
  width: ${scale(45)}px;
  height: ${scale(45)}px;
  border-radius: ${scale(4)}px;
  justify-content: center;
  align-items: center;
`;

export default ColorPicker;
