import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export function Header({ title }) {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity 
      style={styles.menuButton} 
      onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.headerText}>{title}</Text>
      <View style={{ width: 40 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 12,
    paddingHorizontal: 16,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    marginRight: 16,
  },
  headerText: {
    fontSize: 18,
    fontFamily: 'PoppinsMedium',
    textAlign: 'center',
    flex: 1,
  },
});
