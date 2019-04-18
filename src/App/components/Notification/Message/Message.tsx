import React, { memo } from 'react'
import './Message.css'
import { getTime, getTimeZone, getText } from './utils'

export interface IMessage {
  text: string,
  timestamp: number
}

interface IProps {
  message: IMessage
}

const Message = (props: IProps) => {
  const { text, timestamp } = props.message;

  return (
    <p className="message">
      <span className="message__time" title={getTimeZone(timestamp)}>{getTime(timestamp)}</span>
      <span className="message__text" title={text}>{getText(text)}</span>
    </p>
  )
}

export default memo(Message)


