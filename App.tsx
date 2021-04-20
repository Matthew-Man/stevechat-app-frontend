// import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
const uuidv4 = require('uuid/v4');




export default function App() {
  let userId: string | null = "";

  
  async function save(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
  }
  
  async function getValueFor(key: string) {
    let result = await SecureStore.getItemAsync(key);
    return result;
  }


  // Check if user id exists for user, if not create and save a new one
  useEffect(() => {
    async function checkForUniqueId() {
      if (await getValueFor("uniqueDeviceId") === null) {
        const randomId = uuidv4()
        save("uniqueDeviceId", randomId)
        userId = randomId;
      } else {
        userId = await getValueFor("uniqueDeviceId")
      }
    }
    checkForUniqueId()
  }, [])
  

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button title="Device Info" onPress={(e) => console.log(`User Id = ${userId}`)}/>
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
