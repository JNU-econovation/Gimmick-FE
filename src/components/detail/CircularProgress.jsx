import React from 'react';
import {View, Text, Image} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import styled from 'styled-components/native';

const CircularProgress = () => {
  const radius = 100; // 큰 원의 반지름
  const smallCircleRadius = 6; // 작은 원의 반지름
  const circleCount = 8; // 작은 원의 개수
  const angleStep = (2 * Math.PI) / circleCount; // 각도 계산

  const circles = Array.from({length: circleCount}).map((_, index) => {
    const angle = index * angleStep;
    const x = radius + radius * Math.cos(angle); // x 좌표
    const y = radius + radius * Math.sin(angle); // y 좌표

    return (
      <Circle key={index} cx={x} cy={y} r={smallCircleRadius} fill="#f0c078" />
    );
  });

  return (
    <Container>
      {/* SVG 크기를 크게 설정하고 viewBox로 중앙 맞추기 */}
      <Svg
        height={radius * 2.2} // 크기를 radius * 2로 설정
        width={radius * 2.2} // 크기를 radius * 2로 설정
        viewBox={`0 0 ${radius * 2} ${radius * 2}`} // viewBox로 크기 맞추기
      >
        {/* 큰 원: 중앙에 위치하게 설정 */}
        <Circle
          cx={radius} // 큰 원의 중심을 SVG 중앙에 맞추기
          cy={radius} // 큰 원의 중심을 SVG 중앙에 맞추기
          r={radius}
          stroke="#f0c078"
          strokeWidth="2"
          fill="none"
        />
        {/* 작은 원들: 원의 위치는 그대로 */}
        {circles}
      </Svg>
      <ImageContainer>
        <FoodImage
          source={require('../../assets/images/detail/food-image.png')}
        />
      </ImageContainer>
    </Container>
  );
};

export default CircularProgress;

const Container = styled.View`
  justify-content: center;
  align-items: center;
  overflow: visible;
  margin-top: 50px;
`;

const ImageContainer = styled.View`
  position: absolute;
  justify-content: center;
  align-items: center;
`;

const FoodImage = styled.Image`
  width: 130px;
  height: 130px;
`;
