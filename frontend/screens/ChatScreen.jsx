import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import AndIcon from 'react-native-vector-icons/AntDesign';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GlobalContext} from '../context';
import ModalComponent from '../components/Modal';
import {socket} from '../utils';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('screen');

const ChatScreen = () => {
  const {
    currentUser,
    allChatRooms,
    setAllChatRooms,
    setCurrentUser,
    setShowLoginView,
  } = useContext(GlobalContext);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const getGroups = async () => {
      try {
        socket.emit('getAllGroups');
        socket.on('groupList', groups => {
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

  useEffect(() => {
    if (currentUser.trim() === '') {
      navigation.navigate('Home');
    }
  }, [currentUser]);

  const handleChatItemPress = (item) => {
    navigation.navigate('Message', {
      groupId: item.id,
      groupName: item.groupName,
    });
  };

  const handleLogout = () => {
    setCurrentUser('');
    setShowLoginView(false);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => handleChatItemPress(item)}
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
        <TouchableOpacity
          onPress={() => console.log('will go to profile screen')}>
          <MCIcon
            name="account-circle"
            size={35}
            color="#703efe"
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{currentUser}</Text>
        <TouchableOpacity onPress={handleLogout}>
          <AndIcon name="logout" color="#703efe" size={26} />
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={allChatRooms}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()} // Ensure IDs are strings
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
  title: {
    color: '#703efe',
    fontSize: 26,
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: 10,
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
