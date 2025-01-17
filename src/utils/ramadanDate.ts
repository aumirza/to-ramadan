import { DateTime } from "luxon";
import { getPrayerTimes } from "./PrayerTime";

export function getRamadanDateTime(coords: GeolocationCoordinates) {
  // date 8 feb assumed
  const ramdaanDate = new Date("2025-02-28");

  const prayerTimes = getPrayerTimes(coords, ramdaanDate);

  // add time to ramdan date
  const ramdaanDatePlus = DateTime.fromJSDate(prayerTimes.maghrib);

  return ramdaanDatePlus;
}
