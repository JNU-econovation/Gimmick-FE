import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import CustomText from '../CustomText';
import {Platform, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import useTimerStore from '../../store';
import {useEffect} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  withRepeat,
  withSequence,
  cancelAnimation,
} from 'react-native-reanimated';
import DeleteButton from '../common/DeleteButton';
import useUiStore from '../../store/uiStore';
import ContextMenu from 'react-native-context-menu-view';
import useDeleteData from '../../hooks/useDeleteData';
const DetailColor = color => {
  if (color === '#FBDF60') return '#FFC15B';
  if (color === '#F6DBB7') return '#E9B97E';
  if (color === '#BAE2FF') return '#90CFFF';
  if (color === '#C8E7A7') return '#93C572';
  if (color === '#FCC4C4') return '#F4A7A3';
};

const CountdownTimer = ({timer, onTimerClick}) => {
  const navigation = useNavigation();
  const timerStore = useTimerStore();
  const currentTimer = useTimerStore(state => state.timers[timer.id]);
  const rotation = useSharedValue(0);
  const isDeleteMode = useUiStore(state => state.isDeleteMode);
  const setDeleteMode = useUiStore(state => state.setDeleteMode);
  const {handleDeleteTimer} = useDeleteData();

  useEffect(() => {
    if (!currentTimer) {
      timerStore.initTimer(
        timer.id,
        timer.totalMinutes,
        timer.totalSeconds,
        timer.detailTimerData,
        timer.timerName,
      );
    }
  }, [timer.id]);

  useEffect(() => {
    const delay = Math.random() * 250;
    setTimeout(() => {
      if (isDeleteMode) {
        rotation.value = withRepeat(
          withSequence(
            withTiming(-1.5, {
              duration: 200,
              easing: Easing.linear,
            }),
            withTiming(1.5, {
              duration: 200,
              easing: Easing.linear,
            }),
          ),
          -1,
          true,
        );
      } else {
        cancelAnimation(rotation);
        rotation.value = withTiming(0, {
          duration: 150,
          easing: Easing.linear,
        });
      }
    }, delay);
  }, [isDeleteMode]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${rotation.value}deg`}],
    };
  });

  const calculateProgress = () => {
    if (!currentTimer) return 0;
    const totalSeconds =
      parseInt(timer.totalMinutes) * 60 + parseInt(timer.totalSeconds);
    const remainingSeconds = currentTimer.remainingTotalSeconds;
    return 1 - remainingSeconds / totalSeconds;
  };

  const handlePress = () => {
    if (isDeleteMode) {
      setDeleteMode(false);
      return 0;
    }
    navigation.navigate('Detail', {timer});
    setTimeout(() => {
      onTimerClick(timer);
    }, 1000);
  };

  const progress = calculateProgress();
  const darkerColor = DetailColor(timer.timerColor);

  return (
    <Container>
      {isDeleteMode && (
        <DeleteButton
          onDelete={() => deleteTimerData(timer.id)}
          id={timer.id}
          isFolder={false}
        />
      )}
      <Pressable
        onPress={handlePress}
        delayLongPress={200}
        onLongPress={() => {}}>
        <ContextMenu
          previewBackgroundColor="transparent"
          disableShadow={true}
          actions={[
            {
              title: '타이머 수정',
            },
            {
              title: '타이머 삭제',
            },
            {
              title: '식제 모드',
            },
          ]}
          se
          onPress={async ({nativeEvent}) => {
            if (nativeEvent.index === 0) {
              navigation.navigate('Timer Update', {timer});
            }
            if (nativeEvent.index === 1) {
              await handleDeleteTimer(timer.id);
            }
            if (nativeEvent.index === 2) {
              setTimeout(() => {
                setDeleteMode(true);
              }, 605.5);
            }
            if (nativeEvent.index === 3) {
              console.log('test');
            }
          }}>
          <Animated.View style={animatedStyle}>
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
                <FoodTitleText weight="semi-bold">
                  {timer.timerName}
                </FoodTitleText>
                <TimerText weight="bold">
                  {currentTimer
                    ? `${String(currentTimer.totalTime.minutes).padStart(
                        2,
                        '0',
                      )}:${String(currentTimer.totalTime.seconds).padStart(
                        2,
                        '0',
                      )}`
                    : '00:00'}
                </TimerText>
              </ContentWrapper>
            </TimerContainer>
          </Animated.View>
        </ContextMenu>
      </Pressable>
    </Container>
  );
};

const Container = styled.View`
  z-index: 1;
  position: relative;
`;

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

const FoodTitleText = styled(CustomText).attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  padding-top: ${scale(15)}px;
  opacity: 0.6;
  font-size: ${scale(16)}px;
  width: 100%;
  text-align: left;
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
