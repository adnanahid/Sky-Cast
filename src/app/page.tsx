import Image from "next/image";
import Time from "./components/Time";
import Weather from "./components/Weather";
import icon from "../../public/icon.webp";

export default function Home() {
  return (
    <div className="p-5 max-w-[1280px] mx-auto">
      <nav className="flex items-start justify-between text-center md:text-left mb-10">
        <div className="flex items-center">
          <Image src={icon} alt="icon" width={80}></Image>
          <h2 className="text-2xl tracking-widest font-semibold text-white">
            Skycast
          </h2>
        </div>
        <Time />
      </nav>
      <Weather />
    </div>
  );
}
