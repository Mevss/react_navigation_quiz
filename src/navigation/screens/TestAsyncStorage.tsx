// TestAsyncStorage.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function TestAsyncStorage() {
    const [storedTests, setStoredTests] = useState<any[]>([]);

    const checkAsyncStorage = async () => {
        try {
            // Pobierz testy z AsyncStorage
            const tests = await AsyncStorage.getItem('tests');
            if (tests) {
                const parsedTests = JSON.parse(tests);
                // Weź tylko pierwsze 2 testy
                const firstTwoTests = parsedTests.slice(0, 2);
                setStoredTests(firstTwoTests);
                
                // Wypisz w konsoli dla dodatkowej weryfikacji
                console.log('Wszystkie testy:', parsedTests);
                console.log('Pierwsze 2 testy:', firstTwoTests);
            } else {
                console.log('Brak testów w AsyncStorage');
            }
        } catch (error) {
            console.error('Błąd podczas odczytu z AsyncStorage:', error);
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Button 
                title="Sprawdź testy w AsyncStorage" 
                onPress={checkAsyncStorage}
            />
            {storedTests.map((test, index) => (
                <View key={index} style={{ marginTop: 10, padding: 10, backgroundColor: '#f0f0f0' }}>
                    <Text>Test {index + 1}:</Text>
                    <Text>Nazwa: {test.name}</Text>
                    <Text>Opis: {test.description}</Text>
                    <Text>Tagi: {test.tags?.join(', ')}</Text>
                </View>
            ))}
        </View>
    );
}