// AliasAddressModal.js
import React from 'react';
import { Modal, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
const JangoAddressModal = ({ visible, onClose, title, message, buttonText, onPress }) => (
  <Modal
    transparent
    visible={visible}
    animationType="slide"
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.messageText}>{message}</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Image
            source={require("../assets/images/close.png")}
            style={styles.closeIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: moderateScale(20), // Use moderateScale for dynamic scaling
    borderRadius: moderateScale(10), // Use moderateScale for dynamic scaling
    width: moderateScale(300), // Use moderateScale for dynamic scaling
  },
  titleText: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'GenBkBasB',
    fontSize: moderateScale(12), // Use moderateScale for dynamic scaling
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: moderateScale(17.28), // Use moderateScale for dynamic scaling
  },
  messageText: {
    color: '#36B422',
    textAlign: 'center',
    fontFamily: 'GenBkBasB',
    fontSize: moderateScale(14), // Use moderateScale for dynamic scaling
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: moderateScale(20.16), // Use moderateScale for dynamic scaling
    letterSpacing: moderateScale(0.56), // Use moderateScale for dynamic scaling
    textDecorationLine: 'underline',
  },
  closeButton: {
    position: 'absolute',
    top: moderateScale(10), // Use moderateScale for dynamic scaling
    right: moderateScale(10), // Use moderateScale for dynamic scaling
  },
  closeIcon: {
    width: moderateScale(8.45), // Use moderateScale for dynamic scaling
    height: moderateScale(8.45), // Use moderateScale for dynamic scaling
  },
  button: {
    marginTop: moderateScale(15), // Use moderateScale for dynamic scaling
    backgroundColor: 'blue',
    padding: moderateScale(10), // Use moderateScale for dynamic scaling
    borderRadius: moderateScale(5), // Use moderateScale for dynamic scaling
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default JangoAddressModal;
