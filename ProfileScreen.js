/*
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState({ name: '', affiliation: '' });

  useEffect(() => {
    const fetchUserInfo = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        try {
          const db = getFirestore();
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserInfo({ name: data.name, affiliation: data.affiliation });
          } else {
            Alert.alert("등록된 사용자 정보 불러올 수 없음");
          }
        } catch (error) {
          console.error("Failed to fetch user info:", error);
          Alert.alert("사용자 정보를 불러오는 데 실패했습니다.");
        }
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>내 프로필</Text>
      <Text style={styles.label}>이름: {userInfo.name}</Text>
      <Text style={styles.label}>소속: {userInfo.affiliation}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ProfileScreen;
*/
/////////////////

/*
//v2
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Image, Button } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState({ name: '', affiliation: '', photoURL: '' });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        try {
          const db = getFirestore();
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserInfo({ name: data.name, affiliation: data.affiliation, photoURL: data.photoURL });
          } else {
            Alert.alert("등록된 사용자 정보 불러올 수 없음");
          }
        } catch (error) {
          console.error("Failed to fetch user info:", error);
          Alert.alert("사용자 정보를 불러오는 데 실패했습니다.");
        }
      }
    };

    fetchUserInfo();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const source = { uri: result.uri };
      uploadImage(source.uri);
    }
  };

  const uploadImage = async (uri) => {
    setUploading(true);
    const response = await fetch(uri);
    const blob = await response.blob();
    const auth = getAuth();
    const user = auth.currentUser;
    const storage = getStorage();
    const storageRef = ref(storage, `profile_pictures/${user.uid}`);

    try {
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
      await updateProfilePicture(url);
    } catch (error) {
      console.error("Failed to upload image:", error);
      Alert.alert("이미지 업로드 실패", "이미지를 업로드하는 동안 오류가 발생했습니다.");
    } finally {
      setUploading(false);
    }
  };

  const updateProfilePicture = async (url) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore();
    const docRef = doc(db, "users", user.uid);

    try {
      await updateDoc(docRef, {
        photoURL: url,
      });
      setUserInfo((prevState) => ({ ...prevState, photoURL: url }));
      Alert.alert("프로필 사진 업데이트 완료");
    } catch (error) {
      console.error("Failed to update profile picture:", error);
      Alert.alert("프로필 사진 업데이트 실패", "프로필 사진을 업데이트하는 동안 오류가 발생했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {userInfo.photoURL ? (
        <Image source={{ uri: userInfo.photoURL }} style={styles.profileImage} />
      ) : (
        <Text style={styles.noImageText}>No Profile Image</Text>
      )}
      <Button title="Pick an image from camera roll" onPress={pickImage} disabled={uploading} />
      <Text style={styles.label}>Name: {userInfo.name}</Text>
      <Text style={styles.label}>Affiliation: {userInfo.affiliation}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  noImageText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
});

export default ProfileScreen;
*/


//////////

/*
//이미지 업로드 테스트 실패
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Image, Button } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState({ name: '', affiliation: '', photoURL: '' });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        try {
          const db = getFirestore();
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserInfo({ name: data.name, affiliation: data.affiliation, photoURL: data.photoURL });
          } else {
            Alert.alert("등록된 사용자 정보 불러올 수 없음");
          }
        } catch (error) {
          console.error("Failed to fetch user info:", error);
          Alert.alert("사용자 정보를 불러오는 데 실패했습니다.");
        }
      }
    };

    fetchUserInfo();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const source = { uri: result.assets[0].uri };  // 선택한 이미지의 URI
      uploadImage(source.uri);
    }
  };

  const uploadImage = async (uri) => {
    setUploading(true);
    const response = await fetch(uri);
    const blob = await response.blob();
    const auth = getAuth();
    const user = auth.currentUser;
    const storage = getStorage();
    const storageRef = ref(storage, `profile_pictures/${user.uid}`);

    try {
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
      await updateProfilePicture(url);
    } catch (error) {
      console.error("Failed to upload image:", error);
      Alert.alert("이미지 업로드 실패", "이미지를 업로드하는 동안 오류가 발생했습니다.");
    } finally {
      setUploading(false);
    }
  };

  const updateProfilePicture = async (url) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore();
    const docRef = doc(db, "users", user.uid);

    try {
      await updateDoc(docRef, {
        photoURL: url,
      });
      setUserInfo((prevState) => ({ ...prevState, photoURL: url }));
      Alert.alert("프로필 사진 업데이트 완료");
    } catch (error) {
      console.error("Failed to update profile picture:", error);
      Alert.alert("프로필 사진 업데이트 실패", "프로필 사진을 업데이트하는 동안 오류가 발생했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {userInfo.photoURL ? (
        <Image source={{ uri: userInfo.photoURL }} style={styles.profileImage} />
      ) : (
        <Text style={styles.noImageText}>No Profile Image</Text>
      )}
      <Button title="Pick an image from camera roll" onPress={pickImage} disabled={uploading} />
      <Text style={styles.label}>Name: {userInfo.name}</Text>
      <Text style={styles.label}>Affiliation: {userInfo.affiliation}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  noImageText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
});

export default ProfileScreen;

*/
//////


/*
//프로필 사진 업로드 테스트2 //실패
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Image, Button } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState({ name: '', affiliation: '', photoURL: '' });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        try {
          const db = getFirestore();
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserInfo({ name: data.name, affiliation: data.affiliation, photoURL: data.photoURL });
          } else {
            Alert.alert("등록된 사용자 정보 불러올 수 없음");
          }
        } catch (error) {
          console.error("Failed to fetch user info:", error);
          Alert.alert("사용자 정보를 불러오는 데 실패했습니다.");
        }
      }
    };

    fetchUserInfo();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const source = { uri: result.assets[0].uri };  // 선택한 이미지의 URI
      uploadImage(source.uri);
    }
  };

  const uploadImage = async (uri) => {
    setUploading(true);
    const response = await fetch(uri);
    const blob = await response.blob();
    const auth = getAuth();
    const user = auth.currentUser;
    const storage = getStorage();
    const storageRef = ref(storage, `profile_pictures/${user.uid}`);

    try {
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
      await updateProfilePicture(url);
    } catch (error) {
      console.error("Failed to upload image:", error);
      Alert.alert("이미지 업로드 실패", "이미지를 업로드하는 동안 오류가 발생했습니다.");
    } finally {
      setUploading(false);
    }
  };

  const updateProfilePicture = async (url) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore();
    const docRef = doc(db, "users", user.uid);

    try {
      await updateDoc(docRef, {
        photoURL: url,
      });
      setUserInfo((prevState) => ({ ...prevState, photoURL: url }));
      Alert.alert("프로필 사진 업데이트 완료");
    } catch (error) {
      console.error("Failed to update profile picture:", error);
      Alert.alert("프로필 사진 업데이트 실패", "프로필 사진을 업데이트하는 동안 오류가 발생했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {userInfo.photoURL ? (
        <Image source={{ uri: userInfo.photoURL }} style={styles.profileImage} />
      ) : (
        <Text style={styles.noImageText}>No Profile Image</Text>
      )}
      <Button title="Pick an image from camera roll" onPress={pickImage} disabled={uploading} />
      <Text style={styles.label}>Name: {userInfo.name}</Text>
      <Text style={styles.label}>Affiliation: {userInfo.affiliation}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  noImageText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
});

export default ProfileScreen;
*/

/////////////////////


/*
//이미지 업로드 테스트3 //실패
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Image, Button } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState({ name: '', affiliation: '', photoURL: '' });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        try {
          const db = getFirestore();
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserInfo({ name: data.name, affiliation: data.affiliation, photoURL: data.photoURL });
          } else {
            Alert.alert("등록된 사용자 정보 불러올 수 없음");
          }
        } catch (error) {
          console.error("Failed to fetch user info:", error);
          Alert.alert("사용자 정보를 불러오는 데 실패했습니다.");
        }
      }
    };

    fetchUserInfo();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const source = { uri: result.assets[0].uri };  // 선택한 이미지의 URI
      console.log("Picked image URI:", source.uri);
      uploadImage(source.uri);
    }
  };

  const uploadImage = async (uri) => {
    setUploading(true);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const auth = getAuth();
      const user = auth.currentUser;
      const storage = getStorage();
      const storageRef = ref(storage, `profile_pictures/${user.uid}`);
      console.log("Uploading image to storage path:", storageRef.fullPath);

      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
      console.log("Image uploaded successfully, download URL:", url);
      await updateProfilePicture(url);
    } catch (error) {
      console.error("Failed to upload image:", error);
      Alert.alert("이미지 업로드 실패", "이미지를 업로드하는 동안 오류가 발생했습니다.");
    } finally {
      setUploading(false);
    }
  };

  const updateProfilePicture = async (url) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore();
    const docRef = doc(db, "users", user.uid);

    try {
      await updateDoc(docRef, {
        photoURL: url,
      });
      setUserInfo((prevState) => ({ ...prevState, photoURL: url }));
      Alert.alert("프로필 사진 업데이트 완료");
    } catch (error) {
      console.error("Failed to update profile picture:", error);
      Alert.alert("프로필 사진 업데이트 실패", "프로필 사진을 업데이트하는 동안 오류가 발생했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {userInfo.photoURL ? (
        <Image source={{ uri: userInfo.photoURL }} style={styles.profileImage} />
      ) : (
        <Text style={styles.noImageText}>No Profile Image</Text>
      )}
      <Button title="Pick an image from camera roll" onPress={pickImage} disabled={uploading} />
      <Text style={styles.label}>Name: {userInfo.name}</Text>
      <Text style={styles.label}>Affiliation: {userInfo.affiliation}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  noImageText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
});

export default ProfileScreen;
*/


///////////////

/*
//이미지 업로드 실패..

//ProfileScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Image, Button } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState({ name: '', affiliation: '', photoURL: '' });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        try {
          const db = getFirestore();
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserInfo({ name: data.name, affiliation: data.affiliation, photoURL: data.photoURL });
          } else {
            Alert.alert("등록된 사용자 정보 불러올 수 없음");
          }
        } catch (error) {
          console.error("Failed to fetch user info:", error);
          Alert.alert("사용자 정보를 불러오는 데 실패했습니다.");
        }
      }
    };

    fetchUserInfo();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const source = { uri: result.assets[0].uri };  // 선택한 이미지의 URI
      console.log("Picked image URI:", source.uri);
      uploadImage(source.uri);
    }
  };

  const uploadImage = async (uri) => {
    setUploading(true);
    try {
      const response = await fetch(uri);
      if (!response.ok) {
        throw new Error(`Failed to fetch image. Status code: ${response.status}`);
      }

      const blob = await response.blob();
      const auth = getAuth();
      const user = auth.currentUser;
      const storage = getStorage();
      const storageRef = ref(storage, `profile_pictures/${user.uid}`);
      console.log("Uploading image to storage path:", storageRef.fullPath);

      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
      console.log("Image uploaded successfully, download URL:", url);
      await updateProfilePicture(url);
    } catch (error) {
      console.error("Failed to upload image:", error);
      Alert.alert("이미지 업로드 실패", `이미지를 업로드하는 동안 오류가 발생했습니다: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const updateProfilePicture = async (url) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore();
    const docRef = doc(db, "users", user.uid);

    try {
      await updateDoc(docRef, {
        photoURL: url,
      });
      setUserInfo((prevState) => ({ ...prevState, photoURL: url }));
      Alert.alert("프로필 사진 업데이트 완료");
    } catch (error) {
      console.error("Failed to update profile picture:", error);
      Alert.alert("프로필 사진 업데이트 실패", `프로필 사진을 업데이트하는 동안 오류가 발생했습니다: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {userInfo.photoURL ? (
        <Image source={{ uri: userInfo.photoURL }} style={styles.profileImage} />
      ) : (
        <Text style={styles.noImageText}>No Profile Image</Text>
      )}
      <Button title="Pick an image from camera roll" onPress={pickImage} disabled={uploading} />
      <Text style={styles.label}>Name: {userInfo.name}</Text>
      <Text style={styles.label}>Affiliation: {userInfo.affiliation}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  noImageText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
});

export default ProfileScreen;
*/

//ProfileScreen.js

//아직 튕김
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Image, Button } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState({ name: '', affiliation: '', photoURL: '' });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        try {
          const db = getFirestore();
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserInfo({ name: data.name, affiliation: data.affiliation, photoURL: data.photoURL });
          } else {
            Alert.alert("등록된 사용자 정보 불러올 수 없음");
          }
        } catch (error) {
          console.error("Failed to fetch user info:", error);
          Alert.alert("사용자 정보를 불러오는 데 실패했습니다.");
        }
      }
    };

    fetchUserInfo();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const source = { uri: result.assets[0].uri };  // 선택한 이미지의 URI
      console.log("Picked image URI:", source.uri);
      uploadImage(source.uri);
    }
  };

  const uploadImage = async (uri) => {
    setUploading(true);
    try {
      const response = await fetch(uri);
      if (!response.ok) {
        throw new Error(`Failed to fetch image. Status code: ${response.status}`);
      }

      const blob = await response.blob();
      const auth = getAuth();
      const user = auth.currentUser;
      const storage = getStorage();
      const storageRef = ref(storage, `profile_pictures/${user.uid}`);
      console.log("Uploading image to storage path:", storageRef.fullPath);

      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
      console.log("Image uploaded successfully, download URL:", url);
      await updateProfilePicture(url);
    } catch (error) {
      console.error("Failed to upload image:", error);
      console.error("Error details:", error.message, error.code);
      Alert.alert("이미지 업로드 실패", `이미지를 업로드하는 동안 오류가 발생했습니다: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const updateProfilePicture = async (url) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore();
    const docRef = doc(db, "users", user.uid);

    try {
      await updateDoc(docRef, {
        photoURL: url,
      });
      setUserInfo((prevState) => ({ ...prevState, photoURL: url }));
      Alert.alert("프로필 사진 업데이트 완료");
    } catch (error) {
      console.error("Failed to update profile picture:", error);
      Alert.alert("프로필 사진 업데이트 실패", `프로필 사진을 업데이트하는 동안 오류가 발생했습니다: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {userInfo.photoURL ? (
        <Image source={{ uri: userInfo.photoURL }} style={styles.profileImage} />
      ) : (
        <Text style={styles.noImageText}>No Profile Image</Text>
      )}
      <Button title="Pick an image from camera roll" onPress={pickImage} disabled={uploading} />
      <Text style={styles.label}>Name: {userInfo.name}</Text>
      <Text style={styles.label}>Affiliation: {userInfo.affiliation}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  noImageText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
});

export default ProfileScreen;
