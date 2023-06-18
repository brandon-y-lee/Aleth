import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState([]);

  const sendMessage = async () => {
    setConversation([...conversation, { text: input, sender: 'user' }]);
    
    try {
      const response = await axios.post('CHATBOT_API_ENDPOINT', { text: input });
      setConversation([...conversation, { text: input, sender: 'user' }, { text: response.data, sender: 'chatbot' }]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
    
    setInput('');
  };

  return (
    <div>
      <div>
        {conversation.map((message, index) => (
          <div key={index} className={message.sender}>
            {message.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
