import { createContext, useState, useContext} from "react";
import { loginRequest } from "../api/auth";

export const UserContext = createContext();
export const useAuth = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de UserProvider");
    }
    return context;
};

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null);  // Nuevo estado para almacenar el rol
    
    //función para manejar el login
    const signin = async (user) => {
        try {
          const res = await loginRequest(user);
          if (res.status === 200) {
            const userData = res.data;
                if (userData) {
                    setUser(userData);
                    setIsAuthenticated(true);
                    setRole(userData.role);  // Guardar el rol del usuario
                    localStorage.setItem('token', userData.token); // Guarda el token
                } else {
                    setIsAuthenticated(false);
                }
           }
        } catch (error) {
           console.log(error);
        }
      };

    return (
        <UserContext.Provider value = {{user, isAuthenticated, role, signin}}>
            {children}
        </UserContext.Provider>
    )
}
