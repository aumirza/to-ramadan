import { DateTime } from "luxon";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "./useLocation";
import { getRamadanDateTime } from "@/utils/ramadanDate";
import { toast } from "sonner";

type RamadanDateContextType = {
  ramadanDate: DateTime | null;
};

const RamadanDateContext = createContext<RamadanDateContextType | undefined>(
  undefined
);

export const useRamadanDate = () => {
  const context = useContext(RamadanDateContext);
  if (!context) {
    throw new Error("useRamadanDate must be used within a RamadanDateProvider");
  }
  return context;
};

export const RamadanDateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [ramadanDate, setRamadanDate] = useState<DateTime | null>(null);
  const { location } = useLocation();

  useEffect(() => {
    if (!location) return;

    try {
      const ramdanDate = getRamadanDateTime(location);
      setRamadanDate(ramdanDate);
      toast.success("Ramadan date calculated successfully!");
    } catch (error) {
      console.error("Error calculating Ramadan date:", error);
      toast.error("Failed to calculate Ramadan date.");
    } finally {
      toast.dismiss();
    }
  }, [location]);

  return (
    <RamadanDateContext.Provider value={{ ramadanDate }}>
      {children}
    </RamadanDateContext.Provider>
  );
};
