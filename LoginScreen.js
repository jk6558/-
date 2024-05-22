
//v1
//LoginScreen.js

import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();  // Firebase authentication 인스턴스

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // 로그인 성공
        Alert.alert('로그인 성공', '환영합니다!');
        navigation.navigate('Home');  // Home 스크린으로 이동
      })
      .catch((error) => {
        // 에러 처리
        Alert.alert('로그인 실패', error.message);
      });
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');  // SignUp 스크린으로 이동
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="이메일 주소"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title="로그인"
        onPress={handleSignIn}
      />
      <Button
        title="회원가입"
        onPress={handleSignUp}  // 회원가입 버튼 클릭 이벤트
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: '80%',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray'
  }
});

export default LoginScreen;


/////////////


/*
// In LoginScreen.js or wherever it is defined
import React from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSignIn = () => {
        const auth = getAuth();
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
        <View>
            <TextInput placeholder="이메일" value={email} onChangeText={setEmail} />
            <TextInput placeholder="비밀번호" secureTextEntry value={password} onChangeText={setPassword} />
            <Button title="로그인" onPress={handleSignIn} />
        </View>
    );
};

export default LoginScreen;
*/
