import { CalculationMethod, Coordinates, PrayerTimes } from "adhan";
import { DateTime } from "luxon";

//memoise date and location
const prayerTimesCache = new Map<string, PrayerTimes>();

export function getPrayerTimes(location: GeolocationCoordinates, date: Date) {
  const key = `${location.latitude},${location.longitude},${DateTime.fromJSDate(
    date
  ).set({ hour: 0, minute: 0, second: 0, millisecond: 0 })}`;

  if (prayerTimesCache.has(key)) {
    return prayerTimesCache.get(key) as PrayerTimes;
  }

  const prayerTimes = new PrayerTimes(
    new Coordinates(location.latitude, location.longitude),
    date,
    {
      ...CalculationMethod.Karachi(),
      madhab: "hanafi",
      nightPortions: CalculationMethod.Karachi().nightPortions,
    }
  );

  prayerTimesCache.set(key, prayerTimes);

  return prayerTimes;
}
