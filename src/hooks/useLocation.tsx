import { getLocation } from "@/utils/getLocation";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { toast } from "sonner";

// Define the context type
type LocationContextType = {
  location: GeolocationCoordinates | undefined;
  setLocation: (location: GeolocationCoordinates) => void;
  refreshLocation: () => void;
};

// Create the context with default values
const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

// Custom hook to access the LocationContext
export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};

// LocationProvider component
export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<GeolocationCoordinates>();

  const fetchLocation = async () => {
    try {
      toast.loading("Fetching location...", { duration: 1000 });
      const coords = await getLocation();
      toast.dismiss();
      setLocation(coords);
    } catch (error) {
      toast.error("Failed to fetch location");
      console.error("Error fetching location:", error);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  // Memoize context value
  const value = useMemo(
    () => ({
      location,
      setLocation,
      refreshLocation: fetchLocation, // Expose fetchLocation to consumers
    }),
    [location]
  );

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}
