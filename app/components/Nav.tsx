import React from "react";
import { ConnectButton } from "thirdweb/react";
import { client, chain } from "../utils/constant";

function Nav() {
  return (
    <div className="w-full flex justify-between md:px-12 px-2 py-3 items-center">
      <p className="font-bold text-xl">RUNE🚀CLAIM</p>

      <ConnectButton client={client} chain={chain} />
    </div>
  );
}

export default Nav;
