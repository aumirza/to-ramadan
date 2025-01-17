import { useEffect, useMemo, useState } from "react";
import { DateTime } from "luxon";
import { getPrayerTimes } from "@/utils/PrayerTime";
import { prayersInDay, prayersleftAfter } from "@/constants/prayers";
import { useLocation } from "@/hooks/useLocation";
import { useRamadanDate } from "@/hooks/useRamdanDate";
import PrayerCard from "./PrayerCard";
import { PrayerTimes } from "adhan";
import { getPrayersLeftBefore } from "@/utils/prayersLeftBefore";

function Prayers() {
  const [daysLeft, setDaysLeft] = useState<number>(0);
  const [prayersleftBefore, setPrayersLeftBefore] = useState<
    Partial<typeof prayersInDay>
  >({});

  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes>();

  const { location } = useLocation();
  const { ramadanDate } = useRamadanDate();

  const prayersList = useMemo(() => Object.keys(prayersInDay), []);

  useEffect(() => {
    if (!location) return;
    const prayerTimes = getPrayerTimes(location, new Date());
    setPrayerTimes(prayerTimes);
    const prayersleftBefore = getPrayersLeftBefore(prayerTimes);
    setPrayersLeftBefore(prayersleftBefore);
  }, [location, prayersList]);

  useEffect(() => {
    if (!ramadanDate) return;
    setDaysLeft(
      Math.floor(
        ramadanDate.startOf("day").diff(DateTime.now().endOf("day"), "days")
          .days
      )
    );
  }, [ramadanDate]);

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex flex-wrap justify-center gap-5 md:gap-10">
        {Object.keys(prayersInDay).map((prayer, index) => (
          <PrayerCard
            prayerTimes={prayerTimes}
            daysLeft={
              daysLeft
                ? daysLeft +
                  Number(
                    Boolean(
                      prayersleftAfter[prayer as keyof typeof prayersleftAfter]
                    )
                  ) +
                  Number(
                    Boolean(
                      prayersleftBefore[prayer as keyof typeof prayersInDay]
                    )
                  )
                : 0
            }
            prayer={prayer}
            key={index}
          />
        ))}
      </div>

      <div className="text-xl">
        <span>Total Prayers:&nbsp;</span>
        <span>
          {daysLeft
            ? prayersList.length * daysLeft +
              Object.keys(prayersleftAfter).length +
              Object.keys(prayersleftBefore).length
            : 0}
        </span>
      </div>
    </div>
  );
}

export default Prayers;
