import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  type: 'deposit' | 'withdrawal';
}

export default function App() {
  const [balance, setBalance] = useState(1000); 
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, date: '2023-11-01', description: 'Depósito inicial', amount: 1000, type: 'deposit' },
  ]);
  const [amount, setAmount] = useState<string>(''); 

  const handleDeposit = () => {
    const amountNumber = parseFloat(amount);
    if (amountNumber > 0) {
      const newTransaction: Transaction = {
        id: transactions.length + 1,
        date: new Date().toISOString().slice(0, 10),
        description: 'Depósito',
        amount: amountNumber,
        type: 'deposit',
      };
      setTransactions([...transactions, newTransaction]);
      setBalance(balance + amountNumber);
      setAmount('');
    } else {
      Alert.alert('Monto inválido', 'Por favor, ingresa un monto válido para depositar.');
    }
  };

  const handleWithdrawal = () => {
    const amountNumber = parseFloat(amount);
    if (amountNumber > 0 && amountNumber <= balance) {
      const newTransaction: Transaction = {
        id: transactions.length + 1,
        date: new Date().toISOString().slice(0, 10),
        description: 'Retiro',
        amount: amountNumber,
        type: 'withdrawal',
      };
      setTransactions([...transactions, newTransaction]);
      setBalance(balance - amountNumber);
      setAmount('');
    } else {
      Alert.alert('Monto inválido', 'Por favor, ingresa un monto válido para retirar.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>BaNcoMex</Text>

      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>Saldo actual:</Text>
        <Text style={styles.balanceAmount}>${balance.toFixed(2)}</Text>
      </View>

      <View style={styles.transactionContainer}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          placeholder="Monto"
        />
        <Button title="Depositar" onPress={handleDeposit} />
        <Button title="Retirar" onPress={handleWithdrawal} color="#ff6347" />
      </View>

      <View style={styles.historyContainer}>
        <Text style={styles.historyHeader}>Historial de Transacciones</Text>
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.transactionItem}>
              <Text style={styles.transactionDate}>{item.date}</Text>
              <Text style={styles.transactionDescription}>{item.description}</Text>
              <Text style={styles.transactionAmount}>
                {item.type === 'deposit' ? '+' : '-'}${item.amount.toFixed(2)}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f9',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a90e2',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 50, 
  },
  balanceContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceText: {
    fontSize: 18,
    color: '#333',
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4a90e2',
  },
  transactionContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  historyContainer: {
    flex: 1,
  },
  historyHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  transactionDate: {
    fontSize: 14,
    color: '#333',
  },
  transactionDescription: {
    fontSize: 14,
    color: '#333',
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});
