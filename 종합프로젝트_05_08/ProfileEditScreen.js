import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, updateProfile } from 'firebase/auth';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileEditScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [affiliation, setAffiliation] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      const db = getFirestore();
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setName(userData.name);
        setAffiliation(userData.affiliation);
      } else {
        Alert.alert("등록된 사용자 정보를 불러올 수 없습니다.");
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    try {
      // 사용자 프로필 업데이트
      await updateProfile(user, {
        displayName: name,
      });

      // Firestore에서도 사용자 정보 업데이트
      const db = getFirestore();
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        name: name,
        affiliation: affiliation,
      });

      Alert.alert("프로필이 수정되었습니다.");
      await AsyncStorage.clear();
      navigation.navigate('Home'); // 홈 화면으로 이동
    } catch (error) {
      console.error("프로필 수정 실패:", error.message);
      Alert.alert("프로필 수정 실패", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="변경할 이름"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="변경할 소속"
        value={affiliation}
        onChangeText={setAffiliation}
      />
      <Button
        title="저장"
        onPress={handleSave}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
});

export default ProfileEditScreen;
