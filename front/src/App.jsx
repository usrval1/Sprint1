import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/AuthContext';

import LoginPage from './pages/Usuario/LoginPage';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/login_user' element={<LoginPage/>}/>        
      </Routes>
    </BrowserRouter>
    </UserProvider>
  )
}

export default App