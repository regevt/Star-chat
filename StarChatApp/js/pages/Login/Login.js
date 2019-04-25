import React, { useContext, useState } from 'react';
import { SafeAreaView, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import GlobalContext from '../../Context/GlobalContext';

export default Login = () => {
    const context = useContext(GlobalContext);
    const [username, setUsername] = useState('user'); //TODO: remove initial values
    const [btnDisabled, setBtnDisabled] = useState(false);
    login = () => {
        context.Login(username);
    };

    const onTextChangedHandler = text => {
        setBtnDisabled(text.length <= 2);
        setUsername(text);
    }

    return (
        <SafeAreaView style={[{ flex: 1, backgroundColor: '#212121', justifyContent: 'center' }]} >
            <TextInput value={username}
                style={styles.input}
                onChangeText={onTextChangedHandler}></TextInput>
            <TouchableOpacity
                disabled={btnDisabled}
                onPress={login}
                style={btnDisabled ? styles.buttonDisabled : styles.button}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderRadius: 5,
        marginHorizontal: 20,
        backgroundColor: 'white',
        textAlign: 'center'
    },
    button: {
        height: 40,
        marginTop: 10,
        marginHorizontal: 20,
        backgroundColor: '#007AFF',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#007AFF',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center'
    },
    buttonDisabled: {
        marginTop: 10,
        marginHorizontal: 20,
        height: 40,
        backgroundColor: 'gray',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center'
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 18
    }
});