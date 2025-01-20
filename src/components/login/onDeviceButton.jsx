import React from 'react';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

const OnDeviceButton = () => {
  const navigation = useNavigation();

  const handleOnDeviceLogin = async () => {
    navigation.goBack();
  };

  return (
    <ButtonContainer onPress={handleOnDeviceLogin} activeOpacity={1}>
      <ContentContainer>
        <ButtonText>로그인 없이 사용하기</ButtonText>
      </ContentContainer>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.TouchableOpacity`
  background-color: #FBDF60;
  border-radius: ${scale(24)}px;
  padding: ${scale(12)}px ${scale(16)}px;
  elevation: ${scale(2)}px;
  shadow-color: #000000;
  shadow-offset: ${scale(0)}px ${scale(2)}px;
  shadow-opacity: 0.25;
  shadow-radius: ${scale(3.84)}px;
  width: ${scale(210)}px;
`;

const ContentContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: #000000;
  font-size: ${scale(14)}px;
  font-weight: 500;
`;

export default OnDeviceButton;
