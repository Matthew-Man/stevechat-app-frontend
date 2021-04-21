import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface IMessageDisplay {
    messageid: number,
    messagetext: string,
    timestamp: string,
    userid: string
}

export function MessageDisplay({messagetext, timestamp, userid}: IMessageDisplay) {
  return (
    <View style={styles.item}>
      <Text style={styles.sender}>{userid}</Text>
      <Text style={styles.text}>{messagetext}</Text>
      <Text style={styles.timestamp}>{timestamp}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8
  },
  text: {
    fontSize: 10,
    margin: 5
  },
  sender: {
    fontSize: 10,
    fontWeight: 'bold'
  },
  timestamp: {
    fontSize: 5,
    fontStyle: 'italic',
    textAlign: 'right'
  }
});