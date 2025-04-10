import React, {useRef} from 'react';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import {
  TouchableWithoutFeedback,
  Image,
  Text,
  Platform,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomText from '../CustomText';
import CreateModal from '../modal/createModal/CreateModal';
import {SafeAreaView} from 'react-native';
import useUiStore from '../../store/uiStore';
const Header = ({
  type,
  title,
  onPressComplete,
  timer,
  folder,
  isTimerRunning,
}) => {
  const navigation = useNavigation();
  const titleWeight = Platform.select({
    ios: 'bold',
    android: 'medium',
  });
  const bottomSheetRef = useRef(null);
  const {isDeleteMode, setDeleteMode} = useUiStore();

  if (type === 'main') {
    return (
      <>
        <SafeAreaView>
          <HeaderContainer>
            <Logo source={require('../../assets/images/header/logo.png')} />
            <IconContainer>
              <RightTextButton
                onPress={() =>
                  isDeleteMode
                    ? setDeleteMode(false)
                    : bottomSheetRef.current?.present()
                }>
                <IconButton>
                  <StyledIcon
                    source={require('../../assets/images/header/plus.png')}
                  />
                </IconButton>
              </RightTextButton>
            </IconContainer>
          </HeaderContainer>
          <CreateModal bottomSheetRef={bottomSheetRef} folder={folder} />
        </SafeAreaView>
      </>
    );
  } else if (type === 'detail') {
    return (
      <SafeAreaView>
        <HeaderContainer>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <IconButton>
              <BackButtonIcon
                source={require('../../assets/images/header/back-icon.png')}
              />
            </IconButton>
          </TouchableWithoutFeedback>
          <TitleText weight={titleWeight}>{title}</TitleText>
          {isTimerRunning ? (
            <DisabledRightText>편집</DisabledRightText>
          ) : (
            <RightTextButton
              onPress={() => navigation.navigate('Timer Update', {timer})}>
              <RightText>편집</RightText>
            </RightTextButton>
          )}
        </HeaderContainer>
      </SafeAreaView>
    );
  } else if (type === 'folder') {
    return (
      <SafeAreaView>
        <HeaderContainer>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <IconButton>
              <BackButtonIcon
                source={require('../../assets/images/header/back-icon.png')}
              />
            </IconButton>
          </TouchableWithoutFeedback>
          <TitleText weight={titleWeight}>{title}</TitleText>
          <IconContainer>
            <RightTextButton onPress={() => bottomSheetRef.current?.present()}>
              <IconButton>
                <StyledIcon
                  source={require('../../assets/images/header/plus.png')}
                />
              </IconButton>
            </RightTextButton>
          </IconContainer>
          <CreateModal bottomSheetRef={bottomSheetRef} folder={folder} />
        </HeaderContainer>
      </SafeAreaView>
    );
  } else if (['timerCreate', 'folderCreate'].includes(type)) {
    return (
      <SafeAreaView>
        <HeaderContainer>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <IconButton>
              <BackButtonIcon
                source={require('../../assets/images/header/back-icon.png')}
              />
            </IconButton>
          </TouchableWithoutFeedback>
          <TitleText weight={titleWeight}>{title}</TitleText>
          <RightTextButton onPress={onPressComplete}>
            <RightText>완료</RightText>
          </RightTextButton>
        </HeaderContainer>
      </SafeAreaView>
    );
  } else if (type === 'webView') {
    return (
      <SafeAreaView>
        <HeaderContainer alignItems={'center'} justifyContent={'flex-start'}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <IconButton>
              <BackButtonIcon
                style={{width: scale(18), height: scale(18)}}
                source={require('../../assets/images/header/back-icon.png')}
              />
            </IconButton>
          </TouchableWithoutFeedback>
          <CustomText style={{fontSize: scale(15)}}>{title}</CustomText>
        </HeaderContainer>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView>
      <HeaderContainer alignItems={'center'}>
        <TitleText weight={titleWeight}>{title}</TitleText>
      </HeaderContainer>
    </SafeAreaView>
  );
};

export default Header;

const DisabledRightText = styled(Text)`
  font-size: ${scale(15)}px;
  padding: ${scale(10)}px;
  color: #777777;
  opacity: 0.5;
`;

const HeaderContainer = styled.View`
  height: ${scale(30)}px;
  flex-direction: row;
  justify-content: ${props => props.justifyContent || 'space-between'};
  align-items: ${props => props.alignItems || 'center'};
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
  padding: ${scale(10)}px;
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
  padding: ${scale(10)}px;
  color: #777777;
`;

const RightTextButton = styled(TouchableWithoutFeedback)`
  background-color: red;
`;
