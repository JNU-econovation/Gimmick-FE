import {View, Text, ScrollView, Platform, TouchableOpacity} from 'react-native';
import Header from '../../../components/common/Header';
import CustomText from '../../../components/CustomText';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import MyPageList from '../../../components/myPage/MyPageList';
import {useNavigation} from '@react-navigation/native';
import useDeleteData from '../../../hooks/useDeleteData';

const Mypage = ({width}) => {
  const navigation = useNavigation();
  const {handleResetData} = useDeleteData();

  // 앱 정보 리스트
  const appInfoList = [
    {
      type: 'webView',
      title: '피드백 보내기',
      url: 'https://forms.gle/STa86LzVXKLyX2mT7',
    },
    {
      type: 'webView',
      title: 'FAQ',
      url: 'https://cobalt-actress-321.notion.site/FAQ-1d11ab2758ff80c29595dc48d6cf0f30?pvs=4',
    },
    {
      type: 'webView',
      title: '버전',
      url: 'https://cobalt-actress-321.notion.site/Version-1d11ab2758ff8003a403fb0c9ed74db8?pvs=4',
    },
  ];

  // 관리 리스트
  const manageList = [
    {
      type: 'function',
      title: '데이터 초기화',
      function: () => {
        handleResetData();
      },
    },
  ];

  return (
    <MypageContainer width={width}>
      <HeaderWrapper>
        <Header title="설정" titleWeight={'bold'} />
      </HeaderWrapper>
      <MypageListWrapper>
        <MypageSubTitleText weight={'semi-bold'}>관리</MypageSubTitleText>
        <MyPageList navigateList={manageList} navigation={navigation} />
      </MypageListWrapper>
      <MypageListWrapper>
        <MypageSubTitleText weight={'semi-bold'}>앱 정보</MypageSubTitleText>
        <MyPageList navigateList={appInfoList} navigation={navigation} />
      </MypageListWrapper>
    </MypageContainer>
  );
};

const MypageContainer = styled.View`
  flex: 1;
  flex-direction: column;
  width: ${props => props.width}px;
  padding-top: ${Platform.select({ios: scale(25), android: scale(12)})}px;
  height: 100%;
  background-color: white;
`;

const HeaderWrapper = styled.View`
  padding: 0 ${scale(21)}px;
`;

const MypageSubTitleText = styled(CustomText)`
  font-size: ${scale(14)}px;
  margin-bottom: ${scale(10)}px;
  padding-left: ${scale(10)}px;
  color: rgb(155, 155, 155);
`;

const MypageListWrapper = styled.View`
  margin-top: ${scale(30)}px;
  padding: 0 ${scale(20)}px;
`;

export default Mypage;
