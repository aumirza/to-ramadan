import { useLocation } from "@/hooks/useLocation";
import { useEffect, useState } from "react";

function Permissions() {
  const [isFetching, setIsFetching] = useState(true);

  const { location, isFetchingLocation } = useLocation();

  useEffect(() => {
    setIsFetching(isFetchingLocation);
  }, [isFetchingLocation]);

  return (
    <>
      {isFetching ? (
        <div className="fixed top-0 left-0 z-30 flex items-center justify-center w-screen h-screen bg-black/80">
          <h2 className="text-2xl text-white">
            Requesting location permission...{" "}
            <span className="animate-pulse">Please wait</span>
          </h2>
        </div>
      ) : (
        ""
      )}
      {!isFetching && !location ? (
        <div className="fixed top-0 left-0 z-30 flex items-center justify-center w-screen h-screen bg-black/80">
          <h2 className="text-2xl text-white">
            Please enable location permission
          </h2>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Permissions;
