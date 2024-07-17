"use client";

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
      <div className="pb-24">
        <div className="max-w-7xl m-auto flex gap-8 flex-wrap justify-center">
          <div className="card bg-base-200 shadow-xl">
            <figure>
              <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
            </figure>
            <div className="card-body">
              <p>If a dog chews shoes whose shoes does he choose?If a dog chews shoes whose shoes does he choose?</p>
              <div className="pt-8">
                <progress className="progress progress-success mt-2" value="10" max="100"></progress>
                <p className="text-sm">$345 of $50,000 done</p>
                <div className="mt-8 lg:mt-2 card-actions justify-end">
                  <label className="input inline-flex items-center gap-2 max-w-40">
                    $
                    <input type="text" placeholder="Enter amount" className="input max-w-full placeholder:text-sm"/>
                  </label>
                  <button className="btn btn-primary">Donate Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 max-w-6xl m-auto">
          <p>
            If a dog chews shoes whose shoes does he choose?If a dog chews shoes whose shoes does he choose?If a dog
            chews shoes whose shoes does he choose?If a dog chews shoes whose shoes does he choose?If a dog chews shoes
            whose shoes does he choose?If a dog chews shoes whose shoes does he choose?If a dog chews shoes whose shoes
            does he choose?If a dog chews shoes whose shoes does he choose?
          </p>
          <p className="mt-4">
            If a dog chews shoes whose shoes does he choose?If a dog chews shoes whose shoes does he choose?If a dog
            chews shoes whose shoes does he choose?If a dog chews shoes whose shoes does he choose?If a dog chews shoes
            whose shoes does he choose?If a dog chews shoes whose shoes does he choose?If a dog chews shoes whose shoes
            does he choose?If a dog chews shoes whose shoes does he choose?If a dog chews shoes whose shoes does he
            choose?If a dog chews shoes whose shoes does he choose?If a dog chews shoes whose shoes does he choose?If a
            dog chews shoes whose shoes does he choose?If a dog chews shoes whose shoes does he choose?If a dog chews
            shoes whose shoes does he choose?If a dog chews shoes whose shoes does he choose?If a dog chews shoes whose
            shoes does he choose?If a dog chews shoes whose shoes does he choose?If a dog chews shoes whose shoes does
            he choose?If a dog chews shoes whose shoes does he choose?If a dog chews shoes whose shoes does he choose?If
            a dog chews shoes whose shoes does he choose?If a dog chews shoes whose shoes does he choose?If a dog chews
            shoes whose shoes does he choose?If a dog chews shoes whose shoes does he choose?If a dog chews shoes whose
            shoes does he choose?If a dog chews shoes whose shoes does he choose?If a dog chews shoes whose shoes does
            he choose?If a dog chews shoes whose shoes does he choose?If a dog chews shoes whose shoes does he choose?If
            a dog chews shoes whose shoes does he choose?If a dog chews shoes whose shoes does he choose?If a dog chews
            shoes whose shoes does he choose?
          </p>
          <p className="mt-4">
            If a dog chews shoes whose shoes does he choose?If a dog chews shoes whose shoes does he choose?If a dog
            chews shoes whose shoes does he choose?If a dog chews shoes whose shoes does he choose?
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
