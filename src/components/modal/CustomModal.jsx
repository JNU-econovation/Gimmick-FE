import React from 'react';
import {Modal, View} from 'react-native';
import styled from 'styled-components/native';

const CustomModal = ({visible, onClose, children}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={onClose}
      animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        }}>
        {children}
      </View>
    </Modal>
  );
};

export default CustomModal;
