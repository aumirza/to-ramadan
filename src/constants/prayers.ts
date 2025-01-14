import { calulateRakats } from "@/utils/rakatsCalculator";

const fajr: IRakats = {
  sunnah: {
    muakkadah: 2,
    total: 2,
  },
  obligatory: 2,
  total: 4,
};

const zuhr: IRakats = {
  sunnah: {
    muakkadah: 4,
    nonMuakkadah: 2,
    total: 6,
  },
  obligatory: 4,
  optional: 2,
  total: 12,
};

const asr: IRakats = {
  sunnah: {
    nonMuakkadah: 4,
    total: 4,
  },
  obligatory: 4,
  total: 8,
};

const maghrib: IRakats = {
  sunnah: {
    muakkadah: 2,
    total: 2,
  },
  obligatory: 3,
  optional: 2,
  total: 7,
};

const isha: IRakats = {
  sunnah: {
    muakkadah: 6,
    total: 6,
  },
  obligatory: 4,
  optional: 4,
  witr: 3,
  total: 17,
};

export const prayersInDay = {
  fajr,
  zuhr,
  asr,
  maghrib,
  isha,
};

export const prayersleftAfter = {
  fajr,
  zuhr,
  asr,
};

export const rakatsLeftAfter: IRakats = calulateRakats(prayersleftAfter);

export const totalRakatsInADay: IRakats = calulateRakats(prayersInDay);
