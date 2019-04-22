import React, { useState, useEffect } from 'react';
import './App.css';
import Notification from './Notification/Notification'
import { getMockMessages } from './utils/GetMocks'
import { IMessage } from './Notification/Message/Message';

const App = (props: any) => {
  const [mockMessages, setMockMessages] = useState([] as IMessage[])

  useEffect(() => {
    setInterval(() => setMockMessages(getMockMessages()), 5000);
  }, [])

  return (
    <div className="App">
      <Notification messages={mockMessages} />
    </div>
  );
}


export default App;
