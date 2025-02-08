import React from 'react';
import type {PropsWithChildren} from 'react';
import {View, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import {Touch} from '../components';
import {colors} from '../theme';

interface FrameTypes extends PropsWithChildren {
  isModalVisible?: boolean;
  closeModal?: (args: any) => any;
}
function Frame({
  children,
  isModalVisible,
  closeModal,
}: FrameTypes): React.JSX.Element {
  return (
    <Modal
      animationType="slide" // Options: 'none', 'slide', 'fade'
      transparent={true} // Makes the overlay transparent
      visible={isModalVisible}
      onRequestClose={closeModal} // Handles back button press on Android
    >
      {/* Overlay */}
      <TouchableOpacity style={styles.overlay} onPress={closeModal}>
        {/* Empty to capture taps on the overlay */}
      </TouchableOpacity>

      {/* Modal Content */}
      <View style={styles.frameContent}>
        <Touch
          icon="close"
          stroke={colors.dusk}
          colorCode={colors.base}
          onPress={closeModal}
        />

        {children}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.frameEffect, // Semi-transparent black
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  frameContent: {
    marginTop: 100,
    position: 'relative',
    alignSelf: 'center',

    height: '70%',
    width: '80%',
    backgroundColor: colors.base,
    borderRadius: 10,
    padding: 1,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Frame;
