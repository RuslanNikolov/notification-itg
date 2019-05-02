import React, { FC, useState, useEffect, useLayoutEffect, useRef, memo, MutableRefObject } from 'react'
import './Notification.css'

import { IMessage } from './Message/Message';
import Message from './Message/Message';
import { removeDuplicatesFromTwoArrays } from '../utils'

const MESSAGES_LABEL: string = 'Messages';

interface IPanel {
    isExpanded: boolean,
    timeClosed: number,
    isBottomScrolled: boolean
}
interface Props {
    messages: IMessage[]
}

const Notification: FC<Props> = (props) => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [newMessagesCount, setNewMessagesCount] = useState(0);

    const [panel, setPanel] = useState<IPanel>({
        isExpanded: false,
        timeClosed: 0,
        isBottomScrolled: false
    })
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const newUniqueMessages = removeDuplicatesFromTwoArrays(messages, props.messages);
        setNewMessagesCount(prevCount => prevCount + newUniqueMessages.length);
        setMessages(prevMessages => [...prevMessages, ...newUniqueMessages]);
        if (panelRef.current) {
            setPanel(prevPanel => ({ ...prevPanel, isBottomScrolled: checkIsPanelBottomScrolled(panelRef) }));
        }
    }, [props.messages])

    useLayoutEffect(() => {
        if (panel.isBottomScrolled) {
            scrollToPanelBottom(panelRef)
        }
    }, [messages])

    useEffect(() => {
        if (panel.isExpanded) {
            scrollToPanelBottom(panelRef)
        } else {
            setNewMessagesCount(0);
            setPanel(prevPanel => ({
                ...prevPanel,
                timeClosed: Date.now(),
                isBottomScrolled: false
            }));
        }
    }, [panel.isExpanded])

    const onPanelToggleClick = () => setPanel(prevPanel => ({ ...prevPanel, isExpanded: !panel.isExpanded }));

    return (
        <div className="notification">
            <div className="notification__panel" onClick={onPanelToggleClick}>
                <h3 className="notification__panel__label">{MESSAGES_LABEL}</h3>
                {panel.isExpanded
                    ? <span className="notification__panel__cross">✖</span>
                    : <span className="notification__panel__notify-circle">{formatMessageCount(newMessagesCount)}</span>
                }
            </div>
            {panel.isExpanded &&
                <div className="notification__messages" ref={panelRef}>
                    {messages.map((message: IMessage) => <Message message={message} isHighlighted={message.timestamp > panel.timeClosed} key={message.timestamp} />)}
                </div>
            }
        </div>
    )
}

const scrollToPanelBottom = (panelRef: MutableRefObject<any>) => panelRef.current.scrollTop = panelRef.current.scrollHeight

const BROWSER_SCROLL_RANDOM_OFFSET: number = 2; // Resolves unpredictable scroll to bottom browser behaviour
const checkIsPanelBottomScrolled = (panelRef: any): boolean => panelRef.current.scrollTop >= ((panelRef.current.scrollHeight - panelRef.current.offsetHeight) - BROWSER_SCROLL_RANDOM_OFFSET)

const formatMessageCount = (count: number): string => {
    const [thousands, hundreds] = [Math.floor(count / 1000), Math.floor(count / 100 % 10)]
    return count < 1000 ? `${count}` : `${thousands}.${hundreds}K`
}

export default memo(Notification)
