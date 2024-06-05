//SettingsScreen.js
/*
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function SettingScreen() {
  return (
    <View style={styles.container}>
      <Text>설정 화면입니다.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
*/
//////////////////

/*
//SettingScreen.js

import React, { useState } from 'react';
import { StyleSheet, View, Text, Switch, Button } from 'react-native';

export default function SettingsScreen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>설정 화면입니다.</Text>
      <View style={styles.settingOption}>
        <Text>알림 받기:</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <Button title="테마 변경" onPress={() => console.log('테마 변경')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  settingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});

*/
/////////////////

/*
//SettingsScreen.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Switch, TouchableOpacity, Alert, Vibration } from 'react-native';
import { Card, Title, Paragraph, Button, Provider as PaperProvider } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { getFirestore, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut, deleteUser } from 'firebase/auth';

export default function SettingScreen() {
  const handleFriend = () => {
        Alert.alert('알림', '친구목록');
    };

    const handleLike = () => {
      Alert.alert('알림', '칭찬받은목록!');
    };

    const handleSetting = () => {
      navigation.navigate('Settings');
    };

    const handleEnd = () => {
      BackHandler.exitApp();
    };
    
  const [vibrationEnabled, setVibrationEnabled] = useState(false);

  const navigation = useNavigation();
  const [users, setUserData] = useState({});

  
  useEffect(() => {
    //프로필 수정
    const fetchUserData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      const db = getFirestore();
      const userDocRef = doc(db, "users", user.uid); // your_user_id에는 사용자의 식별자를 넣어야 합니다.
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        setUserData(userDocSnap.data());
      } else {
        Alert.alert("등록된 사용자 정보를 불러올 수 없습니다.");
      }
    };

    fetchUserData();
  }, []);

  const handleProfileEdit = async () => {
    navigation.navigate('ProfileEdit');
  };


  //진동 함수
  const toggleVibration = () => {
    setVibrationEnabled(!vibrationEnabled);
    if (vibrationEnabled) {
      Vibration.cancel();
    }
  };

  //알림 처리 함수
  //const toggleNotifications = () => {};

   // 로그아웃 처리 함수
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('로그아웃 성공');
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.error('로그아웃 실패:', error.message);
      });
  };

  //계정삭제 함수
  const handleDeleteAccount = () => {
    const auth = getAuth();
    
    deleteUser(auth.currentUser)
      .then(() => {
        // 계정 삭제 성공
        Alert.alert('계정 삭제 성공', '계정이 성공적으로 삭제되었습니다.');
        navigation.navigate('Login'); // 로그인 화면으로 이동
      })
      .catch((error) => {
        // 계정 삭제 실패
        Alert.alert('계정 삭제 실패', error.message);
      });
  };

  return (
    <View style={styles.container}>
      {/* 본인 프로필 정보 *//*}/*
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>내 프로필</Text>
          <View>
            <Text style={styles.text}>이름: {users.name}</Text>
            <Text style={styles.text}>소속: {users.affiliation}</Text>
          </View>
      </View>
      */

      {/*프로필 변경*//*}/*
      <View style={styles.section}>
        <TouchableOpacity style={styles.item} onPress={handleProfileEdit}>
          <Text style={styles.sectionTitle}>프로필 정보 수정</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </TouchableOpacity>
        </View>
      {/* 알림 설정 *//*}/*
      <View style={styles.section}>
       <Text style={styles.sectionTitle}>알림 설정</Text>
       <View style={styles.item}>
         <Text>알림 허용</Text>
         <Switch />
      </View>
      {/*진동 허용*/ }/*
      <View style={styles.section}>
        <View style={styles.item}></View>
          <Text>진동 허용</Text>
          <Switch value={vibrationEnabled} onValueChange={toggleVibration} />
        </View>
      </View>

      {/* 로그아웃 *//*}/*
      <TouchableOpacity style={styles.section} onPress={handleLogout}>
        <Text style={styles.sectionTitle}>로그아웃</Text>
      </TouchableOpacity>

      {/* 계정 삭제 *//*}/*
      <TouchableOpacity style={styles.section} onPress={handleDeleteAccount}>
        <Text style={styles.sectionTitle}>계정 삭제</Text>
      </TouchableOpacity>

      <View style={styles.bottomFrame}>
          <Button onPress={handleFriend} icon={() => <MaterialIcons name="people" size={24} color="black" />}></Button>
          <Button onPress={handleLike} icon={() => <MaterialIcons name="favorite-border" size={24} color="black" />}></Button>
          <Button onPress={handleSetting} icon={() => <MaterialIcons name="settings" size={24} color="black" />}></Button>
          <Button onPress={handleEnd} icon={() => <MaterialIcons name="logout" size={24} color="black" />}></Button>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  text: {
    fontSize: 16,
  },
  bottomFrame: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0,
    },
    title: {
    fontSize: 24,
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
});
*/


/////////////////////////////

/*

//SettingsScreen.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Switch, TouchableOpacity, Alert, Vibration } from 'react-native';
import { Card, Title, Paragraph, Button, Provider as PaperProvider } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { getFirestore, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut, deleteUser } from 'firebase/auth';
//추가된부분
import * as Notifications from 'expo-notifications';

export default function SettingScreen() {
  const handleFriend = () => {
    navigation.navigate('FriendsList');
  };

  const handleLike = () => {
    navigation.navigate('ReceiveMessage');  // ReceiveMessage 스크린으로 이동
  };

  const handleSetting = () => {
    navigation.navigate('Settings');
  };

  const handleEnd = () => {
    BackHandler.exitApp();
  };
      
  const [vibrationEnabled, setVibrationEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const navigation = useNavigation();
  const [users, setUserData] = useState({});

  
  useEffect(() => {
    //프로필 수정
    const fetchUserData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      const db = getFirestore();
      const userDocRef = doc(db, "users", user.uid); // your_user_id에는 사용자의 식별자를 넣어야 합니다.
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        setUserData(userDocSnap.data());
      } else {
        Alert.alert("등록된 사용자 정보를 불러올 수 없습니다.");
      }
    };

    fetchUserData();
  }, []);

  const handleProfileEdit = async () => {
    navigation.navigate('ProfileEdit');
  };


  //진동 함수
  const toggleVibration = () => {
    setVibrationEnabled(!vibrationEnabled);
    if (vibrationEnabled) {
      Vibration.cancel();
    }
  };

  //알림 처리 함수
  const toggleNotifications = async () => {
    setNotificationsEnabled(!notificationsEnabled);
    if (!notificationsEnabled) {
      const token = await registerForPushNotificationsAsync();
      console.log('Notification token:', token);
    } else {
      Alert.alert('알림이 비활성화되었습니다.');
    }
  };

   // 로그아웃 처리 함수
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('로그아웃 성공');
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.error('로그아웃 실패:', error.message);
      });
  };

  //계정삭제 함수
  const handleDeleteAccount = () => {
    const auth = getAuth();
    
    deleteUser(auth.currentUser)
      .then(() => {
        // 계정 삭제 성공
        Alert.alert('계정 삭제 성공', '계정이 성공적으로 삭제되었습니다.');
        navigation.navigate('Login'); // 로그인 화면으로 이동
      })
      .catch((error) => {
        // 계정 삭제 실패
        Alert.alert('계정 삭제 실패', error.message);
      });
  };
*/
/*
  return (
    <View style={styles.container}>
      {/* 본인 프로필 정보 *//*}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>내 프로필</Text>
          <View>
            <Text style={styles.text}>이름: {users.name}</Text>
            <Text style={styles.text}>소속: {users.affiliation}</Text>
          </View>
      </View>
*/
     /* {/*프로필 변경*//*}/*
      <View style={styles.section}>
        <TouchableOpacity style={styles.item} onPress={handleProfileEdit}>
          <Text style={styles.sectionTitle}>프로필 정보 수정</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </TouchableOpacity>
        </View>
      {/* 알림 설정 *//*}/*
      <View style={styles.section}>
       <Text style={styles.sectionTitle}>알림 설정</Text></View>
      {/* 알림 허용 *//*}/*
      <View style={styles.section}>
       <View style={styles.item}></View>
         <Text>알림 허용</Text>
         <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
        </View>
      {/*진동 허용*//*}/*
      <View style={styles.section}>
        <View style={styles.item}></View>
          <Text>진동 허용</Text>
          <Switch value={vibrationEnabled} onValueChange={toggleVibration} />
        </View>
        */
      

      /*{/* 로그아웃 *//*}/*
      <TouchableOpacity style={styles.section} onPress={handleLogout}>
        <Text style={styles.sectionTitle}>로그아웃</Text>
      </TouchableOpacity>

      {/* 계정 삭제 *//*}
      <TouchableOpacity style={styles.section} onPress={handleDeleteAccount}>
        <Text style={styles.sectionTitle}>계정 삭제</Text>
      </TouchableOpacity>

      <View style={styles.bottomFrame}>
        <Button onPress={handleFriend} icon={() => <MaterialIcons name="people" size={24} color="#1DA1F2" />} />
        <Button onPress={handleLike} icon={() => <MaterialIcons name="favorite-border" size={24} color="#1DA1F2" />} />
        <Button onPress={handleSetting} icon={() => <MaterialIcons name="settings" size={24} color="#1DA1F2" />} />
        <Button onPress={handleEnd} icon={() => <MaterialIcons name="logout" size={24} color="#1DA1F2" />} />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  text: {
    fontSize: 16,
  },
  bottomFrame: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
    title: {
    fontSize: 24,
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
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
*/

//////////////////

/*

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Switch, TouchableOpacity, Alert, Vibration } from 'react-native';
import { Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut, deleteUser } from 'firebase/auth';
import * as Notifications from 'expo-notifications';

export default function SettingsScreen() {
  const [vibrationEnabled, setVibrationEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [user, setUser] = useState(null);

  const navigation = useNavigation();
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUser(userDocSnap.data());
        } else {
          Alert.alert("등록된 사용자 정보를 불러올 수 없습니다.");
        }
      }
    };

    fetchUserData();
  }, [auth, db]);

  const handleProfileEdit = () => {
    navigation.navigate('ProfileEdit');
  };

  const toggleVibration = () => {
    setVibrationEnabled(!vibrationEnabled);
    if (!vibrationEnabled) {
      Vibration.vibrate();
    }
  };

  const toggleNotifications = async () => {
    setNotificationsEnabled(!notificationsEnabled);
    if (!notificationsEnabled) {
      const token = await registerForPushNotificationsAsync();
      console.log('Notification token:', token);
    } else {
      Alert.alert('알림이 비활성화되었습니다.');
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('로그아웃 성공');
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.error('로그아웃 실패:', error.message);
      });
  };

  const handleDeleteAccount = () => {
    deleteUser(auth.currentUser)
      .then(() => {
        Alert.alert('계정 삭제 성공', '계정이 성공적으로 삭제되었습니다.');
        navigation.navigate('Login');
      })
      .catch((error) => {
        Alert.alert('계정 삭제 실패', error.message);
      });
  };

  const handleFriend = () => {
    navigation.navigate('FriendsList');
  };

  const handleLike = () => {
    navigation.navigate('ReceiveMessage');
  };

  const handleSetting = () => {
    navigation.navigate('Settings');
  };

  const handleEnd = () => {
    // BackHandler.exitApp(); // React Native에서는 권장되지 않음
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>내 프로필</Text>
        <View>
          <Text style={styles.text}>이름: {user?.name}</Text>
          <Text style={styles.text}>소속: {user?.affiliation}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.item} onPress={handleProfileEdit}>
          <Text style={styles.sectionTitle}>프로필 정보 수정</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>알림 설정</Text>
        <View style={styles.item}>
          <Text>알림 허용</Text>
          <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.item}>
          <Text>진동 허용</Text>
          <Switch value={vibrationEnabled} onValueChange={toggleVibration} />
        </View>
      </View>

      <TouchableOpacity style={styles.section} onPress={handleLogout}>
        <Text style={styles.sectionTitle}>로그아웃</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.section} onPress={handleDeleteAccount}>
        <Text style={styles.sectionTitle}>계정 삭제</Text>
      </TouchableOpacity>

      <View style={styles.bottomFrame}>
        <Button onPress={handleFriend} icon={() => <MaterialIcons name="people" size={24} color="#1DA1F2" />} />
        <Button onPress={handleLike} icon={() => <MaterialIcons name="favorite-border" size={24} color="#1DA1F2" />} />
        <Button onPress={handleSetting} icon={() => <MaterialIcons name="settings" size={24} color="#1DA1F2" />} />
        <Button onPress={handleEnd} icon={() => <MaterialIcons name="logout" size={24} color="#1DA1F2" />} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  text: {
    fontSize: 16,
  },
  bottomFrame: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
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
*/

//////////////////


import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Switch, TouchableOpacity, Alert, Vibration } from 'react-native';
import { Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut, deleteUser } from 'firebase/auth';
import * as Notifications from 'expo-notifications';

export default function SettingsScreen() {
  const [vibrationEnabled, setVibrationEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [user, setUser] = useState(null);

  const navigation = useNavigation();
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUser(userDocSnap.data());
        } else {
          Alert.alert("등록된 사용자 정보를 불러올 수 없습니다.");
        }
      }
    };

    fetchUserData();
  }, [auth, db]);

  const handleProfileEdit = () => {
    navigation.navigate('ProfileEdit');
  };

  const toggleVibration = () => {
    setVibrationEnabled(!vibrationEnabled);
    if (!vibrationEnabled) {
      Vibration.vibrate();
    }
  };

  const toggleNotifications = async () => {
    setNotificationsEnabled(!notificationsEnabled);
    if (!notificationsEnabled) {
      const token = await registerForPushNotificationsAsync();
      console.log('Notification token:', token);
    } else {
      Alert.alert('알림이 비활성화되었습니다.');
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('로그아웃 성공');
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.error('로그아웃 실패:', error.message);
      });
  };

  const handleDeleteAccount = () => {
    deleteUser(auth.currentUser)
      .then(() => {
        Alert.alert('계정 삭제 성공', '계정이 성공적으로 삭제되었습니다.');
        navigation.navigate('Login');
      })
      .catch((error) => {
        Alert.alert('계정 삭제 실패', error.message);
      });
  };

  const handleFriend = () => {
    navigation.navigate('FriendsList');
  };

  const handleLike = () => {
    navigation.navigate('ReceiveMessage');
  };

  const handleSetting = () => {
    navigation.navigate('Settings');
  };

  const handleEnd = () => {
    // BackHandler.exitApp(); // React Native에서는 권장되지 않음
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>내 프로필</Text>
        <View>
          <Text style={styles.text}>이름: {user?.name}</Text>
          <Text style={styles.text}>소속: {user?.affiliation}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.item} onPress={handleProfileEdit}>
          <Text style={styles.sectionTitle}>프로필 정보 수정</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>알림 설정</Text>
        <View style={styles.item}>
          <Text>알림 허용</Text>
          <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.item}>
          <Text>진동 허용</Text>
          <Switch value={vibrationEnabled} onValueChange={toggleVibration} />
        </View>
      </View>

      <TouchableOpacity style={styles.section} onPress={handleLogout}>
        <Text style={styles.sectionTitle}>로그아웃</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.section} onPress={handleDeleteAccount}>
        <Text style={styles.sectionTitle}>계정 삭제</Text>
      </TouchableOpacity>

      <View style={styles.bottomFrame}>
        <Button onPress={handleFriend} icon={() => <MaterialIcons name="people" size={24} color="#1DA1F2" />} />
        <Button onPress={handleLike} icon={() => <MaterialIcons name="favorite-border" size={24} color="#1DA1F2" />} />
        <Button onPress={handleSetting} icon={() => <MaterialIcons name="settings" size={24} color="#1DA1F2" />} />
        <Button onPress={handleEnd} icon={() => <MaterialIcons name="logout" size={24} color="#1DA1F2" />} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  text: {
    fontSize: 16,
  },
  bottomFrame: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
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
