import Weather from "./components/Weather";

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-300">SkyCast</h1>
      <Weather></Weather>
    </div>
  );
}
