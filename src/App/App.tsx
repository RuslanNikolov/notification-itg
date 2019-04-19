import React, { useState, useEffect } from 'react';
import './App.css';
import Notification from './Notification/Notification'
import { getMockMessages } from './utils/GetMocks'

const App = (props: any) => {
  const [mockMessages, setMockMessages] = useState(getMockMessages())

  useEffect(() => {
    setInterval(() => setMockMessages(getMockMessages()), 6000);
  }, [])

  return (
    <div className="App">
      <Notification messages={mockMessages} />
    </div>
  );
}


export default App;
