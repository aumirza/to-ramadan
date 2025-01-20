import { getRamadanDateTime } from "@/utils/ramadanDate";
import { useLocation } from "../hooks/useLocation";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";

function Header() {
  const [ramdaanDate, setRamdaanDate] = useState<DateTime>();
  const { location } = useLocation();

  useEffect(() => {
    if (!location) return;
    const ramdaanDate = getRamadanDateTime(location);
    setRamdaanDate(ramdaanDate);
  }, [location]);

  return (
    <header className="flex flex-col items-center justify-center p-3 mt-5 text-center">
      <h1 className="text-5xl font-bold text-gray-900">Journy To Ramadan</h1>
      <p className="text-xl">Starts at {ramdaanDate?.toFormat("ff")}</p>
    </header>
  );
}

export default Header;
