"use client";

import { useState } from "react";
import { parseEther } from "viem";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";

export const DonateButton = ({ causeId }: { causeId: number }) => {
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const { writeContractAsync: writeGivvestAsync, isPending: isGivvestPending } = useScaffoldWriteContract("Givvest");
  const { writeContractAsync: writeUsdeAsync, isPending: isUsdePending } = useScaffoldWriteContract("USDe");
  const { data: givvestContract } = useDeployedContractInfo("Givvest");

  const handleDonateAmount = async () => {
    if (!amount || !givvestContract?.address) return;

    setIsProcessing(true);
    try {
      const amountInWei = parseEther(amount); // Convert USD to USDe (18 decimals)

      // First approve USDe transfer
      await writeUsdeAsync({
        functionName: "approve",
        args: [givvestContract.address, amountInWei],
      });

      // Then make the donation
      await writeGivvestAsync(
        {
          functionName: "donateToCause",
          args: [amountInWei, BigInt(causeId)],
        },
        {
          onBlockConfirmation: txnReceipt => {
            console.log("📦 Transaction blockHash", txnReceipt.blockHash);
            setIsProcessing(false);
            setAmount("");
          },
        },
      );
    } catch (e) {
      console.error("Error processing donation", e);
      setIsProcessing(false);
    }
  };

  return (
    <div className="mt-8 lg:mt-2 card-actions justify-end">
      <label className="input inline-flex items-center gap-1 max-w-40">
        <span>$</span>
        <input
          type="text"
          placeholder="Enter amount"
          className="input max-w-full placeholder:text-sm"
          onChange={e => setAmount(e.target.value)}
          value={amount}
        />
      </label>
      <button
        className="btn btn-primary"
        onClick={handleDonateAmount}
        disabled={isGivvestPending || isUsdePending || isProcessing}
      >
        {isGivvestPending || isUsdePending || isProcessing ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          "Donate Now"
        )}
      </button>
    </div>
  );
};
