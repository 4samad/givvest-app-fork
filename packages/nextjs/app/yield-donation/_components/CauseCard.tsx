import { useEffect, useState } from "react";
import Image from "next/image";
import { formatEther } from "viem";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

interface CauseCardProps {
  causeId: number;
  onSelect: (id: number) => void;
  selectedCauseId: string;
}

export const CauseCard = ({ causeId, onSelect, selectedCauseId }: CauseCardProps) => {
  const { data: tokenURI, isLoading: isTokenURILoading } = useScaffoldReadContract({
    contractName: "GivvestCause",
    functionName: "tokenURI",
    args: [BigInt(causeId)],
  });

  const { data: causeData, isLoading: isCauseDataLoading } = useScaffoldReadContract({
    contractName: "GivvestCause",
    functionName: "causes",
    args: [BigInt(causeId)],
  });

  const [causeMetaData, setCauseMetaData] = useState<{
    title: string;
    desc: string;
    image: string;
  } | null>(null);

  useEffect(() => {
    if (tokenURI) {
      fetch(tokenURI)
        .then(res => res.json())
        .then(data => setCauseMetaData(data))
        .catch(error => console.error("Error fetching metadata:", error));
    }
  }, [tokenURI]);

  if (!tokenURI) return null;
  if (!causeMetaData) return null;

  if (isTokenURILoading || isCauseDataLoading) {
    return <div className="card bg-base-200 w-96 shadow-xl animate-pulse" />;
  }

  let fundraiser, amountNeeded, amountRaised;
  if (causeData) {
    [fundraiser, amountNeeded, amountRaised] = causeData;
    amountNeeded = formatEther(amountNeeded);
    amountRaised = formatEther(amountRaised);
  }

  const isSelected = selectedCauseId === causeId.toString();

  return (
    <div className={`card bg-base-200 w-96 shadow-xl ${isSelected ? "ring-2 ring-primary" : ""}`}>
      <figure className="relative w-full h-60 overflow-hidden">
        <Image src={causeMetaData.image} alt={causeMetaData.title} layout="fill" objectFit="cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{causeMetaData.title}</h2>
        <p className="text-xs opacity-50">Fundraiser: {`${fundraiser?.slice(0, 6)}...${fundraiser?.slice(-4)}`}</p>
        <p>{causeMetaData.desc.length > 168 ? `${causeMetaData.desc.slice(0, 168)}...` : causeMetaData.desc}</p>
        <progress className="progress progress-success mt-2" value={amountRaised} max={amountNeeded} />
        <p className="text-sm">
          ${amountRaised} of ${amountNeeded}
        </p>
        <div className="card-actions justify-end">
          <button className={`btn ${isSelected ? "btn-neutral" : "btn-primary"}`} onClick={() => onSelect(causeId)}>
            {isSelected ? "Selected" : "Select Cause"}
          </button>
        </div>
      </div>
    </div>
  );
};
