import { duas } from "@/data/duas";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";

function DuaCards() {
  const [api, setApi] = useState<CarouselApi>();

  const [curentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (!api) return;

    setCurrentIndex(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <h3 className="text-xl font-bold text-center md:text-2xl">
        Keep your toungue moist with these duas.
      </h3>
      <Carousel
        opts={{ loop: true, align: "center" }}
        setApi={setApi}
        plugins={[Autoplay()]}
        className="max-w-[90vw]"
      >
        <CarouselContent>
          {duas.map((dua) => (
            <CarouselItem key={dua.transliteration}>
              <div className="flex flex-col items-center gap-2 p-4 my-4 text-center bg-gray-100 rounded-lg text-wrap">
                <div className="text-xl font-bold md:text-2xl">
                  {dua.arabic}
                </div>
                <div className="text-sm">{dua.transliteration}</div>
                <div className="md:text-lg">{dua.translation}</div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="">
        {new Array(duas.length).fill(0).map((_, index) => (
          <span
            key={index}
            className={`inline-block w-2 h-2 mx-1 rounded-full ${
              index + 1 === curentIndex ? "bg-gray-900" : "bg-gray-300"
            }`}
          ></span>
        ))}
      </div>
      {/* <div className="flex gap-2">
        <Button onClick={() => api?.scrollPrev()}>Previous</Button>
        <Button onClick={() => api?.scrollNext()}>Next</Button>
      </div> */}
    </div>
  );
}

export default DuaCards;
