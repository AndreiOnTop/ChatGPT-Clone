import React, { useState } from 'react'
import './App.css'
import gptLogo from './assets/chatgpt.svg'
import addBtn from './assets/add-30.png'
import msgIcon from './assets/message.svg'
import home from './assets/home.svg'
import saved from './assets/bookmark.svg'
import rocket from './assets/rocket.svg'
import sendBtn from './assets/send.svg'
import userIcon from './assets/user-icon.jpg'
import { sendMsgToOpenAI } from './openai'


const App = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      text: 'Hi, I am Anmir, a friendly AI bot excited to help you in your coding journey. How can I help you today?',
      isBot: true,
    }
  ]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setInput('');

    setMessages((prevMessages) => [...prevMessages, { text: userMessage, isBot: false }]);

    try {
      const res = await sendMsgToOpenAI(userMessage);

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: res.content || 'Sorry, I was unable to process your request.', isBot: true },
      ]);
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'An error occured. Please try again later.', isBot: true },
      ]);
    }
  };

  const handleEnter = async (e) => {
    if (e.key === 'Enter') {
      await handleSend();
    }
  }


  const newChat = async () => {
    setMessages([
      {
        text: 'Hi, I am Anmir, a friendly AI bot excited to help you in your coding journey. How can I help you today?',
        isBot: true
      }
    ])
  }

  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop"><img src={gptLogo} alt="Logo" className="logo" /><span className="brand">Anmir</span></div>
          <button className="midBtn"><img src={addBtn} alt="New Chat" className="addBtn" onClick={newChat} />New Chat</button>
          <div className="upperSideBottom">
            <button className="query" onClick={() => setInput("What is Programming ?")}><img src={msgIcon} alt="query" />What is Programming ?</button>
            <button className="query" onClick={() => setInput("What is an API ?")}><img src={msgIcon} alt="query" />What is an API ?</button>
          </div>
        </div>
        <div className="lowerSide">
          <div className="listItems"><img src={home} alt="Home" className="listItemsImg" />Home</div>
          <div className="listItems"><img src={saved} alt="Saved" className="listItemsImg" />Saved</div>
          <div className="listItems"><img src={rocket} alt="Upgrade" className="listItemsImg" />Upgrade to Pro</div>
        </div>
      </div>
      <div className="main">
        <div className="chats">
          {messages.map((message, i) => 
            <div key={i} className={message.isBot ? "chat bot" : "chat"}>
              <img className='chatImg' src={message.isBot ? gptLogo : userIcon} alt="" /><p className="txt">{message.text}</p>
            </div>
          )}
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input type="text" name='' id='' placeholder='Type a message' value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleEnter}/><button className="send" onClick={handleSend}><img src={sendBtn} alt="SendBtn" /></button>
          </div>
          <p>Anmir may produce inaccurate information about people, places, or facts.</p>
        </div>
      </div>
    </div>
  )
};

export default App