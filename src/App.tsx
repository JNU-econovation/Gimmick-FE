import React from 'react';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewCreateModal from './components/modal/newCreateModal/NewCreateModal';
import TimerCreatePage from './pages/TimerCreatePage';
import FolderCreatePage from './pages/FolderCreatePage';
import {StatusBar} from 'react-native';
import TimerUpdatePage from './pages/TimerUpdatePage';
import Refresh from './pages/Refresh';
import Login from './pages/Login';
const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar
        barStyle="dark-content" // 상태 표시줄 텍스트 색상 설정
        backgroundColor="transparent" // 상태 표시줄 배경색 투명하게 설정
        translucent={true} // 상태 표시줄을 투명하게 설정
      />
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
              component={MainWithLayout}
              options={{title: 'Main Page', animation: 'none'}}
            />
            <Stack.Screen
              name="Detail"
              component={DetailWithLayout}
              options={{title: 'Detail Page'}}
            />
            <Stack.Screen
              name="Create Timer"
              component={TimerCreateWithLayout}
              options={{title: 'Create Timer Page'}}
            />
            <Stack.Screen
              name="Create Folder"
              component={FolderCreateWithLayout}
              options={{title: 'Create Folder Page'}}
            />
            <Stack.Screen
              name="Timer Update"
              component={TimerUpdateWithLayout}
              options={{title: 'Timer Update Page'}}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{title: 'Login Page'}}
            />
            <Stack.Screen
              name="Refresh"
              component={Refresh}
              options={{title: 'Refresh Page'}}
            />
          </Stack.Group>

          <Stack.Group
            screenOptions={{
              presentation: 'transparentModal',
              contentStyle: {backgroundColor: 'transparent'},
            }}>
            <Stack.Screen
              name="Create Modal"
              component={NewCreateModal}
              options={{title: 'Create Modal'}}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </>
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

const TimerCreateWithLayout = () => <TimerCreatePage />;

const TimerUpdateWithLayout = () => <TimerUpdatePage />;

const FolderCreateWithLayout = () => (
  <BaseLayout>
    <FolderCreatePage />
  </BaseLayout>
);

export default App;

const BaseLayout = styled.View`
  padding: 0 ${scale(21)}px;
  padding-top: ${Platform.select({ios: scale(25), android: scale(12)})}px;
`;
