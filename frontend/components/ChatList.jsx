import React from 'react';
import {View, Text, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ChatList = ({data}) => {
  const handlePress = item => {
    console.log('Selected Item:', item);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => handlePress(item)} style={styles.itemContainer}>
      <Icon name="account-circle" size={50} color="#703efe" style={styles.icon} />
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
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = {
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
};

export default ChatList;
