import SideBar from '../components/SideBar';
import ChatView from '../components/ChatView';
import React, { useState} from 'react'



const Home = () => {
  const [conversations, setConversations] = useState([]);

  return (
    <div className="flex transition duration-500 ease-in-out">
      <SideBar conversations={conversations} setConversations={setConversations} />
      <ChatView conversations={conversations} setConversations={setConversations} />
    </div>
  )
}

export default Home