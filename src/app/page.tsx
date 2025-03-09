import Time from "./components/Time";
import Weather from "./components/Weather";

export default function Home() {
  return (
    <div className="relative p-5 mx-auto">
      <div className="w-48 h-48 sm:w-96 sm:h-96 rounded-full bg-gray-300 absolute -top-16 -left-16 sm:-top-[150px] sm:-left-[180px] z-0 shadow-[0px_0px_30px_10px_rgba(255,255,255,0.5)]"></div>

      <nav className="flex items-start justify-between text-center md:text-left mb-10">
        <div className="flex items-center">
          {/* <Image src={icon} alt="icon" width={80} className="h"></Image> */}
          <h2 className="text-xl sm:text-2xl tracking-widest font-semibold text-black z-10">
            Skycast
          </h2>
        </div>
        <Time />
      </nav>
      <Weather/>
    </div>
  );
}
