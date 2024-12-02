"use client";

import Image from "next/image";
import StakeSection from "./_components/StakeSection";
import { NextPage } from "next";

const YieldDonationPage: NextPage = () => {
  const cooldownDuration = 1; // 1 hour

  return (
    <div className="container mx-auto px-4 py-8">
      <StakeSection />

      {/* Benefits Section */}
      <div className="py-24">
        <h2 className="text-3xl font-bold text-center mb-8">Benefits of Yield Giving</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card bg-gray-800 shadow-xl">
            <div className="card-body">
              <Image src="Meditation.svg" alt="Meditation" width={400} height={400} className="m-auto my-8 max-h-56" />
              <h3 className="card-title">Risk-Free Giving</h3>
              <p>Your original deposit stays safe and is returned to you. Only the yield is donated.</p>
            </div>
          </div>
          <div className="card bg-gray-800 shadow-xl">
            <Image src="Leadership 2.svg" alt="Leadership" width={400} height={400} className="m-auto my-8 max-h-56" />
            <div className="card-body">
              <h3 className="card-title">Permanent Impact NFTs</h3>
              <p>Receive unique NFTs for your yield donations, creating a lasting record of your impact.</p>
            </div>
          </div>
          <div className="card bg-gray-800 shadow-xl">
            <Image
              src="Crypto Ledger.svg"
              alt="Crypto Ledger"
              width={400}
              height={400}
              className="m-auto my-8 max-h-56"
            />
            <div className="card-body">
              <h3 className="card-title">Smart Yield Utilization</h3>
              <p>Put your idle assets to work while supporting causes you care about.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="pt-8 pb-24">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="steps steps-vertical lg:steps-horizontal w-full">
          <div className="step step-primary">Deposit USDe</div>
          <div className="step step-primary">Earn Yield</div>
          <div className="step step-primary">Start Cooldown</div>
          <div className="step step-primary">Withdraw & Donate</div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div className="card bg-gray-300 text-black shadow-xl rounded-3xl">
            <div className="card-body">
              <h3 className="card-title">1. Deposit USDe</h3>
              <p>Deposit your USDe tokens which will be staked to generate yield.</p>
            </div>
          </div>
          <div className="card bg-gray-300 text-black shadow-xl rounded-3xl">
            <div className="card-body">
              <h3 className="card-title">2. Earn Yield</h3>
              <p>Your deposit automatically starts earning yield through Ethena&apos;s staking mechanism.</p>
            </div>
          </div>
          <div className="card bg-gray-300 text-black shadow-xl rounded-3xl">
            <div className="card-body">
              <h3 className="card-title">3. Start Cooldown</h3>
              <p>When ready, initiate the {cooldownDuration}-hour cooldown period.</p>
            </div>
          </div>
          <div className="card bg-gray-300 text-black shadow-xl rounded-3xl">
            <div className="card-body">
              <h3 className="card-title">4. Withdraw & Donate</h3>
              <p>Get your deposit back and donate the earned yield to your chosen cause.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YieldDonationPage;
