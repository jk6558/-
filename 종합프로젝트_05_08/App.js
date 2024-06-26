/*
//v1
//App.js
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
import FriendsScreen from './FriendsScreen'; 
import FriendsList from './FriendsList'; //
import SendMessage from './SendMessage';





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
        <Stack.Screen name="Friends" component={FriendsScreen} options={{ title: '친구 추천 목록' }} />
        <Stack.Screen name="FriendsList" component={FriendsList} options={{ title: '등록 된 친구 목록' }} />
        <Stack.Screen name="SendMessage" component={SendMessage} options={{ title: 'Send Message' }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
*/
///////////////////////


/*
//v2 메세지 수신 가능
//App.js
import React from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './SplashScreen';
import HomeScreen from './HomeScreen'; 
import SettingsScreen from './SettingsScreen'; 
import SignUpScreen from './SignUpScreen';  
import FriendsScreen from './FriendsScreen'; 
import FriendsList from './FriendsList'; 
import SendMessage from './SendMessage';
import ReceiveMessage from './ReceiveMessage';

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
const auth = getAuth(app);  // 변경된 부분

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
        <Stack.Screen name="Friends" component={FriendsScreen} options={{ title: '친구 추천 목록' }} />
        <Stack.Screen name="FriendsList" component={FriendsList} options={{ title: '등록 된 친구 목록' }} />
        <Stack.Screen name="SendMessage" component={SendMessage} options={{ title: '메세지 보내기' }} />
        <Stack.Screen name="ReceiveMessage" component={ReceiveMessage} options={{ title: 'Received Messages' }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
*/
//App.js
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
import FriendsScreen from './FriendsScreen'; 
import FriendsList from './FriendsList'; 
import SendMessage from './SendMessage';
import ReceiveMessage from './ReceiveMessage';
import LoginScreen from './LoginScreen'; 


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

//수정전
/*
const app = initializeApp(firebaseConfig);
// 이 부분이 변경되었습니다. 인증을 AsyncStorage와 함께 초기화합니다.
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
*/

// Firebase Auth 초기화
const app = initializeApp(firebaseConfig);
let auth;
try {
    auth = getAuth();
} catch (error) {
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });
}


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
        <Stack.Screen name="Friends" component={FriendsScreen} options={{ title: '친구 추천 목록' }} />
        <Stack.Screen name="FriendsList" component={FriendsList} options={{ title: '등록된 친구 목록' }} />
        <Stack.Screen name="SendMessage" component={SendMessage} options={{ title: '메시지 보내기' }} />
        <Stack.Screen name="ReceiveMessage" component={ReceiveMessage} options={{ title: '받은 메시지들' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
