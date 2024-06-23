import { TransactionButton, useReadContract } from "thirdweb/react";
import { CONTRACT } from "../utils/constant";
import { prepareContractCall, toWei } from "thirdweb";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type EthereumAddress = `0x${string}`;
function RuneClaim() {
  const [fee, setFee] = useState(0);
  const [settingFee, setSettingFee] = useState(0);
  const [round, setRound] = useState(0);
  const [claimRound, setClaimRound] = useState(0);
  const [settingRound, setSettingRound] = useState(0);
  const [addresses, setAddresses] = useState<string[]>([]);
  const [deleteRound, setDeleteRound] = useState(0);
  const [deleteAddress, setDeleteAddress] = useState("");
  const [amount, setAmount] = useState(0);

  const isValidAddress = (address: string): address is EthereumAddress => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const handleAddressesChange = (input: string) => {
    const inputAddresses = input.split(",").map((a) => a.trim());
    const validAddresses = inputAddresses.filter(
      isValidAddress
    ) as EthereumAddress[];
    setAddresses(validAddresses);
  };

  const {
    data: totalSupply,
    isLoading: loadingtotalSupply,
    refetch: totalSupplyFetch,
  } = useReadContract({
    contract: CONTRACT,
    method: "totalSupply",
  });

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
        <div className="md:w-1/2 w-full">
          <p className="text-center font-semibold mb-3">
            Create Whitelist Round (OnlyOwner)
          </p>
          <label className="text-left " htmlFor="fee">
            Fee:
          </label>
          <input
            type="number"
            name="fee"
            id="fee"
            step={0.01}
            value={fee}
            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-6"
            placeholder="0.00"
            onChange={(e) => setFee(Number(e.target.value))}
          />
          {fee > 0 && (
            <TransactionButton
              transaction={() =>
                prepareContractCall({
                  contract: CONTRACT,
                  method: "createWhitelistRound",
                  params: [toWei(fee.toString())],
                })
              }
              //   onTransactionConfirmed={onPurchase}
              onError={(error: Error) => console.log(error.message)}
              style={{
                backgroundColor: "#1e1e1e",
                color: "white",
                fontSize: "0.75rem",
                marginBottom: "2rem",
              }}
            >
              Create Round
            </TransactionButton>
          )}
        </div>

        <div className="md:w-1/2 w-full">
          <p className="text-center font-semibold mb-3">Add to Whitelist</p>
          <div className="w-full flex gap-x-8">
            <div className="w-full">
              <label className="text-left " htmlFor="round">
                Whitelist Round:
              </label>
              <input
                type="number"
                name="round"
                id="round"
                step={1}
                value={round}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-6"
                placeholder="Enter The Round Number"
                onChange={(e) => setRound(Number(e.target.value))}
              />
            </div>
            <div className="w-full">
              <label className="text-left " htmlFor="addresses">
                Addreses:
              </label>
              <input
                type="text"
                name="addresses"
                id="addresses"
                value={addresses.join(", ")}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-6"
                placeholder="enter addresses. Ex : 0x... , 0x..."
                onChange={(e) => handleAddressesChange(e.target.value)}
              />
            </div>
          </div>
          {round > 0 && (
            <TransactionButton
              transaction={() =>
                prepareContractCall({
                  contract: CONTRACT,
                  method: "addToWhitelist",
                  params: [BigInt(round), addresses],
                })
              }
              //   onTransactionConfirmed={onPurchase}
              onError={(error: Error) => console.log(error.message)}
              style={{
                backgroundColor: "#1e1e1e",
                color: "white",
                fontSize: "0.75rem",
                marginBottom: "2rem",
              }}
            >
              Add
            </TransactionButton>
          )}
        </div>
      </div>

      <div className="w-full md:flex-row flex-col gap-y-8 flex mt-6 md:mt-12 md:gap-x-24">
        <div className="md:w-1/2 w-full">
          <p className="text-center font-semibold mb-3">
            Remove from Whitelist (OnlyOwner)
          </p>
          <div className="w-full flex gap-x-8">
            <div className="w-full">
              <label className="text-left " htmlFor="delete-round">
                Whitelist Round:
              </label>
              <input
                type="number"
                name="delete-round"
                id="delete-round"
                step={1}
                value={deleteRound}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-6"
                placeholder="Enter The Round Number"
                onChange={(e) => setDeleteRound(Number(e.target.value))}
              />
            </div>
            <div className="w-full">
              <label className="text-left " htmlFor="addresses">
                Address:
              </label>
              <input
                type="text"
                name="addresses"
                id="addresses"
                value={deleteAddress}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-6"
                placeholder="Enter The Address to be deleted"
                onChange={(e) => setDeleteAddress(e.target.value)}
              />
            </div>
          </div>
          {deleteRound > 0 && (
            <TransactionButton
              transaction={() =>
                prepareContractCall({
                  contract: CONTRACT,
                  method: "removeFromWhitelist",
                  params: [BigInt(deleteRound), deleteAddress],
                })
              }
              //   onTransactionConfirmed={onPurchase}
              onError={(error: Error) => console.log(error.message)}
              style={{
                backgroundColor: "#1e1e1e",
                color: "white",
                fontSize: "0.75rem",
                marginBottom: "2rem",
              }}
            >
              Remove
            </TransactionButton>
          )}
        </div>

        <div className="md:w-1/2 w-full">
          <p className="text-center font-semibold mb-3">
            Renounce Ownership (OnlyOwner) :
          </p>
          <TransactionButton
            transaction={() =>
              prepareContractCall({
                contract: CONTRACT,
                method: "renounceOwnership",
              })
            }
            //   onTransactionConfirmed={onPurchase}
            onError={(error: Error) => console.log(error.message)}
            style={{
              backgroundColor: "#1e1e1e",
              color: "white",
              fontSize: "0.75rem",
              marginBottom: "2rem",
            }}
          >
            Renounce
          </TransactionButton>
        </div>
      </div>

      <div className="w-full md:flex-row flex-col gap-y-8 flex mt-6 md:mt-12 md:gap-x-24">
        <div className="md:w-1/2 w-full">
          <p className="text-center font-semibold mb-3">
            Set Service fee (OnlyOwner)
          </p>
          <div className="w-full flex gap-x-8 items-center">
            <div className="w-full">
              <label className="text-left " htmlFor="round">
                Whitelist Round:
              </label>
              <input
                type="number"
                name="round"
                id="round"
                step={1}
                value={settingRound}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-6"
                placeholder="Enter The Round Number"
                onChange={(e) => setSettingRound(Number(e.target.value))}
              />
            </div>
            <div className="w-full">
              <label className="text-left " htmlFor="fee">
                Fee:
              </label>
              <input
                type="number"
                name="fee"
                id="fee"
                step={0.01}
                value={settingFee}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-6"
                placeholder="0.00"
                onChange={(e) => setSettingFee(Number(e.target.value))}
              />
            </div>

            <TransactionButton
              className="m-0"
              transaction={() =>
                prepareContractCall({
                  contract: CONTRACT,
                  method: "removeFromWhitelist",
                  params: [BigInt(settingRound), settingFee.toString()],
                })
              }
              //   onTransactionConfirmed={onPurchase}
              onError={(error: Error) => console.log(error.message)}
              style={{
                backgroundColor: "#1e1e1e",
                color: "white",
                fontSize: "0.75rem",
              }}
            >
              Set
            </TransactionButton>
          </div>
        </div>
        <div className="md:w-1/2 w-full">
          <p className="text-center font-semibold mb-3">Claim</p>

          <label className="text-left " htmlFor="fee">
            Round:
          </label>
          <input
            type="number"
            name="fee"
            id="fee"
            step={1}
            value={claimRound}
            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-6"
            placeholder="0.00"
            onChange={(e) => setClaimRound(Number(e.target.value))}
          />
          <label className="text-left mt-8" htmlFor="claim">
            Claim Amount:
          </label>
          <input
            type="number"
            name="claim"
            id="claim"
            step={0.01}
            value={amount}
            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="0.00"
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <TransactionButton
            transaction={() =>
              prepareContractCall({
                contract: CONTRACT,
                method: "claim",
                params: [BigInt(claimRound), toWei(amount.toString())],
                // value: BigInt(toWei(amount.toString())),
              })
            }
            // onTransactionConfirmed={onPurchase}
            onError={(error: Error) => console.log(error.message)}
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
    </div>
  );
}

export default RuneClaim;
