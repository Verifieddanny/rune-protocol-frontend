import Image from "next/image";
import Login from "./components/Login";

export default function Home() {
  return (
    <main className="h-screen w-full md:px-24 px-4">
      <Login />
    </main>
  );
}
