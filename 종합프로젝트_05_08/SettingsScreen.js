//SettingsScreen.js
/*
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
*/

import React, { useState } from 'react';
import { StyleSheet, View, Text, Switch, Button } from 'react-native';

export default function SettingsScreen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>설정 화면입니다.</Text>
      <View style={styles.settingOption}>
        <Text>알림 받기:</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <Button title="테마 변경" onPress={() => console.log('테마 변경')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  settingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});

