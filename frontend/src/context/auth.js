import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null, // Initialize with null to handle loading states
    token: "", // Initialize with an empty token
  });

  // Set the default Axios Authorization header
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parsedData = JSON.parse(data);
      setAuth({
        user: parsedData.user || {}, // Ensure user object is defined
        token: parsedData.token || "",
      });
    }
  }, []);

  useEffect(() => {
    // Save the auth state to localStorage whenever it changes
    if (auth.user) { // Check if user is defined before saving
      localStorage.setItem("auth", JSON.stringify(auth));
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };