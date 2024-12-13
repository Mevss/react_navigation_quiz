import { Button, Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Header } from './Header';

export function Test() {
  return (
    <SafeAreaView style={testStyles.container}>
        
      <Header title="Test #1"/>

      <View style={testStyles.content}>

        <Text style={testStyles.questionInfo}>Question 3 of 10</Text>
        <View style={testStyles.progressBarContainer}>
          <View style={testStyles.progressBarFill} />
        </View>
        <Text style={testStyles.timer}>Time: 28 sec</Text>
        <Text style={testStyles.questionText}>
          This is some example of a long question to fill the content?
        </Text>

        <View style={testStyles.answerContainer}>
          <View style={testStyles.answerRow}>
            <TouchableOpacity style={testStyles.answerButton}>
              <Text style={testStyles.answerText}>Answer A</Text>
            </TouchableOpacity>
            <TouchableOpacity style={testStyles.answerButton}>
              <Text style={testStyles.answerText}>Answer B</Text>
            </TouchableOpacity>
          </View>
          <View style={testStyles.answerRow}>
            <TouchableOpacity style={testStyles.answerButton}>
              <Text style={testStyles.answerText}>Answer C</Text>
            </TouchableOpacity>
            <TouchableOpacity style={testStyles.answerButton}>
              <Text style={testStyles.answerText}>Answer D</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const testStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 32,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginVertical: 8,
  },
  progressBarFill: {
    width: '70%',
    height: '100%',
    backgroundColor: '#FFD700',
  },
  questionInfo: {
    fontSize: 16,
    marginVertical: 4,
  },
  timer: {
    fontSize: 14,
    color: '#888',
    marginBottom: 32,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  questionSubText: {
    fontSize: 14,
    color: '#666',
  },
  answerContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 64,
  },
  answerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  answerButton: {
    flex: 0.45,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
  },
  answerText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});