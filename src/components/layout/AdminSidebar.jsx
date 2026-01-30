export default function AdminSidebar({ collapsed, onLogout }) {
    return (
        <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
            <div className="logo">
                <strong>{collapsed ? "ADM" : "Admin Panel"}</strong>
            </div>

            <nav>
                <a href="/admin">
                    <i className="fas fa-chart-pie" />
                    {!collapsed && <span>Genel</span>}
                </a>

                <a href="/admin">
                    <i className="fas fa-users" />
                    {!collapsed && <span>Kullanıcılar</span>}
                </a>
            </nav>

            <div className="sidebar-footer">
                <button className="sidebar-logout" onClick={onLogout}>
                    <i className="fas fa-sign-out-alt" />
                    {!collapsed && <span>Çıkış Yap</span>}
                </button>
            </div>
        </aside>
    );
}
