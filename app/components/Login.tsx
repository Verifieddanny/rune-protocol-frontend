"use client";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client, chain } from "../utils/constant";
import RuneClaim from "./RuneClaim";
// import Auction from "./Auction";

function Login() {
  const account: any = useActiveAccount?.();
  console.log(account);
  return (
    <div className="w-full h-screen">
      {account != undefined ? (
        <div className="text-center">
          <div className="w-full flex justify-between md:px-12 px-2 py-3 items-center">
            <p className="font-bold text-xl">RUNE🚀CLAIM</p>

            <ConnectButton client={client} chain={chain} />
          </div>
          <RuneClaim />
          {/* <Auction /> */}
        </div>
      ) : (
        <div className="text-center w-full h-full flex justify-center items-center">
          <ConnectButton client={client} chain={chain} />
        </div>
      )}
    </div>
  );
}

export default Login;
