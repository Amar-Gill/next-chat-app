import React from 'react'
import './App.css';
import Socket from './utils/socket'

class UsersContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeUsers: []
        }

        Socket.on('UPDATE_USER_LIST', users => {
            console.log(users)
            this.setState({
                activeUsers: users
            })
        })
    }

    render() {
        if (!this.state.activeUsers.length) return(
            <div className='UsersContainer'>
                No active users.
            </div>
        )
        return (
            <div className='UsersContainer'>
                {
                    this.state.activeUsers.map(activeUser => {
                        return (
                            <li>{activeUser.username}</li>
                        )
                    })
                }
            </div>
        )
    }
}

export default UsersContainer;