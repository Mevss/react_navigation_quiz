import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from './Header';
import { getTaskById } from './Tasks';

export function Test2() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(100); // Startujemy z pełnym wypełnieniem
  const [timeLeft, setTimeLeft] = useState(20); // Czas trwania pytania (20 sekund)
  const [isTimerActive, setIsTimerActive] = useState(true); // Flaga do zatrzymywania timera
  const task = getTaskById('test-2');

  if (!task) {
    return (
      <SafeAreaView style={testStyles.container}>
        <Text>Error: Test not found</Text>
      </SafeAreaView>
    );
  }  
  const currentQuestion = task.questions[currentQuestionIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      if (isTimerActive) {
        setProgress((prevProgress) => Math.max(prevProgress - 5, 0));
        setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
      }
    }, 1000);

    if (timeLeft === 0) {
      clearInterval(interval);
      setSelectedAnswer(null);
      if (currentQuestionIndex + 1 < task.questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        Alert.alert(`Test ukończony! Twój wynik: ${score} / ${task.questions.length}`);
      }
    }

    return () => clearInterval(interval);
  }, [timeLeft, currentQuestionIndex, isTimerActive]);

  useEffect(() => {
    if (selectedAnswer !== null) {
      const isCorrect = currentQuestion.answers.find(
        (answer) => answer.content === selectedAnswer && answer.isCorrect
      );
      if (isCorrect) {
        setScore(score + 1);
      }
      setIsTimerActive(false);
      setTimeout(() => {
        setSelectedAnswer(null);
        if (currentQuestionIndex + 1 < task.questions.length) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setTimeLeft(20);
          setProgress(100);
          setIsTimerActive(true);
        } else {
          Alert.alert(`Test ukończony! Twój wynik: ${score} / ${task.questions.length}`);
        }
      }, 1000);
    }
  }, [selectedAnswer]);

  return (
    <SafeAreaView style={testStyles.container}>
      <Header title={task.title} />
      <View style={testStyles.content}>
        <Text style={testStyles.questionInfo}>
          Pytanie {currentQuestionIndex + 1} z {task.questions.length}
        </Text>
        
        <View style={testStyles.progressBarContainer}>
          <View style={[testStyles.progressBarFill, { width: `${progress}%` }]} />
        </View>
        
        <Text style={testStyles.timer}>Czas: {timeLeft} sek</Text>
        <Text style={testStyles.questionText}>{currentQuestion.question}</Text>

        <View style={testStyles.answerContainer}>
          <View style={testStyles.answerRow}>
            {currentQuestion.answers.slice(0, 2).map((answer, index) => (
              <TouchableOpacity
                key={index}
                style={testStyles.answerButton}
                onPress={() => setSelectedAnswer(answer.content)}>
                <Text style={testStyles.answerText}>{answer.content}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={testStyles.answerRow}>
            {currentQuestion.answers.slice(2).map((answer, index) => (
              <TouchableOpacity
                key={index}
                style={testStyles.answerButton}
                onPress={() => setSelectedAnswer(answer.content)}>
                <Text style={testStyles.answerText}>{answer.content}</Text>
              </TouchableOpacity>
            ))}
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
