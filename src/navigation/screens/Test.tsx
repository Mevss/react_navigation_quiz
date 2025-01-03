import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from './Header';
import { fetchAndStoreTestDetails } from './Tasks';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import type { Test, Question } from './Tasks';
import _ from 'lodash';

export function Test() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const testId = route.params?.testId;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(100);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [test, setTest] = useState<Test | undefined>(undefined);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  // Resetowanie detali
  const resetState = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setProgress(100);
    setTimeLeft(30);
    setIsTimerActive(true);
    setTest(undefined);
    setQuestions([]);
    setLoading(true);
  };

  // Ladowanie testu
  useFocusEffect(
    React.useCallback(() => {
      resetState();
      
      const loadTest = async () => {
        if (testId) {
          try {
            const testData = await fetchAndStoreTestDetails(testId);
            setTest(testData);
    
            const testQuestions = _.shuffle(testData.tasks || []);
            setQuestions(testQuestions);
    
            if (testQuestions.length > 0) {
              setTimeLeft(testQuestions[0].duration);
            }
          } catch (error) {
            Alert.alert('Błąd', 'Nie udało się załadować testu');
            navigation.goBack();
          } finally {
            setLoading(false);
          }
        }
      };
      
      loadTest();

      // Usuwanie przy utraceniu focus
      return () => {
        resetState();
      };
    }, [testId])
  );

  useEffect(() => {
    if (!test || !isTimerActive) return;

    const interval = setInterval(() => {
      setProgress((prevProgress) => Math.max(prevProgress - (100 / timeLeft), 0));
      setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
    }, 1000);

    if (timeLeft === 0) {
      clearInterval(interval);
      handleTimeUp();
    }

    return () => clearInterval(interval);
  }, [timeLeft, isTimerActive, test]);

  // Zaznaczanie odpowiedzi przy upłynięciu czasu
  const handleTimeUp = () => {
    setSelectedAnswer(null);
    if (currentQuestionIndex + 1 < questions.length) {
      moveToNextQuestion();
    } else {
      submitResults(score, questions.length);
    }
  };

  const moveToNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    setCurrentQuestionIndex(nextIndex);
    if (questions[nextIndex]) {
      setTimeLeft(questions[nextIndex].duration);
    }
    setProgress(100);
    setIsTimerActive(true);
  };

  // Ukończenie testu i reset
  const handleTestCompletion = (finalScore: number, totalQuestions: number) => {
    setIsTimerActive(false);
    Alert.alert(
      "Test zakończony!",
      `Twój wynik: ${finalScore} z ${totalQuestions} pytań`,
      [{ 
        text: "OK", 
        onPress: () => {
          resetState();
          navigation.navigate('Home');
        }
      }]
    );
  };

  // Wysłanie wyników
  const submitResults = async (finalScore: number, totalQuestions: number) => {
    try {
      const response = await fetch('https://tgryl.pl/quiz/result', {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "nick": "SM",
          "score": finalScore,
          "total": totalQuestions,
          "type": test?.name || "unknown"
        })
      });
      
      handleTestCompletion(finalScore, totalQuestions);
    } catch (error) {
      handleTestCompletion(finalScore, totalQuestions);
    }
  };

  // Logika do wybierania odpowiedzi
  useEffect(() => {
    if (selectedAnswer !== null && questions.length > 0) {
      const currentQuestion = questions[currentQuestionIndex];
      const isCorrect = currentQuestion.answers.find(
        (answer) => answer.content === selectedAnswer && answer.isCorrect
      );
      
      if (isCorrect) {
        setScore(prev => prev + 1);
      }
      
      setIsTimerActive(false);
      setTimeout(() => {
        if (currentQuestionIndex + 1 < questions.length) {
          moveToNextQuestion();
        } else {
          submitResults(isCorrect ? score + 1 : score, questions.length);
        }
      }, 1000);
    }
  }, [selectedAnswer]);

  // Nasluchiwanie do nawigacji aby resetowac
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      resetState();
    });

    return unsubscribe;
  }, [navigation]);

  if (loading || !test || questions.length === 0) {
    return (
      <SafeAreaView style={testStyles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </SafeAreaView>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <SafeAreaView style={testStyles.container}>
      <Header title={test.name} />
      <View style={testStyles.content}>
        <Text style={testStyles.questionInfo}>
          Pytanie {currentQuestionIndex + 1} z {questions.length}
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
                key={index + 2}
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