import React, { useState, Component } from 'react';
window.navigator.userAgent = 'react-native';
import io from 'socket.io-client';
import { Actions } from 'react-native-router-flux';
import GlobalContext from './GlobalContext';
import DeviceInfo from 'react-native-device-info';

const socket = io('http://192.168.0.101:3001', { query: "DeviceId=" + DeviceInfo.getUniqueID() });
class GlobalState extends Component {
    // const [roomsState, setRoomsState] = useState([]); //{ name: item.username, id: item.id }
    // const [username, setUsername] = useState('');

    state = {
        rooms: [],
        username: ''
    };

    constructor(props) {
        super(props);

        socket.on('connect', function (socket) {
            console.log('Connected!');
        });

        socket.on('rooms', roomList => {
            // setRoomsState(roomList.filter(item => item.name != username));
            this.setState({
                rooms: roomList.filter(item => item.name != this.state.username)
            });

            if (Actions.currentScene === 'login') {
                Actions.reset('home');
            }
            // console.log(this.state.rooms);
        });

        //message = { id: String, chatId: String, userId: String, message: String, timestamp: Date }
        socket.on('sendMessage', message => {
            // console.log('sendMessage', message);
            // const oldRooms = [...roomsState];
            const oldRooms = [...this.state.rooms];
            const userIndex = oldRooms.findIndex(usr => usr.id === message.chatId);

            if (userIndex > -1) {
                oldRooms[userIndex].messages = [...oldRooms[userIndex].messages, message];
            }
            this.setState({
                rooms: oldRooms
            });
            // setRoomsState(oldRooms);
        })
    }

    GetMessages = (id, name, type) => {

    };

    SendMessages = (room, msg) => {
        socket.emit('sendMessage', room, msg, this.state.username);
    };

    Login = username => {
        this.setState({
            username: username
        });
        // setUsername(username);
        socket.emit('register', { username: username, deviceId: DeviceInfo.getUniqueID() }, () => {
            Actions.replace('home');
        });
    };

    render() {
        return (
            <GlobalContext.Provider value={{
                Rooms: this.state.rooms,
                Login: this.Login,
                GetMessages: this.GetMessages,
                SendMessages: this.SendMessages
            }}>
                {this.props.children}
            </GlobalContext.Provider>
        );
    };
}

export default GlobalState;