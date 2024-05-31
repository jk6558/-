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

//////////////

/*
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
*/

////////////
/*
//메시지 기능 수정
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
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
            receivedTime: data.timestamp ? format(new Date(data.timestamp.seconds * 1000), 'PPpp') : 'No timestamp'
          };
        });
        // 클라이언트 측에서 최신 메시지 순으로 정렬
        loadedMessages.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
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
          <TouchableOpacity
            style={styles.messageBox}
            onPress={() => Alert.alert('Message Detail', item.message || item.text)}
          >
            <Text>{item.message || item.text}</Text>
            <Text style={styles.timeStamp}>{item.receivedTime}</Text>
          </TouchableOpacity>
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

/////////////

/*
//ReceiveMessage.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

const ReceiveMessage = () => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const db = getFirestore();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const navigation = useNavigation();

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
            receivedTime: data.timestamp ? format(new Date(data.timestamp.seconds * 1000), 'PPpp') : 'No timestamp'
          };
        });
        // 클라이언트 측에서 최신 메시지 순으로 정렬
        loadedMessages.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
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
          <TouchableOpacity
            style={styles.messageBox}
            onPress={() => navigation.navigate('MessageDetail', { message: item.message || item.text })}
          >
            <Text>{item.message || item.text}</Text>
            <Text style={styles.timeStamp}>{item.receivedTime}</Text>
          </TouchableOpacity>
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

///////////

/*
//수정, 잘됨


import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

const ReceiveMessage = () => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const db = getFirestore();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const navigation = useNavigation();

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
            receivedTime: data.timestamp ? format(new Date(data.timestamp.seconds * 1000), 'PPpp') : 'No timestamp'
          };
        });
        // 클라이언트 측에서 최신 메시지 순으로 정렬
        loadedMessages.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
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
          <TouchableOpacity
            style={styles.messageBox}
            onPress={() => navigation.navigate('MessageDetail', { message: item })}
          >
            <Text>{item.message || item.text}</Text>
            <Text style={styles.timeStamp}>{item.receivedTime}</Text>
          </TouchableOpacity>
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

///////
/*
//메시지 기능 수정
// ReceiveMessage.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

const ReceiveMessage = () => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const db = getFirestore();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const navigation = useNavigation();

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
            receivedTime: data.timestamp ? format(new Date(data.timestamp.seconds * 1000), 'PPpp') : 'No timestamp'
          };
        });
        // 클라이언트 측에서 최신 메시지 순으로 정렬
        loadedMessages.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
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
          <TouchableOpacity
            style={styles.messageBox}
            onPress={() => navigation.navigate('MessageDetail', { message: item })}
          >
            <Text>{item.message || item.text}</Text>
            <Text style={styles.timeStamp}>{item.receivedTime}</Text>
          </TouchableOpacity>
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
///////////

/*
//ui 개선 


import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { Card, Avatar, Text } from 'react-native-paper';

const ReceiveMessage = () => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const db = getFirestore();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const navigation = useNavigation();

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
            receivedTime: data.timestamp ? format(new Date(data.timestamp.seconds * 1000), 'PPpp') : 'No timestamp'
          };
        });
        // 클라이언트 측에서 최신 메시지 순으로 정렬
        loadedMessages.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
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
          <TouchableOpacity
            onPress={() => navigation.navigate('MessageDetail', { message: item })}
          >
            <Card style={styles.card}>
              <Card.Title
                title={item.from || '알 수 없는 사용자'}
                subtitle={item.receivedTime}
                left={(props) => <Avatar.Icon {...props} icon="account" />}
              />
              <Card.Content>
                <Text style={styles.messageText}>{item.message || item.text}</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5'
  },
  card: {
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 3
  },
  messageText: {
    fontSize: 16,
    color: '#333'
  }
});

export default ReceiveMessage;
*/


///////
/*
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

const ReceiveMessage = () => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const db = getFirestore();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const navigation = useNavigation();

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
            receivedTime: data.timestamp ? format(new Date(data.timestamp.seconds * 1000), 'PPpp') : 'No timestamp'
          };
        });
        // 클라이언트 측에서 최신 메시지 순으로 정렬
        loadedMessages.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
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
          <TouchableOpacity
            style={styles.messageBox}
            onPress={() => navigation.navigate('MessageDetail', { message: item })}
          >
            <View style={styles.messageHeader}>
              <Text style={styles.senderName}>{item.from || '알 수 없는 사용자'}</Text>
              <Text style={styles.timeStamp}>{item.receivedTime}</Text>
            </View>
            <Text style={styles.messageText}>{item.message || item.text}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f9f9f9'
  },
  messageBox: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 2, // for shadow on Android
    shadowColor: '#000', // for shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  senderName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  timeStamp: {
    fontSize: 12,
    color: '#666',
  },
  messageText: {
    fontSize: 14,
    color: '#333',
  },
});

export default ReceiveMessage;
*/

///////////

/*
//수정, 잘됨
//ReceiveMessage.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

const ReceiveMessage = () => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const db = getFirestore();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const navigation = useNavigation();

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
            receivedTime: data.timestamp ? format(new Date(data.timestamp.seconds * 1000), 'PPpp') : 'No timestamp'
          };
        });
        // 클라이언트 측에서 최신 메시지 순으로 정렬
        loadedMessages.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
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
          <TouchableOpacity
            style={styles.messageBox}
            onPress={() => navigation.navigate('MessageDetail', { message: item })}
          >
            <View style={styles.messageHeader}>
              <Text style={styles.senderName}>{item.fromName || '알 수 없는 사용자'}</Text>
              <Text style={styles.timeStamp}>{item.receivedTime}</Text>
            </View>
            <Text style={styles.messageText}>{item.text}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f9f9f9'
  },
  messageBox: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 2, // for shadow on Android
    shadowColor: '#000', // for shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  senderName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  timeStamp: {
    fontSize: 12,
    color: '#666',
  },
  messageText: {
    fontSize: 14,
    color: '#333',
  },
});

export default ReceiveMessage;
*/

//////////////

/*
//포인트 소모 테스트
// 이름 아직 안가림
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

const ReceiveMessage = () => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [points, setPoints] = useState(0);
  const [revealedMessages, setRevealedMessages] = useState({});
  const db = getFirestore();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMessages = async () => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setPoints(userDocSnap.data().points || 0);
          }

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
              receivedTime: data.timestamp ? format(new Date(data.timestamp.seconds * 1000), 'PPpp') : 'No timestamp'
            };
          });
          loadedMessages.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
          setMessages(loadedMessages);
          setLoading(false);
        } catch (error) {
          Alert.alert("메시지를 가져오는 동안 오류가 발생했습니다.", error.message);
        }
      }
    };

    fetchMessages();
  }, [currentUser]);

  const handleRevealMessage = async (messageId) => {
    if (points < 10) {
      Alert.alert("포인트 부족", "메시지를 보기 위해서는 최소 10포인트가 필요합니다.");
      return;
    }

    Alert.alert(
      "포인트 사용",
      "메시지를 보려면 10포인트가 필요합니다. 사용하시겠습니까?",
      [
        { text: "아니요" },
        { text: "예", onPress: async () => {
            setPoints(points - 10);
            setRevealedMessages({ ...revealedMessages, [messageId]: true });

            const userDocRef = doc(db, "users", currentUser.uid);
            await updateDoc(userDocRef, {
              points: points - 10
            });
          }
        }
      ]
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.messageBox}
            onPress={() => !revealedMessages[item.id] && handleRevealMessage(item.id)}
          >
            <View style={styles.messageHeader}>
              <Text style={styles.senderName}>{item.fromName || '알 수 없는 사용자'}</Text>
              <Text style={styles.timeStamp}>{item.receivedTime}</Text>
            </View>
            {revealedMessages[item.id] ? (
              <Text style={styles.messageText}>{item.text}</Text>
            ) : (
              <Text style={styles.messageText}>내용을 확인하려면 10포인트가 필요합니다.</Text>
            )}
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f9f9f9'
  },
  messageBox: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 2, // for shadow on Android
    shadowColor: '#000', // for shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  senderName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  timeStamp: {
    fontSize: 12,
    color: '#666',
  },
  messageText: {
    fontSize: 14,
    color: '#333',
  },
});

export default ReceiveMessage;
*/

//////////////


/*
//포인트소모,이름 가림
//잘됨
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

const ReceiveMessage = () => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [points, setPoints] = useState(0);
  const [revealedMessages, setRevealedMessages] = useState({});
  const db = getFirestore();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMessages = async () => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setPoints(userDocSnap.data().points || 0);
          }

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
              receivedTime: data.timestamp ? format(new Date(data.timestamp.seconds * 1000), 'PPpp') : 'No timestamp'
            };
          });
          loadedMessages.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
          setMessages(loadedMessages);
          setLoading(false);
        } catch (error) {
          Alert.alert("메시지를 가져오는 동안 오류가 발생했습니다.", error.message);
        }
      }
    };

    fetchMessages();
  }, [currentUser]);

  const handleRevealMessage = async (messageId) => {
    if (points < 10) {
      Alert.alert("포인트 부족", "메시지를 보기 위해서는 최소 10포인트가 필요합니다.");
      return;
    }

    Alert.alert(
      "포인트 사용",
      "메시지를 보려면 10포인트가 필요합니다. 사용하시겠습니까?",
      [
        { text: "아니요" },
        { text: "예", onPress: async () => {
            try {
              const userDocRef = doc(db, "users", currentUser.uid);
              await updateDoc(userDocRef, {
                points: points - 10
              });
              setPoints(points - 10);
              setRevealedMessages({ ...revealedMessages, [messageId]: true });
            } catch (error) {
              Alert.alert("포인트 사용 오류", error.message);
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.messageBox}
            onPress={() => !revealedMessages[item.id] && handleRevealMessage(item.id)}
          >
            <View style={styles.messageHeader}>
              <Text style={styles.senderName}>{revealedMessages[item.id] ? (item.fromName || '알 수 없는 사용자') : '알 수 없는 사용자'}</Text>
              <Text style={styles.timeStamp}>{item.receivedTime}</Text>
            </View>
            {revealedMessages[item.id] ? (
              <Text style={styles.messageText}>{item.text}</Text>
            ) : (
              <Text style={styles.messageText}>내용을 확인하려면 10포인트가 필요합니다.</Text>
            )}
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f9f9f9'
  },
  messageBox: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 2, // for shadow on Android
    shadowColor: '#000', // for shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  senderName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  timeStamp: {
    fontSize: 12,
    color: '#666',
  },
  messageText: {
    fontSize: 14,
    color: '#333',
  },
});

export default ReceiveMessage;

*/
////////////////

/*
//필드 추가, 센드 메시지 이름 버그
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

const ReceiveMessage = () => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [points, setPoints] = useState(0);
  const [revealedMessages, setRevealedMessages] = useState({});
  const db = getFirestore();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMessages = async () => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setPoints(userDocSnap.data().points || 0);
          }

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
              receivedTime: data.timestamp ? format(new Date(data.timestamp.seconds * 1000), 'PPpp') : 'No timestamp'
            };
          });
          loadedMessages.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
          setMessages(loadedMessages);
          setLoading(false);
        } catch (error) {
          Alert.alert("메시지를 가져오는 동안 오류가 발생했습니다.", error.message);
        }
      }
    };

    fetchMessages();
  }, [currentUser]);

  const handleRevealMessage = async (messageId) => {
    if (points < 10) {
      Alert.alert("포인트 부족", "메시지를 보기 위해서는 최소 10포인트가 필요합니다.");
      return;
    }

    Alert.alert(
      "포인트 사용",
      "메시지를 보려면 10포인트가 필요합니다. 사용하시겠습니까?",
      [
        { text: "아니요" },
        { text: "예", onPress: async () => {
            try {
              const userDocRef = doc(db, "users", currentUser.uid);
              await updateDoc(userDocRef, {
                points: points - 10
              });
              setPoints(points - 10);
              setRevealedMessages({ ...revealedMessages, [messageId]: true });
            } catch (error) {
              Alert.alert("포인트 사용 오류", error.message);
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.messageBox}
            onPress={() => !revealedMessages[item.id] && handleRevealMessage(item.id)}
          >
            <View style={styles.messageHeader}>
              <Text style={styles.senderName}>{revealedMessages[item.id] ? (item.fromName || '알 수 없는 사용자') : '알 수 없는 사용자'}</Text>
              <Text style={styles.timeStamp}>{item.receivedTime}</Text>
            </View>
            {revealedMessages[item.id] ? (
              <Text style={styles.messageText}>{item.text}</Text>
            ) : (
              <Text style={styles.messageText}>
                {item.type === 'praise'
                  ? '누군가 나를 칭찬했습니다. 내용을 확인하려면 10포인트가 필요합니다.'
                  : '누군가 나에게 메시지를 보냈습니다. 내용을 확인하려면 10포인트가 필요합니다.'}
              </Text>
            )}
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f9f9f9'
  },
  messageBox: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 2, // for shadow on Android
    shadowColor: '#000', // for shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  senderName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  timeStamp: {
    fontSize: 12,
    color: '#666',
  },
  messageText: {
    fontSize: 14,
    color: '#333',
  },
});

export default ReceiveMessage;
*/

//////////////
/*
//버그수정
//잘됨
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

const ReceiveMessage = () => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [points, setPoints] = useState(0);
  const [revealedMessages, setRevealedMessages] = useState({});
  const db = getFirestore();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMessages = async () => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setPoints(userDocSnap.data().points || 0);
          }

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
              receivedTime: data.timestamp ? format(new Date(data.timestamp.seconds * 1000), 'PPpp') : 'No timestamp'
            };
          });
          loadedMessages.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
          setMessages(loadedMessages);
          setLoading(false);
        } catch (error) {
          Alert.alert("메시지를 가져오는 동안 오류가 발생했습니다.", error.message);
        }
      }
    };

    fetchMessages();
  }, [currentUser]);

  const handleRevealMessage = async (messageId) => {
    if (points < 10) {
      Alert.alert("포인트 부족", "메시지를 보기 위해서는 최소 10포인트가 필요합니다.");
      return;
    }

    Alert.alert(
      "포인트 사용",
      "메시지를 보려면 10포인트가 필요합니다. 사용하시겠습니까?",
      [
        { text: "아니요" },
        { text: "예", onPress: async () => {
            try {
              const userDocRef = doc(db, "users", currentUser.uid);
              await updateDoc(userDocRef, {
                points: points - 10
              });
              setPoints(points - 10);
              setRevealedMessages({ ...revealedMessages, [messageId]: true });
            } catch (error) {
              Alert.alert("포인트 사용 오류", error.message);
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.messageBox}
            onPress={() => !revealedMessages[item.id] && handleRevealMessage(item.id)}
          >
            <View style={styles.messageHeader}>
              <Text style={styles.senderName}>{revealedMessages[item.id] ? (item.fromName || '알 수 없는 사용자') : '알 수 없는 사용자'}</Text>
              <Text style={styles.timeStamp}>{item.receivedTime}</Text>
            </View>
            {revealedMessages[item.id] ? (
              <Text style={styles.messageText}>{item.text}</Text>
            ) : (
              <Text style={styles.messageText}>
                {item.type === 'praise'
                  ? '누군가 나를 칭찬했습니다. 내용을 확인하려면 10포인트가 필요합니다.'
                  : '누군가 나에게 메시지를 보냈습니다. 내용을 확인하려면 10포인트가 필요합니다.'}
              </Text>
            )}
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f9f9f9'
  },
  messageBox: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 2, // for shadow on Android
    shadowColor: '#000', // for shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  senderName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  timeStamp: {
    fontSize: 12,
    color: '#666',
  },
  messageText: {
    fontSize: 14,
    color: '#333',
  },
});

export default ReceiveMessage;
*/

////////////////

/*
//포인트 중복 사용 수정
//잘됨
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

const ReceiveMessage = () => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [points, setPoints] = useState(0);
  const [revealedMessages, setRevealedMessages] = useState({});
  const db = getFirestore();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMessages = async () => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setPoints(userDocSnap.data().points || 0);
          }

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
              receivedTime: data.timestamp ? format(new Date(data.timestamp.seconds * 1000), 'PPpp') : 'No timestamp'
            };
          });
          loadedMessages.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
          setMessages(loadedMessages);

          // 이미 읽은 메시지 상태 설정
          const revealed = {};
          loadedMessages.forEach(message => {
            if (message.revealed) {
              revealed[message.id] = true;
            }
          });
          setRevealedMessages(revealed);

          setLoading(false);
        } catch (error) {
          Alert.alert("메시지를 가져오는 동안 오류가 발생했습니다.", error.message);
        }
      }
    };

    fetchMessages();
  }, [currentUser]);

  const handleRevealMessage = async (messageId) => {
    if (points < 10) {
      Alert.alert("포인트 부족", "메시지를 보기 위해서는 최소 10포인트가 필요합니다.");
      return;
    }

    Alert.alert(
      "포인트 사용",
      "메시지를 보려면 10포인트가 필요합니다. 사용하시겠습니까?",
      [
        { text: "아니요" },
        { text: "예", onPress: async () => {
            try {
              const userDocRef = doc(db, "users", currentUser.uid);
              await updateDoc(userDocRef, {
                points: points - 10
              });
              setPoints(points - 10);

              const messageDocRef = doc(db, "messages", messageId);
              await updateDoc(messageDocRef, {
                revealed: true
              });

              setRevealedMessages({ ...revealedMessages, [messageId]: true });
            } catch (error) {
              Alert.alert("포인트 사용 오류", error.message);
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.messageBox}
            onPress={() => !revealedMessages[item.id] && handleRevealMessage(item.id)}
          >
            <View style={styles.messageHeader}>
              <Text style={styles.senderName}>{revealedMessages[item.id] ? (item.fromName || '알 수 없는 사용자') : '알 수 없는 사용자'}</Text>
              <Text style={styles.timeStamp}>{item.receivedTime}</Text>
            </View>
            {revealedMessages[item.id] ? (
              <Text style={styles.messageText}>{item.text}</Text>
            ) : (
              <Text style={styles.messageText}>{item.type === 'praise' ? '누군가 나를 칭찬했어요, 누가 나를 칭찬했을까요?' : '누군가 메시지를 보냈어요, 확인해볼까요?'}</Text>
            )}
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f9f9f9'
  },
  messageBox: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 2, // for shadow on Android
    shadowColor: '#000', // for shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  senderName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  timeStamp: {
    fontSize: 12,
    color: '#666',
  },
  messageText: {
    fontSize: 14,
    color: '#333',
  },
});

export default ReceiveMessage;
*/

///////////////////

/*
//포인트 기능 추가
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, Animated } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

const ReceiveMessage = () => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [points, setPoints] = useState(0);
  const [revealedMessages, setRevealedMessages] = useState({});
  const pointsAnim = useRef(new Animated.Value(0)).current;
  const [showPoints, setShowPoints] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current; // 페이드 애니메이션
  const db = getFirestore();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMessages = async () => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userPoints = userDocSnap.data().points || 0;
            setPoints(userPoints);
            pointsAnim.setValue(userPoints);
          }

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
              receivedTime: data.timestamp ? format(new Date(data.timestamp.seconds * 1000), 'PPpp') : 'No timestamp'
            };
          });
          loadedMessages.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
          setMessages(loadedMessages);
          setLoading(false);
        } catch (error) {
          Alert.alert("메시지를 가져오는 동안 오류가 발생했습니다.", error.message);
        }
      }
    };

    fetchMessages();
  }, [currentUser]);

  const handleRevealMessage = async (messageId) => {
    if (points < 10) {
      Alert.alert("포인트 부족", "메시지를 보기 위해서는 최소 10포인트가 필요합니다.");
      return;
    }

    Alert.alert(
      "포인트 사용",
      "메시지를 보려면 10포인트가 필요합니다. 사용하시겠습니까?",
      [
        { text: "아니요" },
        { text: "예", onPress: async () => {
            try {
              const newPoints = points - 10;
              const userDocRef = doc(db, "users", currentUser.uid);
              await updateDoc(userDocRef, {
                points: newPoints
              });

              setPoints(newPoints);
              setRevealedMessages({ ...revealedMessages, [messageId]: true });
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

              Animated.timing(pointsAnim, {
                toValue: newPoints,
                duration: 500,
                useNativeDriver: false,
              }).start();
            } catch (error) {
              Alert.alert("포인트 사용 오류", error.message);
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <Animated.Text style={styles.pointsText}>
        현재 포인트: {pointsAnim.interpolate({
          inputRange: [0, points],
          outputRange: [0, points],
          extrapolate: 'clamp'
        })}
      </Animated.Text>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.messageBox}
            onPress={() => !revealedMessages[item.id] && handleRevealMessage(item.id)}
          >
            <View style={styles.messageHeader}>
              <Text style={styles.senderName}>{revealedMessages[item.id] ? (item.fromName || '알 수 없는 사용자') : '알 수 없는 사용자'}</Text>
              <Text style={styles.timeStamp}>{item.receivedTime}</Text>
            </View>
            {revealedMessages[item.id] ? (
              <Text style={styles.messageText}>{item.text}</Text>
            ) : (
              <Text style={styles.messageText}>
                {item.type === 'praise' ? '누군가 나를 칭찬했어요. 누구일까요?' : '누군가 나에게 메시지를 보냈어요. 내용이 궁금한가요?'}
              </Text>
            )}
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
      {showPoints && (
        <Animated.View style={[styles.addedPointsContainer, { opacity: fadeAnim }]}>
          <Text style={styles.addedPointsText}>10포인트 사용됨</Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f9f9f9'
  },
  pointsText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  messageBox: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 2, // for shadow on Android
    shadowColor: '#000', // for shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  senderName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  timeStamp: {
    fontSize: 12,
    color: '#666',
  },
  messageText: {
    fontSize: 14,
    color: '#333',
  },
  addedPointsContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
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

export default ReceiveMessage;
*/

//////////
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, Animated } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

const ReceiveMessage = () => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [points, setPoints] = useState(0);
  const [revealedMessages, setRevealedMessages] = useState({});
  const pointsAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current; // 페이드 애니메이션
  const db = getFirestore();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMessages = async () => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userPoints = userDocSnap.data().points || 0;
            setPoints(userPoints);
            pointsAnim.setValue(userPoints);
          }

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
              receivedTime: data.timestamp ? format(new Date(data.timestamp.seconds * 1000), 'PPpp') : 'No timestamp',
              revealed: data.revealed || false,
            };
          });
          loadedMessages.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
          setMessages(loadedMessages);
          setLoading(false);

          const revealed = {};
          loadedMessages.forEach(msg => {
            if (msg.revealed) revealed[msg.id] = true;
          });
          setRevealedMessages(revealed);
        } catch (error) {
          Alert.alert("메시지를 가져오는 동안 오류가 발생했습니다.", error.message);
        }
      }
    };

    fetchMessages();
  }, [currentUser]);

  const handleRevealMessage = async (messageId) => {
    if (points < 10) {
      Alert.alert("포인트 부족", "메시지를 보기 위해서는 최소 10포인트가 필요합니다.");
      return;
    }

    Alert.alert(
      "포인트 사용",
      "메시지를 보려면 10포인트가 필요합니다. 사용하시겠습니까?",
      [
        { text: "아니요" },
        { text: "예", onPress: async () => {
            try {
              const newPoints = points - 10;
              const userDocRef = doc(db, "users", currentUser.uid);
              const messageDocRef = doc(db, "messages", messageId);
              await updateDoc(userDocRef, {
                points: newPoints
              });
              await updateDoc(messageDocRef, {
                revealed: true
              });

              setPoints(newPoints);
              setRevealedMessages({ ...revealedMessages, [messageId]: true });

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
                }).start();
              });

              Animated.timing(pointsAnim, {
                toValue: newPoints,
                duration: 500,
                useNativeDriver: false,
              }).start();
            } catch (error) {
              Alert.alert("포인트 사용 오류", error.message);
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <Animated.Text style={styles.pointsText}>
        현재 포인트: {pointsAnim.interpolate({
          inputRange: [0, points],
          outputRange: [0, points],
          extrapolate: 'clamp'
        })}
      </Animated.Text>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.messageBox}
            onPress={() => !revealedMessages[item.id] && handleRevealMessage(item.id)}
          >
            <View style={styles.messageHeader}>
              <Text style={styles.senderName}>{revealedMessages[item.id] ? (item.fromName || '알 수 없는 사용자') : '알 수 없는 사용자'}</Text>
              <Text style={styles.timeStamp}>{item.receivedTime}</Text>
            </View>
            {revealedMessages[item.id] ? (
              <Text style={styles.messageText}>{item.text}</Text>
            ) : (
              <Text style={styles.messageText}>
                {item.type === 'praise' ? '누군가 나를 칭찬했어요. 누구일까요?' : '누군가 나에게 메시지를 보냈어요. 내용이 궁금한가요?'}
              </Text>
            )}
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f9f9f9'
  },
  pointsText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  messageBox: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 2, // for shadow on Android
    shadowColor: '#000', // for shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  senderName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  timeStamp: {
    fontSize: 12,
    color: '#666',
  },
  messageText: {
    fontSize: 14,
    color: '#333',
  },
});

export default ReceiveMessage;
