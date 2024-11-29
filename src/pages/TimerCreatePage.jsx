import {useState} from 'react';
import {scale} from 'react-native-size-matters';
import CustomText from '../components/CustomText';
import styled from 'styled-components/native';
import ColorPicker from '../components/common/ColorPicker';
import InputComponent from '../components/folderCreate/InputComponent';
import IconPicker from '../components/common/IconPicker';
import DetailTimer from '../components/timerCreate/DetailTimer';
import PlusButton from '../components/timerCreate/PlusButton';
import TotalTimer from '../components/timerCreate/TotalTimer';

const TimerCreatePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);

  const onPressModalOpen = () => {
    setIsModalVisible(true);
  };

  const onPressModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <TimerCreateContainer>
      <IconPicker />
      <InsertContainer>
        <TimerCreateText>타이머 이름</TimerCreateText>
        <InputWrapper />
        <TimerCreateText weight="black">타이머 색상</TimerCreateText>
        <ColorPicker />
      </InsertContainer>
      <DetailTimer />
      <PlusButtonWrapper>
        <PlusButton />
      </PlusButtonWrapper>
      <TotalTimerContainer>
        <TotalTimer />
      </TotalTimerContainer>
    </TimerCreateContainer>
  );
};

const TimerCreateContainer = styled.ScrollView`
  width: 100%;
  height: 100%;

  position: relative;
`;

const InsertContainer = styled.View`
  margin: ${scale(20)}px 0;
`;

const InputWrapper = styled(InputComponent)``;

const TimerCreateText = styled(CustomText)`
  margin: ${scale(13)}px 0;
  font-size: ${scale(16)}px;
`;

const PlusButtonWrapper = styled.View`
  margin: ${scale(20)}px 0;
`;

const TotalTimerContainer = styled.View`
  margin: ${scale(20)}px 0;
`;

export default TimerCreatePage;
