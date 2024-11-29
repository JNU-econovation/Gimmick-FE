import styled from 'styled-components';
import React from 'react';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import Header from '../components/common/Header';
import CountdownTimer from '../components/timer/CountdownTimer';
import CountdownFolder from '../components/timer/CountdownFolder';

const MainPage = () => {
  const timers = Array(3).fill(null);
  const folders = Array(3).fill(null);

  return (
    <MainContainer>
      <HeaderWrapper>
        <Header type="main" />
      </HeaderWrapper>
      <CountdownTimerWrapper>
        {timers.map((_, index) => (
          <CountdownTimer key={`timer-${index}`} />
        ))}
        {folders.map((_, index) => (
          <CountdownFolder key={`folder-${index}`} />
        ))}
      </CountdownTimerWrapper>
    </MainContainer>
  );
};

export default MainPage;

const MainContainer = styled.View`
  flex-direction: column;
  height: 100%;
`;

const HeaderWrapper = styled.View`
  flex: 1;
`;

const CountdownTimerWrapper = styled.View`
  flex: 10;
  flex-direction: row;
  gap: ${scale(22)}px;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const CreateCountdownTimerBtn = styled.View`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  border: 1px dashed #3562d6;
  justify-content: center;
  align-items: center;
`;
