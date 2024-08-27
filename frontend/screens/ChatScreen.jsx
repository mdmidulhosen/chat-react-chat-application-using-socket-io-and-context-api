import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AndIcon from 'react-native-vector-icons/AntDesign';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GlobalContext} from '../context';
import ModalComponent from '../components/Modal';
import {socket} from '../utils';

const {width, height} = Dimensions.get('screen');

const ChatScreen = () => {
  const {currentUser, allChatRooms, setAllChatRooms} =
    useContext(GlobalContext);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const getGroups = async () => {
      try {
        socket.emit('getAllGroups');
        socket.on('groupList', groups => {
          console.log('Received group list: ', groups);
          setAllChatRooms(groups);
        });
      } catch (error) {
        console.error('Error fetching groups: ', error);
      }
    };

    getGroups();
    return () => {
      socket.off('groupList');
    };
  }, [socket]);

  const handlePress = item => {
    console.log('Selected Item:', item);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => handlePress(item)}
      style={styles.itemContainer}>
      <MCIcon
        name="account-circle"
        size={50}
        color="#703efe"
        style={styles.icon}
      />
      <View style={styles.textContainer}>
        <View style={styles.header}>
          <Text style={styles.groupName}>{item.groupName}</Text>
          <Text style={styles.timestamp}>10:30 AM</Text>
        </View>
        <Text style={styles.messagePreview}>Hello, How are you?</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.betweenWrapper}>
        <View></View>
        <Text style={styles.title}>{currentUser}</Text>
        <AndIcon name="logout" color="#703efe" size={26} />
      </View>
      <FlatList
        data={allChatRooms}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
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
    color: '#703efe',
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
  itemContainer: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  groupName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  timestamp: {
    color: '#999',
    fontSize: 12,
  },
  messagePreview: {
    color: '#666',
    marginTop: 5,
  },
});
export default ChatScreen;
