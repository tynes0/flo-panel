import { useNavigate } from "react-router-dom";

export default function UserTable({ users, onView, onAssign, onDelete }) {
    const navigate = useNavigate();
    
    return (
        <div className="card">
            <h3>Kullanıcılar</h3>

            <table className="admin-table">
                <thead>
                <tr>
                    <th>İsim</th>
                    <th>Email</th>
                    <th>Abü</th>
                    <th>İso</th>
                    <th>Tabanlık</th>
                    <th></th>
                </tr>
                </thead>

                <tbody>
                {users
                    .filter(user => user.role !== "admin")
                    .map((u) => (
                    <tr key={u._id}>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.targets?.abu ?? 0}</td>
                        <td>{u.targets?.iso ?? 0}</td>
                        <td>{u.targets?.tabanlik ?? 0}</td>

                        <td className="actions">
                            <button onClick={() => navigate(`/profile/${u._id}`)}>
                                <i className="fas fa-eye" />
                            </button>
                            
                            <button onClick={() => onView(u)}>
                                <i className="fas fa-eye" />
                            </button>

                            <button onClick={() => onAssign(u)}>
                                <i className="fas fa-edit" />
                            </button>

                            <button className="danger" onClick={() => onDelete(u)}>
                                <i className="fas fa-trash" />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
