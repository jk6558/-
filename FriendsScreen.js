//FriendsScreen.js
// 추천친구 리스트
//////
/*
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const FriendsScreen = () => {
  const [users, setUsers] = useState([]);
  const db = getFirestore();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchUsers = async () => {
      const userRef = collection(db, "users");
      const q = query(userRef, where("affiliation", "==", currentUser.affiliation));
      const querySnapshot = await getDocs(q);
      let userList = [];
      querySnapshot.forEach((doc) => {
        if (doc.id !== currentUser.uid) { // 현재 사용자 제외
          userList.push({ id: doc.id, ...doc.data() });
        }
      });
      setUsers(userList);
    };

    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => console.log("친구 추가 로직", item)}>
            <Text style={styles.item}>{item.name} - {item.affiliation}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});



export default FriendsScreen;

*/

////////



////////////
//FriendsScreen.js v2 실패
/*
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc, arrayUnion } from 'firebase/firestore';

const FriendsScreen = () => {
  const [users, setUsers] = useState([]);
  const db = getFirestore();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        fetchUsers(user);
      } else {
        setUsers([]);
      }
    });

    const fetchUsers = async (currentUser) => {
      try {
        const userRef = collection(db, "users");
        const q = query(userRef, where("affiliation", "==", currentUser.affiliation));
        const querySnapshot = await getDocs(q);
        let userList = [];
        querySnapshot.forEach((doc) => {
          if (doc.id !== currentUser.uid && !currentUser.friends.includes(doc.id)) {
            userList.push({ id: doc.id, ...doc.data() });
          }
        });
        setUsers(userList);
      } catch (error) {
        console.error("사용자 정보 가져오기 실패:", error);
      }
    };

    return () => unsubscribe();
  }, []);

  const addFriend = async (friendId) => {
    const userDocRef = doc(db, "users", currentUser.uid);
    try {
      await updateDoc(userDocRef, {
        friends: arrayUnion(friendId)
      });
      Alert.alert("친구 추가", "친구가 성공적으로 추가되었습니다.");
      setUsers(users.filter(user => user.id !== friendId)); // 목록에서 친구를 제거
    } catch (error) {
      Alert.alert("친구 추가 실패", "친구 추가 과정에서 오류가 발생했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.item}>{item.name} - {item.affiliation}</Text>
            <TouchableOpacity onPress={() => addFriend(item.id)} style={styles.addButton}>
              <Text style={styles.addButtonText}>친구 추가</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  },
  item: {
    fontSize: 18,
    height: 44,
  },
  addButton: {
    padding: 10,
    backgroundColor: '#1DA1F2',
    borderRadius: 5
  },
  addButtonText: {
    color: 'white'
  }
});

export default FriendsScreen;
*/

//////////////////////


/*
//v3 실패
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const FriendsScreen = () => {
  const [users, setUsers] = useState([]);
  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user && user.affiliation) { // 사용자가 로그인되어 있고, affiliation 정보가 있는 경우에만 실행
        fetchUsers(user);
      } else {
        setUsers([]); // 사용자 정보가 없거나 affiliation이 정의되지 않은 경우
        if (!user) {
          Alert.alert("사용자 정보 없음", "로그인 상태가 아닙니다.");
        } else if (!user.affiliation) {
          Alert.alert("사용자 정보 오류", "소속 정보가 없습니다.");
        }
      }
    });

    const fetchUsers = async (currentUser) => {
      try {
        const userRef = collection(db, "users");
        const q = query(userRef, where("affiliation", "==", currentUser.affiliation));
        const querySnapshot = await getDocs(q);
        let userList = [];
        querySnapshot.forEach((doc) => {
          if (doc.id !== currentUser.uid) { // 현재 사용자 제외
            userList.push({ id: doc.id, ...doc.data() });
          }
        });
        setUsers(userList);
      } catch (error) {
        console.error("사용자 정보 가져오기 실패:", error);
        Alert.alert("데이터 로딩 실패", error.message);
      }
    };

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => console.log("친구 추가 로직", item)}>
            <Text style={styles.item}>{item.name} - {item.affiliation}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default FriendsScreen;
*/

////////////////////////



/*
//V4 성공
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs, doc, updateDoc, arrayUnion } from 'firebase/firestore';

const FriendsScreen = () => {
  const [users, setUsers] = useState([]);
  const db = getFirestore();
  const auth = getAuth();
  const currentUser = auth.currentUser; // 현재 로그인한 사용자 정보 가져오기

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const userRef = collection(db, "users");
      const querySnapshot = await getDocs(userRef);
      let userList = [];
      querySnapshot.forEach((doc) => {
        // 현재 로그인한 사용자를 목록에서 제외
        if (currentUser && doc.id !== currentUser.uid) {
          userList.push({ id: doc.id, ...doc.data() });
        }
      });
      setUsers(userList);
    } catch (error) {
      console.error("사용자 정보 가져오기 실패:", error);
      Alert.alert("데이터 로딩 실패", error.message);
    }
  };

  const addFriend = async (friendId) => {
    if (!currentUser) {
      Alert.alert("로그인 필요", "친구를 추가하려면 로그인이 필요합니다.");
      return;
    }

    const userDocRef = doc(db, "users", currentUser.uid);
    try {
      await updateDoc(userDocRef, {
        friends: arrayUnion(friendId) // 친구 ID를 'friends' 배열에 추가
      });
      Alert.alert("친구 추가 완료", "친구가 성공적으로 추가되었습니다.");
      setUsers(users.filter(user => user.id !== friendId)); // 추가된 친구를 목록에서 제거
    } catch (error) {
      console.error("친구 추가 실패", error);
      Alert.alert("친구 추가 실패", "친구를 추가하는 동안 오류가 발생했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => addFriend(item.id)}>
            <Text style={styles.item}>{item.name} - {item.affiliation}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default FriendsScreen;
*/
/////////////////////



/*
//FriendsScreen.js
//v5 파이어베이스 연동까지 성공
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs, doc, updateDoc, arrayUnion } from 'firebase/firestore';

const FriendsScreen = () => {
  const [users, setUsers] = useState([]);
  const db = getFirestore();
  const auth = getAuth();
  const currentUser = auth.currentUser; // 현재 로그인한 사용자 정보 가져오기

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const userRef = collection(db, "users");
      const querySnapshot = await getDocs(userRef);
      let userList = [];
      querySnapshot.forEach((doc) => {
        if (!currentUser || doc.id !== currentUser.uid) { // 현재 로그인한 사용자 제외
          userList.push({ id: doc.id, ...doc.data() });
        }
      });
      setUsers(userList);
    } catch (error) {
      console.error("사용자 정보 가져오기 실패:", error);
      Alert.alert("데이터 로딩 실패", error.message);
    }
  };

  const addFriend = async (friendId) => {
    if (!currentUser) {
      Alert.alert("로그인 필요", "친구를 추가하려면 로그인이 필요합니다.");
      return;
    }

    const userDocRef = doc(db, "users", currentUser.uid);
    try {
      await updateDoc(userDocRef, {
        friends: arrayUnion(friendId) // 친구 ID를 'friends' 배열에 추가
      });
      Alert.alert("친구 추가 완료", "친구가 성공적으로 추가되었습니다.");
      setUsers(users.filter(user => user.id !== friendId)); // 추가된 친구를 목록에서 제거
    } catch (error) {
      console.error("친구 추가 실패", error);
      Alert.alert("친구 추가 실패", "친구를 추가하는 동안 오류가 발생했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => addFriend(item.id)}>
            <Text style={styles.item}>{item.name} - {item.affiliation}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default FriendsScreen;



*/


/////////////////

//v6
//ui 개선

import React, { useState, useEffect } from 'react';
import { View, FlatList, Alert, StyleSheet } from 'react-native';
import { Card, Button, Text, ActivityIndicator } from 'react-native-paper';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs, doc, updateDoc, arrayUnion } from 'firebase/firestore';

const FriendsScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const userRef = collection(db, "users");
      const querySnapshot = await getDocs(userRef);
      let userList = [];
      querySnapshot.forEach((doc) => {
        if (!currentUser || doc.id !== currentUser.uid) {
          userList.push({ id: doc.id, ...doc.data() });
        }
      });
      setUsers(userList);
    } catch (error) {
      console.error("사용자 정보 가져오기 실패:", error);
      Alert.alert("데이터 로딩 실패", error.message);
    } finally {
      setLoading(false);
    }
  };

  const addFriend = async (friendId) => {
    if (!currentUser) {
      Alert.alert("로그인 필요", "친구를 추가하려면 로그인이 필요합니다.");
      return;
    }

    const userDocRef = doc(db, "users", currentUser.uid);
    try {
      await updateDoc(userDocRef, {
        friends: arrayUnion(friendId)
      });
      Alert.alert("친구 추가 완료", "친구가 성공적으로 추가되었습니다.");
      setUsers(users.filter(user => user.id !== friendId));
    } catch (error) {
      console.error("친구 추가 실패", error);
      Alert.alert("친구 추가 실패", "친구를 추가하는 동안 오류가 발생했습니다.");
    }
  };

  if (loading) {
    return <ActivityIndicator animating={true} size="large" style={styles.loadingIndicator} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.affiliation}>{item.affiliation}</Text>
            </Card.Content>
            <Card.Actions>
              <Button labelStyle={styles.buttonText} onPress={() => addFriend(item.id)}>친구 추가</Button>
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginVertical: 8,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: 'white',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  affiliation: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  buttonText: {
    color: '#1DA1F2',
  },
});

export default FriendsScreen;
