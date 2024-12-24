import React from 'react';
import CurrentFire from '../components/detail/CurrentFire';
import CircularProgress from '../components/detail/CircularProgress';
import Header from '../components/common/Header';
import styled from 'styled-components/native';
import CustomText from '../components/CustomText';
import useTimerStore from '../store';

const DetailPage = () => {
  const {time, isRunning, startTimer, stopTimer, resetTimer} = useTimerStore(
    state => state,
  );

  const handleTimerToggle = () => {
    if (isRunning) {
      stopTimer();
    } else {
      startTimer();
    }
  };

  return (
    <DetailContainer>
      <Header type="detail" title="고구마 삶기" />
      <CircularProgress />
      <CurrentFire />
      <TimerDisplay weight="semi-bold">
        {String(time.minutes).padStart(2, '0')}:
        {String(time.seconds).padStart(2, '0')}
      </TimerDisplay>
      <ButtonContainer>
        <Button onPress={resetTimer}>
          <ResetButtonImage
            source={require('../assets/images/detail/reset-icon.png')}
          />
        </Button>
        <Button onPress={handleTimerToggle}>
          <StartButtonImage
            source={
              isRunning
                ? require('../assets/images/detail/stop-icon.png') // 타이머 실행 중이면 stop-icon
                : require('../assets/images/detail/start-icon.png') // 타이머 멈춤이면 start-icon
            }
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
