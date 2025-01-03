import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from './Header';

interface ResultItem {
  nick: string;
  score: number;
  total: number;
  type: string;
  createdOn: string;
  id: string;
}

export function Result() {
  const [results, setResults] = useState<ResultItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  
  const fetchResults = async () => {
    try {
      const response = await fetch('https://tgryl.pl/quiz/results?last=20');
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchResults();
    setRefreshing(false);
  };
  // Formatowanie daty
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const renderItem = ({ item, index }: { item: ResultItem; index: number }) => (
    <View style={[styles.tableRow, index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd]}>
      <Text style={styles.tableCellText}>{item.nick}</Text>
      <Text style={styles.tableCellText}>
        {item.score}/{item.total}
      </Text>
      <Text style={styles.tableCellText}>{item.type}</Text>
      <Text style={styles.tableCellText}>{formatDate(item.createdOn)}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Results"/>
      <View style={styles.tableContainer}>
        <View style={styles.tableRowHeader}>
          <Text style={styles.tableHeaderText}>Nick</Text>
          <Text style={styles.tableHeaderText}>Score</Text>
          <Text style={styles.tableHeaderText}>Type</Text>
          <Text style={styles.tableHeaderText}>Date</Text>
        </View>
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tableContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    margin: 10,
  },
  tableRowHeader: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    padding: 8,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 8,
  },
  tableRowEven: {
    backgroundColor: '#fff',
  },
  tableRowOdd: {
    backgroundColor: '#f9f9f9',
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  tableCellText: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
  },
});