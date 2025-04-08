import {useState} from 'react';
import {scale} from 'react-native-size-matters';
import CustomText from '../components/CustomText';
import styled from 'styled-components/native';
import ColorPicker from '../components/common/ColorPicker';
import IconPicker from '../components/common/IconPicker';
import InputComponent from '../components/folderCreate/InputComponent';
import Header from '../components/common/Header';
import IconPickerModal from '../components/modal/iconPickerModal/IconPickerModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Alert, Platform} from 'react-native';

const FolderCreatePage = () => {
  const [selectedIcon, setSelectedIcon] = useState('🌮');
  const [folderName, setFolderName] = useState('');
  const [folderColor, setFolderColor] = useState('#FBDF60');
  const navigation = useNavigation();

  const handleIconSelect = icon => {
    setSelectedIcon(icon);
  };

  const saveFolderData = async () => {
    if (!folderName.trim()) {
      Alert.alert('저장 실패', '폴더 이름을 입력해주세요.');
      return;
    }

    try {
      const newFolder = {
        id: Date.now(),
        folderName: folderName,
        folderColor: folderColor,
        icon: selectedIcon,
        timers: [],
        createdAt: Date.now(), // 생성 시간 추가
      };

      const storedFolders = await AsyncStorage.getItem('folders');
      const updatedFolders = [
        ...(storedFolders ? JSON.parse(storedFolders) : []),
        newFolder,
      ];

      await AsyncStorage.setItem('folders', JSON.stringify(updatedFolders));
      Alert.alert('저장 완료', '폴더가 성공적으로 저장되었습니다.');

      setFolderName('');
      setFolderColor('#f7e485');
      setSelectedIcon('🌮');
      navigation.goBack();
    } catch (error) {
      console.error('폴더 저장 실패:', error);
      Alert.alert('저장 실패', '폴더를 저장하는 데 실패했습니다.');
    }
  };

  return (
    <FolderCreateContainer
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}>
      <BaseLayout>
        <Header
          type="folderCreate"
          title="폴더 생성"
          onPressComplete={saveFolderData}
        />
        <IconPicker icon={selectedIcon} onSelectIcon={handleIconSelect} />
        <InsertContainer>
          <FolderCreateText weight="semi-bold">폴더 이름</FolderCreateText>
          <InputWrapper value={folderName} onChangeText={setFolderName} />
          <FolderCreateText weight="semi-bold">폴더 색상</FolderCreateText>
          <ColorPicker color={folderColor} onChangeColor={setFolderColor} />
        </InsertContainer>
      </BaseLayout>
    </FolderCreateContainer>
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

export default FolderCreatePage;
