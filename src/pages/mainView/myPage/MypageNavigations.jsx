import {View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  NavigationContainer,
  NavigationIndependentTree,
} from '@react-navigation/native';
import Mypage from './Mypage';
import MainView from '../../mainView/MainView';
import WebViewScreen from '../../webView/WebView';

const MypageNavigations = ({width}) => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationIndependentTree>
      <NavigationContainer>
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
      </NavigationContainer>
    </NavigationIndependentTree>
  );
};

export default MypageNavigations;
