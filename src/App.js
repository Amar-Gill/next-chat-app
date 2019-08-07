import React from 'react';
import MessageContainer from './MessageContainer';
import UsersContainer from './UsersContainer';
import NewMessage from './NewMessage';
import Socket from './utils/socket'

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }

    Socket.emit('NEW_USER')

    Socket.on('GET_CURRENT_USER', user => {
      this.setState({
        user: user
      })
    })

  }

  updateConversations = (object) => {
    this.setState({
        conversations: [...this.state.conversations, object]
        })
  }
  
  render() {
    return (
      <div className="App" >

        <h1> Welcome {this.state.user.username}</h1>

        <MessageContainer
        />

        <UsersContainer/>

        <NewMessage user={this.state.user}/>

      </div>
    );
  }

}

export default App;
