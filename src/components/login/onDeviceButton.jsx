import React, {useState} from 'react';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import CustomText from '../CustomText';
import { markAsNotFirstUser } from '../../utils/checkFirstUser';
import { setLocalUser } from '../../utils/CheckUserType';
import initialMockData from '../../data/initialMockData';
import AppDataStorage from '../../utils/AppDataStorage';

const OnDeviceButton = () => {
  const navigation = useNavigation();
  // const [timers, setTimers] = useState([]);

  const handleOnDeviceLogin = async () => {
    await markAsNotFirstUser();
    await setLocalUser();



    // AppDataStorage.save('timers', initialMockData);
    // setTimers(initialMockData);
    navigation.goBack();
  };

  return (
    <ButtonContainer onPress={handleOnDeviceLogin} activeOpacity={1}>
      <ContentContainer>
        <GuestIcon
          source={require('../../assets/images/login/guest.png')}
        />
        <ButtonText weight="regular">게스트 모드로 로그인</ButtonText>
      </ContentContainer>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.TouchableOpacity`
  background-color: #F0F0F0;
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

const GuestIcon = styled.Image`
  width: ${scale(17)}px;
  height: ${scale(17)}px;
`;

const ButtonText = styled(CustomText)`
  width: ${scale(200)}px;
  text-align: center;
  color: #000000;
  font-size: ${scale(12.5)}px;
`;

export default OnDeviceButton;
