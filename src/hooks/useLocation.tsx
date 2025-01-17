import { getLocation } from "@/utils/getLocation";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
  useCallback,
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
    const storedLocation = localStorage.getItem("location");
    if (storedLocation) {
      setLocation(JSON.parse(storedLocation));
      return;
    }
    try {
      toast.loading("Fetching location...", { duration: 1000 });
      const coords = await getLocation();
      toast.dismiss();
      setLocation(coords);
      localStorage.setItem("location", JSON.stringify(coords));
    } catch (error) {
      toast.error("Failed to fetch location");
      console.error("Error fetching location:", error);
    }
  };

  const refreshLocation = useCallback(() => {
    localStorage.removeItem("location");
    fetchLocation();
  }, []);

  useEffect(() => {
    fetchLocation();
  }, []);

  // Memoize context value
  const value = useMemo(
    () => ({
      location,
      setLocation,
      refreshLocation, // Expose fetchLocation to consumers
    }),
    [location, refreshLocation]
  );

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}
