import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";

export default function InputBar({userId}: {userId: string}) {
    const [messageInput, setMessageInput] = useState("");

    function handleSendMessage() {
        console.log("This send button works")
    }

    return (
        <View style={styles.container}>
            <TextInput onChangeText={setMessageInput} value={messageInput} placeholder="Type here..." style={styles.inputBox}/>
            <Button title="Send" onPress={handleSendMessage}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      width: '100%',
      height: 'auto',
      backgroundColor: '#E1E1E1',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'row',
    },
    inputBox: {
        backgroundColor: '#fff',
        height: 35,
        width: '80%',
        padding: 5,
        margin: 10,
        borderRadius: 5,
    }
  });