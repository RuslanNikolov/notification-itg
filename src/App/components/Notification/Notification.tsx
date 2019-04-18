import React, { useState, useEffect, memo } from 'react'
import './Notification.css'

import { IMessage } from './Message/Message';
import Message from './Message/Message';
import removeDuplicatesFromTwoArrays from '../../utils/RemoveDuplicatesFromTwoArrays'

export const MESSAGES_LABEL: string = 'Messages';

export interface IProps {
    messages: IMessage[]
}

const Notification = (props: IProps) => {
    const [messages, setMessages] = useState([] as IMessage[])
    const [messagesExpanded, setMessagesExpanded] = useState(false)

    useEffect(() => {
        setMessages((prevMessages: IMessage[]) => {
            const newUniqueMessages = removeDuplicatesFromTwoArrays(prevMessages, props.messages)
            return [...prevMessages, ...newUniqueMessages]
        })
    }, [props.messages])

    const closeMessagesTab = () => setMessagesExpanded(prevExpanded => {
        if (prevExpanded) {
            setMessages([])
        }
        return !prevExpanded
    })

    return (
        <div className="notification">
            <div className="notification__tab" onClick={closeMessagesTab}>
                <h3 className="notification__tab__label">{MESSAGES_LABEL}</h3>
                {messagesExpanded ?
                    <span className="notification__tab__cross">✖</span>
                    :
                    <span className={`notification__tab__notify-circle ${messages.length < 1 ? 'hidden' : ''}`}>
                        <span className="notify-circle__number">{messages.length}</span>
                    </span>
                }
            </div>
            {messagesExpanded &&
                <div className="notification__messages slideInUp animated">
                    {messages.map((message: IMessage) => <Message message={message} />)}
                </div>
            }
        </div>
    )
}

export default memo(Notification)
