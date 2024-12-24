import {useState} from 'react';
import {scale} from 'react-native-size-matters';
import styled from 'styled-components/native';

const InputComponent = ({style, value, onChangeText}) => {
  return (
    <Container style={style}>
      <Input value={value} onChangeText={onChangeText} />
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
  background-color: #f4f6f8;
  width: 100%;
  border-radius: ${scale(5)}px;
  text-align: left;
  font-size: ${scale(12)}px;
`;

export default InputComponent;
