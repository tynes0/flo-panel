import { useState, useMemo } from "react";
import Sidebar from "../components/layout/Sidebar";
import { useTheme } from "../hooks/useTheme";

import Stats from "../components/dashboard/Stats";
import WeeklyChart from "../components/dashboard/WeeklyChart";
import MonthlyProgress from "../components/dashboard/MonthlyProgress";
import AddTaskModal from "../components/dashboard/AddTaskModal";

import { weeklyData } from "../data/weeklyData";

export default function Dashboard({ user, onLogout }) {
    /* ----------------------------------
       UI STATE
    ---------------------------------- */
    const [collapsed, setCollapsed] = useState(false);
    const { toggleTheme } = useTheme();

    /* ----------------------------------
       TASK STATE (tek source of truth)
    ---------------------------------- */
    const [tasks, setTasks] = useState({
        abu: { done: 6, target: 8 },
        iso: { done: 4, target: 10 },
        tabanlik: { done: 9, target: 12 },
    });

    /* ----------------------------------
       MODAL STATE
    ---------------------------------- */
    const [modalOpen, setModalOpen] = useState(false);
    const [activeTask, setActiveTask] = useState(null);

    /* ----------------------------------
       TASK ADD HANDLER
    ---------------------------------- */
    // Dashboard.jsx içinde handleAdd fonksiyonunu güncelleme
    async function handleAdd(taskKey, amount) {
        try {
            const response = await fetch(`http://localhost:5000/api/users/${user._id}/progress`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ taskKey, amount })
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setTasks({
                    abu: { done: updatedUser.progress.abu, target: updatedUser.targets.abu },
                    iso: { done: updatedUser.progress.iso, target: updatedUser.targets.iso },
                    tabanlik: { done: updatedUser.progress.tabanlik, target: updatedUser.targets.tabanlik },
                });
            }
        } catch (error) {
            console.error("Veri kaydedilemedi:", error);
        }
    }

    /* ----------------------------------
       MONTHLY PERCENT (auto calc)
    ---------------------------------- */
    const monthlyPercent = useMemo(() => {
        const values = Object.values(tasks);

        const totalDone = values.reduce((s, t) => s + t.done, 0);
        const totalTarget = values.reduce((s, t) => s + t.target, 0);

        return totalTarget === 0
            ? 0
            : Math.round((totalDone / totalTarget) * 100);
    }, [tasks]);

    /* ----------------------------------
       RENDER
    ---------------------------------- */
    return (
        <>
            {/* GLOBAL BUTTONS */}
            <button
                className="menu-btn"
                onClick={() => setCollapsed((c) => !c)}
            >
                <i className="fas fa-bars" />
            </button>

            <button className="glob-dark-mode-btn" onClick={toggleTheme}>
                <i className="fas fa-moon" />
            </button>

            {/* SIDEBAR */}
            <Sidebar collapsed={collapsed} onLogout={onLogout} />

            {/* CONTENT */}
            <main className={`content-dashboard ${collapsed ? "narrow" : ""}`}>
                {/* HEADER */}
                <section className="dash-header">
                    <h2>Hoşgeldin {user.name} 👋</h2>
                    <p>İşte günlük hedeflerin</p>
                </section>

                {/* STATS */}
                <Stats tasks={tasks} />

                {/* GRID */}
                <section className="dash-grid">
                    {/* WEEKLY CHART */}
                    <div className="card large">
                        <h3>Haftalık Performans</h3>
                        <WeeklyChart data={weeklyData} />
                    </div>

                    {/* ADD TASK */}
                    <div className="card">
                        <h3>Ekle</h3>
                        <ul className="list">
                            <li>
                                <a
                                    href="#"
                                    onClick={() => {
                                        setActiveTask("abu");
                                        setModalOpen(true);
                                    }}
                                >
                                    <i className="fas fa-arrow-right" />
                                    <span>Abü</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    onClick={() => {
                                        setActiveTask("iso");
                                        setModalOpen(true);
                                    }}
                                >
                                    <i className="fas fa-arrow-right" />
                                    <span>İso</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    onClick={() => {
                                        setActiveTask("tabanlik");
                                        setModalOpen(true);
                                    }}
                                >
                                    <i className="fas fa-arrow-right" />
                                    <span>Tabanlık</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* MONTHLY */}
                    <div className="card">
                        <h3>Aylık Tamamlanma</h3>
                        <MonthlyProgress percent={monthlyPercent} />
                    </div>
                </section>
            </main>

            {/* ADD TASK MODAL */}
            <AddTaskModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                taskKey={activeTask}
                taskName={
                    activeTask === "abu"
                        ? "Abü"
                        : activeTask === "iso"
                            ? "İso"
                            : "Tabanlık"
                }
                onAdd={handleAdd}
            />
        </>
    );
}
