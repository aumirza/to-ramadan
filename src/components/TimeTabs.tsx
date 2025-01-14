import { useEffect, useState } from "react";
import Digits from "./Digits";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { DateTime } from "luxon";
import { useRamadanDate } from "../hooks/useRamdanDate";

export const TimeTabs = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const { ramadanDate } = useRamadanDate();

  useEffect(() => {
    if (!ramadanDate) return;
    setDays(
      Math.floor(
        ramadanDate.startOf("day").diff(DateTime.now().endOf("day"), "days")
          .days
      )
    );
    setHours(ramadanDate.diffNow("hours").hours);
    setMinutes(ramadanDate.diffNow("minutes").minutes);
    setSeconds(ramadanDate.diffNow("seconds").seconds);

    const interval = setInterval(() => {
      setHours(ramadanDate.diffNow("hours").hours);
      setMinutes(ramadanDate.diffNow("minutes").minutes);
      setSeconds(ramadanDate.diffNow("seconds").seconds);
    }, 1000);

    return () => clearInterval(interval);
  }, [ramadanDate]);

  return (
    <Tabs defaultValue="days">
      <TabsContent value="days">
        <Digits number={days} />
        <span className="text-lg font-semibold"> Days to ramdaan</span>
      </TabsContent>
      <TabsContent value="hours">
        <Digits number={Math.floor(hours)} />
        <span className="text-lg font-semibold"> Hours to ramdaan</span>
      </TabsContent>
      <TabsContent value="minutes">
        <Digits number={Math.floor(minutes)} />
        <span className="text-lg font-semibold"> Minutes to ramdaan</span>
      </TabsContent>
      <TabsContent value="seconds">
        <Digits number={Math.floor(seconds)} />
        <span className="text-lg font-semibold"> Seconds to ramdaan</span>
      </TabsContent>
      <TabsList>
        <TabsTrigger value="days">Days</TabsTrigger>
        <TabsTrigger value="hours">Hours</TabsTrigger>
        <TabsTrigger value="minutes">minutes</TabsTrigger>
        <TabsTrigger value="seconds">seconds</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
