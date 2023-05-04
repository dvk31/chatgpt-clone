import Home from './pages/Home';
import SignIn from './pages/SignIn';
import { ChatContextProvider } from './context/chatContext';
import { AuthContext } from './context/chatContext';
import { useProvideAuth } from './hooks/useAuth';

const App = () => {
  const auth = useProvideAuth();
  const { user } = auth;

  return (
    <AuthContext.Provider value={auth}>
      <ChatContextProvider>
        <div>{user ? <Home /> : <SignIn />}</div>
      </ChatContextProvider>
    </AuthContext.Provider>
  );
};

export default App;