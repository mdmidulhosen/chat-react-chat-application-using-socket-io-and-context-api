import React from 'react';
import {View, Text, StyleSheet, Dimensions, Pressable} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import AndIcon from 'react-native-vector-icons/AntDesign';
const {height, width} = Dimensions.get('screen');

const MessageScreen = () => {
  const route = useRoute();
  const {groupId, groupName} = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.mainContent}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <AndIcon name="arrowleft" size={26} color="#703efe" />
        </Pressable>
        <Text style={styles.title}>{groupName}</Text>
        <View></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContent: {
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#703efe',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700',
  },
});
export default MessageScreen;
