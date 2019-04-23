import React, { memo } from 'react'
import './Message.css'
import { getTime, getTimeZone, getText } from './utils'

// Make tests //

export interface IMessage {
  text: string,
  timestamp: number
}

interface IProps {
  message: IMessage,
  isHighlighted: boolean 
}

const Message = (props: IProps) => {
  const { text, timestamp } = props.message;

  return (
    <div className={`notification-message ${props.isHighlighted ? 'highlighted' : ''}`}> 
      <span className="notification-message__time" title={getTimeZone(timestamp)}>{getTime(timestamp)}</span>
      <span className="notification-message__text" title={text}>{getText(text)}</span>
    </div>
  )
}

export default memo(Message)


