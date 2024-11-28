import styled from 'styled-components';
import {View} from 'react-native';

import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import CreateSelectModal from './components/modal/createSelectModal/CreateSelectModal';
import MainPage from './pages/MainPage';
import FolderCreatePage from './pages/FolderCreatePage';
function App(): React.JSX.Element {
  return (
    <BaseLayout>
      {/* <CreateSelectModal /> */}

      {/* <MainPage /> */}
      <FolderCreatePage />
    </BaseLayout>
  );
}

export default App;

const BaseLayout = styled.View`
  padding: 0 ${scale(22)}px;
  padding-top: ${verticalScale(40)}px;
`;
