import React from 'react';
import {scale} from 'react-native-size-matters';
import CustomText from '../CustomText';
import styled from 'styled-components/native';

const CurrentMemo = ({memoData}) => {
  return (
    <CurrentMemoContainer>
      <MemoWrapper memoData={memoData}>
        <MemoText weight="Regular">{memoData}</MemoText>
      </MemoWrapper>
    </CurrentMemoContainer>
  );
};

export default CurrentMemo;

const CurrentMemoContainer = styled.View`
  align-items: center;
  width: 100%;
`;

const MemoText = styled(CustomText)`
  font-size: ${scale(15)}px;
  color: #000;
`;

const MemoWrapper = styled.View`
  width: 100%;
  padding: ${scale(15)}px;
  height: ${scale(120)}px;
  background-color: #F4F6F8;
  border-radius: ${scale(7)}px;
`;
