import React, { useEffect, useState } from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator, 
  TouchableOpacity 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Header } from './Header';
import _ from 'lodash';
import { Test, fetchAndStoreTests, checkStorage } from './Tasks';

export function Home() {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  
  useEffect(() => {
    const loadTests = async () => {
      try {
        const fetchedTests = await fetchAndStoreTests();
        // Losowanie kolejności testów
        setTests(_.shuffle(fetchedTests));
      } catch (error) {
        console.error('Error loading tests:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTests();
  }, []);
  
  // Losowanie testu
  const handleRandomTest = () => {
    if (tests.length > 0) {
      const randomTest = tests[Math.floor(Math.random() * tests.length)];
      navigation.navigate('Test', { testId: randomTest.id });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Home Page"/>
      <ScrollView style={styles.contentContainer}>
        {tests.map((test) => (
          <TouchableOpacity
            key={test.id}
            style={styles.testContainer}
            onPress={() => navigation.navigate('Test', { testId: test.id })}
          >
            <Text style={styles.testTitle}>{test.name}</Text>
            <Text style={styles.testDescription}>{test.description}</Text>
            <View style={styles.tagsContainer}>
              {test.tags?.map((tag, index) => (
                <View key={index} style={styles.tagPill}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Wybierz test lub </Text>
        <TouchableOpacity 
          onPress={handleRandomTest}
        >
          <Text style={styles.footerButton}>losuj test! </Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>Sprawdź </Text>
        <TouchableOpacity 
          onPress={checkStorage}
        >
          <Text style={styles.footerButton}>zapisane testy.</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 32,
    paddingVertical: 24,
    marginTop: 6,
  },
  testContainer: {
    padding: 12,
    marginBottom: 24,
    borderWidth: 4,
    borderColor: '#20232a',
    borderRadius: 16,
  },
  testTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  testDescription: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'RobotoMedium',
    marginBottom: 4,
  },
  footer: {
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  footerText: {
    fontSize: 14,
  },
  footerButton: {
    fontSize: 14,
    color: '#007AFF',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tagPill: {
    backgroundColor: '#e3f2fd',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    color: '#1976d2',
    fontSize: 12,
  },
});