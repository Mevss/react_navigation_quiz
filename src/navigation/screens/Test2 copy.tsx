import React, { useState, useEffect } from 'react';
import { Button, Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from './Header';

export function Test2() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const tasks = [
    {
      "question": "Który wódz po śmierci Gajusza Mariusza, prowadził wojnę domową z Sullą ?",
      "answers": [
        { "content": "LUCJUSZ CYNNA", "isCorrect": true },
        { "content": "JULIUSZ CEZAR", "isCorrect": false },
        { "content": "LUCJUSZ MURENA", "isCorrect": false },
        { "content": "MAREK KRASSUS", "isCorrect": false }
      ],
      "duration": 30
    }
  ];

  const currentTask = tasks[currentQuestionIndex];

  useEffect(() => {
    if (selectedAnswer !== null) {
      const isCorrect = currentTask.answers.find(
        (answer) => answer.content === selectedAnswer && answer.isCorrect
      );
      if (isCorrect) {
        setScore(score + 1);
      }
      setTimeout(() => {
        setSelectedAnswer(null);
        if (currentQuestionIndex + 1 < tasks.length) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          Alert.alert(`Test ukończony! Twój wynik: ${score} / ${tasks.length}`);
        }
      }, 1000);
    }
  }, [selectedAnswer]);

  return (
    <SafeAreaView style={testStyles.container}>
      <Header title="Test #1" />
      <View style={testStyles.content}>
        <Text style={testStyles.questionInfo}>
          Pytanie {currentQuestionIndex + 1} z {tasks.length}
        </Text>
        <Text style={testStyles.questionText}>{currentTask.question}</Text>

        <View style={testStyles.answerContainer}>
          {currentTask.answers.map((answer, index) => (
            <TouchableOpacity
              key={index}
              style={testStyles.answerButton}
              onPress={() => setSelectedAnswer(answer.content)}
            >
              <Text style={testStyles.answerText}>{answer.content}</Text>
            </TouchableOpacity>
          ))}
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
  questionInfo: {
    fontSize: 16,
    marginVertical: 4,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  answerContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 32,
  },
  answerButton: {
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  answerText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
