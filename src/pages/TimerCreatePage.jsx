import {useState, useEffect} from 'react';
import {Platform, Alert, Keyboard, KeyboardAvoidingView} from 'react-native';
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
import AppDataStorage from '../utils/AppDataStorage';
import {useNavigation} from '@react-navigation/native';

const TimerCreatePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('🌮');
  const [timerName, setTimerName] = useState('');
  const [id, setId] = useState(0);

  const [timerColor, setTimerColor] = useState('#FBDF60');
  const [detailTimers, setDetailTimers] = useState([
    {id: 0, minutes: '00', seconds: '00', fireData: '약불', memoData: ''},
  ]);
  const navigation = useNavigation();
  const [totalMinutes, setTotalMinutes] = useState('00');
  const [totalSeconds, setTotalSeconds] = useState('00');

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    const calculateTotalTime = () => {
      let totalMinutes = 0;
      let totalSeconds = 0;

      detailTimers.forEach(timer => {
        const minutes = Number(timer.minutes);
        const seconds = Number(timer.seconds);
        totalMinutes += minutes;
        totalSeconds += seconds;
      });

      totalMinutes += Math.floor(totalSeconds / 60);
      totalSeconds = totalSeconds % 60;

      setTotalMinutes(String(totalMinutes).padStart(2, '0'));
      setTotalSeconds(String(totalSeconds).padStart(2, '0'));
    };

    calculateTotalTime();
  }, [detailTimers]);

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
      {
        id: id + 1,
        minutes: '00',
        seconds: '00',
        fireData: '약불',
        memoData: '',
      },
    ]);
  };

  const handleDeleteTimer = timerId => {
    if (detailTimers.length > 1) {
      const newDetailTimers = detailTimers.filter(
        detailTimer => detailTimer.id !== timerId,
      );
      setDetailTimers(newDetailTimers);
    } else {
      Alert.alert('최소 1개의 타이머가 설정 되어야합니다.');
    }
  };

  const handleTimeChange = (index, minutes, seconds) => {
    const newDetailTimers = [...detailTimers];
    newDetailTimers[index].minutes = minutes;
    newDetailTimers[index].seconds = seconds;
    setDetailTimers(newDetailTimers);
  };

  const handleFireChange = (index, newFireData) => {
    const newDetailTimers = [...detailTimers];
    newDetailTimers[index].fireData = newFireData;
    setDetailTimers(newDetailTimers);
  };

  const handleMemoChange = (index, newMemoData) => {
    const newDetailTimers = [...detailTimers];
    newDetailTimers[index].memoData = newMemoData;
    setDetailTimers(newDetailTimers);
  };

  const saveTimerData = async () => {
    if (!timerName.trim()) {
      Alert.alert('저장 실패', '타이머 이름을 입력해주세요.');
      return;
    }

    if (
      detailTimers.filter(
        timer => timer.minutes === '00' && timer.seconds === '00',
      ).length > 0
    ) {
      Alert.alert('저장 실패', '타이머 시간을 설정해주세요');
      return;
    }

    try {
      const newTimer = {
        id: Date.now(),
        totalMinutes: totalMinutes,
        totalSeconds: totalSeconds,
        timerName: timerName,
        timerColor: timerColor,
        icon: selectedIcon,
        detailTimerData: detailTimers,
      };

      const storedTimers = await AppDataStorage.load('timers');
      const updatedTimers = [...(storedTimers ? storedTimers : []), newTimer];

      await AppDataStorage.save('timers', updatedTimers);
      Alert.alert('저장 완료', '타이머가 성공적으로 저장되었습니다.');

      setTimerName('');
      setTimerColor('#f7e485');
      setSelectedIcon('🌮');
      setDetailTimers([{id: 0, fireData: '약불', memoData: ''}]);
      navigation.goBack();
    } catch (error) {
      console.error('타이머 저장 실패:', error);
      Alert.alert('저장 실패', '타이머를 저장하는 데 실패했습니다.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}>
      <TimerCreateContainer
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <BaseLayout>
          <Header
            type="timerCreate"
            title="타이머 생성"
            onPressComplete={saveTimerData}
          />
          <IconPicker icon={selectedIcon} onPress={onPressModalOpen} />
          <InsertContainer>
            <TimerCreateText weight="semi-bold">타이머 이름</TimerCreateText>
            <InputWrapper value={timerName} onChangeText={setTimerName} />
            <TimerCreateText weight="semi-bold">타이머 색상</TimerCreateText>
            <ColorPicker color={timerColor} onChangeColor={setTimerColor} />
          </InsertContainer>
        </BaseLayout>

        <DetailTimerWrapper>
          {detailTimers.map((timer, index) => (
            <DetailTimer
              key={timer.id}
              minutes={timer.minutes}
              seconds={timer.seconds}
              fireData={timer.fireData}
              memoData={timer.memoData}
              onDelete={() => handleDeleteTimer(timer.id)}
              onTimeChange={(minutes, seconds) =>
                handleTimeChange(index, minutes, seconds)
              }
              onFireChange={newFireData => handleFireChange(index, newFireData)}
              onMemoChange={newMemoData => handleMemoChange(index, newMemoData)}
            />
          ))}
        </DetailTimerWrapper>

        <BaseLayout>
          <PlusButtonWrapper>
            <PlusButton
              onPress={() => {
                addDetailTimer(id);
              }}
            />
          </PlusButtonWrapper>
          <TotalTimerContainer>
            <TotalTimer totalTime={[totalMinutes, totalSeconds]} />
          </TotalTimerContainer>

          {isModalVisible && (
            <IconPickerModal
              onSelectIcon={handleIconSelect}
              onClose={handleModalClose}
            />
          )}
        </BaseLayout>
      </TimerCreateContainer>
    </KeyboardAvoidingView>
  );
};

const TimerCreateContainer = styled.ScrollView`
  width: 100%;
  height: 100%;
  position: relative;
`;

const BaseLayout = styled.View`
  padding: 0 ${scale(22)}px;
  padding-top: ${Platform.select({ios: scale(25), android: scale(12)})}px;
`;

const DetailTimerWrapper = styled.View`
  border-bottom-width: ${scale(10)}px;
  border-bottom-color: #f3f5f7;
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
