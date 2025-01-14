function Digits({ number }: { number: number }) {
  const digits = number
    .toString()
    .split("")
    .map((digit) => parseInt(digit));
  return (
    <div className="flex gap-1">
      {digits.map((digit, index) => {
        return (
          <div key={index} className="bg-gray-200 p-3 text-5xl rounded">
            {digit}
          </div>
        );
      })}
    </div>
  );
}

export default Digits;
