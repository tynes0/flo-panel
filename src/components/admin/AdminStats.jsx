import { useMemo } from "react";

export default function AdminStats({ users }) {
    const stats = useMemo(() => {
        if (!Array.isArray(users)) return null;
        
        if (!users.length) {
            return {
                totalUsers: 0,
                avgCompletion: 0,
                avgTargets: { abu: 0, iso: 0, tabanlik: 0 },
            };
        }

        let totalAbu = 0;
        let totalIso = 0;
        let totalTabanlik = 0;


        users.forEach((user) => {
            const targets = user.targets ?? {};

            totalAbu += targets.abu ?? 0;
            totalIso += targets.iso ?? 0;
            totalTabanlik += targets.tabanlik ?? 0;
        });

        const avgTargets = {
            abu: Math.round(totalAbu / users.length),
            iso: Math.round(totalIso / users.length),
            tabanlik: Math.round(totalTabanlik / users.length),
        };

        const avgCompletion =
            avgTargets.abu + avgTargets.iso + avgTargets.tabanlik;

        console.log(users);
        return {
            totalUsers: users.filter(u => u.role === "user").length,
            avgCompletion,
            avgTargets,
        };
    }, [users]);

    return (
        <section className="dash-grid">
            <div className="card">
                <h3>Toplam Kullanıcı</h3>
                <strong style={{ fontSize: 32 }}>{stats.totalUsers}</strong>
            </div>

            <div className="card">
                <h3>Ortalama Hedef</h3>
                <strong style={{ fontSize: 32 }}>
                    {stats.avgCompletion}
                </strong>
            </div>

            <div className="card">
                <h3>Görev Ortalamaları</h3>
                <ul className="list">
                    <li>Abü: {stats.avgTargets.abu}</li>
                    <li>İso: {stats.avgTargets.iso}</li>
                    <li>Tabanlık: {stats.avgTargets.tabanlik}</li>
                </ul>
            </div>
        </section>
    );
}
