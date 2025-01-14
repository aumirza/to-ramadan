import { CalculationMethod, Coordinates, PrayerTimes } from "adhan";

export function getPrayerTime(location: GeolocationCoordinates, date: Date) {
  const prayerTimes = new PrayerTimes(
    new Coordinates(location.latitude, location.longitude),
    date,
    {
      ...CalculationMethod.Karachi(),
      madhab: "hanafi",
      nightPortions: CalculationMethod.Karachi().nightPortions,
    }
  );

  return prayerTimes;
}
