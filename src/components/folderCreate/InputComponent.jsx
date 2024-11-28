import {useState} from 'react';
import {scale} from 'react-native-size-matters';
import styled from 'styled-components/native';

const InputComponent = ({style}) => {
  const [text, setText] = useState('');

  const onChangeText = inputText => {
    setText(inputText);
  };

  return (
    <Container style={style}>
      <Input value={text} onChangeText={onChangeText} />
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Input = styled.TextInput`
  height: ${scale(38)}px;
  margin: -${scale(18)}px 0;
  background-color: #f4f6f8;
  width: 100%;
  border-radius: ${scale(5)}px;
  text-align: left;
  font-size: ${scale(12)}px;
`;

export default InputComponent;
