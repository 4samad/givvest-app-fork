"use client";

import { DonationNFTsList } from "./_components/DonationNFTsList";
import { GivvestCoinBalance } from "./_components/GivvestCoinBalance";
import type { NextPage } from "next";

const Profile: NextPage = () => {
  return (
    <>
      <div className="hero py-16">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">My Donations</h1>
          </div>
        </div>
      </div>
      <div className="pb-24">
        <div className="flex justify-center">
          <DonationNFTsList />
        </div>
        <div className="mt-40 m-auto max-w-7xl">
          <GivvestCoinBalance />
        </div>
      </div>
    </>
  );
};

export default Profile;
