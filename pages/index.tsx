import CardSet from "./cardSet";

import { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <main className="flex h-screen w-screen place-content-center bg-lavender">
      <section className="self-center h-full md:h-auto flex flex-col px-12 border border-kobe rounded-lg text-center text-2xl text-kobe bg-gold place-content-center">
        <h1 className="text-center font-bold my-3 text-3xl underline underline-offset-8">
          Welcome, Gamer!
        </h1>
        <h2>Select which set you will be playing today</h2>
        <CardSet />
        <Link
          href="/about"
          className="self-center flex font-semibold border-2 border-kobe bg-persimmon w-fit h-14 rounded cursor-pointer text-lavender px-3 mb-6"
        >
          <p className="self-center">How to use this site</p>
        </Link>
      </section>
    </main>
  );
};

export default Home;
