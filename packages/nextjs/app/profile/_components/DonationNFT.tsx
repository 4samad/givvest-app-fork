"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ListForRedemptionButton } from "./ListForRedemptionButton";
import { MakePermanentButton } from "./MakePermanentButton";
import { formatEther } from "viem";
// import { UnListForRedemptionButton } from "./UnListForRedemptionButton";
import { useAccount } from "wagmi";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

interface CauseMetaData {
  title: string;
  desc: string;
  image: string;
}

interface DonationNFTProps {
  tokenIndex: number;
  selectedTab: string;
}

export const DonationNFT = ({ tokenIndex, selectedTab }: DonationNFTProps) => {
  const { address } = useAccount();

  const [causeMetaData, setCauseMetaData] = useState<CauseMetaData | null>(null);

  const {
    data: tokenId,
    error: tokenIdLoadingError,
    isLoading: isTokenIdLoading,
  } = useScaffoldReadContract({
    contractName: "Givvest",
    functionName: "tokenOfOwnerByIndex",
    args: [address, BigInt(tokenIndex)],
  });
  // Returns tokenData as [amount, causeId, listedForRedemption]
  console.log({ tokenId, tokenIdLoadingError, isTokenIdLoading });

  const {
    data: tokenData,
    error: tokenDataLoadingError,
    isLoading: isTokenDataLoading,
  } = useScaffoldReadContract({
    contractName: "Givvest",
    functionName: "donationNFTs",
    args: [tokenId ?? undefined],
  });
  // Returns tokenData as [amount, causeId, listedForRedemption]
  console.log({ tokenData, tokenDataLoadingError, isTokenDataLoading });
  let amount, causeId, listedForRedemption;
  if (tokenData) {
    [amount, causeId, listedForRedemption] = tokenData;
    amount = formatEther(amount);
    console.log("listedForRedemption: ", listedForRedemption);
  }

  const { data: isPermanent } = useScaffoldReadContract({
    contractName: "Givvest",
    functionName: "isPermanent",
    args: [tokenId ?? undefined],
  });
  console.log("isPermanent", isPermanent);

  const {
    data: causeTokenURI,
    error: causeTokenURILoadingError,
    isLoading: isCauseTokenURILoading,
  } = useScaffoldReadContract({
    contractName: "GivvestCause",
    functionName: "tokenURI",
    args: [causeId ?? undefined],
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

  // Utility function to truncate the description
  const truncateTitle = (desc: string, maxLength = 46) => {
    if (desc.length <= maxLength) return desc;
    return desc.slice(0, maxLength) + "...";
  };

  // Utility function to truncate wallet addresses
  const truncateAddress = (address: string | undefined, startLength = 6, endLength = 4) => {
    if (!address) return "";
    return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
  };

  if (!tokenData || !causeMetaData) return null;

  // Filter logic based on selected tab
  if (
    (selectedTab === "Listed" && !listedForRedemption) ||
    (selectedTab === "Unlisted" && (listedForRedemption || isPermanent)) ||
    (selectedTab === "Permanent" && !isPermanent) ||
    !amount
  ) {
    return null;
  }

  return (
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
          <p>Thank you</p>
          <p className="opacity-80 mt-1">{truncateAddress(address)}</p>
        </div>
        <div>
          <div className="badge my-1">#{Number(tokenId)}</div>
        </div>
      </div>
      <div>
        <h1 className="text-4xl my-1">
          ${amount}{" "}
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
        {listedForRedemption && <div className="badge badge-primary my-1 text-xs">Listed for redemption</div>}
        <div className="flex">
          <p className="mt-1 opacity-80 grow">Donated to {truncateTitle(causeMetaData.title)}</p>
          <div className="dropdown dropdown-top dropdown-end self-end flex -mr-2">
            <EllipsisVerticalIcon
              tabIndex={0}
              role="button"
              className="h-8 rounded-full hover:bg-[rgba(255,255,255,0.06)]"
            />
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              {!(isPermanent || listedForRedemption) && (
                <>
                  <li>
                    <MakePermanentButton tokenId={Number(tokenId)} />
                  </li>
                  <li>
                    <ListForRedemptionButton tokenId={Number(tokenId)} />
                  </li>
                </>
              )}
              {/*
                listedForRedemption && (
                  <li>
                    <UnListForRedemptionButton tokenId={tokenId} />
                  </li>
                )
              */}
              <li>
                <Link href={`/explore/${causeId}`}>See the cause</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
