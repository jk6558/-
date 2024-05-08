import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert, BackHandler, FlatList, Text, TouchableOpacity, Modal } from 'react-native';
import { Card, Title, Paragraph, Button, Provider as PaperProvider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient'; // 버튼 그라데이션

function HomeScreen() {
    const navigation = useNavigation();
    const [userInfo, setUserInfo] = useState({ name: '', affiliation: '' });
    const [praiseList, setPraiseList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false); // 모달 표시 여부 상태
    const [users, setUsers] = useState([]);

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

          // 같은 소속의 사용자들을 가져오는 로직 추가
            const usersDocRef = collection(db, "users");
            const usersQuery = query(usersDocRef, where("affiliation", "==", docSnap.data().affiliation));
            const usersQuerySnapshot = await getDocs(usersQuery);

            const usersData = [];
            usersQuerySnapshot.forEach((doc) => {
                usersData.push(doc.data());
            });
            setUsers(usersData);
        }
      };
  
      fetchUserInfo();
    }, []);

    const handlePraise = () => {
      setModalVisible(true); // 모달 표시
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

    const handleCloseModal = () => {
        setModalVisible(false);
    };


    

    //칭찬 목록
    const renderPraiseItem = ({ item }) => (
      <TouchableOpacity style={styles.praiseItem} onPress={() => Alert.alert(item)}>
        <Text style={styles.praiseText}>{item}</Text>
      </TouchableOpacity>
    );

    //사용자목록
     const renderUserItem = ({ item }) => (
        <TouchableOpacity style={styles.userItem} onPress={() => Alert.alert(item.name)}>
            <Text style={styles.userText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
      <PaperProvider>
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
          <LinearGradient
           colors={['#ADD8E6', '#FFFFFF']}
           start={[0, 0]}
           end={[1, 1]}
           style={styles.middleButton}
          >
          <Button  
            icon={({ size, color }) => (
              <MaterialIcons name="favorite" size={size} color={color} />
            )}
            onPress={handlePraise} 
            style={styles.gradientButton}
            labelStyle={styles.buttonText}
            >
            칭찬하기
          </Button>
          </LinearGradient>
        </View>

        {/* 친구 목록을 표시하는 모달 */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>사용자 목록</Text>
                        <FlatList
                            data={users}
                            renderItem={renderUserItem}
                            keyExtractor={(item, index) => index.toString()}
                            style={styles.userList}
                        />
                        <Button onPress={handleCloseModal}>닫기</Button>
            </View>
          </View>
        </Modal>
  
        <View style={styles.bottomFrame}>
          <Button onPress={handleFriend} icon={() => <MaterialIcons name="people" size={24} color="black" />}></Button>
          <Button onPress={handleLike} icon={() => <MaterialIcons name="favorite-border" size={24} color="black" />}></Button>
          <Button onPress={handleSetting} icon={() => <MaterialIcons name="settings" size={24} color="black" />}></Button>
          <Button onPress={handleEnd} icon={() => <MaterialIcons name="logout" size={24} color="black" />}></Button>
        </View>
      </View>
    </PaperProvider>
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
      borderRadius: 10,
      overflow: 'hidden',
    },
    gradientButton: {
      paddingHorizontal: 20,
      paddingVertical: 10,
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
    buttonText: {
      color: 'blue',
    },
    praiseList: {
      marginTop: 10,
    },
    praiseItem: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: '#ADD8E6',
      marginBottom: 5,
      borderRadius: 5,
    },
    praiseText: {
      fontSize: 16,
      color: 'white',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
  });
  
export default HomeScreen;
