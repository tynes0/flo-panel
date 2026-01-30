import { useState, useEffect } from "react";

export default function AssignTaskModal({ open, user, onClose, onSave }) {
    const [tasks, setTasks] = useState({
        abu: 0,
        iso: 0,
        tabanlik: 0,
    });

    useEffect(() => {
        if (user) {
            setTasks(user.targets);
        }
    }, [user]);

    if (!open || !user) return null;

    function updateTask(key, delta) {
        setTasks((prev) => ({
            ...prev,
            [key]: Math.max(0, prev[key] + delta),
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSave(user._id, tasks);
        onClose();
    }

    return (
        <div className="overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h3>{user.name} – Görev Ata</h3>

                <form onSubmit={handleSubmit}>
                    {["abu", "iso", "tabanlik"].map((key) => (
                        <div key={key} className="number-input">
                            <button
                                type="button"
                                onClick={() => updateTask(key, -1)}
                            >
                                –
                            </button>

                            <input
                                type="number"
                                value={tasks[key]}
                                readOnly
                            />

                            <button
                                type="button"
                                onClick={() => updateTask(key, 1)}
                            >
                                +
                            </button>
                        </div>
                    ))}

                    <div className="modal-actions">
                        <button type="submit">Kaydet</button>
                        <button
                            type="button"
                            className="cancel"
                            onClick={onClose}
                        >
                            İptal
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
