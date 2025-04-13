import {useEffect} from 'react';
import useUiStore from '../../store/uiStore';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  cancelAnimation,
  Easing,
} from 'react-native-reanimated';

const DeleteModeAnimateView = ({children}) => {
  const isDeleteMode = useUiStore(state => state.isDeleteMode);
  const rotation = useSharedValue(0);

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

  return (
    <Animated.View style={[{zIndex: 1}, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

export default DeleteModeAnimateView;
