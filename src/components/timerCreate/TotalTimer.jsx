import styled from 'styled-components/native';
import CustomText from '../CustomText';
import {scale} from 'react-native-size-matters';

const TotalTimer = () => {
  return (
    <TotalTimerContainer>
      <TotalTimerText>총 소요시간</TotalTimerText>
      <TimerText>00:00</TimerText>
    </TotalTimerContainer>
  );
};

const TotalTimerContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${scale(30)}px;
`;

const TotalTimerText = styled(CustomText)`
  font-size: ${scale(15)}px;
`;

const TimerText = styled(CustomText)`
  font-size: ${scale(33)}px;
`;

export default TotalTimer;
