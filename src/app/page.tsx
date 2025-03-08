import Time from "./components/Time";
import Weather from "./components/Weather";

export default function Home() {
  return (
    <div className="p-5 max-w-[1280px] mx-auto">
      <nav className="flex items-start justify-between text-center md:text-left mb-10">
        <h2 className="text-2xl tracking-widest font-semibold text-gray-800">
          Skycast
        </h2>
        <Time />
      </nav>
      <Weather />
    </div>
  );
}
