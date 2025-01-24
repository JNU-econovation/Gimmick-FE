import React from 'react';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import CustomText from '../CustomText';
import GoogleDriveService from '../../utils/GoogleDriveService';
import { markAsNotFirstUser } from '../../utils/CheckFirstUser';
import { setGoogleUser } from '../../utils/CheckUserType';

const GoogleLoginButton = () => {
  const navigation = useNavigation();
  return (
    <ButtonContainer onPress={async () => {
        const result = await (new GoogleDriveService()).signinExplicitly();
        if(result) {
          await markAsNotFirstUser();
          await setGoogleUser();
          navigation.goBack();
        }
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
