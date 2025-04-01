import {useState, useEffect} from 'react';
import {Platform, Alert, KeyboardAvoidingView} from 'react-native';
import {scale} from 'react-native-size-matters';
import CustomText from '../components/CustomText';
import styled from 'styled-components/native';
import ColorPicker from '../components/common/ColorPicker';
import InputComponent from '../components/folderCreate/InputComponent';
import IconPicker from '../components/common/IconPicker';
import Header from '../components/common/Header';
import IconPickerModal from '../components/modal/iconPickerModal/IconPickerModal';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FolderUpdatePage = () => {
  const route = useRoute();
  const {folder} = route.params || {};
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(folder.icon);
  const [folderName, setFolderName] = useState(folder.folderName);
  const [folderColor, setFolderColor] = useState(folder.folderColor);
  const navigation = useNavigation();

  const onPressModalOpen = () => {
    setIsModalVisible(true);
  };

  const handleIconSelect = icon => {
    setSelectedIcon(icon);
    setIsModalVisible(false);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const updateFolderData = async () => {
    try {
      const newFolder = {
        id: folder.id,
        folderName: folderName,
        folderColor: folderColor,
        icon: selectedIcon,
        timers: [],
        createdAt: Date.now(), // 생성 시간 추가
      };

      const storedFolders = await AsyncStorage.getItem('folders');

      const updatedFolders = (
        storedFolders ? JSON.parse(storedFolders) : []
      ).map(f => (f.id === folder.id ? newFolder : f));

      await AsyncStorage.setItem('folders', JSON.stringify(updatedFolders));

      Alert.alert('저장 완료', '폴더가 성공적으로 저장되었습니다.');

      navigation.goBack();
      navigation.goBack();
    } catch (error) {
      console.error('폴더 저장 실패:', error);
      Alert.alert('저장 실패', '폴더를 저장하는 데 실패했습니다.');
    }
  };

  return (
    <KeyboardAvoidingView>
      <FolderCreateContainer
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <BaseLayout>
          <Header
            type="folderCreate"
            title="폴더 수정"
            onPressComplete={updateFolderData}
          />
          <IconPicker icon={selectedIcon} onPress={onPressModalOpen} />
          <InsertContainer>
            <FolderCreateText weight="semi-bold">폴더 이름</FolderCreateText>
            <InputWrapper value={folderName} onChangeText={setFolderName} />
            <FolderCreateText weight="semi-bold">폴더 색상</FolderCreateText>
            <ColorPicker color={folderColor} onChangeColor={setFolderColor} />
          </InsertContainer>

          {isModalVisible && (
            <IconPickerModal
              onSelectIcon={handleIconSelect}
              onClose={handleModalClose}
            />
          )}
        </BaseLayout>
      </FolderCreateContainer>
    </KeyboardAvoidingView>
  );
};

const FolderCreateContainer = styled.ScrollView`
  width: 100%;
  height: 100%;
  position: relative;
`;

const BaseLayout = styled.View`
  padding: 0 ${scale(22)}px;
  padding-top: ${Platform.select({ios: scale(25), android: scale(12)})}px;
`;

const InsertContainer = styled.View`
  margin: ${scale(20)}px 0;
`;

const InputWrapper = styled(InputComponent)``;

const FolderCreateText = styled(CustomText)`
  margin: ${scale(20)}px 0 ${scale(10)}px 0;
  font-size: ${scale(16)}px;
`;

export default FolderUpdatePage;
