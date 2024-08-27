import { Platform } from 'react-native';
import { io } from 'socket.io-client';

export const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';
export const socket = io('http://10.0.2.2:4000');


socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('connect_error', (err) => {
  console.log('Connection error:', err);
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});
