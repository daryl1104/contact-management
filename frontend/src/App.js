
import Login from './container/Login';
import { Outlet, Route, Routes } from 'react-router-dom';
import Register from './container/Register';
import Protected from './container/Homepage';
import Detail from './container/Detail';
import Index from './container/Index';
import { AuthProvider } from './container/useAuth';

function App({ children }) {
  // const [token, setToken] = useState(null);
  // const [currentUsername, setCurrentUsername] = useState(null);
    
  // if (!token) {
  //     return <Login saveToken={setToken} saveCurrent={setCurrentUsername}/>
  // }

  return (
    <Outlet />
  );
}

export default App;
