import {ScrollView, Dimensions} from 'react-native';
import MainPage from './MainPage';
import MypageNavigations from './myPage/MypageNavigations';

const MainView = () => {
  const width = Dimensions.get('window').width;
  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      bounces={false}
      style={{flex: 1}}>
      <MainPage width={width} />
      <MypageNavigations width={width} />
    </ScrollView>
  );
};

export default MainView;
