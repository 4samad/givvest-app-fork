"use client";

import { useState } from "react";
import { DonationNFTsList } from "./_components/DonationNFTsList";
import { GivvestCoinBalance } from "./_components/GivvestCoinBalance";
import type { NextPage } from "next";

const Profile: NextPage = () => {
  const [selectedTab, setSelectedTab] = useState("All");

  return (
    <>
      <div className="hero pt-16 pb-8">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">My Donations</h1>
          </div>
        </div>
      </div>
      <div className="pb-24">
        <div className="flex justify-center">
          <div role="tablist" className="tabs tabs-boxed">
            <a
              role="tab"
              className={`tab ${selectedTab === "All" ? "tab-active" : ""}`}
              onClick={() => setSelectedTab("All")}
            >
              All
            </a>
            <a
              role="tab"
              className={`tab ${selectedTab === "Listed" ? "tab-active" : ""}`}
              onClick={() => setSelectedTab("Listed")}
            >
              Listed
            </a>
            <a
              role="tab"
              className={`tab ${selectedTab === "Unlisted" ? "tab-active" : ""}`}
              onClick={() => setSelectedTab("Unlisted")}
            >
              Unlisted
            </a>
            <a
              role="tab"
              className={`tab ${selectedTab === "Permanent" ? "tab-active" : ""}`}
              onClick={() => setSelectedTab("Permanent")}
            >
              Permanent
            </a>
          </div>
        </div>
        <div className="flex justify-center mt-16">
          <DonationNFTsList selectedTab={selectedTab} />
        </div>
        <div className="mt-28 m-auto max-w-7xl">
          <GivvestCoinBalance />
        </div>
      </div>
    </>
  );
};

export default Profile;
