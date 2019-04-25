import SocketIOService from '../services/SocketIOService';

export const GET_ROOMS = 'GET_ROOMS';
export const GET_MESSAGES_FOR_ROOM = 'GET_MESSAGES_FOR_ROOM';

const socketIOService = new SocketIOService();

const GetRooms = () => {
    let chats = socketIOService.GetRooms();
};

const GetMessagesForRoom = roomId => {

};