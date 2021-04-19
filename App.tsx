// import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
const uuidv4 = require('uuid/v4');




export default function App() {
  let userId = "";

  
  async function save(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
    console.log("Save")
  }
  
  async function getValueFor(key: string) {
    let result = await SecureStore.getItemAsync(key);
    console.log("Hello" + result)
    return result;
  }

  
  useEffect(() => {
    async function checkForUniqueId() {
      if (await getValueFor("uniqueDeviceId") === null) {
        console.log("Saved")
        const randomId = uuidv4()
        console.log(randomId)
        save("uniqueDeviceId", randomId)
      }
    }
    checkForUniqueId()
  }, [])
  
  // console.log(getValueFor("uniqueDeviceId"))
  //If doesn't exist
    //Then generate a random one using UUID and store on securestore
  

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button title="Device Info" onPress={(e) => console.log("Hi")}/>
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
