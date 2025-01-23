import React from 'react';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import GoogleDriveService from './GoogleDriveService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GoogleLoginButton = () => {
  const navigation = useNavigation();
  return (
    <ButtonContainer onPress={async () => {
        await (new GoogleDriveService()).signinExplicitly();
        await AsyncStorage.setItem('isFirstUser', 'false');
        navigation.goBack();
    }} activeOpacity={1}>
      <ContentContainer>
        <GoogleIcon
          source={require('../../assets/images/login/googleLogo.png')}
        />
        <ButtonText>Google 계정으로 로그인</ButtonText>
      </ContentContainer>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.TouchableOpacity`
  background-color: #ffffff;
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

const GoogleIcon = styled.Image`
  width: ${scale(18)}px;
  height: ${scale(18)}px;
  margin-right: ${scale(12)}px;
`;

const ButtonText = styled.Text`
  color: #000000;
  font-size: ${scale(14)}px;
  font-weight: 500;
`;

export default GoogleLoginButton;
