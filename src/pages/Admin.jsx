import { useState } from "react";
import AdminSidebar from "../components/layout/AdminSidebar";
import UserTable from "../components/admin/UserTable";
import AddUserModal from "../components/admin/AddUserModal";
import AdminStats from "../components/admin/AdminStats";
import { useTheme } from "../hooks/useTheme";
import AssignTaskModal from "../components/admin/AssignTaskModal.jsx";
import DeleteUserModal from "../components/admin/DeleteUserModal.jsx";

export default function Admin({ users, setUsers, onLogout }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [assignOpen, setAssignOpen] = useState(false);
    const [deleteUser, setDeleteUser] = useState(null);

    const { toggleTheme } = useTheme();

    async function addUser(userData) {
        try {
            const response = await fetch("http://localhost:5000/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...userData,
                    username: userData.email.split('@')[0], 
                    password: userData.password || "123"
                })
            });

            if (response.ok) {
                const savedUser = await response.json();
                setUsers((prev) => [...prev, savedUser]);
            }
        } catch (error) {
            console.error("Kullanıcı eklenemedi:", error);
        }
    }

    async function assignTasks(userId, newTargets) {
        const response = await fetch(`http://localhost:5000/api/users/${userId}/targets`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.json(newTargets)
        });
        if (response.ok) {
            const updatedUser = await response.json();
            setUsers(users.map(u => u._id === userId ? updatedUser : u));
        }
    }

    async function confirmDelete(userId) {
        const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
            method: "DELETE"
        });
        if (response.ok) {
            setUsers(users.filter(u => u._id !== userId));
            setDeleteUser(null);
        }
    }

    return (
        <div className="admin-layout">
            <AdminSidebar collapsed={collapsed} onLogout={onLogout} />

            <div className="admin-main">
                <button
                    className="glob-dark-mode-btn"
                    onClick={toggleTheme}
                >
                    <i className="fas fa-moon" />
                </button>

                <button
                    className="menu-btn"
                    onClick={() => setCollapsed((c) => !c)}
                >
                    <i className="fas fa-bars" />
                </button>

                <main
                    className={`content-dashboard ${collapsed ? "narrow" : ""}`}
                >
                <section className="dash-header">
                        <h2>Admin Paneli</h2>
                        <p>Kullanıcı ve hedef yönetimi</p>
                    </section>

                    <AdminStats users={users} />

                    <div className="admin-actions">
                        <button
                            className="btn-primary"
                            onClick={() => setModalOpen(true)}
                        >
                            <i className="fas fa-user-plus" />
                            Kullanıcı Ekle
                        </button>
                    </div>

                    <UserTable
                        users={users}
                        onAssign={(user) => {
                            setSelectedUser(user);
                            setAssignOpen(true);
                        }}
                        onDelete={(user) => setDeleteUser(user)}
                    />

                    <AddUserModal
                        open={modalOpen}
                        onClose={() => setModalOpen(false)}
                        onAdd={addUser}
                    />
                    
                    <AssignTaskModal
                        open={assignOpen}
                        user={selectedUser}
                        onClose={() => setAssignOpen(false)}
                        onSave={assignTasks}
                    />

                    <DeleteUserModal
                        open={!!deleteUser}
                        user={deleteUser}
                        onClose={() => setDeleteUser(null)}
                        onConfirm={confirmDelete}
                    />


                </main>
            </div>
        </div>
    );

}
