import { useState } from "react";

export default function LoginForm({ onLogin }) {
    const [isAdmin, setIsAdmin] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        onLogin({
            username,
            password,
            role: isAdmin ? "admin" : "user"
        });
    }

    return (
        <>
            <img
                className="big-logo"
                src="https://www.flo.com.tr/pub/assets/flo-v2/images/flo-logo.svg"
                alt=""
            />

            <div className={`container ${isAdmin ? "active" : ""}`}>
                {/* ADMIN */}
                <div className="form-container admin-sign-in">
                    <form onSubmit={handleSubmit}>
                        <h1>Yönetici Giriş</h1>
                        <span>Kayıtlı kullanıcı adı ve şifreniz ile giriş yapınız.</span>
                        <input
                            placeholder="Kullanıcı Adı"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Şifre"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <button>Giriş Yap</button>
                    </form>
                </div>

                {/* USER */}
                <div className="form-container sign-in">
                    <form onSubmit={handleSubmit}>
                        <h1>Kullanıcı Giriş</h1>
                        <span>Yöneticiniz tarafından verilen bilgiler ile giriş yapınız.</span>
                        <input
                            placeholder="Kullanıcı Adı"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Şifre"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <button>Giriş Yap</button>
                    </form>
                </div>

                {/* TOGGLE */}
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Kullanıcı mısınız?</h1>
                            <button className="hidden" onClick={() => setIsAdmin(false)}>
                                Kullanıcı Girişi
                            </button>
                        </div>

                        <div className="toggle-panel toggle-right">
                            <h1>Yönetici misiniz?</h1>
                            <button className="hidden" onClick={() => setIsAdmin(true)}>
                                Yönetici Girişi
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
