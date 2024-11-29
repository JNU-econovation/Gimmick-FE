import React from 'react';
import styled from 'styled-components';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import MainPage from './pages/MainPage';
import IconPickerModal from './components/modal/iconPickerModal/IconPickerModal';
import DetailPage from './pages/DetailPage';
function App(): React.JSX.Element {
  return (
    <BaseLayout>
      <MainPage />
      <IconPickerModal />
      <DetailPage />
    </BaseLayout>
  );
}

export default App;

const BaseLayout = styled.View`
  padding: 0 ${scale(22)}px;
  padding-top: ${verticalScale(40)}px;
`;
