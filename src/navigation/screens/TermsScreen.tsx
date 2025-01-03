import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from './AsyncStorageUtility';

interface TermsScreenProps {
  setHasSeenTerms: (value: boolean) => void;
  onAcceptTerms: () => void;
}

export function TermsScreen({ setHasSeenTerms, onAcceptTerms }: TermsScreenProps) {
  const acceptTerms = async () => {
    try {
      await AsyncStorage.setItem('hasSeenTerms', 'true');
      console.log('Terms accepted and stored');
      setHasSeenTerms(true);
      onAcceptTerms();
    } catch (error) {
      console.error('Error saving terms acceptance:', error);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Regulamin</Text>
      <Text style={styles.text}>
        Zasady regulaminu: {"\n"}
        Zasada 1: {"\n"}
        Zasada 2: {"\n"}
        Użytkownik musi zaakceptować, aby kontynuować.
      </Text>
      <TouchableOpacity style={styles.button} onPress={acceptTerms}>
        <Text style={styles.buttonText}>Akceptuję</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  }
});