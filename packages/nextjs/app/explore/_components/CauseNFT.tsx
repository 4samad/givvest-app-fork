"use client";

import Image from "next/image";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export const CauseNFT = ({ causeId }: { causeId: number }) => {
  const {
    data: tokenURI,
    error: tokenURILoadingError,
    isLoading: isTokenURILoading,
  } = useScaffoldReadContract({
    contractName: "GivvestCause",
    functionName: "tokenURI",
    args: [BigInt(causeId)],
  });
  console.log({ tokenURI, tokenURILoadingError, isTokenURILoading });

  const {
    data: causeData,
    error: causeDataLoadingError,
    isLoading: isCauseDataLoading,
  } = useScaffoldReadContract({
    contractName: "GivvestCause",
    functionName: "causes",
    args: [BigInt(causeId)],
  });
  // Returns causeData as [fundraiser, amountNeeded + "n", amountRaised + "n", isActive]
  console.log({ causeData, causeDataLoadingError, isCauseDataLoading });
  let fundraiser, amountNeeded, amountRaised, isActive;
  if (causeData) {
    [fundraiser, amountNeeded, amountRaised, isActive] = causeData;
  }
  console.log(fundraiser, amountNeeded, amountRaised, isActive);

  return (
    <div className="card bg-base-200 w-96 shadow-xl">
      <figure>
        <Image width={400} height={240} src="https://i.imgur.com/MfK4cVF.jpeg" alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Example Cause</h2>
        <p>{tokenURI}</p>
        <p className="text-xs">fundraiser: {fundraiser}</p>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <progress
          className="progress progress-success mt-2"
          value={Number(amountRaised)}
          max={Number(amountNeeded)}
        ></progress>
        <p className="text-sm">{Number(amountRaised)}ETH of {Number(amountNeeded)}ETH</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Donate Now</button>
        </div>
      </div>
    </div>
  );
};
