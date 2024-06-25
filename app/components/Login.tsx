"use client";
import { useActiveAccount } from "thirdweb/react";
// import { client, chain } from "../utils/constant";
import RuneClaim from "./RuneClaim";
// import Auction from "./Auction";

function Login() {
  const account: any = useActiveAccount?.();

  return (
    <div className="w-full h-screen">
      {account != undefined ? (
        <div className="text-center">
          <RuneClaim />
        </div>
      ) : (
        <div className="text-center w-full h-full flex justify-center items-center">
          <h1 className="md:text-3xl text-xl font-bold">
            Please connect your wallet to claim your RUNE
          </h1>
        </div>
      )}
    </div>
  );
}

export default Login;
