import React, { FC, memo } from 'react'
import './Message.css'

export interface IMessage {
  text: string,
  timestamp: number
}

interface IProps {
  message: IMessage,
  isHighlighted: boolean
}

const Message: FC<IProps> = (props) => {
  const { text, timestamp } = props.message;

  return (
    <div className={`notification-message ${props.isHighlighted ? 'highlighted' : ''}`}>
      <span className="notification-message__time" title={formatTimeZone(timestamp)}>{formatTime(timestamp)}</span>
      <span className="notification-message__text" title={text}>{formatText(text)}</span>
    </div>
  )
}

const formatTime = (timestamp: number): string => new Date(timestamp).toString().split('GMT')[0]

const formatTimeZone = (timestamp: number): string => new Date(timestamp).toString().split('GMT')[1]

const formatText = (text: string, maxLength: number = 100): string => text.length > maxLength ? `${text.slice(0, maxLength)}...` : text

export default memo(Message)


