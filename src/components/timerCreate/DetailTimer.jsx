import React, {useState} from 'react';
import {scale} from 'react-native-size-matters';
import styled from 'styled-components/native';
import CustomText from '../CustomText';
import FireButton from './FireButton';
import CloseButton from '../common/CloseButton';
import {TextInput} from 'react-native';
import {Platform} from 'react-native';

const DetailTimer = ({
  fireData,
  memoData,
  onDelete,
  onFireChange,
  onMemoChange,
}) => {
  const [activeButton, setActiveButton] = useState(fireData);

  const handleFirePress = buttonType => {
    setActiveButton(buttonType);
    onFireChange(buttonType);
  };

  return (
    <DetailTimerContainer>
      <BaseLayout>
        <CloseButtonWrapper>
          <CloseButton onClose={onDelete} />
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
          <MemoTextInput
            value={memoData}
            onChangeText={onMemoChange}
            placeholder="메모 작성"
            placeholderTextColor="#676767"
            textAlign="center"
            multiline={true}
            numberOfLines={3}
            style={{
              textAlign: 'center',
              textAlignVertical: 'center',
            }}
          />
        </MemoWrapper>
      </BaseLayout>
    </DetailTimerContainer>
  );
};

const DetailTimerContainer = styled.View`
  width: 100%;
  padding: ${scale(10)}px 0;
  border-top-width: ${scale(10)}px;
  border-top-color: #f3f5f7;
  border-style: solid;
`;

const BaseLayout = styled.View`
  padding: 0 ${scale(22)}px;
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

const MemoTextInput = styled(TextInput)`
  padding: ${scale(11.5)}px;
  min-height: ${scale(38)}px;
  height: auto;
  width: 100%;
  border-radius: ${scale(5)}px;
  border: 1px solid #d5d7d9;
  text-align: center;
  font-size: ${scale(13)}px;
  font-family: 'Pretendard-Regular';
`;

export default DetailTimer;
