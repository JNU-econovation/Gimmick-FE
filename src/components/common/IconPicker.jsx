import {useState} from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

const IconPicker = () => {
  const [icon, setIcon] = useState('🌮'); // 기본 이모티콘 설정

  // 이모티콘 선택 함수
  const selectIcon = icon => {
    setIcon('🌮');
  };

  return (
    <Container>
      {/* 선택된 이모티콘을 표시 */}
      <IconContainer>
        <IconText>{icon}</IconText>
        <PlusIcon>
          <PlusText>
            <Icon name="plus" color="white" size={scale(9)} />
          </PlusText>
        </PlusIcon>
      </IconContainer>
    </Container>
  );
};

const Container = styled.View`
  align-items: center;
`;

const IconContainer = styled.View`
  position: relative;
  width: ${scale(90)}px;
  height: ${scale(90)}px;
  justify-content: center;
  align-items: center;
  background-color: #efefef;
  border-radius: ${scale(50)}px;
`;

const IconText = styled.Text`
  font-size: ${scale(60)}px;
`;

const PlusIcon = styled.View`
  position: absolute;
  bottom: ${scale(5)}px;
  right: ${scale(5)}px;
  width: ${scale(20)}px;
  height: ${scale(20)}px;
  border-radius: ${scale(20)}px;
  background-color: #868686;
  justify-content: center;
  align-items: center;
`;

const PlusText = styled.View`
  justify-content: center;
  align-items: center;
`;

export default IconPicker;
