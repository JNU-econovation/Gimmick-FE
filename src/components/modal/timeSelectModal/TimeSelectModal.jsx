import React, {useState, useCallback} from 'react';
import {scale} from 'react-native-size-matters';
import styled from 'styled-components/native';
import CustomText from '../../CustomText';
import {Picker} from 'react-native-wheel-pick';
import {Pressable} from 'react-native';
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';

const TimeSelectModal = ({bottomSheetRef, onHandleTimeSelect}) => {
  const [hour, setHour] = useState('00');
  const [minute, setMinute] = useState('00');

  const generatePickerItems = (limit, step = 1) =>
    Array.from({length: Math.ceil(limit / step)}, (_, i) =>
      String(i * step).padStart(2, '0'),
    );

  const handleConfirm = () => {
    onHandleTimeSelect(hour, minute);
    bottomSheetRef.current?.close();
  };

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      backgroundStyle={{backgroundColor: '#FFFFFF'}}
      onDismiss={() => bottomSheetRef.current?.dismiss()}
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
      <BottomSheetView>
        <HeaderContainer>
          <TitleText weight="semi-bold">시간 설정</TitleText>
        </HeaderContainer>
        <PickerContainer>
          <PickerWrapper>
            <Picker
              style={{
                backgroundColor: 'white',
                width: scale(100),
                height: scale(200),
              }}
              selectedValue={hour}
              pickerData={generatePickerItems(100)}
              onValueChange={value => setHour(value)}
            />
          </PickerWrapper>
          <ColonText>:</ColonText>
          <PickerWrapper>
            <Picker
              style={{
                backgroundColor: 'white',
                width: scale(100),
                height: scale(200),
              }}
              selectedValue={minute}
              pickerData={generatePickerItems(60)}
              onValueChange={value => setMinute(value)}
            />
          </PickerWrapper>
        </PickerContainer>
        <ButtonContainer>
          <ButtonWrapper onPress={handleConfirm}>
            <CustomText
              style={{color: 'black', fontSize: scale(14)}}
              weight="semi-bold">
              확인
            </CustomText>
          </ButtonWrapper>
        </ButtonContainer>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const HeaderContainer = styled.View`
  justify-content: center;
  margin: ${scale(15)}px 0 0 0;
`;

const TitleText = styled(CustomText)`
  margin-left: ${scale(30)}px;
  font-size: ${scale(18)}px;
`;

const PickerContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const PickerWrapper = styled.View``;

const ColonText = styled(CustomText)`
  font-size: ${scale(24)}px;
  font-weight: bold;
`;

const ButtonContainer = styled.View`
  justify-content: center;
  margin: 0 0 ${scale(20)}px 0;
  align-items: center;
`;

const ButtonWrapper = styled.TouchableOpacity`
  width: 20%;
  height: ${scale(30)}px;
  justify-content: center;
  align-items: center;
`;

export default TimeSelectModal;
