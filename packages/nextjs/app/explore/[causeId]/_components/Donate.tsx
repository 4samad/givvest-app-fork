"use client";

import { useState } from "react";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export const Donate = ({ causeId }: { causeId: number }) => {
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const { writeContractAsync, isPending } = useScaffoldWriteContract("Givvest");

  const handleDonateAmount = async () => {
    setIsProcessing(true);
    try {
      await writeContractAsync(
        {
          functionName: "donateToCause",
          args: [BigInt(causeId)],
          value: BigInt(parseInt(amount, 10)),
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
      alert("Transaction Failed");
      setIsProcessing(false);
    }
  };

  return (
    <div className="mt-8 lg:mt-2 card-actions justify-end">
      <label className="input inline-flex items-center gap-1 max-w-40">
        <span>ETH</span>
        <input
          type="text"
          placeholder="Enter amount"
          className="input max-w-full placeholder:text-sm"
          onChange={e => setAmount(e.target.value)}
          value={amount}
        />
      </label>
      <button className="btn btn-primary" onClick={handleDonateAmount} disabled={isPending || isProcessing}>
        {isPending || isProcessing ? <span className="loading loading-spinner loading-sm"></span> : "Donate Now"}
      </button>
    </div>
  );
};
