/*
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
*/


////////////////

/*
//mbti 수정 버전
//SignUpScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  formContainer: {
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '50%',
    height: 40,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    width: '50%',
    height: 40,
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
    height: 40,
  },
  pickerText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  button: {
    padding: 10,
    backgroundColor: '#1DA1F2',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
  },
  emailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '50%',
    marginBottom: 10,
  },
  atSymbol: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  customDomainInput: {
    width: '40%',
  },
  emailIdInput: {
    width: '50%',
  },
});

const SignUpScreen = ({ navigation }) => {
  const [emailId, setEmailId] = useState('');
  const [customDomain, setCustomDomain] = useState('');
  const [emailDomain, setEmailDomain] = useState('이메일 선택');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [usermbti, setMbti] = useState('');
  const [loading, setLoading] = useState(false);

  const emailDomains = ['이메일 선택','gmail.com', 'naver.com', 'kakao.com', 'daum.net', '직접 입력'];
  const affiliations = ['AI데이터공학부-데이터사이언스전공', 'AI데이터공학부-인공지능전공'];
  const mbtiOptions = ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'];


  const auth = getAuth();

  const handleSignUp = async () => {
    if (loading) return;

    const fullEmail = customDomain ? `${emailId}@${customDomain}` : `${emailId}@${emailDomain}`;
    
    if (!fullEmail.includes('.') || !emailId || (!emailDomain && !customDomain)) {
      Alert.alert("회원가입 실패", "올바른 이메일 주소를 입력하세요.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("회원가입 실패", "비밀번호는 6자 이상이어야 합니다.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("회원가입 실패", "비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!name.trim()) {
      Alert.alert("회원가입 실패", "이름을 입력하세요.");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, fullEmail, password);
      const user = userCredential.user;

      const db = getFirestore();
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        name: name,
        affiliation: affiliation,
        usermbti: usermbti
      });

      Alert.alert("회원가입 성공");
      navigation.goBack();
    } catch (error) {
      console.error("Firestore 저장 실패:", error);

      if (error.code === 'auth/email-already-in-use') {
        Alert.alert("회원가입 실패", "중복된 이메일입니다.");
      } else {
        Alert.alert("회원가입 실패", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.emailContainer}>
        <TextInput
          style={[styles.input, styles.emailIdInput]}
          placeholder="이메일 아이디"
          value={emailId}
          onChangeText={setEmailId}
        />
        <Text style={styles.atSymbol}>@</Text>
        <TextInput
          style={[styles.input, styles.customDomainInput]}
          placeholder={emailDomain === '직접 입력' ? '커스텀 도메인' : emailDomain}
          value={customDomain}
          onChangeText={setCustomDomain}
          editable={emailDomain === '직접 입력'}
        />
        <Picker
          selectedValue={emailDomain}
          style={styles.picker}
          onValueChange={(itemValue) => {
            setEmailDomain(itemValue);
            if (itemValue !== '직접 입력') {
              setCustomDomain('');
            }
          }}
        >
          {emailDomains.map((domain) => (
            <Picker.Item key={domain} label={domain} value={domain} />
          ))}
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호 확인"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="이름"
        value={name}
        onChangeText={setName}
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={affiliation}
          style={styles.picker}
          onValueChange={(itemValue) => setAffiliation(itemValue)}
        >
          <Picker.Item label="소속 선택" value="" />
          {affiliations.map((affil) => (
            <Picker.Item key={affil} label={affil} value={affil} />
          ))}
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={usermbti}
          style={styles.picker}
          onValueChange={(itemValue) => setMbti(itemValue)}
        >
          <Picker.Item label="MBTI 선택" value="" />
          {mbtiOptions.map((type) => (
            <Picker.Item key={type} label={type} value={type} />
          ))}
        </Picker>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#1DA1F2" />
      ) : (
        <Button title="회원가입" onPress={handleSignUp} />
      )}
    </View>
  );
};

export default SignUpScreen;

*/


///////////////
//SignupScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    height: 40,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    height: 40,
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
    height: 40,
  },
  button: {
    padding: 10,
    backgroundColor: '#1DA1F2',
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  emailIdInput: {
    flex: 2,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  atSymbol: {
    padding: 10,
    backgroundColor: '#ccc',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  customDomainInput: {
    flex: 3,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  emailDomainPicker: {
    flex: 3,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
});

const SignUpScreen = ({ navigation }) => {
  const [emailId, setEmailId] = useState('');
  const [customDomain, setCustomDomain] = useState('');
  const [emailDomain, setEmailDomain] = useState('이메일 선택');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [usermbti, setMbti] = useState('');
  const [loading, setLoading] = useState(false);

  const emailDomains = ['이메일 선택', 'gmail.com', 'naver.com', 'kakao.com', 'daum.net', '직접 입력'];
  const affiliations = ['AI데이터공학부-데이터사이언스전공', 'AI데이터공학부-인공지능전공'];
  const mbtiOptions = ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'];

  const auth = getAuth();

  const handleSignUp = async () => {
    if (loading) return;

    const fullEmail = customDomain ? `${emailId}@${customDomain}` : `${emailId}@${emailDomain}`;

    if (!fullEmail.includes('.') || !emailId || (!emailDomain && !customDomain)) {
      Alert.alert("회원가입 실패", "올바른 이메일 주소를 입력하세요.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("회원가입 실패", "비밀번호는 6자 이상이어야 합니다.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("회원가입 실패", "비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!name.trim()) {
      Alert.alert("회원가입 실패", "이름을 입력하세요.");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, fullEmail, password);
      const user = userCredential.user;

      const db = getFirestore();
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        name: name,
        affiliation: affiliation,
        usermbti: usermbti
      });

      Alert.alert("회원가입 성공");
      navigation.goBack();
    } catch (error) {
      console.error("Firestore 저장 실패:", error);

      if (error.code === 'auth/email-already-in-use') {
        Alert.alert("회원가입 실패", "중복된 이메일입니다.");
      } else {
        Alert.alert("회원가입 실패", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.emailContainer}>
          <TextInput
            style={[styles.input, styles.emailIdInput]}
            placeholder="이메일 아이디"
            value={emailId}
            onChangeText={setEmailId}
          />
          <Text style={styles.atSymbol}>@</Text>
          {emailDomain === '직접 입력' ? (
            <TextInput
              style={[styles.input, styles.customDomainInput]}
              placeholder="커스텀 도메인"
              value={customDomain}
              onChangeText={setCustomDomain}
            />
          ) : (
            <Picker
              selectedValue={emailDomain}
              style={[styles.picker, styles.emailDomainPicker]}
              onValueChange={(itemValue) => {
                setEmailDomain(itemValue);
                if (itemValue !== '직접 입력') {
                  setCustomDomain('');
                }
              }}
            >
              {emailDomains.map((domain) => (
                <Picker.Item key={domain} label={domain} value={domain} />
              ))}
            </Picker>
          )}
        </View>
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호 확인"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="이름"
          value={name}
          onChangeText={setName}
        />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={affiliation}
            style={styles.picker}
            onValueChange={(itemValue) => setAffiliation(itemValue)}
          >
            <Picker.Item label="소속 선택" value="" />
            {affiliations.map((affil) => (
              <Picker.Item key={affil} label={affil} value={affil} />
            ))}
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={usermbti}
            style={styles.picker}
            onValueChange={(itemValue) => setMbti(itemValue)}
          >
            <Picker.Item label="MBTI 선택" value="" />
            {mbtiOptions.map((type) => (
              <Picker.Item key={type} label={type} value={type} />
            ))}
          </Picker>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#1DA1F2" />
        ) : (
          <Button title="회원가입" onPress={handleSignUp} />
        )}
      </View>
    </View>
  );
};

export default SignUpScreen;
