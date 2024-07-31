"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

interface CauseMetaData {
  title: string;
  desc: string;
  image: string;
}

interface DonationNFTProps {
  tokenId: number;
  selectedTab?: string;
  isForRedemption?: boolean;
}

export const DonationNFT = ({ tokenId, isForRedemption = false }: DonationNFTProps) => {
  const [causeMetaData, setCauseMetaData] = useState<CauseMetaData | null>(null);

  const {
    data: tokenData,
    error: tokenDataLoadingError,
    isLoading: isTokenDataLoading,
  } = useScaffoldReadContract({
    contractName: "Givvest",
    functionName: "donationNFTs",
    args: [BigInt(tokenId)],
  });
  // Returns tokenData as [amount, causeId, listedForRedemption]
  console.log({ tokenData, tokenDataLoadingError, isTokenDataLoading });
  let amount = 0n,
    causeId,
    listedForRedemption;
  if (tokenData) {
    [amount, causeId, listedForRedemption] = tokenData;
    console.log("listedForRedemption: ", listedForRedemption);
  }

  const { data: isPermanent } = useScaffoldReadContract({
    contractName: "Givvest",
    functionName: "isPermanent",
    args: [BigInt(tokenId)],
  });
  console.log("isPermanent", isPermanent);

  const {
    data: causeTokenURI,
    error: causeTokenURILoadingError,
    isLoading: isCauseTokenURILoading,
  } = useScaffoldReadContract({
    contractName: "GivvestCause",
    functionName: "tokenURI",
    args: [causeId ? BigInt(causeId) : undefined],
  });
  console.log({ causeTokenURI, causeTokenURILoadingError, isCauseTokenURILoading });

  useEffect(() => {
    if (causeTokenURI) {
      fetch(causeTokenURI)
        .then(res => res.json())
        .then(data => setCauseMetaData(data))
        .catch(error => console.error("Error fetching metadata:", error));
    }
  }, [causeTokenURI]);

  const [isProcessingDonation, setIsProcessingDonation] = useState(false);

  const { writeContractAsync, isPending } = useScaffoldWriteContract("Givvest");

  const handleDonateAmount = async () => {
    setIsProcessingDonation(true);
    try {
      await writeContractAsync(
        {
          functionName: "donateToDonationNFT",
          args: [BigInt(tokenId)],
          value: amount,
        },
        {
          onBlockConfirmation: txnReceipt => {
            console.log("📦 Transaction blockHash", txnReceipt.blockHash);
            setIsProcessingDonation(false);
          },
        },
      );
    } catch (e) {
      console.error("Error processing donation", e);
      setIsProcessingDonation(false);
    }
  };

  const {
    data: tokenOwner,
    error: tokenOwnerLoadingError,
    isLoading: isTokenOwnerLoading,
  } = useScaffoldReadContract({
    contractName: "Givvest",
    functionName: "ownerOf",
    args: [BigInt(tokenId)],
  });
  console.log(tokenOwner, tokenOwnerLoadingError, isTokenOwnerLoading);

  // Utility function to truncate the description
  const truncateTitle = (desc: string, maxLength = 50) => {
    if (desc.length <= maxLength) return desc;
    return desc.slice(0, maxLength) + "...";
  };

  // Utility function to truncate wallet addresses
  const truncateAddress = (address: string | undefined, startLength = 6, endLength = 4) => {
    if (!address) return "";
    return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
  };

  if (!tokenData || !causeMetaData || !listedForRedemption || !amount) return null;

  return (
    <div className="bg-base-200 p-4 rounded">
      <div
        className="min-h-96 w-56 flex flex-col justify-between gap-4 bg-black p-4"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${causeMetaData.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-xs flex justify-between">
          <div>
            {tokenOwner && (
              <>
                <p>Thank you</p>
                <p className="opacity-80 mt-1">{truncateAddress(tokenOwner)}</p>
              </>
            )}
          </div>
          <div>
            <div className="badge my-1">#{tokenId}</div>
          </div>
        </div>
        <div>
          <h1 className="text-4xl my-1">
            {Number(amount)}ETH{" "}
            {isPermanent && (
              <div className="rounded-full golden-shine my-1 text-amber-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-3 m-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              </div>
            )}
          </h1>
          <div className="flex">
            <p className="mt-1 opacity-80 grow">Donated to {truncateTitle(causeMetaData.title)}</p>
          </div>
        </div>
      </div>
      {isForRedemption && (
        <div className="mt-2 flex justify-end">
          <Link href={`/explore/${causeId}`} className="btn">
            See Cause
          </Link>
          <button className="btn btn-primary" onClick={handleDonateAmount} disabled={isPending || isProcessingDonation}>
            {isPending || isProcessingDonation ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Donate Now"
            )}
          </button>
        </div>
      )}
    </div>
  );
};
