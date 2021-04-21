// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import InputBar from './components/inputBar';
import { IMessageDisplay, MessageDisplay } from './components/MessageDisplay';
const uuidv4 = require('uuid/v4');




export default function App() {
  const startHistory: IMessageDisplay[] = []
  const [messageHistory, setMessageHistory] = useState<IMessageDisplay[]>(startHistory)
  const [userId, setUserId] = useState<string | null>("");


  async function save(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
  }

  async function getValueFor(key: string) {
    let result = await SecureStore.getItemAsync(key);
    return result;
  }

  async function getAllMessages() {
    try {
      let res = await fetch("https://stevechat-backend.herokuapp.com/")
      setMessageHistory(await res.json())
    } catch (error) {
      console.log(error)
    }
  }

  // Check if user id exists for user, if not create and save a new one
  useEffect(() => {
    async function checkForUniqueId() {
      if (await getValueFor("uniqueDeviceId") === null) {
        const randomId = uuidv4()
        save("uniqueDeviceId", randomId)
        setUserId(randomId);
      } else {
        const existingId = await getValueFor("uniqueDeviceId")
        setUserId(existingId)
      }
    }
    checkForUniqueId();
    getAllMessages();
  }, [])


  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <Button title="Device Info" onPress={(e) => console.log(`User Id = ${userId}`)} />

        {messageHistory.map((element, index) => <MessageDisplay {...element} key={index} />)}

        <InputBar userId={userId} />
      </View>
    </TouchableWithoutFeedback>
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
