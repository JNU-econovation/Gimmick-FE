import React from 'react';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import {TouchableWithoutFeedback, Image, Text, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomText from '../CustomText';

const Header = ({type, title, onPressComplete, timer}) => {
  const navigation = useNavigation();

  const titleWeight = Platform.select({
    ios: 'bold',
    android: 'medium',
  });

  if (type === 'main') {
    return (
      <HeaderContainer>
        <Logo source={require('../../assets/images/header/logo.png')} />
        <IconContainer>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Create Modal')}>
            <IconButton>
              <StyledIcon
                source={require('../../assets/images/header/plus.png')}
              />
            </IconButton>
          </TouchableWithoutFeedback>
        </IconContainer>
      </HeaderContainer>
    );
  } else if (type === 'detail') {
    return (
      <HeaderContainer>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <IconButton>
            <BackButtonIcon
              source={require('../../assets/images/header/back-icon.png')}
            />
          </IconButton>
        </TouchableWithoutFeedback>
        <TitleText weight={titleWeight}>{title}</TitleText>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Timer Update', {timer})}>
          <RightText>편집</RightText>
        </TouchableWithoutFeedback>
      </HeaderContainer>
    );
  } else if (['timerCreate', 'folderCreate'].includes(type)) {
    return (
      <HeaderContainer>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <IconButton>
            <BackButtonIcon
              source={require('../../assets/images/header/back-icon.png')}
            />
          </IconButton>
        </TouchableWithoutFeedback>
        <TitleText weight={titleWeight}>{title}</TitleText>
        <TouchableWithoutFeedback onPress={onPressComplete}>
          <RightText>완료</RightText>
        </TouchableWithoutFeedback>
      </HeaderContainer>
    );
  }
};

export default Header;

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: ${scale(15)}px;
  margin-top: ${scale(25)}px;
  margin-bottom: ${scale(10)}px;
`;

const Logo = styled.Image`
  width: ${scale(90)}px;
  height: ${scale(30)}px;
  object-fit: contain;
`;

const IconContainer = styled.View`
  flex-direction: row;
  margin-top: ${scale(3)}px;
`;

const IconButton = styled.View`
  margin-left: ${props => (props.applyMargin ? scale(14) : 0)}px;
`;

const StyledIcon = styled(Image)`
  width: ${scale(24)}px;
  height: ${scale(24)}px;
`;

const BackButtonIcon = styled(StyledIcon)`
  margin-right: auto;
`;

const TitleText = styled(CustomText)`
  font-size: ${scale(20)}px;
`;

const RightText = styled(Text)`
  font-size: ${scale(15)}px;
  margin-top: ${scale(5)}px;
  color: #777777;
`;
