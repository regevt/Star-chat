const mongoose = require('mongoose');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const uuidv4 = require('uuid/v4');

mongoose.connect('mongodb://localhost:27017/starchat', { useNewUrlParser: true }).then(() => {
    console.log('connected to mongo');
}).catch(err => {
    console.log('did not connect t mongo', err);
});

const Messages = mongoose.model('Messages', new mongoose.Schema({ id: String, userId: String, chatId: String, message: String, timestamp: Date }));
const Chats = mongoose.model('chats', new mongoose.Schema({ id: String, users: Array, messages: [] }));
const users = mongoose.model('users', new mongoose.Schema({ id: String, socketId: String, username: String, chats: Array }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', async socket => {
    console.log('connected', socket.handshake.query.DeviceId)

    let me = await users.findOne({ id: socket.handshake.query.DeviceId }).exec();

    if (me) {
        me.socketId = socket.id;
        me.save();

        await sendRooms(me);
    }

    socket.on('sendMessage', async (room, msg, senderName) => {
        console.log('sendMessage', msg, senderName);
        let destination = await users.findOne({ id: room.destination }).exec();
        let usersList = [me.id, room.destination].sort();
        let chat = await Chats.findOne({ users: { $all: [...usersList] } });

        const message = await Messages.create({
            id: uuidv4(),
            userId: me.id,
            message: msg,
            timestamp: Date.now()
        });

        if (!chat) {
            chat = await Chats.create({
                id: uuidv4(),
                users: usersList,
                messages: [message.id]
            });
        } else {
            chat.messages.push(message.id);
            chat.save();
        }

        message.chatId = chat.id;
        await message.save();

        if (!me.chats.includes(chat.id)) {
            me.chats.push(chat.id);
            await me.save();
        }

        if (!destination.chats.includes(chat.id)) {
            destination.chats.push(chat.id);
            await destination.save();
        }

        socket.broadcast.to(destination.socketId).emit('sendMessage', message);
        socket.broadcast.to(me.socketId).emit('sendMessage', message);

        // io.to(`${destination.socketId}`).emit('sendMessage', message);
        socket.emit('sendMessage', message);
    });

    socket.on('register', async (data, cb) => {
        console.log('register', data, socket.id);

        let me = await users.findOne({ username: data.username }).exec();

        if (me) {
            me.socketId = socket.id;
            me.save();
        } else {
            me = await users.create({
                username: data.username,
                id: data.deviceId,
                socketId: socket.id,
                chats: []
            })
        }

        cb();

        await sendRooms(me);
    });
});

sendRooms = async (me) => {
    let userList = await users.find({}).exec();

    let theList = [];

    for (let i = 0; i < userList.length; i++) {
        if (userList[i].id === me.id) {
            continue;
        }

        let chatUsers = [me.id, userList[i].id].sort();
        let userChat = await Chats.findOne({ users: { $all: [...chatUsers] } });

        if (!userChat) {
            try {
                userChat = await Chats.create({
                    id: uuidv4(),
                    users: chatUsers,
                    messages: []
                });
            }
            catch (err) {
                console.log(err);
            }
        }

        let messages = await Messages.find({ id: { $in: userChat.messages } });
        theList.push({
            name: userList[i].username, id: userChat.id, destination: userList[i].id, messages: messages || []
        })
    }

    io.to(`${me.socketId}`).emit('rooms', theList);
};

http.listen(3001, () => {
    console.log('listening on *:3001');
});