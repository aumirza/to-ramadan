import { useEffect, useState } from "react";
import { rakatsLeftAfter, totalRakatsInADay } from "@/constants/prayers";
import { useRamadanDate } from "@/hooks/useRamdanDate";
import { DateTime } from "luxon";
import { calulateRakats } from "@/utils/rakatsCalculator";
import { useLocation } from "@/hooks/useLocation";
import { getPrayerTimes } from "@/utils/PrayerTime";
import { getPrayersLeftBefore } from "@/utils/prayersLeftBefore";

function Rakats() {
  const [daysLeft, setDaysLeft] = useState<number>(0);
  const [rakatsLeftBefore, setRakatsLeftBefore] = useState<IRakats | null>(
    null
  );

  const { location } = useLocation();
  const { ramadanDate } = useRamadanDate();

  useEffect(() => {
    if (!location) return;
    const prayerTimes = getPrayerTimes(location, new Date());
    const prayersLeftBefore = getPrayersLeftBefore(prayerTimes);
    const rakatsLeft = calulateRakats(prayersLeftBefore);
    setRakatsLeftBefore(rakatsLeft);
  }, [location]);

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
    <div className="flex flex-col gap-5 p-10 bg-gray-200 rounded shadow">
      <h2 className="text-2xl font-semibold">Prayers</h2>

      <div className="text-lg">
        <div>
          <span> Total rakats: &nbsp;</span>
          {totalRakatsInADay.total * daysLeft +
            rakatsLeftAfter.total +
            (rakatsLeftBefore?.total || 0)}
        </div>
        <div className="">
          <span> Total obligatory rakats: &nbsp;</span>
          {totalRakatsInADay.obligatory * daysLeft +
            rakatsLeftAfter.obligatory +
            (rakatsLeftBefore?.obligatory || 0)}
        </div>
        <div>
          <span> Total Sunnah rakats: &nbsp;</span>
          {totalRakatsInADay.sunnah.total * daysLeft +
            rakatsLeftAfter.sunnah.total +
            (rakatsLeftBefore?.sunnah.total || 0)}
        </div>
      </div>
    </div>
  );
}

export default Rakats;
