import {Pressable} from 'react-native';
import {scale} from 'react-native-size-matters';
import CustomText from '../../CustomText';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import IconGrid from './IconGrid';
import {useCallback} from 'react';
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';

const IconPickerModal = ({bottomSheetRef}) => {
  const handleIconSelect = icon => {
    onSelectIcon(icon); // 선택된 아이콘으로 업데이트
    setIsModalVisible(false); // 모달 닫기
  };

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      backgroundStyle={{backgroundColor: '#FFF'}}
      snapPoints={['50%', '80%']}
      maxDynamicContentSize={scale(400)}
      backdropComponent={props => (
        <Pressable
          onPress={() => bottomSheetRef.current?.dismiss()}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      )}>
      <BottomSheetContainer>
        <TitletContainer>
          <TitleText weight="semi-bold">아이콘 선택</TitleText>
        </TitletContainer>
        <IconWrapper>
          <IconGrid onSelectIcon={handleIconSelect} />
        </IconWrapper>
      </BottomSheetContainer>
    </BottomSheetModal>
  );
};

const BottomSheetContainer = styled(BottomSheetView)`
  flex: 1;
  background-color: white;
`;

const TitletContainer = styled.View`
  justify-content: center;
  margin: ${scale(15)}px 0 ${scale(20)}px 0;
`;

const TitleText = styled(CustomText)`
  margin-left: ${scale(40)}px;
  font-size: ${scale(18)}px;
`;

const IconWrapper = styled.ScrollView``;

export default IconPickerModal;
