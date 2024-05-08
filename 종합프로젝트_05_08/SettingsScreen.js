//SettingsScreen.js
import React from 'react';
import { StyleSheet, View, Text, Switch, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function SettingScreen() {
  return (
    <View style={styles.container}>
      {/* 본인 프로필 정보 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>내 프로필</Text>
        <TouchableOpacity style={styles.item}>
          <Text>프로필 수정</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* 알림 설정 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>알림 설정</Text>
        <View style={styles.item}>
          <Text>알림 허용</Text>
          <Switch />
        </View>
        <View style={styles.item}>
          <Text>진동 허용</Text>
          <Switch />
        </View>
      </View>

      {/* 로그아웃 */}
      <TouchableOpacity style={styles.section}>
        <Text style={styles.sectionTitle}>로그아웃</Text>
      </TouchableOpacity>

      {/* 계정 삭제 */}
      <TouchableOpacity style={styles.section}>
        <Text style={styles.sectionTitle}>계정 삭제</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
});
