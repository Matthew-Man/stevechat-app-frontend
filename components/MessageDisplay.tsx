import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface IMessageDisplay {
    messagetext: string,
    timestamp: string,
    userid: string
}

export function MessageDisplay({messagetext, timestamp, userid}: IMessageDisplay) {
  return (
    <View style={styles.container}>
      <Text>{messagetext}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});