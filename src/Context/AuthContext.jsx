import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dummyUsers = [
    { name: "Admin", email: "admin@example.com", password: "12345", role: "admin" },
    { name: "Ali", email: "user@example.com", password: "12345", role: "user" },
  ];

  const [user, setUser] = useState(null);

  // ✅ Load from localStorage on start
  useEffect(() => {
    const savedUser = localStorage.getItem("authUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const signup = (name, email, password) => {
    const newUser = { name, email, password, role: "user" };
    localStorage.setItem("authUser", JSON.stringify(newUser));
    setUser(newUser);
  };

  const login = (formData) => {
    const foundUser = dummyUsers.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("authUser", JSON.stringify(foundUser));
      return true;
    }

    return false;
  };

  const logout = () => {
    localStorage.removeItem("authUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
