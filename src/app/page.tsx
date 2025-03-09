import Image from "next/image";
import Time from "./components/Time";
import Weather from "./components/Weather";
import icon from "../../public/icon.webp";

export default function Home() {
  return (
    <div className="relative p-5 mx-auto">
      <div className="w-96 h-96 rounded-full bg-gray-200 absolute -top-[150px] -left-[180px] z-0 shadow-2xl">
      </div>
      <nav className="flex items-start justify-between text-center md:text-left mb-10">
        <div className="flex items-center">
          <Image src={icon} alt="icon" width={80}></Image>
          <h2 className="text-2xl tracking-widest font-semibold text-black z-10">
            Skycast
          </h2>
        </div>
        <Time />
      </nav>
      <Weather />
    </div>
  );
}
