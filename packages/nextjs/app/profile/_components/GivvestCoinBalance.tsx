"use client";

import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export const GivvestCoinBalance = () => {
  const { address } = useAccount();
  const {
    data: totalCounter,
    error,
    isLoading,
  } = useScaffoldReadContract({
    contractName: "GivvestCoin",
    functionName: "balanceOf",
    args: [address],
  });

  console.log({ totalCounter, error, isLoading });

  return (
    <div className="card card-compact bg-primary text-primary-content mx-4 pt-8 px-4 lg:px-8">
      <div className="card-body">
        <h1 className="card-title font-light">YOUR GIVVEST COIN BALANCE:</h1>
        <p className="text-4xl lg:text-7xl">
          {isLoading ? "Loading..." : error ? "Error loading" : totalCounter ? totalCounter + " GVC" : "0 GVC"}
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-ghost">How to get more?</button>
        </div>
      </div>
    </div>
  );
};
