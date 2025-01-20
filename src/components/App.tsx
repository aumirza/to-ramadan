import DuaCards from "./DuaCards";
import Header from "./Header";
import Prayers from "./Prayers";
import Rakats from "./Rakats";
import TimeTabs from "./TimeTabs";
import { Toaster } from "./ui/sonner";
import Footer from "./Footer";
import StayConnected from "./StayConnected";
import HeroCard from "./HeroCard";
import Permissions from "./Permissions";
import Guidance from "./Guidance";

function App() {
  return (
    <div className="relative flex flex-col items-center h-full min-h-screen gap-10">
      <Header />
      <Permissions />
      <main className="flex flex-col items-center justify-center flex-grow w-11/12 gap-10">
        <HeroCard />
        <TimeTabs />
        <Prayers />
        <Rakats />
        <DuaCards />
        <Guidance />
        <StayConnected />
      </main>
      <Toaster />
      <Footer />
    </div>
  );
}

export default App;
