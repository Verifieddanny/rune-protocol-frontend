import Image from "next/image";
import Login from "./components/Login";
import Nav from "./components/Nav";

export default function Home() {
  return (
    <main className="h-screen w-full md:px-24 px-4">
      <Nav />
      <Login />
    </main>
  );
}
