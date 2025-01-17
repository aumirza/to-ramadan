import { cn } from "@/lib/utils";
import { capitalize } from "@/utils/case";
import { PrayerTimes } from "adhan";
import { DateTime } from "luxon";
import { useCallback, useEffect, useMemo, useState } from "react";

function PrayerCard({
  daysLeft,
  prayer,
  prayerTimes,
}: {
  daysLeft: number;
  prayer: string;
  prayerTimes?: PrayerTimes;
}) {
  const [nextPrayerTime, setNextPrayerTime] = useState<Date | null>(null);
  const [currentPrayerTime, setCurrentPrayerTime] = useState<Date | null>(null);
  const [isCurrent, setIsCurrent] = useState<boolean>(false);
  const [percentage, setPercentage] = useState<number>(0);

  const conicGradient = useMemo(
    () =>
      isCurrent
        ? `conic-gradient(#f3c623 0deg, #f3c623 ${percentage}deg, #fff ${percentage}deg, #fff 360deg)`
        : "",
    [percentage, isCurrent]
  );

  const calculatePercentage = useCallback(() => {
    if (!currentPrayerTime || !nextPrayerTime) return;
    const totalMilliseconds =
      nextPrayerTime.getTime() - currentPrayerTime.getTime();
    const elapsedMilliseconds =
      new Date().getTime() - currentPrayerTime.getTime();
    const timeLeftMilliseconds = totalMilliseconds - elapsedMilliseconds;
    const progress = Math.min(
      Math.max((timeLeftMilliseconds / totalMilliseconds) * 100, 0),
      100
    );
    setPercentage(Math.floor(progress));
  }, [currentPrayerTime, nextPrayerTime]);

  useEffect(() => {
    if (!prayerTimes) return;

    const currentPrayer = prayerTimes.currentPrayer();
    const nextPrayer = prayerTimes.nextPrayer();
    const currentPrayerTime = prayerTimes.timeForPrayer(currentPrayer);
    const nextPrayerTime =
      nextPrayer === "none"
        ? DateTime.fromJSDate(prayerTimes.date)
            .set({ hour: 23, minute: 59 })
            .toJSDate()
        : prayerTimes.timeForPrayer(nextPrayer);

    setCurrentPrayerTime(currentPrayerTime);
    setNextPrayerTime(nextPrayerTime);
    setIsCurrent(currentPrayer === prayer);
  }, [prayer, prayerTimes]);

  useEffect(() => {
    if (!isCurrent) return;

    calculatePercentage(); // Initial calculation
    const intervalId = setInterval(calculatePercentage, 30000);

    return () => clearInterval(intervalId); // Cleanup interval
  }, [isCurrent, calculatePercentage]);

  return (
    <div
      className="flex flex-col items-center justify-center gap-2 p-5 bg-gray-200 rounded shadow"
      aria-label={`Prayer card for ${prayer}`}
    >
      <div
        className={cn(
          "flex justify-center items-center rounded-full shadow size-16",
          !isCurrent ? "bg-green-500" : ""
        )}
        style={
          isCurrent
            ? {
                background: conicGradient,
                transition: "background 0.2s ease",
              }
            : {}
        }
        aria-label={`Progress for ${prayer}`}
      >
        <div
          className="grid text-3xl bg-white rounded-full place-items-center size-14"
          aria-label={`Days left: ${daysLeft}`}
        >
          {daysLeft}
        </div>
      </div>
      <span className="text-lg font-semibold">{capitalize(prayer)}</span>
    </div>
  );
}

export default PrayerCard;
