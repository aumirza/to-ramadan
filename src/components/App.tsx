import { useLocation } from "@/hooks/useLocation";
import DuaCards from "./DuaCards";
import Header from "./Header";
import Prayers from "./Prayers";
import Rakats from "./Rakats";
import { TimeTabs } from "./TimeTabs";
import { Toaster } from "./ui/sonner";
import Footer from "./Footer";

function App() {
  const { location, isFetchingLocation } = useLocation();
  return (
    <div className="relative flex flex-col items-center h-full min-h-screen gap-10">
      {!isFetchingLocation && !location ? (
        <div className="fixed top-0 left-0 z-30 flex items-center justify-center w-screen h-screen bg-black/80">
          <h2 className="text-2xl text-white">
            Please allow location access to work.
          </h2>
        </div>
      ) : (
        ""
      )}
      <Header />
      <main className="flex flex-col items-center justify-center flex-grow w-11/12 gap-10">
        <DuaCards />
        <TimeTabs />
        <Prayers />
        <Rakats />
      </main>
      <Toaster />
      <Footer />
    </div>
  );
}

export default App;
