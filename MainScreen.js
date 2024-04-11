//MainScreen.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MainScreen = () => {
  const navigation = useNavigation();

  // 상태 변수 정의
  const [loginModalVisible, setLoginModalVisible] = useState(false); // 로그인 모달 상태 변수
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 회원가입 처리 함수
  const handleSignUp = () => {
    // 회원가입 로직
  }

  // 로그인 처리 함수
  const handleSignIn = () => {
    // 로그인 로직
  }

  return (
    <View style={styles.container}>
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
    </View>
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

export default MainScreen;
