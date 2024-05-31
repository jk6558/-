/*
import React from 'react';
import { StyleSheet, View, Button, TextInput } from 'react-native';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './SplashScreen';
import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';
import SignUpScreen from './SignUpScreen';
import FriendsScreen from './FriendsScreen';
import FriendsList from './FriendsList';
import SendMessage from './SendMessage';
import ReceiveMessage from './ReceiveMessage';
import LoginScreen from './LoginScreen';
import ProfileScreen from './ProfileScreen';
import ProfileEditScreen from './ProfileEditScreen';
import FriendsVoteScreen from './FriendsVoteScreen';
import MessageDetailScreen from './MessageDetailScreen'; // 새로운 화면 추가

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyDfZClRwdqLUxKtACQpf2pc5XlTWIX9Ucc",
  authDomain: "project1-fb.firebaseapp.com",
  projectId: "project1-fb",
  storageBucket: "project1-fb.appspot.com",
  messagingSenderId: "224059786464",
  appId: "1:224059786464:web:95542531811ac0cb6cfc85",
  measurementId: "G-6DY1XE1RDH"
};

// Firebase 앱 초기화
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Firebase 인증 객체 초기화
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  button: {
    padding: 10,
    backgroundColor: '#1DA1F2',
    marginBottom: 10,
  }
});

// 스택 네비게이터 설정
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: '회원가입' }} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Friends" component={FriendsScreen} options={{ title: '친구 추천 목록' }} />
        <Stack.Screen name="FriendsList" component={FriendsList} options={{ title: '등록된 친구 목록' }} />
        <Stack.Screen name="SendMessage" component={SendMessage} options={{ title: '메시지 보내기' }} />
        <Stack.Screen name="ReceiveMessage" component={ReceiveMessage} options={{ title: '받은 메시지들' }} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: '프로필 수정' }}/>
        <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
        <Stack.Screen name="FriendsVote" component={FriendsVoteScreen} options={{ title: '내 친구들 투표하기' }} />
        <Stack.Screen name="MessageDetail" component={MessageDetailScreen} options={{ title: '메시지 세부 정보' }} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
*/

/////////////

/*
// MessageDetailScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MessageDetailScreen = ({ route }) => {
  const { message } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.messageText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  messageText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default MessageDetailScreen;


*/

/////////////

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MessageDetailScreen = ({ route }) => {
  const { message } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.messageTitle}>Message Detail</Text>
      <Text style={styles.messageText}>{message.message || message.text}</Text>
      <Text style={styles.timestamp}>{message.receivedTime}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  messageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  messageText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  timestamp: {
    fontSize: 14,
    color: '#666',
  },
});

export default MessageDetailScreen;

