import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface IMessageDisplay {
  messageid: number,
  messagetext: string,
  timestamp: string,
  userid: string,
  userId: string | null
}

export function MessageDisplay({ messagetext, timestamp, userid, userId }: IMessageDisplay) {
  let myMessage: boolean;
  if (userid === userId) {
    myMessage = true
  }
  else {
    myMessage = false
  }
  return (
    <View style={[myMessage ? styles.myMessage : styles.message]}>
      <Text style={styles.sender}>{userid}</Text>
      <Text style={styles.text}>{messagetext}</Text>
      <Text style={styles.timestamp}>{timestamp}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    backgroundColor: "#f7f7f7",
    padding: 16,
    marginVertical: 8,
    margin: 10,
    width: '80%',
    borderRadius: 5
  },
  myMessage: {
    backgroundColor: "#AFDEFF",
    padding: 16,
    margin: 10,
    marginVertical: 8,
    width: '80%',
    borderRadius: 5,
    alignSelf: 'flex-end'
  },
  text: {
    fontSize: 12,
    marginTop: 5,
    marginBottom: 5
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