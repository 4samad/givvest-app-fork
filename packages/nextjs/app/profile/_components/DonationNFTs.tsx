"use client";

import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export const DonationNFTs = () => {
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
    <div className="max-w-7xl flex gap-8 flex-wrap justify-center">
      <div className="min-h-96 w-56 flex flex-col justify-between gap-4 bg-black p-4">
        <div className="text-xs flex justify-between">
          <div>
            <p>Thank you</p>
            <p className="opacity-80 mt-1">0x6436.....fdg4</p>
          </div>
          <div>
            <div className="badge my-1">#12</div>
          </div>
        </div>
        <div>
          <h1 className="text-4xl">$3400</h1>
          <p className="mt-2 opacity-80">Donated for tribal students fund</p>
        </div>
      </div>
      <div className="min-h-96 w-56 flex flex-col justify-between gap-4 bg-black p-4">
        <div className="text-xs flex justify-between">
          <div>
            <p>Thank you</p>
            <p className="opacity-80 mt-1">0x6436.....fdg4</p>
          </div>
          <div className="badge my-1">#12</div>
        </div>
        <div>
          <h1 className="text-4xl">$3400</h1>
          <p className="mt-2 opacity-80">Donated for tribal students fund</p>
        </div>
      </div>
      <div className="min-h-96 w-56 flex flex-col justify-between gap-4 bg-black p-4">
        <div className="text-xs flex justify-between">
          <div>
            <p>Thank you</p>
            <p className="opacity-80 mt-1">0x6436.....fdg4</p>
          </div>
          <div className="badge my-1">#12</div>
        </div>
        <div>
          <h1 className="text-4xl">$3400</h1>
          <p className="mt-2 opacity-80">Donated for tribal students fund</p>
        </div>
      </div>
      <div className="min-h-96 w-56 flex flex-col justify-between gap-4 bg-black p-4">
        <div className="text-xs flex justify-between">
          <div>
            <p>Thank you</p>
            <p className="opacity-80 mt-1">0x6436.....fdg4</p>
          </div>
          <div className="badge my-1">#12</div>
        </div>
        <div>
          <h1 className="text-4xl">$3400</h1>
          <p className="mt-2 opacity-80">Donated for tribal students fund</p>
        </div>
      </div>
      <div className="min-h-96 w-56 flex flex-col justify-between gap-4 bg-black p-4">
        <div className="text-xs flex justify-between">
          <div>
            <p>Thank you</p>
            <p className="opacity-80 mt-1">0x6436.....fdg4</p>
          </div>
          <div className="badge my-1">#12</div>
        </div>
        <div>
          <h1 className="text-4xl">$3400</h1>
          <p className="mt-2 opacity-80">Donated for tribal students fund</p>
        </div>
      </div>
      <div className="min-h-96 w-56 flex flex-col justify-between gap-4 bg-black p-4">
        <div className="text-xs flex justify-between">
          <div>
            <p>Thank you</p>
            <p className="opacity-80 mt-1">0x6436.....fdg4</p>
          </div>
          <div className="badge my-1">#12</div>
        </div>
        <div>
          <h1 className="text-4xl">$3400</h1>
          <p className="mt-2 opacity-80">Donated for tribal students fund</p>
        </div>
      </div>
      <div className="min-h-96 w-56 flex flex-col justify-between gap-4 bg-black p-4">
        <div className="text-xs flex justify-between">
          <div>
            <p>Thank you</p>
            <p className="opacity-80 mt-1">0x6436.....fdg4</p>
          </div>
          <div className="badge my-1">#12</div>
        </div>
        <div>
          <h1 className="text-4xl">$3400</h1>
          <p className="mt-2 opacity-80">Donated for tribal students fund</p>
        </div>
      </div>
      <div className="min-h-96 w-56 flex flex-col justify-between gap-4 bg-black p-4">
        <div className="text-xs flex justify-between">
          <div>
            <p>Thank you</p>
            <p className="opacity-80 mt-1">0x6436.....fdg4</p>
          </div>
          <div className="badge my-1">#12</div>
        </div>
        <div>
          <h1 className="text-4xl">$3400</h1>
          <p className="mt-2 opacity-80">Donated for tribal students fund</p>
        </div>
      </div>
    </div>
  );
};
