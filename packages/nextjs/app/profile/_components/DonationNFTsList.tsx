"use client";

import { DonationNFT } from "./DonationNFT";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export const DonationNFTsList = () => {
  const { address } = useAccount();
  const {
    data: userTokenCount,
    error,
    isLoading,
  } = useScaffoldReadContract({
    contractName: "Givvest",
    functionName: "balanceOf",
    args: [address],
  });

  console.log({ userTokenCount, error, isLoading });

  return (
    <div className="max-w-7xl overflow-hidden flex gap-8 flex-wrap justify-center">
      {Array.from({ length: Number(userTokenCount) }).map((_, i) => (
        <DonationNFT key={i} tokenId={i} />
      ))}
    </div>
  );
};
