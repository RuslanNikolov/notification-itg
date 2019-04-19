import React, { useState, useEffect, memo } from 'react'
import './Notification.css'
import ChatIcon from './chat.svg'

import { IMessage } from './Message/Message';
import Message from './Message/Message';
import removeDuplicatesFromTwoArrays from '../utils/RemoveDuplicatesFromTwoArrays'

export const MESSAGES_LABEL: string = 'Messages';

export interface IProps {
    messages: IMessage[]
}

const Notification = (props: IProps) => {
    const [messages, setMessages] = useState([] as IMessage[])
    const [timeMessagesClosed, setTimeMessagesClosed] = useState(Date.now())
    const [unseenMessagesCount, setUnseenMessagesCount] = useState(0)
    const [messagesExpanded, setMessagesExpanded] = useState(false)

    useEffect(() => {
        const newUniqueMessages = removeDuplicatesFromTwoArrays(messages, props.messages)

        setUnseenMessagesCount(prevUnseenMessagesCount => prevUnseenMessagesCount + newUniqueMessages.length);
        setMessages(prevMessages => [...prevMessages, ...newUniqueMessages])
    }, [props.messages])

    const toggleMessagesTab = () => {
        if (messagesExpanded) {
            setTimeMessagesClosed(Date.now());
            setUnseenMessagesCount(0);
        }
        setMessagesExpanded(prevExpanded => !prevExpanded)
    }

    return (
        <div className="notification">
            <div className="notification__tab" onClick={toggleMessagesTab}>
                <h3 className="notification__tab__label">{MESSAGES_LABEL}</h3>
                {messagesExpanded ? <span >✖</span>
                    : <span className="notification__tab__notify-circle">{unseenMessagesCount}</span>
                }
            </div>
            {messagesExpanded &&
                <div className="notification__messages slideInUp animated">
                    {messages.map((message: IMessage) => <Message message={message} unseen={message.timestamp > timeMessagesClosed} />)}
                </div>
            }
        </div>
    )
}

export default memo(Notification)
