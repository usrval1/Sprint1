import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './context/AuthContext';
import React, { useEffect } from 'react';

import LoginPage from './pages/Usuario/LoginPage';
import RegistrarUsuario from './pages/Administrador/RegistrarUsuario';
import GestionarUsuarios from './pages/Administrador/GestionarUsuario';


function App() {
  //const { checkAuth } = useAuth();

  return (
    <UserProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/login_user' element={<LoginPage/>}/>
        <Route path='/registro_user' element={<RegistrarUsuario/>}/>
        <Route path='/gestionar_usuarios' element={<GestionarUsuarios/>}/>         
        <Route element={<PrivateRoute />}>
        </Route>     
      </Routes>
    </BrowserRouter>
    </UserProvider>
  )
}

export default App
