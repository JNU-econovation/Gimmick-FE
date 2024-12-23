import React from 'react';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CustomConfig} from '../node_modules/react-native-reanimated/lib/typescript/layoutReanimation/web/config.d';
// import BaseLayout from '../components/BaseLayout';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
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
  );
}

const MainWithLayout = () => (
  <BaseLayout>
    <MainPage />
  </BaseLayout>
);

const DetailWithLayout = () => (
  <BaseLayout>
    <DetailPage />
  </BaseLayout>
);

const TimerCreateWithLayout = () => (
  <BaseLayout>
    <TimerCreatePage />
  </BaseLayout>
);

const FolderCreateWithLayout = () => (
  <BaseLayout>
    <FolderCreatePage />
  </BaseLayout>
);

export default App;

const BaseLayout = styled.View`
  padding: 0 ${scale(22)}px;
  padding-top: ${Platform.select({ios: scale(25), android: scale(12)})}px;
`;
