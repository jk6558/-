import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Card, Button, Title, Paragraph } from 'react-native-paper';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { BackHandler } from 'react-native';

import SettingScreen from './SettingScreen'; // 설정 화면 컴포넌트를 가져옵니다.

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* 홈 스크린과 설정 스크린을 스택에 등록합니다. */}
        <Stack.Screen name="극찬" component={AppContent} />
        <Stack.Screen name="Settings" component={SettingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function AppContent() {
  const navigation = useNavigation(); // useNavigation 훅을 컴포넌트 내에서 사용

  const handlePraise = () => {
    //칭찬할 사람들의 목록을 띄우고 칭찬히는 기능 
    Alert.alert('알림', '칭찬할 사람들 목록');
  };

  const handleFriend = () => {
    //친구목록
    Alert.alert('알림', '친구목록');
  };

  const handleLike = () => {
    //본인이 칭찬받은 목록
    Alert.alert('알림', '칭찬받은목록!');
  };

  const handleSetting = () => {
    navigation.navigate('Settings'); // 설정 화면으로 이동 (파일 확장자는 필요하지 않습니다)
  };

  const handleEnd = () => {
    //종료버튼, 안드로이드 전용, 아이폰은 홈버튼으로
    BackHandler.exitApp();
  };

  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          <Title style={styles.title}>칭찬하기</Title>
          <Paragraph style={styles.title}>칭찬하고 싶은 사람과 말을 골라서 칭찬을 해보아요!</Paragraph>
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
        칭찬히기
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
    textAlign: 'center', // 제목을 가운데 정렬
  },
  middleFrame: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleButton: {
    backgroundColor: 'white', // 버튼의 배경색
    borderRadius: 10, // 버튼의 모서리 둥글기
    paddingHorizontal: 20, // 버튼의 수평 패딩
    paddingVertical: 10, // 버튼의 수직 패딩
    marginVertical: 5, // 버튼의 상하 여백
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


