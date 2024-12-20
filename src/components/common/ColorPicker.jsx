import {useState} from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {scale} from 'react-native-size-matters';

const colors = ['#d4e9c1', '#d3d3f8', '#c5e5fa', '#f7e485', '#f4b5b5'];

const ColorPicker = () => {
  const [selectedColor, setSelectedColor] = useState('#f7e485');

  return (
    <Container>
      {colors.map((color, index) => (
        <ColorCircle
          key={index}
          onPress={() => setSelectedColor(color)}
          style={{backgroundColor: color}}>
          {selectedColor === color && (
            <Icon name="check" size={scale(15)} color="white" />
          )}
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
