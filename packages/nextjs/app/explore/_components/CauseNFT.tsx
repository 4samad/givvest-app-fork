"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

interface CauseMetaData {
  title: string;
  desc: string;
  image: string;
}

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

  //causeData refers to the data on chain
  //causeMetaData refers to the data on IPFS

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
    amountNeeded = Number(amountNeeded);
    amountRaised = Number(amountRaised);
  }
  console.log(fundraiser, amountNeeded, amountRaised, isActive);

  const [causeMetaData, setCauseMetaData] = useState<CauseMetaData | null>(null);

  useEffect(() => {
    if (tokenURI) {
      fetch(tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/"))
        .then(res => res.json())
        .then(data => setCauseMetaData(data))
        .catch(error => console.error("Error fetching metadata:", error));
    }
  }, [tokenURI]);

  if (!tokenURI) return null;
  if (!causeMetaData) return null;

  // Utility function to truncate the description
  const truncateDescription = (desc: string, maxLength = 168) => {
    if (desc.length <= maxLength) return desc;
    return desc.slice(0, maxLength) + "...";
  };

  // Utility function to truncate wallet addresses
  const truncateAddress = (address: string | undefined, startLength = 6, endLength = 4) => {
    if (!address) return "";
    return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
  };

  return (
    <div className="card bg-base-200 w-96 shadow-xl">
      <figure className="relative w-full h-60 overflow-hidden">
        <Image
          src={causeMetaData.image.replace("ipfs://", "https://ipfs.io/ipfs/")}
          alt={causeMetaData.title}
          layout="fill"
          objectFit="cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{causeMetaData.title}</h2>
        <p className="text-xs opacity-50">Fundraiser: {truncateAddress(fundraiser)}</p>
        <p>{truncateDescription(causeMetaData.desc)}</p>
        <progress className="progress progress-success mt-2" value={amountRaised} max={amountNeeded}></progress>
        <p className="text-sm">
          {amountRaised}ETH of {amountNeeded}ETH
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Donate Now</button>
        </div>
      </div>
    </div>
  );
};
