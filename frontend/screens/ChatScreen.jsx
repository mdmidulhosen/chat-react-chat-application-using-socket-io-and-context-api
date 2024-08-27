import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useState} from 'react';
import AndIcon from 'react-native-vector-icons/AntDesign';
import GlobalState, {GlobalContext} from '../context';
import ModalComponent from '../components/Modal';
const {width, height} = Dimensions.get('screen');

const ChatScreen = () => {
  const {currentUser} = useContext(GlobalContext);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.betweenWrapper}>
        <View></View>
        <Text>{currentUser}</Text>
        <AndIcon name="logout" color="#703efe" size={26} />
      </View>
      <ModalComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.button}>Create a new group</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  homeImage: {
    flex: 2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    overflow: 'hidden',
    zIndex: 10,
  },
  button: {
    backgroundColor: '#703efe',
    color: 'white',
    textAlign: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    width: '100%',
  },
  betweenWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    borderColor: '#703efe',
    borderWidth: 2,
    borderRadius: 12,
    marginBottom: 4,
    paddingLeft: 20,
  },
  title: {
    color: '#000000',
    fontSize: 26,
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: 10,
  },
  subTitle: {
    color: '#cccccc',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});
export default ChatScreen;
