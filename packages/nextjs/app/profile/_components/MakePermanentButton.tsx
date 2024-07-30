"use client";

import { useState } from "react";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export const MakePermanentButton = ({ tokenId }: { tokenId: number }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const { writeContractAsync, isPending } = useScaffoldWriteContract("Givvest");

  const makeDonationPermanent = async () => {
    setIsProcessing(true);
    try {
      await writeContractAsync(
        {
          functionName: "makeDonationPermanent",
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
      console.error("Error processing donation", e);
      setIsProcessing(false);
    }
  };

  return (
    <button onClick={makeDonationPermanent} disabled={isPending || isProcessing}>
      Make Permanent
    </button>
  );
};
