import styled from 'styled-components/native';

const CreateButton = ({text, icon, style}) => {
  const onPress = () => {
    // 생성 함수 구현
  };

  return (
    <Container style={style}>
      <Button onPress={onPress}>
        {icon}
        <ButtonText>{text}</ButtonText>
      </Button>
    </Container>
  );
};

const Container = styled.View`
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 100px;
  border-radius: 10px;
  border-width: 1px;
  border-color: gray;
`;

const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ButtonText = styled.Text`
  margin-top: 5px;
  font-size: 15px;
  text-align: center;
`;

export default CreateButton;
