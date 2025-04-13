import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import MainView from './pages/mainView/MainView';
import DetailPage from './pages/DetailPage';
import {Platform, PermissionsAndroid} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TimerCreatePage from './pages/TimerCreatePage';
import FolderCreatePage from './pages/FolderCreatePage';
import {StatusBar} from 'react-native';
import TimerUpdatePage from './pages/TimerUpdatePage';
import Refresh from './pages/Refresh';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import FolderPage from './pages/FolderPage';
import {useAppStateMonitor} from './hooks/useAppStateMonitor';
import FolderUpdatePage from './pages/FolderUpdatePage';
import PushNotification from 'react-native-push-notification';

import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  useAppStateMonitor();

  // 안드로이드 알림 권한 요청을 위한 코드
  useEffect(() => {
    const requestNotificationPermission = async () => {
      try {
        if (Platform.OS === 'android' && Platform.Version >= 33) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            {
              title: 'COOKTIME 알림 권한',
              message: '타이머 알림을 받기 위해서는 알림 권한이 필요합니다.',
              buttonNeutral: '나중에 결정',
              buttonNegative: '거부',
              buttonPositive: '허용',
            },
          );

          console.log('알림 권한 요청 결과:', granted);

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            PushNotification.createChannel(
              {
                channelId: 'default',
                channelName: 'Default Channel',
                channelDescription: 'A default channel for notifications',
                importance: 4,
                vibrate: true,
                soundName: 'default',
              },
              (created: boolean) =>
                console.log(`createChannel returned '${created}'`),
            );
          }
        }
      } catch (err) {
        console.warn('알림 권한 요청 실패:', err);
      }
    };

    requestNotificationPermission();
  }, []);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <GestureHandlerRootView style={{flex: 1}}>
        <BottomSheetModalProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Group
                screenOptions={{
                  contentStyle: {backgroundColor: '#fff'},
                }}>
                <Stack.Screen
                  name="Main"
                  component={MainView}
                  options={{title: 'Main Page', animation: 'none'}}
                />
                <Stack.Screen
                  name="Detail"
                  component={DetailWithLayout}
                  options={{title: 'Detail Page'}}
                />
                <Stack.Screen
                  name="Create Timer"
                  component={TimerCreatePage}
                  options={{title: 'Create Timer Page'}}
                />
                <Stack.Screen
                  name="Create Folder"
                  component={FolderCreatePage}
                  options={{title: 'Create Folder Page'}}
                />
                <Stack.Screen
                  name="Folder Page"
                  component={FolderPageWithLayout}
                  options={{title: 'Folder Page'}}
                />
                <Stack.Screen
                  name="Timer Update"
                  component={TimerUpdatePage}
                  options={{title: 'Timer Update Page'}}
                />
                <Stack.Screen
                  name="Refresh"
                  component={Refresh}
                  options={{title: 'Refresh Page'}}
                />
                <Stack.Screen
                  name="Folder Update"
                  component={FolderUpdatePage}
                  options={{title: 'Folder Update Page'}}
                />
              </Stack.Group>
            </Stack.Navigator>
          </NavigationContainer>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </>
  );
}

const FolderPageWithLayout = () => (
  <BaseLayout>
    <FolderPage />
  </BaseLayout>
);

const DetailWithLayout = () => (
  <BaseLayout>
    <DetailPage />
  </BaseLayout>
);

export default App;

const BaseLayout = styled.View`
  padding: 0 ${scale(21)}px;
  padding-top: ${Platform.select({ios: scale(25), android: scale(12)})}px;
`;
