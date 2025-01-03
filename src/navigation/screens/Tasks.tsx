import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Answer {
  content: string;
  isCorrect: boolean;
}

export interface Question {
  question: string;
  answers: Answer[];
  duration: number;
}

export interface Test {
  id: string;
  name: string;
  description: string;
  tags: string[];
  level?: string;
  numberOfTasks?: number;
  tasks?: Question[];
}


export const fetchAndStoreTests = async (): Promise<Test[]> => {
  try {
    const response = await fetch('https://tgryl.pl/quiz/tests');
    const tests: Test[] = await response.json();
    // Zapisywanie testów do async
    await AsyncStorage.setItem('tests', JSON.stringify(tests));
    return tests;

  } catch (error) {
    // Pobieranie testów z async
    const storedTests = await AsyncStorage.getItem('tests');
    return storedTests ? JSON.parse(storedTests) : [];
  }
};


export const fetchAndStoreTestDetails = async (testId: string): Promise<Test> => {
  try {
    const response = await fetch(`https://tgryl.pl/quiz/test/${testId}`);
    const testDetails = await response.json();
    // Zapisywanie detali testów do async
    await AsyncStorage.setItem(`test_${testId}`, JSON.stringify(testDetails));
    return testDetails;

  } catch (error) {
    // Pobieranie detali testów z async
    const storedTest = await AsyncStorage.getItem(`test_${testId}`);
    if (!storedTest) throw error;
    return JSON.parse(storedTest);
  }
};

// Sprawdzanie czy testy są zapisane
export const checkStorage = async () => {
  try {
    console.log('Sprawdzanie AsyncStorage');
    const testsJson = await AsyncStorage.getItem('tests');
    if (!testsJson) {
      console.log('Brak testów w AsyncStorage');
      return;
    }

    const allTests = JSON.parse(testsJson);
    console.log(`${allTests.length} testów w AsyncStorage`);
    const firstTwoTests = allTests.slice(0, 2);
    
    for (const test of allTests) {
      console.log(`\n\ntest o ID: ${test.id}`);
      console.log(`Nazwa: ${test.name}`);
      console.log(`Opis: ${test.description}`);
      console.log(`Tagi: ${test.tags?.join(', ')}`);
      const testDetailsJson = await AsyncStorage.getItem(`test_${test.id}`);
    }     
  } catch (error) {
    console.error('Błąd podczas odczytu z AsyncStorage:', error);
  }
};