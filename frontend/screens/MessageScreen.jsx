import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  TextInput,
  FlatList,
  Keyboard,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import AndIcon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {GlobalContext} from '../context';
import {socket} from '../utils';

const {height, width} = Dimensions.get('screen');

const MessageScreen = () => {
  const route = useRoute();
  const {groupId, groupName} = route.params;
  const navigation = useNavigation();
  // const flatListRef = useRef(null);

  const {message, setMessage, messages, setMessages, currentUser, allUser} =
    useContext(GlobalContext);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {id: (messages.length + 1).toString(), text: message};
      setMessages([...messages, newMessage]);
      setMessage('');
    }
    const timeData = {
      hr:
        new Date().getHours() < 10
          ? `0${new Date().getHours()}`
          : new Date().getHours(),
      mins:
        new Date().getMinutes() < 10
          ? `0${new Date().getMinutes()}`
          : new Date().getMinutes(),
    };
    if (currentUser) {
      socket.emit('newChatMessage', {
        currentUser,
        message,
        timeData,
        groupId,
      });
      setMessage('');
      Keyboard.dismiss();
    }
  };

  // useEffect(() => {
  //   // Scroll to the end when the component mounts or when messages change
  //   if (flatListRef.current) {
  //     flatListRef.current.scrollToEnd({ animated: true });
  //   }
  // }, [messages]);

  useEffect(() => {
    sendMessage();
    console.log("object")
    socket.emit('findGroup', groupId);
    const handleFoundGroup = allChats => {
      setMessages(allChats);
    };
    socket.on('foundGroup', handleFoundGroup);
    return () => {
      socket.off('foundGroup', handleFoundGroup);
    };
  }, [groupId]);

  // Separate messages from currentUser and others
  const currentUserMessages = messages.filter(
    msg => msg.currentUser === currentUser,
  );
  const othersMessages = messages.filter(
    msg => msg.currentUser !== currentUser,
  );

  const renderMessageItem = ({item}) => {
    const isCurrentUser = item.currentUser === currentUser;
    console.log('check Input', item.text);
    return (
      <>
        
          <View
            style={[
              styles.messageItem,
              isCurrentUser
                ? styles.currentUserMessage
                : styles.otherUserMessage,
            ]}>
            <Text style={styles.userTitle}>{item.currentUser}</Text>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
      </>
    );
  };

  return (
    <View style={styles.mainContent}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <AndIcon name="arrowleft" size={26} color="#703efe" />
        </Pressable>
        <Text style={styles.title}>{groupName}</Text>
        <View></View>
      </View>

      <FlatList
        // ref={flatListRef}
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={item => item.id}
        style={styles.messagesList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message"
          style={styles.input}
          placeholderTextColor="#703efe"
        />
        <Pressable
          onPress={sendMessage}
          style={[styles.sendButton, {opacity: message.trim() ? 1 : 0.5}]}
          disabled={!message.trim()}>
          <IonIcon name="send" size={26} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#703efe',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700',
  },
  messagesList: {
    flex: 1,
    marginTop: 10,
  },
  messageItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    marginVertical: 5,
    alignSelf: 'flex-start',
    backgroundColor: '#703efe',
  },
  othersMessages: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    marginVertical: 5,
    alignSelf: 'flex-start',
    backgroundColor: 'red',
  },
  messageText: {
    color: '#ffffff',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#f1f1f1',
    borderRadius: 25,
    fontSize: 16,
    borderColor: '#703efe',
    borderWidth: 2,
    color: '#703efe',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#703efe',
    borderRadius: 25,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    fontSize: 10,
    color: '#ffffff90',
  },
  currentUserMessage: {
    backgroundColor: '#703efe',
    alignSelf: 'flex-end',
    marginLeft: 'auto',
  },
  otherUserMessage: {
    backgroundColor: '#d43efe',
    alignSelf: 'flex-start',
  },
  userTitle: {
    color: '#ffffff',
    fontSize: 10,
    backgroundColor: '#ffffff30',
    paddingHorizontal: 10,
    borderRadius: 4,
    textAlign: 'center',
  },
});

export default MessageScreen;
