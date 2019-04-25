import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import InputKeyboard from "../../components/InputKeyboard/InputKeyboard";
import GlobalContext from '../../Context/GlobalContext';
import DeviceInfo from 'react-native-device-info';
import { Actions } from 'react-native-router-flux';

export default Chat = (props) => {
    const context = useContext(GlobalContext);
    const [room, setRoom] = useState(props.room);

    useEffect(() => {
        let contextRoom = context.Rooms.find(rm => rm.id === room.id);
        setRoom(contextRoom);
        Actions.refresh({
            title: room.name
        });
    }, [context])

    sendMsg = (msg) => {
        context.SendMessages(room, msg);
    };

    return (
        <SafeAreaView style={[{ flex: 1, backgroundColor: '#212121' }]} >
            <KeyboardAwareScrollView ref={(ref) => { scrollView = ref; }} style={{ backgroundColor: 'black', padding: 10 }}>
                {room.messages.map(item =>
                    <Text key={item.id}
                        style={[{ fontSize: 22 }, { color: item.userId != DeviceInfo.getUniqueID() ? 'yellow' : 'blue' }]}>{item.message}</Text>)
                }
            </KeyboardAwareScrollView>
            <InputKeyboard submit={this.sendMsg} />
        </SafeAreaView>
    );
}