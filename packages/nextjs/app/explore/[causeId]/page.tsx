"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { DonateButton } from "./_components/DonateButton";
import type { NextPage } from "next";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

interface CauseMetaData {
  title: string;
  desc: string;
  image: string;
}

const Cause: NextPage<{ params: { causeId: number } }> = ({ params: { causeId } }) => {
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

  return (
    <>
      <div className="hero py-10">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold">{causeMetaData.title}</h1>
          </div>
        </div>
      </div>
      <div className="pb-24">
        <div className="card bg-base-200 shadow-xl m-auto max-w-5xl">
          <figure className="relative w-full h-60 sm:h-[30rem] overflow-hidden">
            <Image src={causeMetaData.image} alt={causeMetaData.title} layout="fill" objectFit="cover" />
          </figure>
          <div className="card-body">
            <div>
              <progress className="progress progress-success mt-2" value={amountRaised} max={amountNeeded}></progress>
              <p className="text-sm">
                {amountRaised}ETH of {amountNeeded}ETH
              </p>
              {amountNeeded === undefined || amountRaised === undefined ? (
                <p className="mt-4 lg:mt-2 text-right">Error fetching amounts</p>
              ) : amountNeeded > amountRaised ? (
                <DonateButton causeId={causeId} />
              ) : (
                <p className="mt-4 lg:mt-2 text-right">Fundraising completed 🎉</p>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4 max-w-5xl m-auto px-4">
          <p className="text-xs opacity-50">Fundraiser: {fundraiser}</p>

          <p className="mt-8">
            {causeMetaData.desc.split("\n").map(para => (
              <>
                {para}
                <br />
              </>
            ))}
          </p>
        </div>
      </div>
    </>
  );
};

export default Cause;
