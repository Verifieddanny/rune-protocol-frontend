"use client";
import {
  TransactionButton,
  useReadContract,
  useActiveAccount,
} from "thirdweb/react";
import { CONTRACT } from "../utils/constant";
import { prepareContractCall, toWei } from "thirdweb";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type EthereumAddress = `0x${string}`;

const isValidAddress = (address: string): address is EthereumAddress => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};
function RuneClaim() {
  const [claimRound, setClaimRound] = useState(0);
  const [amount, setAmount] = useState(0);
  const account: any = useActiveAccount?.();
  const claimAmount = 1000;

  const {
    data: totalSupply,
    isLoading: loadingtotalSupply,
    refetch: totalSupplyFetch,
  } = useReadContract({
    contract: CONTRACT,
    method: "totalSupply",
  });

  const onClaimError = (err: any) => {
    toast(err, {
      position: "top-center",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const onClaim = () => {
    toast("Claim Successful 💰", {
      position: "top-center",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <div className="w-full">
      <div className="flex gap-x-8 items-center w-full">
        <h1 className="text-2xl font-semibold ">Total Supply: </h1>
        {loadingtotalSupply ? (
          <h2 className="text-2xl font-semibold">...</h2>
        ) : (
          <h2 className="text-2xl font-semibold">
            {Number(totalSupply?.toString()) / 10 ** 18} RUNE
          </h2>
        )}
      </div>

      <div className="w-full md:flex-row flex-col gap-y-8 flex mt-6 md:mt-12 md:gap-x-24">
        <div className="w-full">
          <p className="text-center font-semibold mb-3">
            Claim Amount For this round: 1000 RUNE
          </p>

          <TransactionButton
            transaction={() =>
              prepareContractCall({
                contract: CONTRACT,
                method: "claim",
                params: [BigInt(1), toWei(claimAmount.toString())],
                // value: BigInt(toWei(amount.toString())),
              })
            }
            onTransactionConfirmed={onClaim}
            onError={(error: Error) => onClaimError(error.message)}
            style={{
              backgroundColor: "#1e1e1e",
              color: "white",
              fontSize: "0.75rem",
              marginTop: "2rem",
            }}
          >
            Claim
          </TransactionButton>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
export default RuneClaim;
