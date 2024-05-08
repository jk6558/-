/*
//v1
//FriendsList.js
//이미 등록된 친구 리스트

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const FriendsList = () => {
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      const db = getFirestore();
      const friendsCollection = collection(db, 'friends');
      const querySnapshot = await getDocs(friendsCollection);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFriends(data);
      setLoading(false);
    };

    fetchFriends();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    
    <View>
      <Text>친구 목록</Text>
      <FlatList
        data={friends}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.email}</Text>
            
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};


export default FriendsList;
*/

///////////////////////////////

/*
//v2
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const FriendsList = () => {
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const db = getFirestore();
        const friendsCollection = collection(db, 'friends');
        const querySnapshot = await getDocs(friendsCollection);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFriends(data);
      } catch (error) {
        Alert.alert("데이터 로딩 실패", "친구 목록을 불러오는 데 실패했습니다.");
        console.error("Failed to fetch friends:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View>
      <Text>등록된 친구 목록</Text>
      <FlatList
        data={friends}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.email}</Text>
            {/* 다른 친구 정보 표시 *//*}
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default FriendsList;







*/
/////////////////////////////////////


/*
//v3
//FriendsList.js
//이미 등록된 친구 표시 성공
//FriendsList.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert } from 'react-native';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';

const FriendsList = () => {
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const db = getFirestore();
        const usersCollection = collection(db, 'users');
        const querySnapshot = await getDocs(usersCollection);
        let allFriends = [];
        for (const userDoc of querySnapshot.docs) {
          const userData = userDoc.data();
          if (userData.friends && userData.friends.length > 0) {
            // 친구의 ID를 사용하여 추가 정보 조회
            const friendDetails = await Promise.all(userData.friends.map(friendId => 
              getDoc(doc(db, 'users', friendId))  // 친구 정보 조회
            ));
            friendDetails.forEach(friendDoc => {
              if (friendDoc.exists()) {
                allFriends.push({ id: friendDoc.id, ...friendDoc.data() });
              }
            });
          }
        }
        setFriends(allFriends);
      } catch (error) {
        Alert.alert("데이터 로딩 실패", "친구 목록을 불러오는 데 실패했습니다.");
        console.error("Failed to fetch friends:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View>
      {/*<Text>친구 목록</Text>*//*}
      <FlatList
        data={friends}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.email}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default FriendsList;

*/

/////////////////////////////





//v4 
//메세지 기능 추가,
/*
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, TextInput, TouchableOpacity } from 'react-native';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';

const FriendsList = () => {
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([]);
  const [messageText, setMessageText] = useState("");  // 메시지 입력 상태

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const db = getFirestore();
        const usersCollection = collection(db, 'users');
        const querySnapshot = await getDocs(usersCollection);
        let allFriends = [];
        for (const userDoc of querySnapshot.docs) {
          const userData = userDoc.data();
          if (userData.friends && userData.friends.length > 0) {
            const friendDetails = await Promise.all(userData.friends.map(friendId => 
              getDoc(doc(db, 'users', friendId))
            ));
            friendDetails.forEach(friendDoc => {
              if (friendDoc.exists()) {
                allFriends.push({ id: friendDoc.id, ...friendDoc.data() });
              }
            });
          }
        }
        setFriends(allFriends);
      } catch (error) {
        Alert.alert("데이터 로딩 실패", "친구 목록을 불러오는 데 실패했습니다.");
        console.error("Failed to fetch friends:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  const sendMessage = (friendId, friendName) => {
    console.log(`Sending message to ${friendName} (${friendId}): ${messageText}`);
    // 여기에 실제 메시지 전송 로직 추가 (예: Firebase를 통해 메시지 저장)
    Alert.alert("Message Sent", `Your message to ${friendName} has been sent.`);
    setMessageText("");  // 메시지 전송 후 입력 필드 초기화
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View>
      <FlatList
        data={friends}
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            <Text>Name: {item.name}</Text>
            <Text>Email: {item.email}</Text>
            <TextInput
              value={messageText}
              onChangeText={setMessageText}
              placeholder="Write a message"
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginVertical: 8 }}
            />
            <TouchableOpacity
              onPress={() => sendMessage(item.id, item.name)}
              style={{ backgroundColor: 'blue', padding: 10, alignItems: 'center' }}>
              <Text style={{ color: 'white' }}>Send Message</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default FriendsList;
*/

///////////////////////////////


/*
//FriendsList.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';

const FriendsList = () => {
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const db = getFirestore();
        const usersCollection = collection(db, 'users');
        const querySnapshot = await getDocs(usersCollection);
        let allFriends = [];
        for (const userDoc of querySnapshot.docs) {
          const userData = userDoc.data();
          if (userData.friends && userData.friends.length > 0) {
            const friendDetails = await Promise.all(userData.friends.map(friendId => 
              getDoc(doc(db, 'users', friendId))
            ));
            friendDetails.forEach(friendDoc => {
              if (friendDoc.exists()) {
                allFriends.push({ id: friendDoc.id, ...friendDoc.data() });
              }
            });
          }
        }
        setFriends(allFriends);
      } catch (error) {
        Alert.alert("데이터 로딩 실패", "친구 목록을 불러오는 데 실패했습니다.");
        console.error("Failed to fetch friends:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  const sendMessage = (friendName) => {
    Alert.alert("Send Message", `You sent a message to ${friendName}.`);
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View>
      <FlatList
        data={friends}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => sendMessage(item.name)}>
            <View style={{ padding: 10 }}>
              <Text>{item.name}</Text>
              <Text>{item.email}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default FriendsList;

*/

////////////////////////


/*
//v5 작동잘됨 아직 더미 메세지 
//FriendsList.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';  // 임포트 추가

const FriendsList = () => {
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([]);
  const db = getFirestore();
  const auth = getAuth();  // Auth 객체 가져오기
  const currentUser = auth.currentUser;  // 현재 로그인한 사용자 정보

  useEffect(() => {
    const fetchFriends = async () => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);  // 현재 사용자 문서 참조
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            if (userData.friends && userData.friends.length > 0) {
              const friendsDetails = await Promise.all(userData.friends.map(friendId =>
                getDoc(doc(db, "users", friendId))
              ));
              const friendsData = friendsDetails.map(doc => {
                if (doc.exists()) {
                  return { id: doc.id, ...doc.data() };
                }
                return null;
              }).filter(Boolean);  // 존재하는 문서 데이터만 필터링
              setFriends(friendsData);
            }
          }
        } catch (error) {
          Alert.alert("데이터 로딩 실패", "친구 목록을 불러오는 데 실패했습니다.");
          console.error("Failed to fetch friends:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchFriends();
  }, [currentUser]);

  const sendMessage = (friendName) => {
    Alert.alert("Send Message", `You sent a message to ${friendName}.`);
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View>
      <FlatList
        data={friends}
        renderItem={({ item }) => (
          //<TouchableOpacity onPress={() => sendMessage(item.name)}>
          <TouchableOpacity onPress={() => navigation.navigate('SendMessage', { friendId: item.id, friendName: item.name })}>

            <View style={{ padding: 10 }}>
              <Text>{item.name}</Text>
              <Text>{item.email}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};




export default FriendsList;
*/

//////////////////////

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';  // useNavigation 임포트 추가

const FriendsList = () => {
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([]);
  const db = getFirestore();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const navigation = useNavigation();  // navigation 객체를 사용

  useEffect(() => {
    const fetchFriends = async () => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            if (userData.friends && userData.friends.length > 0) {
              const friendsDetails = await Promise.all(userData.friends.map(friendId =>
                getDoc(doc(db, "users", friendId))
              ));
              const friendsData = friendsDetails.map(doc => {
                if (doc.exists()) {
                  return { id: doc.id, ...doc.data() };
                }
                return null;
              }).filter(Boolean);
              setFriends(friendsData);
            }
          }
        } catch (error) {
          Alert.alert("데이터 로딩 실패", "친구 목록을 불러오는 데 실패했습니다.");
          console.error("Failed to fetch friends:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchFriends();
  }, [currentUser]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View>
      <FlatList
        data={friends}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('SendMessage', { friendId: item.id, friendName: item.name })}>
            <View style={{ padding: 10 }}>
              <Text>{item.name}</Text>
              <Text>{item.email}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default FriendsList;
