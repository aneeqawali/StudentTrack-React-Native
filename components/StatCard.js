import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StatCard({ title, value }) {
  return (
    <View style={styles.smallCard}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.number}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  smallCard: {
    backgroundColor: '#FFFFFF',
    width: '48%',
    padding: 17,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 13,
    color: '#777',
    marginBottom: 7,
  },
  number: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#234E70',
  },
});