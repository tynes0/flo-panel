export default function Sidebar({ collapsed, onLogout }) {
    return (
        <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
            <div className="logo">Panel</div>

            <nav>
                <a href="#"><i className="fas fa-home" /><span>Dashboard</span></a>
                <a href="#"><i className="fas fa-user" /><span>Profil</span></a>
            </nav>

            <div className="logout">
                <a href="#" onClick={onLogout}>
                    <i className="fas fa-right-from-bracket" />
                    <span>Çıkış Yap</span>
                </a>
            </div>
        </aside>
    );
}