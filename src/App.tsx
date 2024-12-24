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

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
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
            options={{title: 'Main Page'}}
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
