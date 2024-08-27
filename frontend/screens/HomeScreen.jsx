import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Pressable,
  Alert,
  Keyboard,
} from 'react-native';
import React, {useContext} from 'react';
import homeImage from '../assets/images/home-image.jpg';
import {GlobalContext} from '../context';
const {height, width} = Dimensions.get('screen');

const HomeScreen = () => {
  const {
    showLoginView,
    setShowLoginView,
    currentUserName,
    setCurrentUserName,
    currentUser,
    setCurrentUser,
    allUser,
    setAllUser,
  } = useContext(GlobalContext);
  console.log(currentUserName.trim());

  const handleRegisterAndLogin = isLogin => {
    if (currentUserName.trim() !== '') {
      const index = allUser.findIndex(userItem => userItem === currentUserName);
      if (isLogin) {
        if (index === -1) {
          Alert.alert('Please Register First.');
        } else {
          setCurrentUser(setCurrentUserName);
        }
      } else {
        if (index === -1) {
          allUser.push(currentUserName);
          setAllUser(allUser);
          setCurrentUser(setCurrentUserName);
        } else {
          Alert.alert('Already registered, please login!');
        }
      }
      setCurrentUserName('');
    } else {
      Alert.alert('User name field is empty!');
    }
    Keyboard.dismiss();
  };
  return (
    <View style={styles.mainWrapper}>
      <ImageBackground style={styles.homeImage} source={homeImage} />
      <View style={styles.content}>
        {showLoginView ? (
          <View style={{width: '100%'}}>
            <Text style={styles.title}>Give your information</Text>
            <TextInput
              placeholder="Enter Your User Name"
              style={styles.input}
              onChangeText={setCurrentUserName}
              value={currentUserName}
            />
            <View style={styles.betweenWrapper}>
              <TouchableOpacity onPress={() => handleRegisterAndLogin(false)}>
                <Text style={styles.button}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleRegisterAndLogin(true)}>
                <Text style={styles.button}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View>
            <Text style={styles.title}>Connect, Grow & Inspire</Text>
            <Text style={styles.subTitle}>
              Connect with people around the world for free
            </Text>
            <Pressable onPress={() => setShowLoginView(true)}>
              <Text style={styles.button}>Get Started</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
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
    paddingHorizontal: 70,
    borderRadius: 12,
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

export default HomeScreen;
