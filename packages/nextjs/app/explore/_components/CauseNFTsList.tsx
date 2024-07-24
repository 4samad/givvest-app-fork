"use client";

import { CauseNFT } from "./CauseNFT";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export const CauseNFTsList = () => {
  const {
    data: tokenCount,
    error: tokenCountLoadingError,
    isLoading: isTokenCountLoading,
  } = useScaffoldReadContract({
    contractName: "GivvestCause",
    functionName: "tokenCount",
  });
  console.log({ tokenCount, tokenCountLoadingError, isTokenCountLoading });

  return (
    <div className="max-w-7xl flex gap-8 flex-wrap justify-center">
      {Array.from({ length: Number(tokenCount) }).map((_, i) => (
        <CauseNFT key={i} causeId={i} />
      ))}
    </div>
  );
};
