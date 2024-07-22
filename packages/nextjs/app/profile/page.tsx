"use client";

import { GivvestCoinBalance } from "./_components/GivvestCoinBalance";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <div className="hero py-20">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">My Donations</h1>
          </div>
        </div>
      </div>
      <div className="pb-24">
        <div className="max-w-7xl m-auto flex gap-8 flex-wrap justify-center">
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

        <div className="mt-40 m-auto max-w-7xl">
          <GivvestCoinBalance />
        </div>
      </div>
    </>
  );
};

export default Home;
