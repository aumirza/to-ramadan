import DuaCards from "./DuaCards";
import Header from "./Header";
import Prayers from "./Prayers";
import Rakats from "./Rakats";
import { TimeTabs } from "./TimeTabs";
import { Toaster } from "./ui/sonner";

function App() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-screen gap-10">
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow gap-10">
        <DuaCards />
        <TimeTabs />
        <Prayers />
        <Rakats />
      </div>
      <Toaster />
    </div>
  );
}

export default App;
