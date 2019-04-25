import SocketIOClient from 'socket.io-client'

export default class SocketIOService {
    event = new Event('update');
    constructor(updateCallback) {
        socket = SocketIOClient('http://localhost:3000');
        socket.on('update', data => {
            updateCallback(data);
        })
    }

    GetRooms = () => {
        socket.emit('GetRooms', null, (error, data) => {
            console.log(error);
            console.log(data);
            return data;
        });
    };

    GetMessagesForRoom = roomId => {
        socket.emit('GetMessagesForRoom', roomId, (error, data) => {
            console.log(error);
            console.log(data);
            return data;
        });
    };
}
