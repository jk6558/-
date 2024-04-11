import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, Button, Alert } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

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

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function App() {
  // 상태 변수 정의
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    <TouchableOpacity onPress={() => setLoginModalVisible(true)} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>극찬</Text>
      </View>

      {/* 로그인 모달 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={loginModalVisible}
        onRequestClose={() => setLoginModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>로그인</Text>
            {/* 이메일 및 비밀번호 입력 폼 */}
            <TextInput
              style={styles.input}
              placeholder="이메일"
              onChangeText={setEmail}
              value={email}
            />
            <TextInput
              style={styles.input}
              placeholder="비밀번호"
              onChangeText={setPassword}
              value={password}
              secureTextEntry
            />
            {/* 회원가입 및 로그인 버튼 */}
            <Button title="회원가입" onPress={handleSignUp} />
            <Button title="로그인" onPress={handleSignIn} />
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1DA1F2',
    padding: 20,
  },
  title: {
    fontSize: 110,
    fontWeight: 'bold',
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
});
