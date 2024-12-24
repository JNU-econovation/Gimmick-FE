import React from 'react';
import styled from 'styled-components/native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {TouchableOpacity, Image, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Header = ({type, title}) => {
  const navigation = useNavigation();

  if (type === 'main') {
    return (
      <HeaderContainer>
        <Logo source={require('../../assets/images/header/logo.png')} />
        <IconContainer>
          <IconButton onPress={() => navigation.navigate('Create Modal')}>
            <StyledIcon
              source={require('../../assets/images/header/plus.png')}
            />
          </IconButton>
        </IconContainer>
      </HeaderContainer>
    );
  } else if (type === 'detail') {
    return (
      <HeaderContainer>
        <IconButton onPress={() => navigation.goBack()}>
          <BackButtonIcon
            source={require('../../assets/images/header/back-icon.png')}
          />
        </IconButton>
        <TitleText>{title}</TitleText>
        <RightText>편집</RightText>
      </HeaderContainer>
    );
  } else if (['timerCreate', 'folderCreate'].includes(type)) {
    return (
      <HeaderContainer>
        <IconButton onPress={() => navigation.goBack()}>
          <BackButtonIcon
            source={require('../../assets/images/header/back-icon.png')}
          />
        </IconButton>
        <TitleText>{title}</TitleText>
        <RightText>완료</RightText>
      </HeaderContainer>
    );
  }
};

export default Header;

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: ${moderateScale(7)}px;
`;

const Logo = styled.Image`
  width: ${scale(90)}px;
  height: ${verticalScale(30)}px;
  object-fit: contain;
`;

const IconContainer = styled.View`
  flex-direction: row;
  margin-top: ${verticalScale(3)}px;
`;

const IconButton = styled(TouchableOpacity)`
  margin-left: ${props => (props.applyMargin ? moderateScale(14) : 0)}px;
`;

const StyledIcon = styled(Image)`
  width: ${moderateScale(24)}px;
  height: ${moderateScale(24)}px;
`;

const BackButtonIcon = styled(StyledIcon)`
  margin-right: auto;
`;

const TitleText = styled(Text)`
  font-size: ${moderateScale(20)}px;
  font-weight: bold;
`;

const RightText = styled(Text)`
  font-size: ${moderateScale(15)}px;
  margin-top: ${moderateScale(5)}px;
  color: #777777;
`;
