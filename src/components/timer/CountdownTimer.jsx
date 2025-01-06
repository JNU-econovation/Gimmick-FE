import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import CustomText from '../CustomText';
import {Platform, TouchableWithoutFeedback, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import useTimerStore from '../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
const CountdownTimer = ({timer}) => {
  const navigation = useNavigation();
  const {time} = useTimerStore(state => state);

  // 타이머 삭제 함수 선택한 타이머의 id와 일치하는 데이터를 제거한 리스트를 반환 후 저장
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

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('Detail', {
          timer,
        })
      }
      onLongPress={handleLongPress}>
      <TimerContainer color={timer.timerColor}>
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
          {String(time.minutes).padStart(2, '0')}:
          {String(time.seconds).padStart(2, '0')}
        </TimerText>
      </TimerContainer>
    </TouchableWithoutFeedback>
  );
};

export default CountdownTimer;

const TimerContainer = styled.View`
  width: ${scale(140)}px;
  height: ${scale(134.7)}px;
  background-color: ${props => props.color || '#fbdf60'};
  border-radius: ${scale(13)}px;
  padding: ${scale(15)}px;
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
