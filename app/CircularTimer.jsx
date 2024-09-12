import { useEffect, useState } from "react";


export default function CircularTimer({initialTime, timeLeft}) {
  const [fillPercentage, setFillPercentage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFillPercentage((initialTime - timeLeft) / initialTime * 100);
    }, 1000);
    return () => clearInterval(timer);
  }, [initialTime, timeLeft]);

  return (
    <div>
      <svg width="200" height="200" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="white" stroke-width="10" />
        <circle cx="50" cy="50" r="45" fill="none" stroke="yellow" stroke-width="10" stroke-dasharray={fillPercentage} />
      </svg>
    </div>
  );
}