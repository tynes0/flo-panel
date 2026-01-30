import {useEffect, useState} from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch("http://localhost:5000/api/users");
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            }
        };
        if (currentUser?.role === 'admin') fetchUsers();
    }, [currentUser]);
    
    function handleLogin(user) {
        setCurrentUser(user);
    }
    
    function handleLogout() {
        setCurrentUser(null);
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />

                <Route
                    path="/login"
                    element={
                        currentUser
                            ? <Navigate to={currentUser.role === "admin" ? "/admin" : "/dashboard"} />
                            : <Login onLogin={handleLogin} users={users} />
                    }
                />

                <Route
                    path="/dashboard"
                    element={
                        currentUser?.role === "user"
                            ? <Dashboard user={currentUser} />
                            : <Navigate to="/login" />
                    }
                />

                <Route
                    path="/admin"
                    element={
                        currentUser?.role === "admin"
                            ? <Admin users={users} setUsers={setUsers} onLogout={handleLogout} />
                            : <Navigate to="/login" />
                    }
                />

                <Route
                    path="/profile/:id"
                    element={
                        currentUser
                            ? <ProfilePage users={users} />
                            : <Navigate to="/login" />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
