import {View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Mypage from './Mypage';
import WebViewScreen from '../../webView/WebView';

const MypageNavigations = ({width}) => {
  const Stack = createNativeStackNavigator();

  return (
    <View width={width}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Mypage"
          component={Mypage}
          options={{animation: 'none'}}
        />
        <Stack.Screen name="WebView" component={WebViewScreen} />
      </Stack.Navigator>
    </View>
  );
};

export default MypageNavigations;
