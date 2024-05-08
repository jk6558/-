//HomeScreen


///////

/*
//v1
//HomeScreen.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert, BackHandler } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

function HomeScreen() {
    const navigation = useNavigation(); // useNavigation 훅을 컴포넌트 내에서 사용
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
            Alert.alert("등록된 사용자 정보 불러올수 없음");
          }
        }
      };
  
      fetchUserInfo();
    }, []);

    const handlePraise = () => {
      Alert.alert('알림', '칭찬할 사람들 목록');
    };
  
    
    const handleFriend = () => {
      Alert.alert('알림', '친구목록');
    };
    
  
    const handleLike = () => {
      Alert.alert('알림', '칭찬받은목록!');
    };
  
    const handleSetting = () => {
      navigation.navigate('Settings');
    };
  
    const handleEnd = () => {
      BackHandler.exitApp();
    };
  
    return (
      <View style={styles.container}>
        <Card>
          <Card.Content>
            <Title style={styles.title}>칭찬하기</Title>
            <Paragraph style={styles.title}>칭찬하고 싶은 사람과 말을 골라서 칭찬을 해보아요!</Paragraph>
            <Paragraph style={styles.subtitle}>이름: {userInfo.name}</Paragraph>
            <Paragraph style={styles.subtitle}>소속: {userInfo.affiliation}</Paragraph>
          </Card.Content>
        </Card>
        
        <View style={styles.middleFrame}>
          <Button  
            icon={({ size, color }) => (
              <MaterialIcons name="favorite" size={size} color={color} />
            )}
            onPress={handlePraise} 
            style={styles.middleButton}
          >
            칭찬하기
          </Button>
        </View>
  
        <View style={styles.bottomFrame}>
          <Button onPress={handleFriend} icon={() => <MaterialIcons name="people" size={24} color="black" />}></Button>
          <Button onPress={handleLike} icon={() => <MaterialIcons name="favorite-border" size={24} color="black" />}></Button>
          <Button onPress={handleSetting} icon={() => <MaterialIcons name="settings" size={24} color="black" />}></Button>
          <Button onPress={handleEnd} icon={() => <MaterialIcons name="logout" size={24} color="black" />}></Button>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
    },
    title: {
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: '#333',
      textAlign: 'center',
      marginTop: 4,
    },
    middleFrame: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    middleButton: {
      backgroundColor: 'white',
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginVertical: 5,
    },
    bottomFrame: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0,
    },
  });
  
export default HomeScreen;
*/
//////



///////////////
/*
// HomeScreen.js 2 실패
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert, BackHandler } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
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
            setUserInfo(docSnap.data());
          } else {
            Alert.alert("등록된 사용자 정보 불러올수 없음");
          }
        }
      };
  
      fetchUserInfo();
    }, []);

    const handlePraise = () => {
      Alert.alert('알림', '칭찬할 사람들 목록');
    };
  
    const handleFriend = () => {
      navigation.navigate('Friends');  // FriendsScreen으로 이동
    };
  
    const handleLike = () => {
      Alert.alert('알림', '칭찬받은목록!');
    };
  
    const handleSetting = () => {
      navigation.navigate('Settings');
    };
  
    const handleEnd = () => {
      BackHandler.exitApp();
    };
  
    return (
      <View style={styles.container}>
        <Card>
          <Card.Content>
            <Title style={styles.title}>칭찬하기</Title>
            <Paragraph style={styles.title}>칭찬하고 싶은 사람과 말을 골라서 칭찬을 해보아요!</Paragraph>
            <Paragraph style={styles.subtitle}>이름: {userInfo.name}</Paragraph>
            <Paragraph style={styles.subtitle}>소속: {userInfo.affiliation}</Paragraph>
          </Card.Content>
        </Card>
        
        <View style={styles.middleFrame}>
          <Button  
            icon={({ size, color }) => (
              <MaterialIcons name="favorite" size={size} color={color} />
            )}
            onPress={handlePraise} 
            style={styles.middleButton}
          >
            칭찬하기
          </Button>
        </View>
  
        <View style={styles.bottomFrame}>
          <Button onPress={handleFriend} icon={() => <MaterialIcons name="people" size={24} color="black" />}></Button>
          <Button onPress={handleLike} icon={() => <MaterialIcons name="favorite-border" size={24} color="black" />}></Button>
          <Button onPress={handleSetting} icon={() => <MaterialIcons name="settings" size={24} color="black" />}></Button>
          <Button onPress={handleEnd} icon={() => <MaterialIcons name="logout" size={24} color="black" />}></Button>
        </View>
      </View>
    );
  }

export default HomeScreen;

*/
////////////////


/*
//v3 잘됨, 등록된 친구 목록 구현x
//HomeScreen.js

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert, BackHandler } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
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
            setUserInfo(docSnap.data());
          } else {
            Alert.alert("등록된 사용자 정보 불러올수 없음");
          }
        }
      };
  
      fetchUserInfo();
    }, []);

    const handlePraise = () => {
      Alert.alert('알림', '칭찬할 사람들 목록');
    };
  
    const handleFriend = () => {
      navigation.navigate('Friends');  // FriendsScreen으로 이동
    };
  
    const handleLike = () => {
      Alert.alert('알림', '칭찬받은목록!');
    };
  
    const handleSetting = () => {
      navigation.navigate('Settings');
    };
  
    const handleEnd = () => {
      BackHandler.exitApp();
    };
  
    return (
      <View style={styles.container}>
        <Card>
          <Card.Content>
            <Title style={styles.title}>칭찬하기</Title>
            <Paragraph style={styles.title}>칭찬하고 싶은 사람과 말을 골라서 칭찬을 해보아요!</Paragraph>
            <Paragraph style={styles.subtitle}>이름: {userInfo.name}</Paragraph>
            <Paragraph style={styles.subtitle}>소속: {userInfo.affiliation}</Paragraph>
          </Card.Content>
        </Card>

        
        
        <View style={styles.middleFrame}>
          <Button  
            icon={({ size, color }) => (
              <MaterialIcons name="favorite" size={size} color={color} />
            )}
            onPress={handlePraise} 
            style={styles.middleButton}
          >
            칭찬하기
          </Button>
        </View>
  
        <View style={styles.bottomFrame}>
          <Button onPress={handleFriend} icon={() => <MaterialIcons name="people" size={24} color="black" />}></Button>
          <Button onPress={handleLike} icon={() => <MaterialIcons name="favorite-border" size={24} color="black" />}></Button>
          <Button press={handleSetting} icon={() => <MaterialIcons name="settings" size={24} color="black" />}></Button>
          <Button press={handleEnd} icon={() => <MaterialIcons name="logout" size={24} color="black" />}></Button>
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 16,
    color: '#666'
  },
  middleFrame: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20
  },
  middleButton: {
    padding: 10,
    backgroundColor: '#1DA1F2',
    borderRadius: 5
  },
  bottomFrame: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});

export default HomeScreen;
*/



///////////////////////////
/*

//v4 뭔가 이상
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert, BackHandler, Button } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
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
            setUserInfo(docSnap.data());
          } else {
            Alert.alert("등록된 사용자 정보 불러올 수 없음");
          }
        }
      };
  
      fetchUserInfo();
    }, []);

    return (
      <View style={styles.container}>
        <Card>
          <Card.Content>
            <Title style={styles.title}>칭찬하기</Title>
            <Paragraph style={styles.title}>칭찬하고 싶은 사람과 말을 골라서 칭찬을 해보아요!</Paragraph>
            <Paragraph style={styles.subtitle}>이름: {userInfo.name}</Paragraph>
            <Paragraph style={styles.subtitle}>소속: {userInfo.affiliation}</Paragraph>
          </Card.Content>
        </Card>
        
        <View style={styles.bottomFrame}>
          <Button title="친구 목록 보기" onPress={() => navigation.navigate('Friends')} />
          <Button title="칭찬하기" onPress={() => Alert.alert('알림', '칭찬할 사람들 목록')} />
          <Button title="설정" onPress={() => navigation.navigate('Settings')} />
          <Button title="로그아웃" onPress={BackHandler.exitApp} />
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
    },
    title: {
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: '#333',
      textAlign: 'center',
      marginTop: 4,
    },
    bottomFrame: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0,
    },
});

export default HomeScreen;

*/

/////////////////////
/*
//v5 되긴되는데 ui 이상

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert, BackHandler, Button, TouchableOpacity, Text } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
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
            setUserInfo(docSnap.data());
          } else {
            Alert.alert("등록된 사용자 정보 불러올 수 없음");
          }
        }
      };
  
      fetchUserInfo();
    }, []);

    return (
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>칭찬하기</Title>
            <Paragraph style={styles.paragraph}>칭찬하고 싶은 사람과 말을 골라서 칭찬을 해보아요!</Paragraph>
            <Paragraph>이름: {userInfo.name}</Paragraph>
            <Paragraph>소속: {userInfo.affiliation}</Paragraph>
            <Button title="칭찬하기" onPress={() => Alert.alert('칭찬할 사람들 목록')} />
          </Card.Content>
        </Card>
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => navigation.navigate('Friends')}>
            <MaterialIcons name="people" size={24} color="black" />
            <Text>친구 목록</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert('칭찬할 사람들 목록')}>
            <MaterialIcons name="favorite" size={24} color="black" />
            <Text>칭찬하기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <MaterialIcons name="settings" size={24} color="black" />
            <Text>설정</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={BackHandler.exitApp}>
            <MaterialIcons name="exit-to-app" size={24} color="black" />
            <Text>로그아웃</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    card: {
      padding: 20,
      marginVertical: 20
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10
    },
    paragraph: {
      marginBottom: 10
    },
    bottomNav: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      position: 'absolute',
      bottom: 0
    }
});

export default HomeScreen;


*/
////////////////////////////


/*
//v6 잘됨
//HomeScreen.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert, BackHandler } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

function HomeScreen() {
    const navigation = useNavigation(); // useNavigation 훅을 컴포넌트 내에서 사용
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
            Alert.alert("등록된 사용자 정보 불러올수 없음");
          }
        }
      };
  
      fetchUserInfo();
    }, []);

    const handlePraise = () => {
      Alert.alert('알림', '칭찬할 사람들 목록');
    };
  
    
    const handleFriend = () => {
      navigation.navigate('Friends');  // FriendsScreen으로 이동
    };
    
  
    const handleLike = () => {
      Alert.alert('알림', '칭찬받은목록!');
    };
  
    const handleSetting = () => {
      navigation.navigate('Settings');
    };
  
    const handleEnd = () => {
      BackHandler.exitApp();
    };
  
    return (
      <View style={styles.container}>
        <Card>
          <Card.Content>
            <Title style={styles.title}>칭찬하기</Title>
            <Paragraph style={styles.title}>칭찬하고 싶은 사람과 말을 골라서 칭찬을 해보아요!</Paragraph>
            <Paragraph style={styles.subtitle}>이름: {userInfo.name}</Paragraph>
            <Paragraph style={styles.subtitle}>소속: {userInfo.affiliation}</Paragraph>
          </Card.Content>
        </Card>
        
        <View style={styles.middleFrame}>
          <Button  
            icon={({ size, color }) => (
              <MaterialIcons name="favorite" size={size} color={color} />
            )}
            onPress={handlePraise} 
            style={styles.middleButton}
          >
            칭찬하기
          </Button>
        </View>
  
        <View style={styles.bottomFrame}>
          <Button onPress={handleFriend} icon={() => <MaterialIcons name="people" size={24} color="black" />}></Button>
          <Button onPress={handleLike} icon={() => <MaterialIcons name="favorite-border" size={24} color="black" />}></Button>
          <Button onPress={handleSetting} icon={() => <MaterialIcons name="settings" size={24} color="black" />}></Button>
          <Button onPress={handleEnd} icon={() => <MaterialIcons name="logout" size={24} color="black" />}></Button>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
    },
    title: {
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: '#333',
      textAlign: 'center',
      marginTop: 4,
    },
    middleFrame: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    middleButton: {
      backgroundColor: 'white',
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginVertical: 5,
    },
    bottomFrame: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0,
    },
  });
  
export default HomeScreen;

*/

////////////////


//v7
/*

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert, BackHandler } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
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
            setUserInfo(docSnap.data());
          } else {
            Alert.alert("등록된 사용자 정보 불러올 수 없음");
          }
        }
      };
  
      fetchUserInfo();
    }, []);

    const handlePraise = () => {
      navigation.navigate('FriendsList'); // 친구 목록 화면으로 이동
    };

    const handleFriend = () => {
      navigation.navigate('FriendsList');  // 친구 목록 화면으로 이동
    };

    const handleSetting = () => {
      navigation.navigate('Settings');
    };

    const handleEnd = () => {
      BackHandler.exitApp();
    };

    return (
      <View style={styles.container}>
        <Card>
          <Card.Content>
            <Title style={styles.title}>칭찬하기</Title>
            <Paragraph style={styles.title}>칭찬하고 싶은 사람과 말을 골라서 칭찬을 해보아요!</Paragraph>
            <Paragraph style={styles.subtitle}>이름: {userInfo.name}</Paragraph>
            <Paragraph style={styles.subtitle}>소속: {userInfo.affiliation}</Paragraph>
          </Card.Content>
        </Card>
        
        <View style={styles.middleFrame}>
          <Button  
            icon={({ size, color }) => (
              <MaterialIcons name="favorite" size={size} color={color} />
            )}
            onPress={handlePraise} 
            style={styles.middleButton}
          >
            칭찬하기
          </Button>
        </View>
  
        <View style={styles.bottomFrame}>
          <Button onPress={handleFriend} icon={() => <MaterialIcons name="people" size={24} color="black" />}></Button>
          <Button onPress={handleSetting} icon={() => <MaterialIcons name="settings" size={24} color="black" />}></Button>
          <Button onPress={handleEnd} icon={() => <MaterialIcons name="logout" size={24} color="black" />}></Button>
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 4,
  },
  middleFrame: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 5,
  },
  bottomFrame: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});

export default HomeScreen;
*/


/*
//v8 메세지 가능
//HomeScreen.js 
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert, BackHandler } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
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
            Alert.alert("등록된 사용자 정보 불러올수 없음");
          }
        }
      };

      fetchUserInfo();
    }, []);

    const handlePraise = () => {
      navigation.navigate('FriendsList');  // 친구 목록 화면으로 이동
    };

    const handleFriend = () => {
      navigation.navigate('Friends');  // FriendsScreen으로 이동
    };

    const handleLike = () => {
      Alert.alert('알림', '칭찬받은목록!');
    };

    const handleSetting = () => {
      navigation.navigate('Settings');
    };

    const handleEnd = () => {
      BackHandler.exitApp();
    };

    return (
      <View style={styles.container}>
        <Card>
          <Card.Content>
            <Title style={styles.title}>칭찬하기</Title>
            <Paragraph style={styles.title}>칭찬하고 싶은 사람과 말을 골라서 칭찬을 해보아요!</Paragraph>
            <Paragraph style={styles.subtitle}>이름: {userInfo.name}</Paragraph>
            <Paragraph style={styles.subtitle}>소속: {userInfo.affiliation}</Paragraph>
          </Card.Content>
        </Card>

        <View style={styles.middleFrame}>
          <Button
            icon={({ size, color }) => (
              <MaterialIcons name="favorite" size={size} color={color} />
            )}
            onPress={handlePraise} 
            style={styles.middleButton}
          >
            칭찬하기
          </Button>
        </View>
  
        <View style={styles.bottomFrame}>
          <Button onPress={handleFriend} icon={() => <MaterialIcons name="people" size={24} color="black" />}></Button>
          <Button onPress={handleLike} icon={() => <MaterialIcons name="favorite-border" size={24} color="black" />}></Button>
          <Button onPress={handleSetting} icon={() => <MaterialIcons name="settings" size={24} color="black" />}></Button>
          <Button onPress={handleEnd} icon={() => <MaterialIcons name="logout" size={24} color="black" />}></Button>
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
    },
    title: {
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: '#333',
      textAlign: 'center',
      marginTop: 4,
    },
    middleFrame: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    middleButton: {
      backgroundColor: 'white',
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginVertical: 5,
    },
    bottomFrame: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0,
    },
});

export default HomeScreen;
*/

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert, BackHandler } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
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
            Alert.alert("등록된 사용자 정보 불러올수 없음");
          }
        }
      };

      fetchUserInfo();
    }, []);

    const handlePraise = () => {
      navigation.navigate('FriendsList');
    };

    const handleFriend = () => {
      navigation.navigate('Friends');
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

    return (
      <View style={styles.container}>
        <Card>
          <Card.Content>
            <Title style={styles.title}>칭찬하기</Title>
            <Paragraph style={styles.title}>칭찬하고 싶은 사람과 말을 골라서 칭찬을 해보아요!</Paragraph>
            <Paragraph style={styles.subtitle}>이름: {userInfo.name}</Paragraph>
            <Paragraph style={styles.subtitle}>소속: {userInfo.affiliation}</Paragraph>
          </Card.Content>
        </Card>

        <View style={styles.middleFrame}>
          <Button icon={({ size, color }) => (<MaterialIcons name="favorite" size={size} color={color} />)} onPress={handlePraise} style={styles.middleButton}>칭찬하기</Button>
        </View>
  
        <View style={styles.bottomFrame}>
          <Button onPress={handleFriend} icon={() => <MaterialIcons name="people" size={24} color="black" />} />
          <Button onPress={handleLike} icon={() => <MaterialIcons name="favorite-border" size={24} color="black" />} />
          <Button onPress={handleSetting} icon={() => <MaterialIcons name="settings" size={24} color="black" />} />
          <Button onPress={handleEnd} icon={() => <MaterialIcons name="logout" size={24} color="black" />} />
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
    },
    title: {
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: '#333',
      textAlign: 'center',
      marginTop: 4,
    },
    middleFrame: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    middleButton: {
      backgroundColor: 'white',
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginVertical: 5,
    },
    bottomFrame: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0,
    },
});

export default HomeScreen;
