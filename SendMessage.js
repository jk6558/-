/*
//v1
// SendMessage.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

const SendMessage = ({ route, navigation }) => {
  const [message, setMessage] = useState('');
  const db = getFirestore();
  const { friendId, friendName } = route.params;

  const handleSend = async () => {
    if (message.trim()) {
      try {
        // 여기서는 메시지를 'messages' 컬렉션에 저장합니다.
        const messageRef = doc(collection(db, 'messages'));
        await updateDoc(messageRef, {
          messages: arrayUnion({
            senderId: friendId,  // 예시로 친구 ID를 보냄, 실제로는 현재 사용자 ID가 들어가야 합니다.
            text: message,
            timestamp: new Date()
          })
        });
        Alert.alert("Message Sent", `Your message to ${friendName} was sent.`);
        navigation.goBack();
      } catch (error) {
        Alert.alert("Error", "Failed to send the message.");
      }
    } else {
      Alert.alert("Error", "Message cannot be empty.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Write your message here..."
        multiline
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  }
});

export default SendMessage;
*/

///////////////////////////

/*
// SendMessage.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const SendMessage = ({ route }) => {
  const [message, setMessage] = useState('');
  const db = getFirestore();
  const { friendId } = route.params;

  const sendMessage = async () => {
    try {
      await addDoc(collection(db, "messages"), {
        to: friendId,
        text: message,
        timestamp: new Date()
      });
      Alert.alert("Success", "메세지 보내기 성공!");
      setMessage('');
    } catch (error) {
      Alert.alert("Error", "메세지 보내기를 실패하였습니다.");
      console.error("Error sending message: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="보낼 메세지를 이곳에 작성하세요..."
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20
  }
});

export default SendMessage;
*/

/////////////

/*
// SendMessage.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';

const SendMessage = () => {
  const route = useRoute();
  const [message, setMessage] = useState('');
  const db = getFirestore();
  const friendId = route.params?.friendId;

  const sendMessage = async () => {
    if (!friendId) {
      Alert.alert("Error", "친구 아이디가 없습니다.");
      return;
    }

    try {
      await addDoc(collection(db, "messages"), {
        to: friendId,
        text: message,
        timestamp: new Date()
      });
      Alert.alert("Success", "메시지 보내기 성공!");
      setMessage('');
    } catch (error) {
      Alert.alert("Error", "메시지 보내기를 실패하였습니다.");
      console.error("Error sending message: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="보낼 메시지를 이곳에 작성하세요..."
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20
  }
});

export default SendMessage;
*/

///////////////////

/*
//포인트 차감 기능 추가

//SendMessage.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import { getFirestore, collection, addDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const SendMessage = ({ route, navigation }) => {
  const [message, setMessage] = useState('');
  const [points, setPoints] = useState(0);
  const db = getFirestore();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const { friendId, friendName } = route.params;

  useEffect(() => {
    const fetchUserPoints = async () => {
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setPoints(userDocSnap.data().points || 0);
        }
      }
    };

    fetchUserPoints();
  }, [currentUser]);

  const sendMessage = async () => {
    if (points < 10) {
      Alert.alert("포인트 부족", "메시지를 보내기 위해서는 최소 10포인트가 필요합니다.");
      return;
    }

    try {
      await addDoc(collection(db, "messages"), {
        to: friendId,
        from: currentUser.uid,
        text: message,
        timestamp: new Date()
      });

      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        points: points - 10
      });

      Alert.alert("메시지 보내기 성공", "메시지가 성공적으로 전송되었습니다.");
      setMessage('');
      navigation.goBack();
    } catch (error) {
      Alert.alert("메시지 보내기 실패", "메시지를 보내는 동안 오류가 발생했습니다.");
      console.error("Error sending message: ", error);
    }
  };

  return (
    <View style={styles.container}>

      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="보낼 메시지를 작성하세요..."
      />
      <Button title="보내기" onPress={sendMessage} />
      <Text style={styles.pointsText}>현재 포인트: {points}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20
  },
  pointsText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#1DA1F2',
  },
});

export default SendMessage;

*/

///////////


/*
//포인트차감 문구 추가

//SendMessage.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import { getFirestore, collection, addDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const SendMessage = ({ route, navigation }) => {
  const [message, setMessage] = useState('');
  const [points, setPoints] = useState(0);
  const db = getFirestore();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const { friendId, friendName } = route.params;

  useEffect(() => {
    const fetchUserPoints = async () => {
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setPoints(userDocSnap.data().points || 0);
        }
      }
    };

    fetchUserPoints();
  }, [currentUser]);

  const sendMessage = async () => {
    if (points < 10) {
      Alert.alert("포인트 부족", "메시지를 보내기 위해서는 최소 10포인트가 필요합니다.");
      return;
    }

    try {
      await addDoc(collection(db, "messages"), {
        to: friendId,
        from: currentUser.uid,
        text: message,
        timestamp: new Date()
      });

      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        points: points - 10
      });

      Alert.alert("메시지 보내기 성공", "메시지가 성공적으로 전송되었습니다.");
      setMessage('');
      navigation.goBack();
    } catch (error) {
      Alert.alert("메시지 보내기 실패", "메시지를 보내는 동안 오류가 발생했습니다.");
      console.error("Error sending message: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.warningText}>메시지 전송시 포인트가 10 차감 됩니다</Text>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="보낼 메시지를 작성하세요..."
      />
      <Button title="보내기" onPress={sendMessage} />
      <Text style={styles.pointsText}>현재 포인트: {points}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20
  },
  warningText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'red',
    marginBottom: 20
  },
  pointsText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#1DA1F2',
  },
});

export default SendMessage;
*/

/////////////
/*
import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Alert, Text } from 'react-native';
import { getFirestore, collection, addDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const SendMessage = ({ route, navigation }) => {
  const [message, setMessage] = useState('');
  const [points, setPoints] = useState(0);
  const db = getFirestore();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const { friendId, friendName } = route.params;

  useEffect(() => {
    const fetchUserPoints = async () => {
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setPoints(userDocSnap.data().points || 0);
        }
      }
    };

    fetchUserPoints();
  }, [currentUser]);

  const sendMessage = async () => {
    if (points < 10) {
      Alert.alert("포인트 부족", "메시지를 보내기 위해서는 최소 10포인트가 필요합니다.");
      return;
    }

    try {
      await addDoc(collection(db, "messages"), {
        to: friendId,
        from: currentUser.uid,
        text: message,
        timestamp: new Date()
      });

      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        points: points - 10
      });

      Alert.alert("메시지 보내기 성공", "메시지가 성공적으로 전송되었습니다.");
      setMessage('');
      setPoints(points - 10);  // 포인트 즉시 업데이트
      navigation.goBack();
    } catch (error) {
      Alert.alert("메시지 보내기 실패", "메시지를 보내는 동안 오류가 발생했습니다. 다시 시도해 주세요.");
      console.error("Error sending message: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.warningText}>메시지 전송시 포인트가 10 차감 됩니다</Text>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="보낼 메시지를 작성하세요..."
      />
      <TouchableOpacity style={styles.button} onPress={sendMessage}>
        <Text style={styles.buttonText}>보내기</Text>
      </TouchableOpacity>
      <Text style={styles.pointsText}>현재 포인트: {points}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5
  },
  warningText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'red',
    marginBottom: 20
  },
  button: {
    backgroundColor: '#1DA1F2',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  pointsText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#1DA1F2',
  },
});

export default SendMessage;
*/
////////////////
/*
//잘됨
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import { getFirestore, collection, addDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const SendMessage = ({ route, navigation }) => {
  const [message, setMessage] = useState('');
  const [points, setPoints] = useState(0);
  const db = getFirestore();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const { friendId, friendName } = route.params;

  useEffect(() => {
    const fetchUserPoints = async () => {
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setPoints(userDocSnap.data().points || 0);
        }
      }
    };

    fetchUserPoints();
  }, [currentUser]);

  const sendMessage = async () => {
    if (points < 10) {
      Alert.alert("포인트 부족", "메시지를 보내기 위해서는 최소 10포인트가 필요합니다.");
      return;
    }

    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);
      const senderName = userDocSnap.data().name;

      await addDoc(collection(db, "messages"), {
        to: friendId,
        from: currentUser.uid,
        fromName: senderName,
        text: message,
        timestamp: new Date()
      });

      await updateDoc(userDocRef, {
        points: points - 10
      });

      Alert.alert("메시지 보내기 성공", "메시지가 성공적으로 전송되었습니다.");
      setMessage('');
      navigation.goBack();
    } catch (error) {
      Alert.alert("메시지 보내기 실패", "메시지를 보내는 동안 오류가 발생했습니다.");
      console.error("Error sending message: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.warningText}>메시지 전송시 포인트가 10 차감 됩니다</Text>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="보낼 메시지를 작성하세요..."
      />
      <Button title="보내기" onPress={sendMessage} />
      <Text style={styles.pointsText}>현재 포인트: {points}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20
  },
  warningText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'red',
    marginBottom: 20
  },
  pointsText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#1DA1F2',
  },
});

export default SendMessage;
*/

///////////////
/*
//필드 추가, 이름 버그
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import { getFirestore, collection, addDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const SendMessage = ({ route, navigation }) => {
  const [message, setMessage] = useState('');
  const [points, setPoints] = useState(0);
  const db = getFirestore();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const { friendId, friendName } = route.params;

  useEffect(() => {
    const fetchUserPoints = async () => {
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setPoints(userDocSnap.data().points || 0);
        }
      }
    };

    fetchUserPoints();
  }, [currentUser]);

  const sendMessage = async () => {
    if (points < 10) {
      Alert.alert("포인트 부족", "메시지를 보내기 위해서는 최소 10포인트가 필요합니다.");
      return;
    }

    try {
      await addDoc(collection(db, "messages"), {
        to: friendId,
        from: currentUser.uid,
        text: message,
        timestamp: new Date(),
        type: 'message' // 일반 메시지 타입 추가
      });

      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        points: points - 10
      });

      Alert.alert("메시지 보내기 성공", "메시지가 성공적으로 전송되었습니다.");
      setMessage('');
      navigation.goBack();
    } catch (error) {
      Alert.alert("메시지 보내기 실패", "메시지를 보내는 동안 오류가 발생했습니다.");
      console.error("Error sending message: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.warningText}>메시지 전송시 포인트가 10 차감 됩니다</Text>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="보낼 메시지를 작성하세요..."
      />
      <Button title="보내기" onPress={sendMessage} />
      <Text style={styles.pointsText}>현재 포인트: {points}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20
  },
  warningText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'red',
    marginBottom: 20
  },
  pointsText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#1DA1F2',
  },
});

export default SendMessage;

*/

////////////////
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import { getFirestore, collection, addDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const SendMessage = ({ route, navigation }) => {
  const [message, setMessage] = useState('');
  const [points, setPoints] = useState(0);
  const db = getFirestore();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const { friendId, friendName } = route.params;

  useEffect(() => {
    const fetchUserPoints = async () => {
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setPoints(userDocSnap.data().points || 0);
        }
      }
    };

    fetchUserPoints();
  }, [currentUser]);

  const sendMessage = async () => {
    if (points < 10) {
      Alert.alert("포인트 부족", "메시지를 보내기 위해서는 최소 10포인트가 필요합니다.");
      return;
    }

    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);
      const senderName = userDocSnap.data().name;

      await addDoc(collection(db, "messages"), {
        to: friendId,
        from: currentUser.uid,
        fromName: senderName,
        text: message,
        timestamp: new Date(),
        type: 'message' // 일반 메시지 타입 추가
      });

      await updateDoc(userDocRef, {
        points: points - 10
      });

      Alert.alert("메시지 보내기 성공", "메시지가 성공적으로 전송되었습니다.");
      setMessage('');
      navigation.goBack();
    } catch (error) {
      Alert.alert("메시지 보내기 실패", "메시지를 보내는 동안 오류가 발생했습니다.");
      console.error("Error sending message: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.warningText}>메시지 전송시 포인트가 10 차감 됩니다</Text>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="보낼 메시지를 작성하세요..."
      />
      <Button title="보내기" onPress={sendMessage} />
      <Text style={styles.pointsText}>현재 포인트: {points}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20
  },
  warningText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'red',
    marginBottom: 20
  },
  pointsText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#1DA1F2',
  },
});

export default SendMessage;

