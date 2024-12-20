import React, {useState} from 'react';
import {scale} from 'react-native-size-matters';
import styled from 'styled-components/native';
import CustomText from '../CustomText';
import FireButton from './FireButton';
import CloseButton from '../common/CloseButton';
import Memo from './Memo';

const DetailTimer = () => {
  const [activeButton, setActiveButton] = useState('약불');

  const handleFirePress = buttonType => {
    setActiveButton(buttonType);
  };

  return (
    <DetailTimerContainer>
      <CloseButtonWrapper>
        <CloseButton />
      </CloseButtonWrapper>
      <TimerSetContainer>
        <TimerText weight="bold">12:30</TimerText>
        <FireButtonContainer>
          <FireButton
            isActive={activeButton === '약불'}
            fireText="약불"
            onPress={() => handleFirePress('약불')}
          />
          <FireButton
            isActive={activeButton === '중불'}
            fireText="중불"
            onPress={() => handleFirePress('중불')}
          />
          <FireButton
            isActive={activeButton === '강불'}
            fireText="강불"
            onPress={() => handleFirePress('강불')}
          />
        </FireButtonContainer>
      </TimerSetContainer>
      <MemoWrapper>
        <Memo />
      </MemoWrapper>
    </DetailTimerContainer>
  );
};

const DetailTimerContainer = styled.View`
  width: 100%;
  padding: ${scale(10)}px 0;
  border-bottom-width: 1px;
  border-bottom-color: #e6e6e6;
  border-style: solid;
`;

const CloseButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const TimerSetContainer = styled.View`
  margin-top: ${scale(5)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const FireButtonContainer = styled.View`
  width: 58%;
  flex-direction: row;
  justify-content: space-between;
`;

const TimerText = styled(CustomText)`
  font-size: ${scale(33)}px;
`;

const MemoWrapper = styled.View`
  margin: ${scale(15)}px 0;
`;

export default DetailTimer;
