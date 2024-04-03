import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function SettingScreen() {
  return (
    <View style={styles.container}>
      <Text>설정 화면입니다.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
