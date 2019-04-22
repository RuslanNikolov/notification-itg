import React, { useState, useEffect, useLayoutEffect, useRef, memo } from 'react'
import './Notification.css'

import { IMessage } from './Message/Message';
import Message from './Message/Message';
import removeDuplicatesFromTwoArrays from '../utils/RemoveDuplicatesFromTwoArrays'

export const MESSAGES_LABEL: string = 'Messages';

export interface IProps {
    messages: IMessage[]
}

const Notification = (props: IProps) => {
    const [messages, setMessages] = useState([] as IMessage[]);
    const [timePanelClosed, setTimePanelClosed] = useState(0);
    const [newMessagesCount, setNewMessagesCount] = useState(0);

    const [isPanelExpanded, setIsPanelExpanded] = useState(false);
    const [isUserAtMessagesBottom, setIsUserAtMessagesBottom] = useState(false)

    const messagesRef = useRef(null as any);

    useEffect(() => {
        const newUniqueMessages = removeDuplicatesFromTwoArrays(messages, props.messages);
        setNewMessagesCount(prevCount => prevCount + newUniqueMessages.length);
        setMessages(prevMessages => [...prevMessages, ...newUniqueMessages]);
        if (messagesRef.current) {
            setIsUserAtMessagesBottom(getIsUserAtMessagesBottom())
        }
    }, [props.messages])

    useLayoutEffect(() => {
        if (isUserAtMessagesBottom) {
            scrollToMessagesBottom()
        }
    }, [messages])

    useEffect(() => {
        if (isPanelExpanded) {
            scrollToMessagesBottom()
        } else {
            setTimePanelClosed(Date.now());
            setNewMessagesCount(0);
            setIsUserAtMessagesBottom(false)
        }
    }, [isPanelExpanded])

    const onTogglePanelClick = (): void => setIsPanelExpanded(prevExpanded => !prevExpanded);

    const scrollToMessagesBottom = (): void => messagesRef.current.scrollTop = messagesRef.current.scrollHeight

    const getIsUserAtMessagesBottom = (): boolean => messagesRef.current.scrollTop === (messagesRef.current.scrollHeight - messagesRef.current.offsetHeight)

    return (
        <div className="notification">
            <div className="notification__tab" onClick={onTogglePanelClick}>
                <h3 className="notification__tab__label">{MESSAGES_LABEL}</h3>
                {isPanelExpanded
                    ? <span >✖</span>
                    : <span className="notification__tab__notify-circle">{newMessagesCount}</span>
                }
            </div>
            {isPanelExpanded &&
                <div className="notification__messages slideInUp animated" ref={messagesRef}>
                    {messages.map((message: IMessage) => <Message message={message} isHighlighted={message.timestamp > timePanelClosed} key={message.timestamp} />)}
                </div>
            }
        </div>
    )
}

export default memo(Notification)
