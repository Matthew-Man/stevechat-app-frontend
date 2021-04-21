import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface IMessageDisplay {
    messageid: number,
    messagetext: string,
    timestamp: string,
    userid: string,
    userId: string | null
}

export function MessageDisplay({messagetext, timestamp, userid, userId}: IMessageDisplay) {
  let myMessage: boolean;
  if (userid === userId) {
      myMessage=true
  }
  else {
      myMessage=false
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
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    flex: 1,
    width: '100%'
  },
  myMessage: {
    backgroundColor: "#fff",
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