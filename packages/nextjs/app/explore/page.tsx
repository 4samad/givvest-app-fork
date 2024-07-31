"use client";

import { useState } from "react";
import { CauseNFTsList } from "./_components/CauseNFTsList";
import { DonationNFTsRedemptionList } from "./_components/DonationNFTsRedemptionList";
import type { NextPage } from "next";

const Explore: NextPage = () => {
  const [selectedTab, setSelectedTab] = useState("Causes");

  return (
    <>
      <div className="hero pt-16 pb-8">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Explore Causes</h1>
          </div>
        </div>
      </div>
      <div className="pb-24">
        <div className="flex justify-center">
          <div role="tablist" className="tabs tabs-boxed">
            <a
              role="tab"
              className={`tab ${selectedTab === "Causes" ? "tab-active" : ""}`}
              onClick={() => setSelectedTab("Causes")}
            >
              Causes
            </a>
            <a
              role="tab"
              className={`tab ${selectedTab === "DonationNFTs" ? "tab-active" : ""}`}
              onClick={() => setSelectedTab("DonationNFTs")}
            >
              Donation NFTs
            </a>
          </div>
        </div>
        <div className="flex justify-center mt-16">
          {selectedTab === "Causes" ? <CauseNFTsList /> : <DonationNFTsRedemptionList />}
        </div>
      </div>
    </>
  );
};

export default Explore;
