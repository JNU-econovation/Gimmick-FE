import React from 'react';
import styled from 'styled-components/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {IOS_CLIENT_ID, WEB_CLIENT_ID} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomText from '../CustomText';

const GoogleLoginButton = () => {
  const navigation = useNavigation();
  const handleGoogleLogin = async () => {
    console.log('Google login start');
    console.log('Config.IOS_CLIENT_ID', IOS_CLIENT_ID);
    console.log('Config.WEB_CLIENT_ID', WEB_CLIENT_ID);

    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.file'],
      iosClientId: IOS_CLIENT_ID,
      webClientId: WEB_CLIENT_ID,
      offlineAccess: true,
    });

    try {
      await GoogleSignin.hasPlayServices();
      const result = await GoogleSignin.signIn();
      console.log('Google login successful', result);
      await AsyncStorage.setItem('isFirstUser', 'false');
      navigation.goBack();
    } catch (error) {
      console.error('Google login error', error);
    }
  };

  return (
    <ButtonContainer onPress={handleGoogleLogin} activeOpacity={1}>
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
  border-radius: ${scale(10)}px;
  padding: ${scale(10)}px ${scale(12)}px;
  elevation: ${scale(2)}px;
  shadow-color: #000000;
  shadow-offset: ${scale(0)}px ${scale(2)}px;
  shadow-opacity: 0.05;
  shadow-radius: ${scale(3.84)}px;
`;

const ContentContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const GoogleIcon = styled.Image`
  width: ${scale(17)}px;
  height: ${scale(17)}px;
`;

const ButtonText = styled(CustomText)`
  width: ${scale(200)}px;
  text-align: center;
  color: #000000;
  font-size: ${scale(12.5)}px;
`;

export default GoogleLoginButton;
