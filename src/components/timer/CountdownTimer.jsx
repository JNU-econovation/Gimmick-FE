import styled from 'styled-components';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Entypo';
import CustomText from '../CustomText';
import {Platform, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import useTimerStore from '../../store';

const CountdownTimer = () => {
  const navigation = useNavigation();
  const {time} = useTimerStore(state => state);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Detail')}>
      <TimerContainer>
        <TimerHeaderWrapper>
          <IconboxWrapper>
            <IconView>🍔</IconView>
          </IconboxWrapper>
          <Icon name="chevron-right" size={scale(40)} color="#61734D" />
        </TimerHeaderWrapper>
        <FoodTitleText weight="semi-bold">쉬림프 타코</FoodTitleText>
        <TimerText weight="bold">
          {String(time.minutes).padStart(2, '0')}:
          {String(time.seconds).padStart(2, '0')}
        </TimerText>
      </TimerContainer>
    </TouchableOpacity>
  );
};

export default CountdownTimer;

const TimerContainer = styled.View`
  width: ${scale(140)}px;
  height: ${scale(140)}px;
  background-color: #fbdf60;
  border-radius: ${scale(20)}px;
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
  margin-right: ${scale(38)}px;
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
