import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import {scale} from 'react-native-size-matters';
import {View} from 'react-native';
import {FIRE_COLOR} from '../../constants/color';
const screenWidth = Dimensions.get('window').width;

const ProgressBar = ({timer}) => {
  const totalSeconds =
    Number(timer.totalMinutes) * 60 + Number(timer.totalSeconds);

  return (
    <ProgressBarContainer>
      {[...timer.detailTimerData].reverse().map((item, index) => {
        const itemSeconds = Number(item.minutes) * 60 + Number(item.seconds);

        // 색상 지정
        let detailProgressBarColor;
        if (item.fireData == '강불') {
          detailProgressBarColor = FIRE_COLOR.strong;
        } else if (item.fireData == '중불') {
          detailProgressBarColor = FIRE_COLOR.medium;
        } else {
          detailProgressBarColor = FIRE_COLOR.light;
        }

        return (
          <DetailProgressLine
            key={index}
            width={`${
              ((screenWidth - scale(48)) / totalSeconds) * itemSeconds
            }px`}
            color={detailProgressBarColor}
          />
        );
      })}
    </ProgressBarContainer>
  );
};

const DetailProgressLine = styled.View`
  width: ${props => props.width};
  height: ${scale(10)}px;
  justify-content: center;
  border-radius: ${scale(10)}px;
  background-color: ${props => props.color};
`;

const ProgressBarContainer = styled.View`
  flex-direction: row;
`;

export default ProgressBar;
