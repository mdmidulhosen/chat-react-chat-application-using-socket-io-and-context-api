import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Dimensions,
  TextInput,
} from 'react-native';
const {width, height} = Dimensions.get('screen');

const ModalComponent = ({modalVisible, setModalVisible}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput placeholder='Your Group Name' style={styles.input} placeholderTextColor="#703efe"/>
            <View style={styles.betweenJustify}>
              <Pressable onPress={() => console.log("Add Group Pressed")}>
                <Text style={styles.buttonClose}>Add</Text>
              </Pressable>
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.buttonClose}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
// setModalVisible(!modalVisible)
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: width * 0.8,
  },
  button: {
    borderRadius: 12,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#703efe',
    color: 'white',
    borderRadius: 12,
    width: width * 0.25,
    textAlign: 'center',
    paddingVertical: 12,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  betweenJustify: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width:'100%'
  },
  input: {
    borderColor: '#703efe',
    borderWidth: 2,
    borderRadius: 12,
    marginBottom: 14,
    paddingLeft: 20,
    width:'100%'
  },
});

export default ModalComponent;
