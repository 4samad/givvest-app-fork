"use client";

import { useState } from "react";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export const ListForRedemptionButton = ({ tokenId }: { tokenId: number }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const { writeContractAsync, isPending } = useScaffoldWriteContract("Givvest");

  const listForRedemption = async () => {
    setIsProcessing(true);
    try {
      await writeContractAsync(
        {
          functionName: "listForRedemption",
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
    <button onClick={listForRedemption} disabled={isPending || isProcessing}>
      List for redemption
    </button>
  );
};
