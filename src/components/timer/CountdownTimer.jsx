import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import CustomText from '../CustomText';
import {Platform, TouchableWithoutFeedback, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import useTimerStore from '../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';

const DetailColor = color => {
  if (color === '#FBDF60') return '#FFC15B';
  if (color === '#F6DBB7') return '#E9B97E';
  if (color === '#FFC15B') return '#FFB347';
  if (color === '#C8E7A7') return '#93C572';
  if (color === '#FCC4C4') return '#F4A7A3';
};

const CountdownTimer = ({timer, onTimerClick}) => {
  const navigation = useNavigation();
  const timerStore = useTimerStore();
  console.log('countdowntimer', timer);
  const currentTimer = useTimerStore(state => state.timers[timer.id]);

  useEffect(() => {
    if (!currentTimer || currentTimer !== timer) {
      timerStore.initTimer(
        timer.id,
        timer.totalMinutes,
        timer.totalSeconds,
        timer.detailTimerData,
      );
    }
  }, [timer]);

  const calculateProgress = () => {
    if (!currentTimer) return 0;
    const totalSeconds =
      parseInt(timer.totalMinutes) * 60 + parseInt(timer.totalSeconds);
    const remainingSeconds = currentTimer.remainingTotalSeconds;
    return 1 - remainingSeconds / totalSeconds;
  };

  const deleteTimerData = async id => {
    try {
      const storedTimers = await AsyncStorage.getItem('timers');
      const parsedTimers = storedTimers ? JSON.parse(storedTimers) : [];
      const updatedTimers = parsedTimers.filter(
        parsedTimer => parsedTimer.id !== id,
      );
      await AsyncStorage.setItem('timers', JSON.stringify(updatedTimers));
      Alert.alert('삭제 완료', '타이머가 성공적으로 삭제되었습니다.');
      navigation.navigate('Refresh', {animation: 'none'});
      navigation.navigate('Main', {animation: 'none'});
    } catch (error) {
      console.error('타이머 삭제 실패:', error);
      Alert.alert('삭제 실패', '타이머를 삭제하는 데 실패했습니다.');
    }
  };

  const handleLongPress = () => {
    Alert.alert(
      '타이머 삭제',
      '삭제한 타이머는 되돌릴 수 없습니다. 삭제하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {text: '삭제', onPress: () => deleteTimerData(timer.id)},
      ],
    );
  };

  const handlePress = () => {
    navigation.navigate('Detail', {timer});
    setTimeout(() => {
      onTimerClick(timer);
    }, 1000);
  };

  const progress = calculateProgress();
  const darkerColor = DetailColor(timer.timerColor);

  return (
    <TouchableWithoutFeedback
      onPress={handlePress}
      onLongPress={handleLongPress}>
      <TimerContainer>
        <BackgroundView color={timer.timerColor} />
        <ProgressView
          color={darkerColor}
          style={{
            position: 'absolute',
            right: 0,
            width: `${progress * 100}%`,
            height: '100%',
            borderTopRightRadius: scale(13),
            borderBottomRightRadius: scale(13),
          }}
        />
        <ContentWrapper>
          <TimerHeaderWrapper>
            <IconboxWrapper>
              <IconView>{timer.icon}</IconView>
            </IconboxWrapper>
            <EnterImage
              source={require('../../assets/images/timerBox/enter-arrow.png')}
            />
          </TimerHeaderWrapper>
          <FoodTitleText weight="semi-bold">{timer.timerName}</FoodTitleText>
          <TimerText weight="bold">
            {currentTimer
              ? `${String(currentTimer.totalTime.minutes).padStart(
                  2,
                  '0',
                )}:${String(currentTimer.totalTime.seconds).padStart(2, '0')}`
              : '00:00'}
          </TimerText>
        </ContentWrapper>
      </TimerContainer>
    </TouchableWithoutFeedback>
  );
};

const TimerContainer = styled.View`
  width: ${scale(140)}px;
  height: ${scale(134.7)}px;
  border-radius: ${scale(13)}px;
  overflow: hidden;
  position: relative;
`;

const BackgroundView = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${props => props.color};
`;

const ProgressView = styled.View`
  position: absolute;
  background-color: ${props => props.color};
`;

const ContentWrapper = styled.View`
  padding: ${scale(15)}px;
  z-index: 1;
`;

const TimerHeaderWrapper = styled.View`
  font-size: ${scale(24)}px;
  flex-direction: row;
  align-items: center;
`;

const IconboxWrapper = styled.View`
  width: ${scale(40)}px;
  height: ${scale(40)}px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: ${scale(13)}px;
  margin-right: ${scale(54)}px;
  justify-content: center;
  align-items: center;
`;

const IconView = styled(CustomText)`
  font-size: ${Platform.select({ios: scale(24), android: scale(21)})}px;
`;

const FoodTitleText = styled(CustomText)`
  padding-top: ${scale(15)}px;
  opacity: 0.5;
  font-size: ${scale(15)}px;
`;

const TimerText = styled(CustomText)`
  margin-top: ${Platform.select({ios: scale(1), android: scale(-4)})}px;
  font-size: ${scale(31)}px;
  margin-left: ${scale(-1)}px;
`;

const EnterImage = styled.Image`
  width: 15px;
  height: 25px;
`;

export default CountdownTimer;
