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

const TimerCreatePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('🌮');
  const [timerName, setTimerName] = useState('');
  const [id, setId] = useState(0);
  const [timerColor, setTimerColor] = useState('#f7e485');
  const [detailTimers, setDetailTimers] = useState([
    {id: 0, fireData: '약불', memoData: ''},
  ]);

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

  const addDetailTimer = id => {
    setId(id + 1);
    setDetailTimers([
      ...detailTimers,
      {id: id + 1, fireData: '약불', memoData: ''},
    ]);
  };

  return (
    <TimerCreateContainer
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}>
      <Header type="timerCreate" title="타이머 생성" />

      <IconPicker icon={selectedIcon} onPress={onPressModalOpen} />
      <InsertContainer>
        <TimerCreateText weight="semi-bold">타이머 이름</TimerCreateText>
        <InputWrapper value={timerName} onChangeText={setTimerName} />
        <TimerCreateText weight="semi-bold">타이머 색상</TimerCreateText>
        <ColorPicker color={timerColor} onChangeColor={setTimerColor} />
      </InsertContainer>

      {detailTimers.map((timer, index) => (
        <DetailTimer
          key={timer.id}
          fireData={timer.fireData}
          memoData={timer.memoData}
          onDelete={index => {
            const newDetailTimers = detailTimers.filter(
              detailTimer => detailTimer.id !== timer.id,
            );
            setDetailTimers(newDetailTimers);
          }}
          onFireChange={newFireData => {
            const newDetailTimers = [...detailTimers];
            newDetailTimers[index].fireData = newFireData;
            setDetailTimers(newDetailTimers);
          }}
          onMemoChange={newMemoData => {
            const newDetailTimers = [...detailTimers];
            newDetailTimers[index].memoData = newMemoData;
            setDetailTimers(newDetailTimers);
          }}
        />
      ))}

      <PlusButtonWrapper>
        <PlusButton
          onPress={() => {
            addDetailTimer(id);
          }}
        />
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
