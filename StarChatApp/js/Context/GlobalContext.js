import React from 'react';

export default React.createContext({
    Rooms: [],
    Login: username => { },
    GetMessages: (id, name, type) => { },
    SendMessages: (id, name, type, msg) => { }
});