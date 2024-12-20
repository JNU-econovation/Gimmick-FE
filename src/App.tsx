import React from 'react';
import styled from 'styled-components';
import {scale} from 'react-native-size-matters';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CustomConfig} from '../node_modules/react-native-reanimated/lib/typescript/layoutReanimation/web/config.d';
import FolderCreatePage from './pages/FolderCreatePage';
import TimerCreatePage from './pages/TimerCreatePage';

const Stack = createNativeStackNavigator();

const customStackNavigatorOptions: StackNavigationOptions = {
  headerShown: false,
  contentStyle: {backgroundColor: '#fff'},
};

function App(): React.JSX.Element {
  return (
    // <BaseLayout>
    <NavigationContainer>
      <Stack.Navigator screenOptions={customStackNavigatorOptions}>
        <Stack.Screen
          name="Main"
          component={() => (
            <BaseLayout>
              <MainPage />
            </BaseLayout>
          )}
          options={{title: 'Main Page'}}
        />
        <Stack.Screen
          name="Detail"
          component={() => (
            <BaseLayout>
              <DetailPage />
            </BaseLayout>
          )}
          options={{title: 'Detail Page'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    // </BaseLayout>
  );
}

export default App;

const BaseLayout = styled.View`
  padding: 0 ${scale(22)}px;
  padding-top: ${Platform.select({ios: scale(25), android: scale(12)})}px;
`;
