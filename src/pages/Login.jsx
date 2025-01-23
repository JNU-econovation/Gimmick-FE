import {View, Image, BackHandler} from 'react-native';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import GoogleLoginButton from '../components/googleapi/GoogleLoginButton';
import OnDeviceButton from '../components/login/onDeviceButton';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();

  // 로그인 화면에서 스와이프를 통한 뒤로가기 불가능 설정
  useEffect(() => {
    navigation.setOptions({
      headerLeft: null,
      gestureEnabled: false,
    });

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <LoginContainer>
      <LogoImage source={require('../assets/images/login/login-page.png')} />
      <TitleImage source={require('../assets/images/login/logo.png')} />
      <ButtonContainer>
        <GoogleLoginButton />
        <OnDeviceButton />

      </ButtonContainer>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;

const LogoImage = styled.Image`
  width:100%;
  height: 55%;
  margin-bottom: ${scale(10)}px;
`;

const TitleImage = styled.Image`
  width: ${scale(250)}px;
  height: ${scale(35)}px;
  margin-bottom: ${scale(20)}px;
`;

const ButtonContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: ${scale(15)}px;
`;


