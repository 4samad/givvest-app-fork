"use client";

import { CauseNFTsList } from "./_components/CauseNFTsList";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <div className="hero py-20">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Explore Causes</h1>
          </div>
        </div>
      </div>
      <div className="pb-24 flex justify-center">
        <CauseNFTsList />
      </div>
    </>
  );
};

export default Home;
