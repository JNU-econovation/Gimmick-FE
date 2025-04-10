import CustomText from '../CustomText';
import {View, TouchableOpacity} from 'react-native';
import {openWebView} from '../../utils/openURL';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import {FlatList} from 'react-native';

const MyPageList = ({navigateList, navigation}) => {
  const renderItem = ({item}) => (
    <MypageListButton
      onPress={() => {
        if (item.type === 'webView') {
          openWebView(navigation, item.title, item.url);
        } else if (item.type === 'function') {
          item.function();
        } else if (item.type === 'navigate') {
          navigation.navigate(item.navigation);
        }
      }}>
      <MypageListText>{item.title}</MypageListText>
    </MypageListButton>
  );

  return (
    <MyPageListContainer>
      <FlatList
        scrollEnabled={false}
        data={navigateList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </MyPageListContainer>
  );
};

const MyPageListContainer = styled.View``;

const MypageListButton = styled.TouchableOpacity`
  padding: ${scale(13)}px 0px;
`;

const MypageListText = styled(CustomText)`
  font-size: ${scale(16)}px;
  padding: 0 ${scale(20)}px;
`;

export default MyPageList;
