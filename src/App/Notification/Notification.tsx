import React, { useState, useEffect, useLayoutEffect, useRef, memo } from 'react'
import './Notification.css'

import { IMessage } from './Message/Message';
import Message from './Message/Message';
import { removeDuplicatesFromTwoArrays } from '../utils'

const MESSAGES_LABEL: string = 'Messages';
const BROWSER_SCROLL_RANDOM_OFFSET: number = 2; // Resolves unpredictable scroll to bottom browser behaviour

export interface IProps {
    messages: IMessage[]
}

const Notification = (props: IProps) => {
    const [messages, setMessages] = useState([] as IMessage[]);
    const [timePanelClosed, setTimePanelClosed] = useState(0);
    const [newMessagesCount, setNewMessagesCount] = useState(0);

    const [isPanelExpanded, setIsPanelExpanded] = useState(false);
    const [isMessagesBottomScrolled, setIsMessagesBottomScrolled] = useState(false)

    const messagesRef = useRef(null as any);

    useEffect(() => {
        const newUniqueMessages = removeDuplicatesFromTwoArrays(messages, props.messages);
        setNewMessagesCount(prevCount => prevCount + newUniqueMessages.length);
        setMessages(prevMessages => [...prevMessages, ...newUniqueMessages]);
        if (messagesRef.current) {
            setIsMessagesBottomScrolled(getIsMessagesBottomScrolled())
        }
    }, [props.messages])

    useLayoutEffect(() => {
        if (isMessagesBottomScrolled) {
            scrollToMessagesBottom()
        }
    }, [messages])

    useEffect(() => {
        if (isPanelExpanded) {
            scrollToMessagesBottom()
        } else {
            setTimePanelClosed(Date.now());
            setNewMessagesCount(0);
            setIsMessagesBottomScrolled(false)
        }
    }, [isPanelExpanded])

    const onTogglePanelClick = (): void => setIsPanelExpanded(prevExpanded => !prevExpanded);

    const scrollToMessagesBottom = (): void => messagesRef.current.scrollTop = messagesRef.current.scrollHeight

    const getIsMessagesBottomScrolled = (): boolean => messagesRef.current.scrollTop >= ((messagesRef.current.scrollHeight - messagesRef.current.offsetHeight) - BROWSER_SCROLL_RANDOM_OFFSET)

    return (
        <div className="notification">
            <div className="notification__panel" onClick={onTogglePanelClick}>
                <h3 className="notification__panel__label">{MESSAGES_LABEL}</h3>
                {isPanelExpanded
                    ? <span className="notification__panel__cross">✖</span>
                    : <span className="notification__panel__notify-circle">{formatMessageCount(newMessagesCount)}</span>
                }
            </div>
            {isPanelExpanded &&
                <div className="notification__messages" ref={messagesRef}>
                    {messages.map((message: IMessage) => <Message message={message} isHighlighted={message.timestamp > timePanelClosed} key={message.timestamp} />)}
                </div>
            }
        </div>
    )
}

const formatMessageCount = (count: number): string => {
    if (count < 1000) {
        return `${count}`
    } else {
        const [thousands, hundreds] = [Math.floor(count / 1000), Math.floor(count / 100 % 10)]
        return `${thousands}.${hundreds}K`
    }
}

export default memo(Notification)
