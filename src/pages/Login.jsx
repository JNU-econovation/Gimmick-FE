import {View} from 'react-native';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import GoogleLoginButton from '../components/googleapi/GoogleLoginButton';

const Login = () => {
  return (
    <LoginContainer>
      <LoginText>로그인 페이지</LoginText>
      <GoogleLoginButton />
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
`;

const LoginText = styled.Text`
  font-size: ${scale(20)}px;
  font-weight: bold;
`;
