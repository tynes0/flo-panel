import { useState } from "react";
import Modal from "../ui/Modal";

export default function AddUserModal({ open, onClose, onAdd }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });

    const [error, setError] = useState("");

    function update(key, value) {
        setForm((f) => ({ ...f, [key]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!form.name || !form.email || !form.password) {
            setError("Tüm alanları doldur");
            return;
        }

        if (form.password !== form.password2) {
            setError("Şifreler uyuşmuyor");
            return;
        }

        onAdd({
            name: form.name,
            email: form.email,
            targets: {
                abu: 0,
                iso: 0,
                tabanlik: 0,
            },
        });

        setForm({ name: "", email: "", password: "", password2: "" });
        setError("");
        onClose();
    }

    return (
        <Modal open={open} onClose={onClose} title="Yeni Kullanıcı">
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="İsim"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Şifre"
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Şifre Tekrar"
                    value={form.password2}
                    onChange={(e) => update("password2", e.target.value)}
                />

                {error && <p style={{ color: "var(--primary)" }}>{error}</p>}

                <div className="modal-actions">
                    <button type="button" className="cancel" onClick={onClose}>
                        İptal
                    </button>
                    <button type="submit">Kullanıcı Ekle</button>
                </div>
            </form>
        </Modal>
    );
}
