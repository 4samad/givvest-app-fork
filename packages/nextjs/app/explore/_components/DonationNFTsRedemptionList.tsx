"use client";

import { DonationNFT } from "./DonationNFT";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export const DonationNFTsRedemptionList = () => {
  const {
    data: tokenCount,
    error: tokenCountLoadingError,
    isLoading: isTokenCountLoading,
  } = useScaffoldReadContract({
    contractName: "Givvest",
    functionName: "tokenCount",
  });
  console.log({ tokenCount, tokenCountLoadingError, isTokenCountLoading });

  return (
    <div className="max-w-7xl overflow-hidden flex gap-8 flex-wrap justify-center">
      {Array.from({ length: Number(tokenCount) }).map((_, i) => (
        <>
          <DonationNFT key={i} tokenId={i} isForRedemption={true} />
        </>
      ))}
    </div>
  );
};
