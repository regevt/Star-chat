import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import ChatList from './js/pages/ChatList/ChatList';
import Chat from './js/pages/Chat/Chat';
import Login from './js/pages/Login/Login';
import GlobalState from './js/Context/GlobalState';

export default class App extends Component {
  render() {
    console.disableYellowBox = true;
    console.error = (error) => {
      // debugger;
      error.apply;
    };
    return (
      <GlobalState>
        <Router >
          <Stack key="root" >
            <Scene key="login"
              hideNavBar={true}
              component={Login} />
            <Scene key="home"
              component={ChatList}
              title="Chats"
              backButtonTextStyle={{ color: 'white' }}
              leftButtonTextStyle={{ color: 'white' }}
              navBarButtonColor='white'
              titleStyle={{ color: 'white', textAlign: 'center' }}
              navigationBarStyle={{ backgroundColor: '#212121' }}
              renderBackButton={() => (null)}
              renderLeftButton={() => (null)} />
            <Scene key="Chat"
              component={Chat}
              backTitle='Chats'
              backButtonTextStyle={{ color: 'white' }}
              leftButtonTextStyle={{ color: 'white' }}
              navBarButtonColor='white'
              titleStyle={{ color: 'white', textAlign: 'center' }}
              navigationBarStyle={{ backgroundColor: '#212121' }}
            />
          </Stack>
        </Router>
      </GlobalState>
    );
  }
}
