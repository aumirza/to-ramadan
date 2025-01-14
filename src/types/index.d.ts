interface IRakats {
  obligatory: number;
  sunnah: {
    muakkadah?: number;
    nonMuakkadah?: number;
    total: number;
  };
  optional?: number;
  witr?: number;
  total: number;
}
