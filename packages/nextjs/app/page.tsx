"use client";

import Link from "next/link";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <h1 className="h1 m-8">
        Givvest app here:<Link href="/explore">Explore</Link>
      </h1>
    </>
  );
};

export default Home;
