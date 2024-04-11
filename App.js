//App.js
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import SecondScreen from './SecondScreen';
import MainScreen from './MainScreen'; // MainScreen을 import

// Firebase 설정
const firebaseConfig = {
  // Firebase 구성 정보
  apiKey: "AIzaSyDfZClRwdqLUxKtACQpf2pc5XlTWIX9Ucc",
  authDomain: "project1-fb.firebaseapp.com",
  projectId: "project1-fb",
  storageBucket: "project1-fb.appspot.com",
  messagingSenderId: "224059786464",
  appId: "1:224059786464:web:95542531811ac0cb6cfc85",
  measurementId: "G-6DY1XE1RDH"
};

let app = null;
let auth = null;

// Firebase 앱 초기화
const initializeFirebase = () => {
  if (!app) {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });
  }
}

const Stack = createStackNavigator();

export default function App() {
  // Firebase 초기화
  useEffect(() => {
    initializeFirebase();
  }, []);

  // 상태 변수 정의
  const [loginModalVisible, setLoginModalVisible] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // 회원가입 처리 함수
  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        Alert.alert('회원가입 성공');
      })
      .catch(error => {
        Alert.alert('회원가입 실패', error.message);
      });
  }

  // 로그인 처리 함수
  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        Alert.alert('로그인 성공');
        setLoginModalVisible(false);
      })
      .catch(error => {
        Alert.alert('로그인 실패', error.message);
      });
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="SecondScreen" component={SecondScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
