/*
"use client";

import { useState } from "react";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export const UnListForRedemptionButton = ({ tokenId }: { tokenId: number }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const { writeContractAsync, isPending } = useScaffoldWriteContract("Givvest");

  const unListForRedemption = async () => {
    setIsProcessing(true);
    try {
      await writeContractAsync(
        {
          functionName: "unListForRedemption",
          args: [BigInt(tokenId)],
        },
        {
          onBlockConfirmation: txnReceipt => {
            console.log("📦 Transaction blockHash", txnReceipt.blockHash);
            setIsProcessing(false);
          },
        },
      );
    } catch (e) {
      console.error("Error processing request", e);
      setIsProcessing(false);
    }
  };

  return (
    <button onClick={unListForRedemption} disabled={isPending || isProcessing}>
      Unlist for redemption
    </button>
  );
};
*/
