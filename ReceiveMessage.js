/*
//v1
//ReceiveMessage.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReceiveMessage = () => {
  return (
    <View style={styles.container}>
      <Text>Received Messages</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ReceiveMessage;
*/

///////////

/*
//v2
//ReceiveMessage.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { getFirestore, collection, query, orderBy, getDocs } from 'firebase/firestore';

const ReceiveMessage = () => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchMessages = async () => {
      const querySnapshot = await getDocs(query(collection(db, "messages"), orderBy("timestamp", "desc")));
      const loadedMessages = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(loadedMessages);
      setLoading(false);
    };

    fetchMessages();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={styles.messageBox}>
            <Text>{item.text}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  },
  messageBox: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0'
  }
});

export default ReceiveMessage;
*/


//////////////


/*
//v3
//특정 사용자만 메세지 확인가능
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const ReceiveMessage = () => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const db = getFirestore();
  const auth = getAuth();
  const currentUser = auth.currentUser;  // 현재 로그인한 사용자

  useEffect(() => {
    const fetchMessages = async () => {
      if (currentUser) {
        const messagesQuery = query(
          collection(db, "messages"),
          where("to", "==", currentUser.uid)  // 현재 사용자의 ID로 필터링
        );
        const querySnapshot = await getDocs(messagesQuery);
        const loadedMessages = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMessages(loadedMessages);
        setLoading(false);
      }
    };

    fetchMessages();
  }, [currentUser]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={styles.messageBox}>
            <Text>{item.text}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  },
  messageBox: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0'
  }
});

export default ReceiveMessage;
*/


//////////////

/*
//V4 타임 스탬프 에러
//ReceiveMessage.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { format } from 'date-fns'; // date-fns 라이브러리를 사용해 날짜를 포맷팅

const ReceiveMessage = () => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const db = getFirestore();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchMessages = async () => {
      if (currentUser) {
        const messagesQuery = query(
          collection(db, "messages"),
          where("to", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(messagesQuery);
        const loadedMessages = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            receivedTime: data.receivedTime ? format(data.receivedTime.toDate(), 'PPpp') : 'No timestamp' // 메시지에 저장된 타임스탬프를 포맷팅
          };
        });
        setMessages(loadedMessages);
        setLoading(false);
      }
    };

    fetchMessages();
  }, [currentUser]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={styles.messageBox}>
            <Text>{item.text}</Text>
            <Text style={styles.timeStamp}>{item.receivedTime}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  },
  messageBox: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0'
  },
  timeStamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 5
  }
});

export default ReceiveMessage;
*/
/////////////////



/*
//에러
import { format, parseISO } from 'date-fns';

const ReceiveMessage = () => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const db = getFirestore();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchMessages = async () => {
      if (currentUser) {
        const messagesQuery = query(
          collection(db, "messages"),
          where("to", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(messagesQuery);
        const loadedMessages = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            receivedTime: data.timestamp ? format(parseISO(data.timestamp), 'PPpp') : 'No timestamp'  // ISO 형식의 문자열을 Date 객체로 변환 후 포맷팅
          };
        });
        setMessages(loadedMessages);
        setLoading(false);
      }
    };

    fetchMessages();
  }, [currentUser]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={styles.messageBox}>
            <Text>{item.text}</Text>
            <Text style={styles.timeStamp}>{item.receivedTime}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

*/


//V5 타임스탬프 성공

// ReceiveMessage.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { format } from 'date-fns'; // date-fns 라이브러리를 사용해 날짜를 포맷팅

const ReceiveMessage = () => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const db = getFirestore();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchMessages = async () => {
      if (currentUser) {
        const messagesQuery = query(
          collection(db, "messages"),
          where("to", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(messagesQuery);
        const loadedMessages = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            // 데이터를 안전하게 처리하고, 타임스탬프가 없을 경우 'No timestamp'를 반환
            receivedTime: data.timestamp ? format(new Date(data.timestamp.seconds * 1000), 'PPpp') : 'No timestamp'
          };
        });
        setMessages(loadedMessages);
        setLoading(false);
      }
    };

    fetchMessages();
  }, [currentUser]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={styles.messageBox}>
            <Text>{item.text}</Text>
            <Text style={styles.timeStamp}>{item.receivedTime}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  },
  messageBox: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0'
  },
  timeStamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 5
  }
});

export default ReceiveMessage;
