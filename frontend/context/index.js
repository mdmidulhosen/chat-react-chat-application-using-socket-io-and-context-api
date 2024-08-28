import React, {createContext, useState} from 'react';

export const GlobalContext = createContext(null);
const dummyMessages = [
  // {id: '1', text: 'Hello! How are you?'},
];

const GlobalState = ({children}) => {
  const [showLoginView, setShowLoginView] = useState(false);
  const [currentUserName, setCurrentUserName] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [allUser, setAllUser] = useState([]);
  const [currentGroupName, setCurrentGroupName] = useState('');
  const [allChatRooms, setAllChatRooms] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(dummyMessages);
  return (
    <GlobalContext.Provider
      value={{
        showLoginView,
        setShowLoginView,
        currentUserName,
        setCurrentUserName,
        currentUser,
        setCurrentUser,
        allUser,
        setAllUser,
        currentGroupName,
        setCurrentGroupName,
        allChatRooms,
        setAllChatRooms,
        message,
        setMessage,
        messages,
        setMessages,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
