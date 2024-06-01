
/*
//v2
//포인트 적립 방식 수정
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';

const FriendsVoteScreen = () => {
  const [friends, setFriends] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [initialPoints, setInitialPoints] = useState(0);
  const questions = [
    "꿀강의를 잘 찾아 듣는 꿀벌",
    "캡모자가 참 잘 어울려",
    "평판이 정말 좋더라 너!",
    "항상 친절하더라!"
  ];

  const navigation = useNavigation();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const db = getFirestore();

  useEffect(() => {
    const fetchInitialPoints = async () => {
      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setInitialPoints(userData.points || 0); // 초기 포인트 설정
        }
      } catch (error) {
        Alert.alert("포인트 로딩 실패", "초기 포인트를 불러오는 데 실패했습니다.");
        console.error("Failed to fetch initial points:", error);
      }
    };

    fetchInitialPoints();
  }, [currentUser, db]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          if (userData.friends && userData.friends.length > 0) {
            const friendsDetails = await Promise.all(userData.friends.map(friendId =>
              getDoc(doc(db, "users", friendId))
            ));
            const friendsData = friendsDetails.map(doc => doc.exists() ? { id: doc.id, ...doc.data() } : null).filter(Boolean);
            setFriends(friendsData);
          }
        }
      } catch (error) {
        Alert.alert("데이터 로딩 실패", "친구 목록을 불러오는 데 실패했습니다.");
        console.error("Failed to fetch friends:", error);
      }
    };

    fetchFriends();
  }, [currentUser, db]);

  const handleVote = async (friendId) => {
    const newPoints = points + Math.floor(Math.random() * 10) + 1; // 랜덤 포인트 추가
    setPoints(newPoints);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      try {
        const totalPoints = initialPoints + newPoints;
        const userDocRef = doc(db, "users", currentUser.uid);
        await updateDoc(userDocRef, {
          points: totalPoints
        });
        Alert.alert("투표 완료", "모든 투표를 완료하였습니다.");
        navigation.navigate('Home', { updatedPoints: totalPoints }); // 포인트 업데이트 후 Home으로 이동
      } catch (error) {
        Alert.alert("포인트 저장 실패", "포인트를 저장하는 데 실패했습니다.");
        console.error("Failed to save points:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{questions[currentQuestionIndex]}</Text>
      <FlatList
        data={friends}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.friendItem} onPress={() => handleVote(item.id)}>
            <View>
              <Text style={styles.friendName}>{item.name}</Text>
              <Text style={styles.friendAffiliation}>{item.affiliation || 'unknown'}</Text>
              <Text style={styles.friendMbti}>{item.usermbti || 'unknown'}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
      <Text style={styles.pointsText}>포인트: {points}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  friendItem: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  friendName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  friendAffiliation: {
    fontSize: 16,
    color: '#666',
  },
  friendMbti: {
    fontSize: 16,
    color: '#666',
  },
  pointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default FriendsVoteScreen;

*/

///////////////////////////


/*
//v3
//칭찬하면 메시지 보내는 기능 추가
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc, collection, addDoc } from 'firebase/firestore';

const FriendsVoteScreen = () => {
  const [friends, setFriends] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [initialPoints, setInitialPoints] = useState(0);
  const [userName, setUserName] = useState('');
  const questions = [
    "꿀강의를 잘 찾아 듣는 꿀벌",
    "캡모자가 참 잘 어울려",
    "평판이 정말 좋더라 너!",
    "평소에 친절하더라!"
  ];

  const navigation = useNavigation();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const db = getFirestore();

  useEffect(() => {
    const fetchInitialPointsAndUserName = async () => {
      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setInitialPoints(userData.points || 0); // 초기 포인트 설정
          setUserName(userData.name || 'unknown'); // 사용자 이름 설정
        }
      } catch (error) {
        Alert.alert("데이터 로딩 실패", "초기 포인트 및 사용자 이름을 불러오는 데 실패했습니다.");
        console.error("Failed to fetch initial points and user name:", error);
      }
    };

    fetchInitialPointsAndUserName();
  }, [currentUser, db]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          if (userData.friends && userData.friends.length > 0) {
            const friendsDetails = await Promise.all(userData.friends.map(friendId =>
              getDoc(doc(db, "users", friendId))
            ));
            const friendsData = friendsDetails.map(doc => doc.exists() ? { id: doc.id, ...doc.data() } : null).filter(Boolean);
            setFriends(friendsData);
          }
        }
      } catch (error) {
        Alert.alert("데이터 로딩 실패", "친구 목록을 불러오는 데 실패했습니다.");
        console.error("Failed to fetch friends:", error);
      }
    };

    fetchFriends();
  }, [currentUser, db]);

  const handleVote = async (friendId) => {
    const newPoints = points + Math.floor(Math.random() * 10) + 1; // 랜덤 포인트 추가
    setPoints(newPoints);

    const messageContent = `${userName}님이 나를 칭찬했습니다. 
    칭찬내용: ${questions[currentQuestionIndex]}`;

    try {
      // 메시지 전송
      await addDoc(collection(db, "messages"), {
        to: friendId,
        from: currentUser.uid,
        message: messageContent,
        timestamp: new Date()
      });
    } catch (error) {
      Alert.alert("메시지 전송 실패", "메시지를 전송하는 데 실패했습니다.");
      console.error("Failed to send message:", error);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      try {
        const totalPoints = initialPoints + newPoints;
        const userDocRef = doc(db, "users", currentUser.uid);
        await updateDoc(userDocRef, {
          points: totalPoints
        });
        Alert.alert("투표 완료", "모든 투표를 완료하였습니다.");
        navigation.navigate('Home', { updatedPoints: totalPoints }); // 포인트 업데이트 후 Home으로 이동
      } catch (error) {
        Alert.alert("포인트 저장 실패", "포인트를 저장하는 데 실패했습니다.");
        console.error("Failed to save points:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{questions[currentQuestionIndex]}</Text>
      <FlatList
        data={friends}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.friendItem} onPress={() => handleVote(item.id)}>
            <View>
              <Text style={styles.friendName}>{item.name}</Text>
              <Text style={styles.friendAffiliation}>{item.affiliation || 'unknown'}</Text>
              <Text style={styles.friendMbti}>{item.usermbti || 'unknown'}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
      <Text style={styles.pointsText}>포인트: {points}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  friendItem: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  friendName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  friendAffiliation: {
    fontSize: 16,
    color: '#666',
  },
  friendMbti: {
    fontSize: 16,
    color: '#666',
  },
  pointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default FriendsVoteScreen;
*/


/////////

/*
//오류 수정
// FriendsVoteScreen.js 
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc, addDoc, collection } from 'firebase/firestore';

const FriendsVoteScreen = () => {
  const [friends, setFriends] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const questions = [
    "꿀강의를 잘 찾아 듣는 꿀벌",
    "캡모자가 참 잘 어울려",
    "평판이 정말 좋더라 너!",
    "평소에 친절하더라!"
  ];

  const navigation = useNavigation();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const db = getFirestore();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          if (userData.friends && userData.friends.length > 0) {
            const friendsDetails = await Promise.all(userData.friends.map(friendId =>
              getDoc(doc(db, "users", friendId))
            ));
            const friendsData = friendsDetails.map(doc => doc.exists() ? { id: doc.id, ...doc.data() } : null).filter(Boolean);
            setFriends(friendsData);
          }
        }
      } catch (error) {
        Alert.alert("데이터 로딩 실패", "친구 목록을 불러오는 데 실패했습니다.");
        console.error("Failed to fetch friends:", error);
      }
    };

    fetchFriends();
  }, [currentUser]);

  const handleVote = async (friendId) => {
    const newPoints = points + Math.floor(Math.random() * 10) + 1; // 랜덤 포인트 추가
    setPoints(newPoints);

    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        points: newPoints
      });

      const friendDocRef = doc(db, "users", friendId);
      const friendDocSnap = await getDoc(friendDocRef);
      const friendData = friendDocSnap.data();

      await addDoc(collection(db, "messages"), {
        to: friendId,
        text: `${currentUser.displayName}님이 나를 칭찬했습니다. 칭찬내용: ${questions[currentQuestionIndex]}`,
        timestamp: new Date()
      });

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        Alert.alert("투표 완료", "모든 투표를 완료하였습니다.");
        navigation.goBack(); // 투표 완료 후 이전 화면으로 이동
      }
    } catch (error) {
      Alert.alert("포인트 저장 실패", "포인트를 저장하는 데 실패했습니다.");
      console.error("Failed to save points:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{questions[currentQuestionIndex]}</Text>
      <FlatList
        data={friends}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.friendItem} onPress={() => handleVote(item.id)}>
            <View>
              <Text style={styles.friendName}>{item.name}</Text>
              <Text style={styles.friendAffiliation}>{item.affiliation || 'unknown'}</Text>
              <Text style={styles.friendMbti}>{item.usermbti || 'unknown'}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
      <Text style={styles.pointsText}>포인트: {points}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  friendItem: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  friendName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  friendAffiliation: {
    fontSize: 16,
    color: '#666',
  },
  friendMbti: {
    fontSize: 16,
    color: '#666',
  },
  pointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default FriendsVoteScreen;
*/

///////////
/*
//포인트 합산 방식 수정
//FriendsVoteScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc, addDoc, collection } from 'firebase/firestore';

const FriendsVoteScreen = () => {
  const [friends, setFriends] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const questions = [
    "꿀강의를 잘 찾아 듣는 꿀벌",
    "캡모자가 참 잘 어울려",
    "평판이 정말 좋더라 너!",
    "평소에 친절하더라!"
  ];

  const navigation = useNavigation();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const db = getFirestore();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          if (userData.friends && userData.friends.length > 0) {
            const friendsDetails = await Promise.all(userData.friends.map(friendId =>
              getDoc(doc(db, "users", friendId))
            ));
            const friendsData = friendsDetails.map(doc => doc.exists() ? { id: doc.id, ...doc.data() } : null).filter(Boolean);
            setFriends(friendsData);
          }
          setPoints(userData.points || 0); // 기존 포인트를 설정
        }
      } catch (error) {
        Alert.alert("데이터 로딩 실패", "친구 목록을 불러오는 데 실패했습니다.");
        console.error("Failed to fetch friends:", error);
      }
    };

    fetchFriends();
  }, [currentUser]);

  const handleVote = async (friendId) => {
    const additionalPoints = Math.floor(Math.random() * 10) + 1; // 랜덤 포인트 추가
    const newPoints = points + additionalPoints;
    setPoints(newPoints);

    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        points: newPoints
      });

      const friendDocRef = doc(db, "users", friendId);
      const friendDocSnap = await getDoc(friendDocRef);
      const friendData = friendDocSnap.data();

      await addDoc(collection(db, "messages"), {
        to: friendId,
        text: `${currentUser.displayName}님이 나를 칭찬했습니다. 칭찬내용: ${questions[currentQuestionIndex]}`,
        timestamp: new Date()
      });

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        Alert.alert("투표 완료", "모든 투표를 완료하였습니다.");
        navigation.goBack(); // 투표 완료 후 이전 화면으로 이동
      }
    } catch (error) {
      Alert.alert("포인트 저장 실패", "포인트를 저장하는 데 실패했습니다.");
      console.error("Failed to save points:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{questions[currentQuestionIndex]}</Text>
      <FlatList
        data={friends}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.friendItem} onPress={() => handleVote(item.id)}>
            <View>
              <Text style={styles.friendName}>{item.name}</Text>
              <Text style={styles.friendAffiliation}>{item.affiliation || 'unknown'}</Text>
              <Text style={styles.friendMbti}>{item.usermbti || 'unknown'}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
      <Text style={styles.pointsText}>포인트: {points}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  friendItem: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  friendName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  friendAffiliation: {
    fontSize: 16,
    color: '#666',
  },
  friendMbti: {
    fontSize: 16,
    color: '#666',
  },
  pointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default FriendsVoteScreen;
*/

/////////
/*
//포인트 추가 효과 
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc, addDoc, collection } from 'firebase/firestore';

const FriendsVoteScreen = () => {
  const [friends, setFriends] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [addedPoints, setAddedPoints] = useState(0);
  const [showPoints, setShowPoints] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current; // 페이드 애니메이션

  const questions = [
    "꿀강의를 잘 찾아 듣는 꿀벌",
    "캡모자가 참 잘 어울려",
    "평판이 정말 좋더라 너!",
    "평소에 친절하더라!"
  ];

  const navigation = useNavigation();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const db = getFirestore();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          if (userData.friends && userData.friends.length > 0) {
            const friendsDetails = await Promise.all(userData.friends.map(friendId =>
              getDoc(doc(db, "users", friendId))
            ));
            const friendsData = friendsDetails.map(doc => doc.exists() ? { id: doc.id, ...doc.data() } : null).filter(Boolean);
            setFriends(friendsData);
          }
          setPoints(userData.points || 0); // 기존 포인트를 설정
        }
      } catch (error) {
        Alert.alert("데이터 로딩 실패", "친구 목록을 불러오는 데 실패했습니다.");
        console.error("Failed to fetch friends:", error);
      }
    };

    fetchFriends();
  }, [currentUser]);

  const handleVote = async (friendId) => {
    const additionalPoints = Math.floor(Math.random() * 10) + 1; // 랜덤 포인트 추가
    const newPoints = points + additionalPoints;
    setPoints(newPoints);
    setAddedPoints(additionalPoints);
    setShowPoints(true);

    // 포인트 애니메이션
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        delay: 1000,
        useNativeDriver: true,
      }).start(() => {
        setShowPoints(false);
      });
    });

    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        points: newPoints
      });

      await addDoc(collection(db, "messages"), {
        to: friendId,
        text: `${currentUser.displayName}님이 나를 칭찬했습니다. 칭찬내용: ${questions[currentQuestionIndex]}`,
        timestamp: new Date()
      });

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        Alert.alert("투표 완료", "모든 투표를 완료하였습니다.");
        navigation.goBack(); // 투표 완료 후 이전 화면으로 이동
      }
    } catch (error) {
      Alert.alert("포인트 저장 실패", "포인트를 저장하는 데 실패했습니다.");
      console.error("Failed to save points:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{questions[currentQuestionIndex]}</Text>
      <FlatList
        data={friends}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.friendItem} onPress={() => handleVote(item.id)}>
            <View>
              <Text style={styles.friendName}>{item.name}</Text>
              <Text style={styles.friendAffiliation}>{item.affiliation || 'unknown'}</Text>
              <Text style={styles.friendMbti}>{item.usermbti || 'unknown'}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
      <Text style={styles.pointsText}>포인트: {points}</Text>
      {showPoints && (
        <Animated.View style={[styles.addedPointsContainer, { opacity: fadeAnim }]}>
          <Text style={styles.addedPointsText}>+{addedPoints} 포인트 추가!</Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  friendItem: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  friendName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  friendAffiliation: {
    fontSize: 16,
    color: '#666',
  },
  friendMbti: {
    fontSize: 16,
    color: '#666',
  },
  pointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  addedPointsContainer: {
    position: 'absolute',
    bottom: 40,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: '#1DA1F2',
    borderRadius: 20,
    padding: 10,
  },
  addedPointsText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FriendsVoteScreen;
*/

////////////////
/*
//최적화
import React, { useEffect, useState, useRef, memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc, addDoc, collection } from 'firebase/firestore';

const FriendItem = memo(({ item, onVote }) => (
  <TouchableOpacity style={styles.friendItem} onPress={() => onVote(item.id)}>
    <View>
      <Text style={styles.friendName}>{item.name}</Text>
      <Text style={styles.friendAffiliation}>{item.affiliation || 'unknown'}</Text>
      <Text style={styles.friendMbti}>{item.usermbti || 'unknown'}</Text>
    </View>
  </TouchableOpacity>
));

const FriendsVoteScreen = () => {
  const [friends, setFriends] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [addedPoints, setAddedPoints] = useState(0);
  const [showPoints, setShowPoints] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current; // 페이드 애니메이션

  const questions = [
    "꿀강의를 잘 찾아 듣는 꿀벌",
    "캡모자가 참 잘 어울려",
    "평판이 정말 좋더라 너!",
    "평소에 친절하더라!"
  ];

  const navigation = useNavigation();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const db = getFirestore();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          if (userData.friends && userData.friends.length > 0) {
            const friendsDetails = await Promise.all(userData.friends.map(friendId =>
              getDoc(doc(db, "users", friendId))
            ));
            const friendsData = friendsDetails.map(doc => doc.exists() ? { id: doc.id, ...doc.data() } : null).filter(Boolean);
            setFriends(friendsData);
          }
          setPoints(userData.points || 0); // 기존 포인트를 설정
        }
      } catch (error) {
        Alert.alert("데이터 로딩 실패", "친구 목록을 불러오는 데 실패했습니다.");
        console.error("Failed to fetch friends:", error);
      }
    };

    fetchFriends();
  }, [currentUser]);

  const handleVote = async (friendId) => {
    const additionalPoints = Math.floor(Math.random() * 10) + 1; // 랜덤 포인트 추가
    const newPoints = points + additionalPoints;
    setPoints(newPoints);
    setAddedPoints(additionalPoints);
    setShowPoints(true);

    // 포인트 애니메이션
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        delay: 1000,
        useNativeDriver: true,
      }).start(() => {
        setShowPoints(false);
      });
    });

    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        points: newPoints
      });

      await addDoc(collection(db, "messages"), {
        to: friendId,
        text: `${currentUser.displayName}님이 나를 칭찬했습니다. 칭찬내용: ${questions[currentQuestionIndex]}`,
        timestamp: new Date()
      });

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        Alert.alert("투표 완료", "모든 투표를 완료하였습니다.");
        navigation.goBack(); // 투표 완료 후 이전 화면으로 이동
      }
    } catch (error) {
      Alert.alert("포인트 저장 실패", "포인트를 저장하는 데 실패했습니다.");
      console.error("Failed to save points:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{questions[currentQuestionIndex]}</Text>
      <FlatList
        data={friends}
        renderItem={({ item }) => (
          <FriendItem item={item} onVote={handleVote} />
        )}
        keyExtractor={item => item.id}
      />
      <Text style={styles.pointsText}>포인트: {points}</Text>
      {showPoints && (
        <Animated.View style={[styles.addedPointsContainer, { opacity: fadeAnim }]}>
          <Text style={styles.addedPointsText}>+{addedPoints} 포인트 추가!</Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  friendItem: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  friendName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  friendAffiliation: {
    fontSize: 16,
    color: '#666',
  },
  friendMbti: {
    fontSize: 16,
    color: '#666',
  },
  pointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  addedPointsContainer: {
    position: 'absolute',
    bottom: 40,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: '#1DA1F2',
    borderRadius: 20,
    padding: 10,
  },
  addedPointsText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FriendsVoteScreen;
*/

///////////////


/*
//이름 뜨도록 수정
//잘됨
//FriendsVoteScreen.js
import React, { useEffect, useState, useRef, memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc, addDoc, collection } from 'firebase/firestore';

const FriendItem = memo(({ item, onVote }) => (
  <TouchableOpacity style={styles.friendItem} onPress={() => onVote(item.id)}>
    <View>
      <Text style={styles.friendName}>{item.name}</Text>
      <Text style={styles.friendAffiliation}>{item.affiliation || 'unknown'}</Text>
      <Text style={styles.friendMbti}>{item.usermbti || 'unknown'}</Text>
    </View>
  </TouchableOpacity>
));

const FriendsVoteScreen = () => {
  const [friends, setFriends] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [addedPoints, setAddedPoints] = useState(0);
  const [showPoints, setShowPoints] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current; // 페이드 애니메이션

  const questions = [
    "꿀강의를 잘 찾아 듣는 꿀벌",
    "캡모자가 참 잘 어울려",
    "평판이 정말 좋더라 너!",
    "평소에 친절하더라!"
  ];

  const navigation = useNavigation();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const db = getFirestore();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          if (userData.friends && userData.friends.length > 0) {
            const friendsDetails = await Promise.all(userData.friends.map(friendId =>
              getDoc(doc(db, "users", friendId))
            ));
            const friendsData = friendsDetails.map(doc => doc.exists() ? { id: doc.id, ...doc.data() } : null).filter(Boolean);
            setFriends(friendsData);
          }
          setPoints(userData.points || 0); // 기존 포인트를 설정
        }
      } catch (error) {
        Alert.alert("데이터 로딩 실패", "친구 목록을 불러오는 데 실패했습니다.");
        console.error("Failed to fetch friends:", error);
      }
    };

    fetchFriends();
  }, [currentUser]);

  const handleVote = async (friendId) => {
    const additionalPoints = Math.floor(Math.random() * 10) + 1; // 랜덤 포인트 추가
    const newPoints = points + additionalPoints;
    setPoints(newPoints);
    setAddedPoints(additionalPoints);
    setShowPoints(true);

    // 포인트 애니메이션
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        delay: 1000,
        useNativeDriver: true,
      }).start(() => {
        setShowPoints(false);
      });
    });

    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);
      const senderName = userDocSnap.data().name;

      await updateDoc(userDocRef, {
        points: newPoints
      });

      await addDoc(collection(db, "messages"), {
        to: friendId,
        from: currentUser.uid,
        fromName: senderName,
        text: `${senderName}님이 나를 칭찬했습니다. 칭찬내용: ${questions[currentQuestionIndex]}`,
        timestamp: new Date()
      });

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        Alert.alert("투표 완료", "모든 투표를 완료하였습니다.");
        navigation.goBack(); // 투표 완료 후 이전 화면으로 이동
      }
    } catch (error) {
      Alert.alert("포인트 저장 실패", "포인트를 저장하는 데 실패했습니다.");
      console.error("Failed to save points:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{questions[currentQuestionIndex]}</Text>
      <FlatList
        data={friends}
        renderItem={({ item }) => (
          <FriendItem item={item} onVote={handleVote} />
        )}
        keyExtractor={item => item.id}
      />
      <Text style={styles.pointsText}>포인트: {points}</Text>
      {showPoints && (
        <Animated.View style={[styles.addedPointsContainer, { opacity: fadeAnim }]}>
          <Text style={styles.addedPointsText}>+{addedPoints} 포인트 추가!</Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  friendItem: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  friendName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  friendAffiliation: {
    fontSize: 16,
    color: '#666',
  },
  friendMbti: {
    fontSize: 16,
    color: '#666',
  },
  pointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  addedPointsContainer: {
    position: 'absolute',
    bottom: 40,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: '#1DA1F2',
    borderRadius: 20,
    padding: 10,
  },
  addedPointsText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FriendsVoteScreen;
*/

//////////////////////
/*
//보내는 메세지에 타입 필드 추가
//안됨
import React, { useEffect, useState, useRef, memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc, addDoc, collection } from 'firebase/firestore';

const FriendItem = memo(({ item, onVote }) => (
  <TouchableOpacity style={styles.friendItem} onPress={() => onVote(item.id)}>
    <View>
      <Text style={styles.friendName}>{item.name}</Text>
      <Text style={styles.friendAffiliation}>{item.affiliation || 'unknown'}</Text>
      <Text style={styles.friendMbti}>{item.usermbti || 'unknown'}</Text>
    </View>
  </TouchableOpacity>
));

const FriendsVoteScreen = () => {
  const [friends, setFriends] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [addedPoints, setAddedPoints] = useState(0);
  const [showPoints, setShowPoints] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current; // 페이드 애니메이션

  const questions = [
    "꿀강의를 잘 찾아 듣는 꿀벌",
    "캡모자가 참 잘 어울려",
    "평판이 정말 좋더라 너!",
    "평소에 친절하더라!"
  ];

  const navigation = useNavigation();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const db = getFirestore();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          if (userData.friends && userData.friends.length > 0) {
            const friendsDetails = await Promise.all(userData.friends.map(friendId =>
              getDoc(doc(db, "users", friendId))
            ));
            const friendsData = friendsDetails.map(doc => doc.exists() ? { id: doc.id, ...doc.data() } : null).filter(Boolean);
            setFriends(friendsData);
          }
          setPoints(userData.points || 0); // 기존 포인트를 설정
        }
      } catch (error) {
        Alert.alert("데이터 로딩 실패", "친구 목록을 불러오는 데 실패했습니다.");
        console.error("Failed to fetch friends:", error);
      }
    };

    fetchFriends();
  }, [currentUser]);

  const handleVote = async (friendId) => {
    const additionalPoints = Math.floor(Math.random() * 10) + 1; // 랜덤 포인트 추가
    const newPoints = points + additionalPoints;
    setPoints(newPoints);
    setAddedPoints(additionalPoints);
    setShowPoints(true);

    // 포인트 애니메이션
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        delay: 1000,
        useNativeDriver: true,
      }).start(() => {
        setShowPoints(false);
      });
    });

    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);
      const senderName = userDocSnap.data().name;

      await updateDoc(userDocRef, {
        points: newPoints
      });

      await addDoc(collection(db, "messages"), {
        to: friendId,
        from: currentUser.uid,
        fromName: senderName,
        text: `칭찬내용: ${questions[currentQuestionIndex]}`,
        timestamp: new Date(),
        type: 'praise' // 칭찬 메시지
      });

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        Alert.alert("투표 완료", "모든 투표를 완료하였습니다.");
        navigation.goBack(); // 투표 완료 후 이전 화면으로 이동
      }
    } catch (error) {
      Alert.alert("포인트 저장 실패", "포인트를 저장하는 데 실패했습니다.");
      console.error("Failed to save points:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{questions[currentQuestionIndex]}</Text>
      <FlatList
        data={friends}
        renderItem={({ item }) => (
          <FriendItem item={item} onVote={handleVote} />
        )}
        keyExtractor={item => item.id}
      />
      <Text style={styles.pointsText}>포인트: {points}</Text>
      {showPoints && (
        <Animated.View style={[styles.addedPointsContainer, { opacity: fadeAnim }]}>
          <Text style={styles.addedPointsText}>+{addedPoints} 포인트 추가!</Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  friendItem: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  friendName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  friendAffiliation: {
    fontSize: 16,
    color: '#666',
  },
  friendMbti: {
    fontSize: 16,
    color: '#666',
  },
  pointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  addedPointsContainer: {
    position: 'absolute',
    bottom: 40,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: '#1DA1F2',
    borderRadius: 20,
    padding: 10,
  },
  addedPointsText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FriendsVoteScreen;
*/

////////
/*
import React, { useEffect, useState, useRef, memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc, addDoc, collection } from 'firebase/firestore';

const FriendItem = memo(({ item, onVote }) => (
  <TouchableOpacity style={styles.friendItem} onPress={() => onVote(item.id)}>
    <View>
      <Text style={styles.friendName}>{item.name}</Text>
      <Text style={styles.friendAffiliation}>{item.affiliation || 'unknown'}</Text>
      <Text style={styles.friendMbti}>{item.usermbti || 'unknown'}</Text>
    </View>
  </TouchableOpacity>
));

const FriendsVoteScreen = () => {
  const [friends, setFriends] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [addedPoints, setAddedPoints] = useState(0);
  const [showPoints, setShowPoints] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current; // 페이드 애니메이션

  const questions = [
    "꿀강의를 잘 찾아 듣는 꿀벌",
    "캡모자가 참 잘 어울려",
    "평판이 정말 좋더라 너!",
    "평소에 친절하더라!"
  ];

  const navigation = useNavigation();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const db = getFirestore();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          if (userData.friends && userData.friends.length > 0) {
            const friendsDetails = await Promise.all(userData.friends.map(friendId =>
              getDoc(doc(db, "users", friendId))
            ));
            const friendsData = friendsDetails.map(doc => doc.exists() ? { id: doc.id, ...doc.data() } : null).filter(Boolean);
            setFriends(friendsData);
          }
          setPoints(userData.points || 0); // 기존 포인트를 설정
        }
      } catch (error) {
        Alert.alert("데이터 로딩 실패", "친구 목록을 불러오는 데 실패했습니다.");
        console.error("Failed to fetch friends:", error);
      }
    };

    fetchFriends();
  }, [currentUser]);

  const handleVote = async (friendId) => {
    const additionalPoints = Math.floor(Math.random() * 10) + 1; // 랜덤 포인트 추가
    const newPoints = points + additionalPoints;
    setPoints(newPoints);
    setAddedPoints(additionalPoints);
    setShowPoints(true);

    // 포인트 애니메이션
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        delay: 1000,
        useNativeDriver: true,
      }).start(() => {
        setShowPoints(false);
      });
    });

    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);
      const senderName = userDocSnap.data().name;

      await updateDoc(userDocRef, {
        points: newPoints
      });

      await addDoc(collection(db, "messages"), {
        to: friendId,
        from: currentUser.uid,
        fromName: senderName,
        text: `칭찬내용: ${questions[currentQuestionIndex]}`,
        timestamp: new Date(),
        type: 'praise' // 칭찬 메시지 타입 추가
      });

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        Alert.alert("투표 완료", "모든 투표를 완료하였습니다.");
        navigation.goBack(); // 투표 완료 후 이전 화면으로 이동
      }
    } catch (error) {
      Alert.alert("포인트 저장 실패", "포인트를 저장하는 데 실패했습니다.");
      console.error("Failed to save points:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{questions[currentQuestionIndex]}</Text>
      <FlatList
        data={friends}
        renderItem={({ item }) => (
          <FriendItem item={item} onVote={handleVote} />
        )}
        keyExtractor={item => item.id}
      />
      <Text style={styles.pointsText}>포인트: {points}</Text>
      {showPoints && (
        <Animated.View style={[styles.addedPointsContainer, { opacity: fadeAnim }]}>
          <Text style={styles.addedPointsText}>+{addedPoints} 포인트 추가!</Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  friendItem: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  friendName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  friendAffiliation: {
    fontSize: 16,
    color: '#666',
  },
  friendMbti: {
    fontSize: 16,
    color: '#666',
  },
  pointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  addedPointsContainer: {
    position: 'absolute',
    bottom: 40,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: '#1DA1F2',
    borderRadius: 20,
    padding: 10,
  },
  addedPointsText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FriendsVoteScreen;
*/


//////////////


import React, { useEffect, useState, useRef, memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc, addDoc, collection } from 'firebase/firestore';

const FriendItem = memo(({ item, onVote }) => (
  <TouchableOpacity style={styles.friendItem} onPress={() => onVote(item.id)}>
    <View>
      <Text style={styles.friendName}>{item.name}</Text>
      <Text style={styles.friendAffiliation}>{item.affiliation || 'unknown'}</Text>
      <Text style={styles.friendMbti}>{item.usermbti || 'unknown'}</Text>
    </View>
  </TouchableOpacity>
));

const FriendsVoteScreen = () => {
  const [friends, setFriends] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [addedPoints, setAddedPoints] = useState(0);
  const [showPoints, setShowPoints] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current; // 페이드 애니메이션

  const questions = [
    "꿀강의를 잘 찾아 듣는 꿀벌",
    "캡모자가 참 잘 어울려",
    "평판이 정말 좋더라 너!",
    "평소에 친절하더라!"
  ];

  const navigation = useNavigation();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const db = getFirestore();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          if (userData.friends && userData.friends.length > 0) {
            const friendsDetails = await Promise.all(userData.friends.map(friendId =>
              getDoc(doc(db, "users", friendId))
            ));
            const friendsData = friendsDetails.map(doc => doc.exists() ? { id: doc.id, ...doc.data() } : null).filter(Boolean);
            setFriends(friendsData);
          }
          setPoints(userData.points || 0); // 기존 포인트를 설정
        }
      } catch (error) {
        Alert.alert("데이터 로딩 실패", "친구 목록을 불러오는 데 실패했습니다.");
        console.error("Failed to fetch friends:", error);
      }
    };

    fetchFriends();
  }, [currentUser]);

  const handleVote = async (friendId) => {
    const additionalPoints = Math.floor(Math.random() * 10) + 1; // 랜덤 포인트 추가
    const newPoints = points + additionalPoints;
    setPoints(newPoints);
    setAddedPoints(additionalPoints);
    setShowPoints(true);

    // 포인트 애니메이션
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        delay: 1000,
        useNativeDriver: true,
      }).start(() => {
        setShowPoints(false);
      });
    });

    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);
      const senderName = userDocSnap.data().name;

      await updateDoc(userDocRef, {
        points: newPoints
      });

      await addDoc(collection(db, "messages"), {
        to: friendId,
        from: currentUser.uid,
        fromName: senderName,
        text: `칭찬내용: ${questions[currentQuestionIndex]}`,
        timestamp: new Date(),
        type: 'praise' // 칭찬 메시지 타입 추가
      });

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        Alert.alert("투표 완료", "모든 투표를 완료하였습니다.");
        navigation.goBack(); // 투표 완료 후 이전 화면으로 이동
      }
    } catch (error) {
      Alert.alert("포인트 저장 실패", "포인트를 저장하는 데 실패했습니다.");
      console.error("Failed to save points:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.questionText, { color: '#1DA1F2' }]}>{questions[currentQuestionIndex]}</Text>
      <FlatList
        data={friends}
        renderItem={({ item }) => (
          <FriendItem item={item} onVote={handleVote} />
        )}
        keyExtractor={item => item.id}
      />
      <Text style={styles.pointsText}>포인트: {points}</Text>
      {showPoints && (
        <Animated.View style={[styles.addedPointsContainer, { opacity: fadeAnim }]}>
          <Text style={styles.addedPointsText}>+{addedPoints} 포인트 추가!</Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  friendItem: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  friendName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  friendAffiliation: {
    fontSize: 16,
    color: '#666',
  },
  friendMbti: {
    fontSize: 16,
    color: '#666',
  },
  pointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  addedPointsContainer: {
    position: 'absolute',
    bottom: 40,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: '#1DA1F2',
    borderRadius: 20,
    padding: 10,
  },
  addedPointsText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FriendsVoteScreen;
