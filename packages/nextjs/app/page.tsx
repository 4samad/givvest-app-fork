"use client";

import Link from "next/link";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex items-center justify-center pt-48">
        <h1 className="h1 text-center">
          Nothing here for now. See:
          <Link className="ml-2 btn" href="/explore">
            Explore causes
          </Link>
        </h1>
      </div>
    </>
  );
};

export default Home;
