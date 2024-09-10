import {useAuth}from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function LoginPage() {
    const { signin, isAuthenticated } = useAuth();
    const navigate = useNavigate();
  
    const onSubmit = (data) => signin(data);
  
    useEffect(() => {
      if (isAuthenticated) {
        // Redirige según el rol del usuario
      if (role === 'Administrador') {
        navigate("/");
      } else if (role === 'Tecnico') {
        navigate("/");
      } else if (role === 'Vendedor') {
        navigate("/");
      }
      }
    }, [isAuthenticated]);
  
    return ( 
        
        <div>HOLA</div>
      
    )
  }
  
  export default LoginPage