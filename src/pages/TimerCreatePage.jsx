import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {scale} from 'react-native-size-matters';
import CustomText from '../components/CustomText';
import styled from 'styled-components/native';
import ColorPicker from '../components/common/ColorPicker';
import InputComponent from '../components/folderCreate/InputComponent';
import IconPicker from '../components/common/IconPicker';
import DetailTimer from '../components/timerCreate/DetailTimer';
import PlusButton from '../components/timerCreate/PlusButton';
import TotalTimer from '../components/timerCreate/TotalTimer';
import Header from '../components/common/Header';
import IconPickerModal from '../components/modal/iconPickerModal/IconPickerModal';
import Header from '../components/common/Header';
import IconPickerModal from '../components/modal/iconPickerModal/IconPickerModal';

const TimerCreatePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('🌮');
  const [timerName, setTimerName] = useState('');
  const [timerColor, setTimerColor] = useState('#f7e485');
  const [fireData, setFireData] = useState('약불');
  const [memoData, setMemoData] = useState('');

  const onPressModalOpen = () => {
    setIsModalVisible(true);
  };

  const handleIconSelect = icon => {
    setSelectedIcon(icon);
    setIsModalVisible(false);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleFireChange = newFireData => {
    setFireData(newFireData);
  };

  const handleMemoChange = newMemoData => {
    setMemoData(newMemoData);
  };

  console.log(timerName);
  console.log(timerColor);
  console.log(selectedIcon);
  console.log(fireData);
  console.log(memoData);

  return (
    <TimerCreateContainer>
      <Header type="timerCreate" title="타이머 생성" />
      <IconPicker />
      <IconPicker icon={selectedIcon} onPress={onPressModalOpen} />
      <Header type="timerCreate" title="타이머 생성" />
      <IconPicker />
      <IconPicker icon={selectedIcon} onPress={onPressModalOpen} />
      <InsertContainer>
        <TimerCreateText weight="semi-bold">타이머 이름</TimerCreateText>
        <InputWrapper value={timerName} onChangeText={setTimerName} />
        <TimerCreateText weight="semi-bold">타이머 색상</TimerCreateText>
        <ColorPicker color={timerColor} onChangeColor={setTimerColor} />
      </InsertContainer>
      <DetailTimer
        fireData={fireData}
        memoData={memoData}
        onFireChange={handleFireChange}
        onMemoChange={handleMemoChange}
      />

      <PlusButtonWrapper>
        <PlusButton />
      </PlusButtonWrapper>
      <TotalTimerContainer>
        <TotalTimer />
      </TotalTimerContainer>

      {isModalVisible && (
        <IconPickerModal
          onSelectIcon={handleIconSelect}
          onClose={handleModalClose}
        />
      )}
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
  margin: ${scale(20)}px 0 ${scale(10)}px 0;
  font-size: ${scale(16)}px;
`;

const PlusButtonWrapper = styled.View`
  margin: ${scale(20)}px 0;
`;

const TotalTimerContainer = styled.View`
  margin: ${scale(20)}px 0;
`;

export default TimerCreatePage;
