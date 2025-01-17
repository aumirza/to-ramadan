export function calulateRakats(prayers: { [key: string]: IRakats }) {
  const rakats: IRakats = {
    obligatory: Object.values(prayers).reduce(
      (acc, curr) => acc + curr.obligatory,
      0
    ),
    optional: Object.values(prayers).reduce(
      (acc, curr) => acc + (curr.optional || 0),
      0
    ),
    sunnah: {
      muakkadah: Object.values(prayers).reduce(
        (acc, curr) => acc + (curr.sunnah.muakkadah || 0),
        0
      ),
      nonMuakkadah: Object.values(prayers).reduce(
        (acc, curr) => acc + (curr.sunnah.nonMuakkadah || 0),
        0
      ),
      total: Object.values(prayers).reduce(
        (acc, curr) => acc + curr.sunnah.total,
        0
      ),
    },
    witr: Object.values(prayers).reduce(
      (acc, curr) => acc + (curr.witr || 0),
      0
    ),
    total: Object.values(prayers).reduce((acc, curr) => acc + curr.total, 0),
  };

  return rakats;
}
