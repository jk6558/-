/*
//v12 ui개선
//HomeScreen.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert, BackHandler, Text } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

function HomeScreen() {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({ name: '', affiliation: '' });

  useEffect(() => {
    const fetchUserInfo = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const db = getFirestore();
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserInfo(docSnap.data());  // 사용자 정보 상태 업데이트
        } else {
          Alert.alert("등록된 사용자 정보 불러올 수 없음");
        }
      }
    };

    fetchUserInfo();
  }, []);

  const handlePraise = () => {
    navigation.navigate('FriendsList');
  };

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

  const handleFindNewFriends = () => {
    navigation.navigate('Friends');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}> 극찬</Text>
        <View style={styles.headerIcons}>
          <MaterialIcons name="edit" size={28} color="#1DA1F2" />
          <MaterialIcons name="notifications" size={28} color="#1DA1F2" />
        </View>
      </View>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardSubtitle}>칭찬하고 싶은 사람과 말을 골라서 칭찬을 해보아요!</Text>
          <Text style={styles.cardText}>내정보</Text>
          <Text style={styles.cardText}>이름: {userInfo.name}</Text>
          <Text style={styles.cardText}>소속: {userInfo.affiliation}</Text>
        </Card.Content>
      </Card>

      <View style={styles.middleFrame}>
        <Button icon={({ size, color }) => (<MaterialIcons name="favorite" size={size} color={color} />)} onPress={handlePraise} style={styles.middleButton} labelStyle={styles.middleButtonText}>내 친구들 투표하기</Button>
        <Button icon={({ size, color }) => (<MaterialIcons name="search" size={size} color={color} />)} onPress={handleFindNewFriends} style={styles.middleButton} labelStyle={styles.middleButtonText}>새로운 친구 찾기</Button>
      </View>

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
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#1DA1F2',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    marginTop: 20,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1DA1F2',
  },
  cardSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#1DA1F2',
    marginVertical: 10,
  },
  cardText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#1DA1F2',
    marginTop: 4,
  },
  middleFrame: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleButton: {
    backgroundColor: '#1DA1F2',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 5,
    width: '80%',
  },
  middleButtonText: {
    color: 'white',
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

export default HomeScreen;
*/


/////////

//v13
//프로필 기능 추가
//HomeScreen.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert, BackHandler, Text, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

function HomeScreen() {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({ name: '', affiliation: '' });

  useEffect(() => {
    const fetchUserInfo = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const db = getFirestore();
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserInfo(docSnap.data());  // 사용자 정보 상태 업데이트
        } else {
          Alert.alert("등록된 사용자 정보 불러올 수 없음");
        }
      }
    };

    fetchUserInfo();
  }, []);

  const handlePraise = () => {
    navigation.navigate('FriendsList');
  };

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

  const handleFindNewFriends = () => {
    navigation.navigate('Friends');
  };

  const handleEditProfile = () => {
    navigation.navigate('ProfileScreen');  // ProfileScreen 스크린으로 이동
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}> 극찬</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={handleEditProfile}>
            <MaterialIcons name="edit" size={28} color="#1DA1F2" />
          </TouchableOpacity>
          <MaterialIcons name="notifications" size={28} color="#1DA1F2" />
        </View>
      </View>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardSubtitle}>칭찬하고 싶은 사람과 말을 골라서 칭찬을 해보아요!</Text>
          <Text style={styles.cardText}>내정보</Text>
          <Text style={styles.cardText}>이름: {userInfo.name}</Text>
          <Text style={styles.cardText}>소속: {userInfo.affiliation}</Text>
        </Card.Content>
      </Card>

      <View style={styles.middleFrame}>
        <Button icon={({ size, color }) => (<MaterialIcons name="favorite" size={size} color={color} />)} onPress={handlePraise} style={styles.middleButton} labelStyle={styles.middleButtonText}>내 친구들 투표하기</Button>
        <Button icon={({ size, color }) => (<MaterialIcons name="search" size={size} color={color} />)} onPress={handleFindNewFriends} style={styles.middleButton} labelStyle={styles.middleButtonText}>새로운 친구 찾기</Button>
      </View>

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
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#1DA1F2',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    marginTop: 20,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1DA1F2',
  },
  cardSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#1DA1F2',
    marginVertical: 10,
  },
  cardText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#1DA1F2',
    marginTop: 4,
  },
  middleFrame: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleButton: {
    backgroundColor: '#1DA1F2',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 5,
    width: '80%',
  },
  middleButtonText: {
    color: 'white',
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

export default HomeScreen;