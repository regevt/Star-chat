import React, { useState } from 'react';
import { TextInput, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { KeyboardAccessoryView } from 'react-native-keyboard-input';

const InputKeyboard = (props) => {

    const [disaleButton, setDisaleButton] = useState(true);
    const [input, setInput] = useState('');

    submitInput = () => {
        setInput('');
        setDisaleButton(true);
        props.submit(input);
    };

    onTextChangedHandler = text => {
        setInput(text);
        setDisaleButton(text.length === 0);
    };

    keyboardToolbarContent = () => {
        return (
            <View style={styles.kbView}>
                <TextInput value={input} style={styles.kbInput} onChangeText={this.onTextChangedHandler}></TextInput>
                <TouchableOpacity
                    disabled={disaleButton}
                    style={disaleButton ? styles.kbButtonDisabled : styles.kbButton}
                    onPress={() => this.submitInput()}
                    underlayColor='#fff'>
                    <Text style={styles.kbButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        );
    };


    return (
        <KeyboardAccessoryView
            renderContent={this.keyboardToolbarContent}
            kbInputRef={this.textInputRef}
        />
    );
}

const styles = StyleSheet.create({
    kbView: {
        backgroundColor: '#212121',
        height: 70,
        marginBottom: 0,
        flexDirection: 'row',
        alignContent: 'center'
    },
    kbInput: {
        borderRadius: 10,
        height: 40,
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        backgroundColor: 'white'
    },
    kbButton: {
        marginRight: 10,
        marginTop: 10,
        height: 40,
        backgroundColor: '#007AFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#007AFF',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center'
    },
    kbButtonDisabled: {
        marginRight: 10,
        marginTop: 10,
        height: 40,
        backgroundColor: 'gray',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center'
    },
    kbButtonText: {
        color: 'white',
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 18
    }
});

export default InputKeyboard;