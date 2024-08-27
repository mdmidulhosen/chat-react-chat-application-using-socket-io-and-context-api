import React, {createContext, useState} from 'react';

export const GlobalContext = createContext(null);

const GlobalState = ({children}) => {
  const [showLoginView, setShowLoginView] = useState(false);
  const [currentUserName, setCurrentUserName] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [allUser, setAllUser] = useState([]);
  const [currentGroupName, setCurrentGroupName] = useState('');
  const [allChatRooms, setAllChatRooms] = useState([]);
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
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
