import React from 'react';
import CurrentFire from '../components/detail/CurrentFire';
import CircularProgress from '../components/detail/CircularProgress';
import Header from '../components/common/Header';
import styled from 'styled-components/native';
import CustomText from '../components/CustomText';

const DetailPage = () => {
  return (
    <DetailContainer>
      <Header type="detail" />
      <CircularProgress />
      <CurrentFire />
      <TimerDisplay weight="semi-bold">05:40</TimerDisplay>
      <ButtonContainer>
        <Button>
          <ResetButtonImage
            source={require('../assets/images/detail/reset-icon.png')}
          />
        </Button>
        <Button>
          <StartButtonImage
            source={require('../assets/images/detail/start-icon.png')}
          />
        </Button>
      </ButtonContainer>
    </DetailContainer>
  );
};

export default DetailPage;

const DetailContainer = styled.View``;

const TimerDisplay = styled(CustomText)`
  font-size: 56px;
  color: #6c7386;
  text-align: center;
  margin-bottom: 16px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 24px;
`;

const Button = styled.TouchableOpacity`
  padding: 12px 40px;
  background-color: #ffc15b;
  border-radius: 12px;
  margin: 0 10px;
  flex-direction: row;
  align-items: center;
`;

const ResetButtonImage = styled.Image`
  width: 20px;
  height: 24px;
`;

const StartButtonImage = styled.Image`
  width: 14px;
  height: 17px;
`;
