import styled from 'styled-components';
import {View} from 'react-native';

import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import MainPage from './pages/MainPage';
import IconPickerModal from './components/modal/iconPickerModal/IconPickerModal';
function App(): React.JSX.Element {
  return (
    <BaseLayout>
      <MainPage />
      <IconPickerModal />
    </BaseLayout>
  );
}

export default App;

const BaseLayout = styled.View`
  padding: 0 ${scale(22)}px;
  padding-top: ${verticalScale(40)}px;
`;
