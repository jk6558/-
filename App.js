/*//App.js
import React from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './SplashScreen';
import HomeScreen from './HomeScreen'; 
import SettingsScreen from './SettingsScreen'; 
import SignUpScreen from './SignUpScreen';  
import ProfileEditScreen from './ProfileEditScreen';

// Firebase 초기화
const firebaseConfig = {
  apiKey: "AIzaSyDfZClRwdqLUxKtACQpf2pc5XlTWIX9Ucc",
  authDomain: "project1-fb.firebaseapp.com",
  projectId: "project1-fb",
  storageBucket: "project1-fb.appspot.com",
  messagingSenderId: "224059786464",
  appId: "1:224059786464:web:95542531811ac0cb6cfc85",
  measurementId: "G-6DY1XE1RDH"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
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
  },
  buttonText: {
    color: 'white',
  }
});

// 로그인 화면 컴포넌트
const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        Alert.alert('로그인 성공');
        navigation.navigate('Home');
      })
      .catch(error => {
        Alert.alert('로그인 실패', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="이메일" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="비밀번호" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="로그인" onPress={handleSignIn} />
      <Button title="회원가입" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
};

// 스택 네비게이터 생성 및 앱 정의
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
        <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}*/

import React from 'react';
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
import ProfileEditScreen from './ProfileEditScreen';
//추가된 부분.
import { useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

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
//const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const app = initializeApp(firebaseConfig);

// Firebase 인증 객체 초기화
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// 알림 설정
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const registerForPushNotificationsAsync = async () => {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      Alert.alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    Alert.alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
};

// 스택 네비게이터 설정
const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);
  
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
        <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}