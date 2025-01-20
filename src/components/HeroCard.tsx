const dua: IDua = {
  arabic: "اللَّهُمَّ بَلِّغْنَا رَمَضَانَ",
  transliteration: "Allahumma ballighna Ramadan",
  translation: "O Allah, allow us to reach Ramadan",
};

function HeroCard() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <blockquote className="relative w-full max-w-3xl p-8 text-gray-800 rounded-lg shadow-lg bg-gray-50">
          <svg
            className="absolute top-0 left-0 text-gray-300 transform -translate-x-3 -translate-y-3 size-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M6 10C4.34 10 3 11.34 3 13v3c0 1.66 1.34 3 3 3h3v-6H6zm9 0c-1.66 0-3 1.34-3 3v3c0 1.66 1.34 3 3 3h3v-6h-3z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>

          <p className="text-4xl font-semibold text-center">{dua.arabic}</p>
          <p className="text-lg font-bold text-center">{dua.transliteration}</p>
          <p className="text-lg italic font-light leading-relaxed">
            {dua.translation}
          </p>

          <svg
            className="absolute bottom-0 right-0 text-gray-300 transform translate-x-3 translate-y-3 size-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M6 10C4.34 10 3 11.34 3 13v3c0 1.66 1.34 3 3 3h3v-6H6zm9 0c-1.66 0-3 1.34-3 3v3c0 1.66 1.34 3 3 3h3v-6h-3z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </blockquote>
      </div>
    </div>
  );
}

export default HeroCard;
