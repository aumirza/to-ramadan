import { prayersInDay } from "@/constants/prayers";
import { PrayerTimes } from "adhan";

export function getPrayersLeftBefore(prayerTimes: PrayerTimes) {
  const prayersList = Object.keys(prayersInDay);
  const currentPrayer = prayerTimes.currentPrayer();
  const nextPrayer = prayerTimes.nextPrayer();
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
      [currentPrayer]: prayersInDay[currentPrayer as keyof typeof prayersInDay],
    };
  }
  return prayersleftBefore;
}
