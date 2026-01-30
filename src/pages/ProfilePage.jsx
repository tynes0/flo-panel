import { useParams } from "react-router-dom";

export default function ProfilePage({ users, isAdmin }) {
    const { id } = useParams();
    const user = users.find((u) => u._id === Number(id));

    if (!user) {
        return <p style={{ padding: 24 }}>Kullanıcı bulunamadı</p>;
    }

    const { abu, iso, tabanlik } = user.targets;
    const total = abu + iso + tabanlik;

    return (
        <div className="profile-page">
            <section className="profile-header">
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                {isAdmin && <span className="badge">Admin Görünümü</span>}
            </section>

            <section className="profile-stats">
                <div className="stat-card">
                    <h4>Toplam Hedef</h4>
                    <span>{total}</span>
                </div>

                <div className="stat-card">
                    <h4>Abü</h4>
                    <span>{abu}</span>
                </div>

                <div className="stat-card">
                    <h4>İso</h4>
                    <span>{iso}</span>
                </div>

                <div className="stat-card">
                    <h4>Tabanlık</h4>
                    <span>{tabanlik}</span>
                </div>
            </section>

            <section className="profile-progress">
                <h3>Haftalık / Aylık Gidişat</h3>
                <p style={{ opacity: 0.7 }}>
                    (Şimdilik mock – backend bağlanınca gerçek data)
                </p>

                <div className="progress-placeholder">
                    📈 Grafik alanı
                </div>
            </section>
        </div>
    );
}
