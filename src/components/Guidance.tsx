import movieImage from "@/assets/movie.png";
import musicImage from "@/assets/music.png";
import haramRelationShipImage from "@/assets/haram-relation.png";
import backBiteImage from "@/assets/backbiting.png";
import abuseImage from "@/assets/dont-abuse.png";

import quranImage from "@/assets/quran.png";
import tasbeehImage from "@/assets/tasbeeh.png";
import truthImage from "@/assets/truth.png";
import donationImage from "@/assets/donation.png";
import prayerImage from "@/assets/prayer.png";
import fastingImage from "@/assets/fasting.png";

const avoids = [
  {
    title: "Avoid Movies & shows",
    image: movieImage,
  },
  {
    title: "Avoid Music",
    image: musicImage,
  },
  {
    title: "Break Haram Relationship",
    image: haramRelationShipImage,
  },
  {
    title: "Avoid Backbiting",
    image: backBiteImage,
  },
  {
    title: "Avoid Abuse",
    image: abuseImage,
  },
];

const dos = [
  {
    title: "stick to Prayer",
    image: prayerImage,
  },
  {
    title: "Read Quran",
    image: quranImage,
  },
  {
    title: "Tasbeeh",
    image: tasbeehImage,
  },
  {
    title: "Speak Truth",
    image: truthImage,
  },
  {
    title: "Donate to needy",
    image: donationImage,
  },
  {
    title: "Try to Fast",
    image: fastingImage,
  },
];

function GuideCard({ title, image }: { title: string; image: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <img src={image} alt={title} className="size-36" />
      <span className="font-medium">{title}</span>
    </div>
  );
}

function Guidance() {
  return (
    <div className="flex flex-col w-full max-w-5xl gap-2 rounded-xl overflow-clip">
      <div className="p-5 bg-red-200">
        <h3 className="text-xl font-semibold">Avoid</h3>
        <div className="flex flex-wrap justify-center gap-5">
          {avoids.map((avoid, index) => (
            <GuideCard key={index} title={avoid.title} image={avoid.image} />
          ))}
        </div>
      </div>
      <div className="p-5 bg-green-200">
        <h3 className="text-xl font-semibold">Do's</h3>
        <div className="flex flex-wrap justify-center gap-5">
          {dos.map((doItem, index) => (
            <GuideCard key={index} title={doItem.title} image={doItem.image} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Guidance;
