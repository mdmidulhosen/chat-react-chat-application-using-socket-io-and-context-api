import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import MessageScreen from './screens/MessageScreen';
import GlobalState from './context';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <GlobalState>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Message"
            component={MessageScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar hidden={true}/>
    </GlobalState>
  );
};

export default App;
