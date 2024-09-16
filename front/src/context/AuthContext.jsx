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
    const [name, setName] = useState(null);
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
                setName(userData.name);
                localStorage.setItem('token', userData.token); // Guarda el token
               return { user: userData, role: userData.role, name: userData.name};
            } else {
                setIsAuthenticated(false);
            }
           }
        } catch (error) {
           console.log(error);
        }
      };

       // Función manejar registro
    const registerUser = async (user) => {
        try {
            const res = await registrousuarioRequest(user);
            if (res.status === 200) {
              const userData = res.data;
                  if (userData) {
                      setUser(userData);
                      setIsAuthenticated(true);
                    //  setRole(userData.role);  // Guardar el rol del usuario
                    //  localStorage.setItem('token', userData.token); // Guarda el token // AVERIGUAR SI ES NECESARIO
                  } else {
                      setIsAuthenticated(false);
                  }
             }
          } catch (error) {
             console.log(error);
             setErrors(error);
          }
    };

    return (
        <UserContext.Provider value = {{user, isAuthenticated, role, name, registerUser, signin}}>
            {children}
        </UserContext.Provider>
    )
}
