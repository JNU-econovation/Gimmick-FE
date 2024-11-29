import {useState} from 'react';
import {scale} from 'react-native-size-matters';
import styled from 'styled-components/native';

const Memo = ({style}) => {
  const [text, setText] = useState('');

  const onChangeText = inputText => {
    setText(inputText);
  };

  return (
    <Container style={style}>
      <Input
        value={text}
        onChangeText={onChangeText}
        placeholder="메모 작성"
        textAlign="center"
        multiline={true}
        numberOfLines={3}
        style={{
          textAlign: 'center',
          textAlignVertical: 'center',
        }}
      />
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Input = styled.TextInput`
  padding: ${scale(13)}px;
  min-height: ${scale(38)}px;
  height: auto;
  background-color: #f4f6f8;
  width: 100%;
  border-radius: ${scale(5)}px;
  text-align: center;
  text-align-vertical: center;
  font-size: ${scale(14)}px;
`;

export default Memo;
