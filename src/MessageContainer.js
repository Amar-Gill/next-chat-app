import React from 'react'
// import { animateScroll } from "react-scroll";
import './App.css';
import Socket from './utils/socket'
import moment from 'moment';

class MessageContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            conversations:[]
        }
        Socket.on('RECEIVE_BROADCAST', broadcast => {
            // console.log(broadcast)
            this.setState({
                conversations: [...this.state.conversations, broadcast]
            })
        })
    }

    // scrollToBottom() {
    //     animateScroll.scrollToBottom({
    //         containerId: "MessageContainer"
    //     });
    // }

    componentDidUpdate() {
        // this.scrollToBottom()
        this.end.scrollIntoView()
    }

    render() {
        if (!this.state.conversations.length) return (
            <>
            <div id='MessageContainer' className='MessageContainer'>

            </div>

            <div ref={(elem) => {
                this.end = elem
                }}></div>
                </>
        )
        return (
            <div id='MessageContainer' className='MessageContainer'>
                
                    {
                        this.state.conversations.map(message => {
                            return (
                            <div style={{display:'flex', alignItems:'center', margin:'4px 0'}} key={message.timestamp}>

                                <img src={`https://api.adorable.io/avatars/25/${message.username}.png`} style={{borderRadius:'50%', marginRight:'4px'}}/>
                                <span style={{fontWeight: 'bold', marginRight:'4px'}}>{message.username}</span>
                                <span style={{marginRight: '4px'}}>{message.message}</span>
                                <span>{moment(message.timestamp).format('MMMM Do YYYY, h:mm:ss a')}</span>

                            </div>
                            )
                        })
                    }
                <div ref={(elem) => {
                    this.end = elem
                    }}></div>
            </div>
        )
    }
}

export default MessageContainer;