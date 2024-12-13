import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Header } from './Header';

interface ResultItem {
  nick: string;
  score: number;
  total: number;
  type: string;
  date: string;
}

export function Result() {
  const [results, setResults] = useState([
      { nick: 'Marek', score: 18, total: 40, type: 'historia', date: '2022-11-22' },
      { nick: 'Anna', score: 15, total: 20, type: 'matematyka', date: '2023-07-25' },
      { nick: 'John', score: 10, total: 20, type: 'biologia', date: '2022-11-18' },
      { nick: 'John', score: 12, total: 20, type: 'biologia', date: '2024-04-14' },
      { nick: 'Adam', score: 10, total: 20, type: 'matematyka', date: '2022-11-18' },
      { nick: 'John', score: 4, total: 30, type: 'polski', date: '2021-11-12' },
      { nick: 'John', score: 4, total: 30, type: 'polski', date: '2021-11-12' },
  
    ]);
    
    const [refreshing, setRefreshing] = useState(false);
    
    const onRefresh = () => {
      setRefreshing(true);
      setTimeout(() => {
        setResults((prevResults) => [
          ...prevResults,
          { nick: 'Nowy test', score: 20, total: 20, type: 'test', date: '2022-11-25' },
        ]);
        setRefreshing(false);
      }, 1000);
    };

    const renderItem = ({ item, index }: { item: ResultItem; index: number }) => (
        <View style={[styles.tableRow, index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd]}>
          <Text style={styles.tableCellText}>{item.nick}</Text>
          <Text style={styles.tableCellText}>
            {item.score}/{item.total}
          </Text>
          <Text style={styles.tableCellText}>{item.type}</Text>
          <Text style={styles.tableCellText}>{item.date}</Text>
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
                    keyExtractor={(item, index) => index.toString()}
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
  header: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 12,
    paddingHorizontal: 16,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    marginRight: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
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
