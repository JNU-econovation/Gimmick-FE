import React from 'react';
import {Modal, View} from 'react-native';
import styled from 'styled-components/native';

const CustomModal = ({visible, onClose, children}) => {
  return (
    <Modal visible={visible} transparent={true} animationType="none">
      <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)'}}></View>
      <Modal
        visible={visible}
        transparent={true}
        onRequestClose={onClose}
        animationType="slide">
        <View
          style={{
            flex: 1,
          }}>
          {children}
        </View>
      </Modal>
    </Modal>
  );
};

export default CustomModal;
