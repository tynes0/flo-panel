export default function Stats({ tasks }) {
    const calcPercent = (done, target) =>
        target === 0 ? 0 : Math.round((done / target) * 100);

    const abuPct = calcPercent(tasks.abu.done, tasks.abu.target);
    const isoPct = calcPercent(tasks.iso.done, tasks.iso.target);
    const tabPct = calcPercent(tasks.tabanlik.done, tasks.tabanlik.target);

    const generalPct = Math.round(
        (abuPct + isoPct + tabPct) / 3
    );

    return (
        <section className="stats">
            <div className="stat-card">
                <h4>
                    Abü: <span>{tasks.abu.done}/{tasks.abu.target}</span>
                </h4>
                <span>%{abuPct}</span>
            </div>

            <div className="stat-card">
                <h4>
                    İso: <span>{tasks.iso.done}/{tasks.iso.target}</span>
                </h4>
                <span>%{isoPct}</span>
            </div>

            <div className="stat-card">
                <h4>
                    Tabanlık: <span>{tasks.tabanlik.done}/{tasks.tabanlik.target}</span>
                </h4>
                <span>%{tabPct}</span>
            </div>

            <div className="stat-card highlight">
                <h4>Genel Tamamlama</h4>
                <span>%{generalPct}</span>
            </div>
        </section>
    );
}
