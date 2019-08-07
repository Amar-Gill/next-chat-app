import React from 'react'
import './App.css';
import Socket from './utils/socket'

class NewMessage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            textInput: ''
        }
    }

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    sendMessage = e => {
        e.preventDefault()
        const newObject = 
            {
                username: this.props.user.username,
                message: this.state.textInput,
                timestamp: Date.now()
            }
            Socket.emit('BROADCAST_MESSAGE', newObject)
            // console.log(newObject)
        
        this.setState({
            textInput: ''
        })
    }

    render(){
        return(
            <div className='NewMessage'>
                <form onSubmit={this.sendMessage}>
                    <input type='text'
                        value={this.state.textInput}
                        onChange={this.handleInput}
                        name='textInput'
                        placeholder='New Message'/>
                </form>
            </div>
        )
    }
}

export default NewMessage;