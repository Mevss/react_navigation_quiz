import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Header } from './Header';

export function Result() {
  const tableData = [
    { name: 'asdf', points: '18/20', type: 'test1', date: '21-11-2018' },
    { name: 'kdf', points: '15/20', type: 'test1', date: '18-11-2018' },
    { name: 'cxv', points: '13/20', type: 'test1', date: '11-10-2018' },
    { name: 'zxc', points: '3/20', type: 'test1', date: '15-04-2018' },
    { name: 'zxc', points: '3/20', type: 'test1', date: '15-04-2018' },
    { name: 'zxc', points: '3/20', type: 'test1', date: '15-04-2018' },
    { name: 'zxc', points: '3/20', type: 'test1', date: '15-04-2018' },
  ];

  return (
    <SafeAreaView style={styles.container}>

        <Header title="Results"/>

      <ScrollView style={styles.contentContainer}>
        <View style={styles.tableContainer}>
          <View style={styles.tableRowHeader}>
            <Text style={styles.tableHeaderText}>Name</Text>
            <Text style={styles.tableHeaderText}>Points</Text>
            <Text style={styles.tableHeaderText}>Type</Text>
            <Text style={styles.tableHeaderText}>Date</Text>
          </View>

          {tableData.map((row, index) => (
            <View style={[styles.tableRow, index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd]} key={index}>
              <Text style={styles.tableCellText}>{row.name}</Text>
              <Text style={styles.tableCellText}>{row.points}</Text>
              <Text style={styles.tableCellText}>{row.type}</Text>
              <Text style={styles.tableCellText}>{row.date}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
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
