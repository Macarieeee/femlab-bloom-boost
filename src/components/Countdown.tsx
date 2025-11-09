import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CountdownProps {
  targetDate: Date;
  className?: string;
  compact?: boolean;
}

export const Countdown = ({ targetDate, className, compact = false }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (compact) {
    return (
      <div className={cn("inline-flex items-center gap-1 text-sm font-medium", className)}>
        <span className="text-accent">⏰</span>
        <span>
          {timeLeft.days}z {timeLeft.hours}h {timeLeft.minutes}m
        </span>
      </div>
    );
  }

  return (
    <div className={cn("flex gap-3 justify-center", className)}>
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center min-w-[60px]">
          <div className="bg-accent text-accent-foreground rounded-xl px-4 py-3 font-bold text-2xl shadow-soft">
            {String(value).padStart(2, "0")}
          </div>
          <span className="text-xs mt-1 text-muted-foreground uppercase">
            {unit === "days" ? "Zile" : unit === "hours" ? "Ore" : unit === "minutes" ? "Min" : "Sec"}
          </span>
        </div>
      ))}
    </div>
  );
};
