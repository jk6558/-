// SecondScreen.js
import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Card, Button, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { BackHandler } from 'react-native';

const SecondScreen = () => {
  const navigation = useNavigation();

  const handlePraise = () => {
    Alert.alert('알림', '칭찬할 사람들 목록');
  };

  const handleFriend = () => {
    Alert.alert('알림', '친구 목록');
  };

  const handleLike = () => {
    Alert.alert('알림', '칭찬 받은 목록');
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
          <Paragraph style={styles.paragraph}>칭찬하고 싶은 사람과 말을 골라서 칭찬을 해보아요!</Paragraph>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  paragraph: {
    textAlign: 'center',
  },
  middleFrame: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  middleButton: {
    backgroundColor: 'white',
    borderRadius: 10,
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
    paddingHorizontal: 16,
  },
});

export default SecondScreen;