import { createContext, useState } from 'react';
import useMessageCollection from '../hooks/useMessageCollection';

/**
 * ChatContext is a context object that is used to share collection of messages
 * between components
 */
 const ChatContext = createContext({});
export const AuthContext = createContext();


/**
 * ChatContextProvider is a functional component that serves as a provider for the ChatContext.
 * It provides the ChatContext to the components within its subtree.
 * 
 * @param {Object} props - The properties passed to the component.
 * @returns {JSX.Element} A ChatContext.Provider element.
 */
const ChatContextProvider = (props) => {
  const [messages, setMessages, clearMessages] = useMessageCollection([]);
  const [limit, setLimit] = useState(-1);

  return (
    <ChatContext.Provider value={[messages, setMessages, clearMessages, limit, setLimit]}>
      {props.children}
    </ChatContext.Provider>
  )
}

export { ChatContext, ChatContextProvider }

