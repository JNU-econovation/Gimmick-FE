import {useState, useEffect} from 'react';
import {Platform, Alert} from 'react-native';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';

const TimerUpdatePage = () => {
  const route = useRoute();
  const {timer} = route.params || {};
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(timer.icon);
  const [timerName, setTimerName] = useState(timer.timerName);
  const [id, setId] = useState(
    timer.detailTimerData[timer.detailTimerData.length - 1].id,
  );

  const [timerColor, setTimerColor] = useState(timer.timerColor);
  const [detailTimers, setDetailTimers] = useState(timer.detailTimerData);
  const navigation = useNavigation();
  const [totalMinutes, setTotalMinutes] = useState(
    String(timer.totalMinutes).padStart(2, '0'),
  );
  const [totalSeconds, setTotalSeconds] = useState(
    String(timer.totalSeconds).padStart(2, '0'),
  );

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

  const saveTimerData = async () => {
    if (!timerName.trim()) {
      Alert.alert('저장 실패', '타이머 이름을 입력해주세요.');
      return;
    }

    try {
      const newTimer = {
        id: timer.id,
        totalMinutes: totalMinutes,
        totalSeconds: totalSeconds,
        timerName: timerName,
        timerColor: timerColor,
        icon: selectedIcon,
        detailTimerData: detailTimers,
      };

      // 데이터 수정 완료되면 확인해야 할 부분
      const storedTimers = await AsyncStorage.getItem('timers');
      const parsedTimers = storedTimers ? JSON.parse(storedTimers) : [];

      // 현재 id가 없어서인지 타이머를 수정하면 전체 타이머에 적용되는 오류가 발생하고 있음
      const updatedTimers = parsedTimers.map(t =>
        t.id === timer.id ? newTimer : t,
      );

      await AsyncStorage.setItem('timers', JSON.stringify(updatedTimers));
      Alert.alert('저장 완료', '타이머가 성공적으로 저장되었습니다.');

      setTimerName('');
      setTimerColor('#FBDF60');
      setSelectedIcon('🌮');
      setDetailTimers([{id: 0, fireData: '약불', memoData: ''}]);
      navigation.goBack();
      navigation.goBack();
    } catch (error) {
      console.error('타이머 저장 실패:', error);
      Alert.alert('저장 실패', '타이머를 저장하는 데 실패했습니다.');
    }
  };

  const handleTimeChange = (index, minutes, seconds) => {
    setDetailTimers(prevTimers => {
      const newTimers = [...prevTimers];
      newTimers[index] = {
        ...newTimers[index],
        minutes,
        seconds,
      };
      return newTimers;
    });
  };

  const handleFireChange = (index, newFireData) => {
    setDetailTimers(prevTimers => {
      const newTimers = [...prevTimers];
      newTimers[index] = {
        ...newTimers[index],
        fireData: newFireData,
      };
      return newTimers;
    });
  };

  const handleMemoChange = (index, newMemoData) => {
    setDetailTimers(prevTimers => {
      const newTimers = [...prevTimers];
      newTimers[index] = {
        ...newTimers[index],
        memoData: newMemoData,
      };
      return newTimers;
    });
  };

  return (
    <TimerUpdateContainer
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
        {detailTimers.map((time, index) => (
          <DetailTimer
            key={time.id}
            minutes={String(time.minutes).padStart(2, '0')}
            seconds={String(time.seconds).padStart(2, '0')}
            fireData={time.fireData}
            memoData={time.memoData}
            onDelete={index => {
              if (detailTimers.length > 1) {
                const newDetailTimers = detailTimers.filter(
                  detailTimer => detailTimer.id !== time.id,
                );
                setDetailTimers(newDetailTimers);
              } else {
                Alert.alert('최소 1개의 타이머가 설정 되어야합니다.');
              }
            }}
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
    </TimerUpdateContainer>
  );
};

const TimerUpdateContainer = styled.ScrollView`
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

export default TimerUpdatePage;
