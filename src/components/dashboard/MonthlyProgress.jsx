import { useEffect, useState } from "react";

export default function MonthlyProgress({ percent }) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        let start = 0;
        const step = () => {
            start += 1;
            if (start <= percent) {
                setValue(start);
                requestAnimationFrame(step);
            }
        };
        step();
    }, [percent]);

    return (
        <div
            className="progress-circle"
            style={{
                background: `conic-gradient(
          #fe5d03 ${value * 3.6}deg,
          var(--bg-main-single) 0deg
        )`,
            }}
        >
            <span>{value}%</span>
        </div>
    );
}
