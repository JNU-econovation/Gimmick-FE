import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import CustomText from '../CustomText';
import {Platform, TouchableWithoutFeedback} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import useTimerStore from '../../store';
import {View} from 'react-native';

const CountdownTimer = ({timer}) => {
  const navigation = useNavigation();
  const {time} = useTimerStore(state => state);
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('Detail', {
          timer,
        })
      }>
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
  background-color: #ffffff;
  border-radius: ${scale(13)}px;
  opacity: 0.7;
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
