"use client";

import { useRef } from "react";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export const GivvestCoinBalance = () => {
  const HowToGetModal = useRef<HTMLDialogElement>(null);
  const HowToUseModal = useRef<HTMLDialogElement>(null);

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
    <div className="card card-compact bg-base-200 text-primary-content mx-4 pt-8 px-4 lg:px-8">
      <div className="card-body">
        <h1 className="card-title font-light">YOUR GIVVEST COIN BALANCE:</h1>
        <p className="text-4xl lg:text-7xl">
          {isLoading ? "Loading..." : error ? "Error loading" : totalCounter ? totalCounter + " GVC" : "0 GVC"}
        </p>
        <div className="card-actions justify-end">
          <button className="btn" onClick={() => HowToGetModal.current?.showModal()}>
            How to get?
          </button>
          <dialog id="how-to-get-modal" className="modal" ref={HowToGetModal}>
            <div className="modal-box">
              <h3 className="font-bold text-lg">How to get GivvestCoins</h3>
              <p className="py-4">
                Make a DonationNFT permanent to receive GivvestCoins (GVC) equal to the amount of the DonationNFT.
                <br /> <br /> Tip: Use the 3 dot menu on your unlisted DonationNFT access the &quot;Make permanent&quot;
                button.
              </p>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>

          <button className="btn" onClick={() => HowToUseModal.current?.showModal()}>
            How to use?
          </button>
          <dialog id="how-to-use-modal" className="modal" ref={HowToUseModal}>
            <div className="modal-box">
              <h3 className="font-bold text-lg">How to use GivvestCoins</h3>
              <p className="py-4">GivvestCoins will be used to govern the Givvest Project and for many other perks.</p>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};
