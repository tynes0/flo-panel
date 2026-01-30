import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import { useTheme } from "../hooks/useTheme";

export default function Login({ onLogin, users }) {
    const navigate = useNavigate();
    const { toggleTheme } = useTheme();

    useEffect(() => {
        document.body.classList.add("login-layout");
        return () => document.body.classList.remove("login-layout");
    }, []);

    async function handleLogin(credentials) {
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials)
            });

            if (response.ok) {
                const userFromServer = await response.json();
                onLogin(userFromServer);
            } else {
                alert("Giriş bilgileri hatalı!");
            }
        } catch (error) {
            alert("Backend sunucusuna ulaşılamıyor (Port 5000 açık mı?)");
        }
    }

    return (
        <div className="login-wrapper">
            {/* 🌙 DARK MODE BUTTON */}
            <button
                className="glob-dark-mode-btn"
                onClick={toggleTheme}
                aria-label="Tema Değiştir"
            >
                <i className="fas fa-moon" />
            </button>

            <LoginForm onLogin={handleLogin} />
        </div>
    );
}
