import React from 'react';
import {Text as RNText, TextProps, TextStyle} from 'react-native';

interface CustomTextProps extends TextProps {
  weight?:
    | 'black'
    | 'extra-light'
    | 'thin'
    | 'semi-bold'
    | 'light'
    | 'regular'
    | 'medium'
    | 'bold'
    | 'extra-bold'; // 폰트 굵기 옵션 추가
}

const CustomText: React.FC<CustomTextProps> = ({
  style,
  weight = 'regular',
  ...rest
}) => {
  // 굵기별 폰트 매핑
  console.log(weight);
  const fontWeightMap: Record<CustomTextProps['weight'], string> = {
    black: 'Pretendard-Black',
    bold: 'Pretendard-Bold',
    'extra-bold': 'Pretendard-ExtraBold',
    'extra-light': 'Pretendard-ExtraLight',
    light: 'Pretendard-Light',
    medium: 'Pretendard-Medium',
    regular: 'Pretendard-Regular',
    'semi-bold': 'Pretendard-SemiBold',
    thin: 'Pretendard-Thin',
    test: 'Pretendard-bold',
  };
  console.log(fontWeightMap[weight]);
  const customStyle: TextStyle = {
    fontFamily: fontWeightMap[weight], // weight에 따라 폰트 설정
    color: '#000000',
  };

  return <RNText style={[customStyle, style]} {...rest} />;
};

export default CustomText;
