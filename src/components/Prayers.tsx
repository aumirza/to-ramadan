import {
  prayersInDay,
  prayersleftAfter,
  rakatsLeftAfter,
  totalRakatsInADay,
} from "@/constants/prayers";
import { DateTime } from "luxon";
import { useLocation } from "../hooks/useLocation";
import { getPrayerTime } from "@/utils/PrayerTime";
import { useRamadanDate } from "../hooks/useRamdanDate";
import { useEffect, useMemo, useState } from "react";
import { capitalize } from "@/utils/case";
import { cn } from "@/lib/utils";
import { calulateRakats } from "@/utils/rakatsCalculator";

function Prayers() {
  const [currentPrayer, setCurrentPrayer] = useState<string>("");

  const [daysLeft, setDaysLeft] = useState<number>(0);

  const [rakatsLeftBefore, setRakatsLeftBefore] = useState<IRakats>();
  const [prayersleftBefore, setPrayersLeftBefore] = useState<
    Partial<typeof prayersInDay>
  >({});

  const { location } = useLocation();
  const { ramadanDate } = useRamadanDate();

  const prayersList = useMemo(() => Object.keys(prayersInDay), []);

  useEffect(() => {
    if (!location) return;
    const prayerTime = getPrayerTime(location, new Date());
    const currentPrayer = prayerTime.currentPrayer();
    const nextPrayer = prayerTime.nextPrayer();
    let prayersleftBefore;
    if (nextPrayer !== "none") {
      const index = prayersList.findIndex((prayer) => prayer === currentPrayer);
      prayersleftBefore = prayersList.slice(index + 1, prayersList.length);
      prayersleftBefore = prayersleftBefore.reduce((acc, curr) => {
        acc[curr as keyof typeof prayersInDay] =
          prayersInDay[curr as keyof typeof prayersInDay];
        return acc;
      }, {} as Partial<typeof prayersInDay>);
    } else {
      prayersleftBefore = {
        [currentPrayer]:
          prayersInDay[currentPrayer as keyof typeof prayersInDay],
      };
    }
    const rakatsLeft = calulateRakats(prayersleftBefore);
    setCurrentPrayer(currentPrayer);
    setRakatsLeftBefore(rakatsLeft);
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
    <div className="flex flex-col gap-10">
      <div className="flex flex-flex-wrap gap-10">
        {Object.keys(prayersInDay).map(
          (prayer, index) =>
            prayer !== "Sunrise" && (
              <div
                key={index}
                className="flex flex-col gap-2 p-5 justify-center items-center bg-gray-200 rounded shadow"
              >
                <div
                  className={cn(
                    "text-3xl rounded-full shadow bg-white p-3 size-16 text-cener border-2 border-green-500",
                    currentPrayer === prayer ? "border-red-500" : ""
                  )}
                >
                  {daysLeft &&
                    daysLeft +
                      Number(
                        Boolean(
                          prayersleftAfter[
                            prayer as keyof typeof prayersleftAfter
                          ]
                        )
                      ) +
                      Number(
                        Boolean(
                          prayersleftBefore[prayer as keyof typeof prayersInDay]
                        )
                      )}
                </div>
                <span className="text-lg font-semibold">
                  {capitalize(prayer)}
                </span>
              </div>
            )
        )}
      </div>
      <div className="text-xl">
        <span>Total Prayers:&nbsp;</span>
        <span>
          {prayersList.length * daysLeft +
            Object.keys(prayersleftAfter).length +
            Object.keys(prayersleftBefore).length}
        </span>
      </div>

      <div className="flex flex-col gap-5 bg-gray-200 p-10 rounded shadow">
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
    </div>
  );
}

export default Prayers;
