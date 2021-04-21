// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, Text, View, Button, TouchableWithoutFeedback, SafeAreaView, Keyboard, ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import InputBar from './components/inputBar';
import {IMessageDisplay, MessageDisplay} from './components/MessageDisplay';
const uuidv4 = require('uuid/v4');
import {
  useScrollToTop,
  NavigationContainer
} from '@react-navigation/native';




export default function App() {
  const startHistory: IMessageDisplay[]=[]
  const [messageHistory, setMessageHistory] = useState<IMessageDisplay[]>(startHistory)
  const [userId, setUserId] = useState<string | null>("");

  
  async function save(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
  }
  
  async function getValueFor(key: string) {
    let result = await SecureStore.getItemAsync(key);
    return result;
  }

  async function getAllMessages(){
    try {
      let res = await fetch("https://stevechat-backend.herokuapp.com/")
      setMessageHistory(await res.json())
  } catch(error) {
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
    <SafeAreaView style={styles.container} >
    {/* //  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    //     <View> */}
        <Text>Open up App.tsx to start working on your app!</Text>
        <Button title="Device Info" onPress={(e) => console.log(`User Id = ${userId}`)}/>
     {/* <ScrollView > */}
    <View>
    <FlatList
        data={messageHistory}
        renderItem={({item}) => (
          <MessageDisplay {...item} userId={userId} />
        )}
        keyExtractor={item => item.messageid.toString()}
      />
      </View>

      
        {/* {messageHistory.map((element, index) => <MessageDisplay {...element} key={index}/>)} */}
        
        {/* </ScrollView> */}
        <InputBar userId={userId} getAllMessages={getAllMessages}/>
        {/* </View>
    </TouchableWithoutFeedback> */}
       </SafeAreaView>
    
  );
}


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
