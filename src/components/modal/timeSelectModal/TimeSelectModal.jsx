import React, {useState} from 'react';
import {scale} from 'react-native-size-matters';
import styled from 'styled-components/native';
import CustomModal from '../CustomModal';
import CustomText from '../../CustomText';
import CloseButton from '../../common/CloseButton';
import {Button} from 'react-native';
import {Picker} from 'react-native-wheel-pick';

const TimeSelectModal = ({isVisible, onClose, onHandleTimeSelect}) => {
  const [hour, setHour] = useState('00');
  const [minute, setMinute] = useState('00');

  const generatePickerItems = limit =>
    Array.from({length: limit}, (_, i) => String(i).padStart(2, '0'));

  const handleConfirm = () => {
    onHandleTimeSelect(hour, minute);
    onClose();
  };

  return (
    <CustomModal visible={isVisible} onClose={onClose}>
      <ModalContainer>
        <HeaderContainer>
          <TitleText weight="semi-bold">시간 설정</TitleText>
          <StyledCloseButton onClose={onClose} />
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
              pickerData={generatePickerItems(1000)}
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
          <Button title="확인" onPress={handleConfirm} />
        </ButtonContainer>
      </ModalContainer>
    </CustomModal>
  );
};

const ModalContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-top-left-radius: ${scale(10)}px;
  border-top-right-radius: ${scale(10)}px;
  background-color: white;
  padding: ${scale(20)}px;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TitleText = styled(CustomText)`
  font-size: ${scale(18)}px;
`;

const StyledCloseButton = styled(CloseButton)`
  position: absolute;
  right: ${scale(10)}px;
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
`;

export default TimeSelectModal;
