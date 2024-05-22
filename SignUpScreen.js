//SignUpScreen.js

import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';  // `setDoc`과 `doc`를 임포트합니다.

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

// SignUpScreen 컴포넌트 정의
const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const auth = getAuth(); // Firebase Auth 인스턴스 가져오기

  const handleSignUp = async () => {
     // 입력 유효성 검사
  if (!email.includes('@')) {
    Alert.alert("회원가입 실패", "올바른 이메일 주소를 입력하세요.");
    return;
  }
  if (password.length < 6) {
    Alert.alert("회원가입 실패", "비밀번호는 6자 이상이어야 합니다.");
    return;
  }
    try {
      // Firebase Auth를 이용한 사용자 등록
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Firestore에 사용자의 추가 정보 저장
      const db = getFirestore();
      const userDocRef = doc(db, "users", user.uid); // 문서 참조 생성
      await setDoc(userDocRef, {
        name: name,
        affiliation: affiliation
      });
  
      Alert.alert("회원가입 성공");
      navigation.goBack();  // 회원가입 성공 후 로그인 화면으로 돌아가기
    } catch (error) {
      console.error("Firestore 저장 실패:", error);
      Alert.alert("회원가입 실패", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="이메일" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="비밀번호" secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput style={styles.input} placeholder="이름" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="소속" value={affiliation} onChangeText={setAffiliation} />
      <Button title="회원가입" onPress={handleSignUp} />
    </View>
  );
};

export default SignUpScreen;
