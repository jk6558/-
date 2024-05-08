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
