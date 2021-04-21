import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";

interface IInputBar {
    userId: string,
}

export default function InputBar({ userId }: IInputBar) {
    const [messageInput, setMessageInput] = useState("");

    async function handleSendMessage() {
        console.log("Message to send:", messageInput);
        const body = {
            messageInput: messageInput,
            userId: userId
        }
        const res = await fetch("https://stevechat-backend.herokuapp.com/", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })
        setMessageInput("")
        console.log(res)
        return false
    }

    return (
        <View style={styles.container}>
            <TextInput
                onChangeText={setMessageInput}
                value={messageInput}
                placeholder="Type here..."
                style={styles.textInputBox}
                returnKeyType="send"
                multiline={true}
                blurOnSubmit={true}
                onSubmitEditing={handleSendMessage}
            />
            <Button title="Send" onPress={handleSendMessage} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        height: 'auto',
        padding: 6,
        backgroundColor: '#E1E1E1',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    textInputBox: {
        flex: 1,
        backgroundColor: '#fff',
        height: 'auto',
        minHeight: 32,
        width: '80%',
        justifyContent: 'center',
        marginRight: 10,
        paddingTop: 8,
        padding: 8,
        borderRadius: 5,
        fontSize: 16,
    }
});