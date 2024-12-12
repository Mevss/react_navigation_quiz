import { Button, Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Header } from './Header';

export function Home() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      
      <Header title="Home Page"/>

      <ScrollView style={styles.contentContainer}>
        <View style={styles.testContainer}>
          <Text style={styles.testTitle}>Title test #1</Text>
          <Text style={styles.testDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.
          </Text>
          <Text style={styles.testDescription}>
            Duis vulputate commodo lectus, ac blandit elit tincidunt id.
          </Text>
        </View>

        <View style={styles.testContainer}>
          <Text style={styles.testTitle}>Title test #2</Text>
          <Text style={styles.testDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.
          </Text>
          <Text style={styles.testDescription}>
            Duis vulputate commodo lectus, ac blandit elit tincidunt id.
          </Text>
        </View>

        <View style={styles.testContainer}>
          <Text style={styles.testTitle}>Title test #3</Text>
          <Text style={styles.testDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.
          </Text>
          <Text style={styles.testDescription}>
            Duis vulputate commodo lectus, ac blandit elit tincidunt id.
          </Text>
        </View>

        <View style={styles.testContainer}>
          <Text style={styles.testTitle}>Title test #4</Text>
          <Text style={styles.testDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.
          </Text>
          <Text style={styles.testDescription}>
            Duis vulputate commodo lectus, ac blandit elit tincidunt id.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Get to know your ranking result</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Result')}>
          <Text style={styles.footerButton}>Check!</Text>
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
    marginBottom: 4,
  },
  footer: {
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
});
