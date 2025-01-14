// import DuaCards from "./DuaCards";
import Header from "./Header";
import Prayers from "./Prayers";
import { TimeTabs } from "./TimeTabs";
import { Toaster } from "./ui/sonner";

function App() {
  return (
    <div className="flex flex-col gap-5 justify-center items-center w-full h-full min-h-screen">
      <Header />
      <div className="flex flex-col gap-5 flex-grow justify-center items-center">
        {/* <DuaCards /> */}
        <TimeTabs />
        <Prayers />
      </div>
      <Toaster />
    </div>
  );
}

export default App;
