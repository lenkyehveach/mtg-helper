import CardSet from "./cardSet";

import { GetStaticProps, NextPage } from "next";

interface homeProps {
  set_images: string[];
}

export const getStaticProps: GetStaticProps = async () => {
  let set_images;
  const sets = ["mid", "vow", "neo", "snc", "dmu"];

  const getSetURIs = async (sets: string[]) => {
    let uris: string[] = [];

    for (const set of sets) {
      let res = await fetch(`https://api.scryfall.com/sets/${set}`);
      let set_uri = await res.json();
      uris.push(set_uri["icon_svg_uri"]);
    }
    return uris;
  };

  set_images = await getSetURIs(sets);

  return {
    props: {
      set_images,
    },
  };
};

const Home: NextPage<homeProps> = ({ set_images }) => {
  return (
    <main className="flex h-screen w-screen place-content-center">
      <section className="self-center flex flex-col py-10 px-8 border border-kobe rounded-lg text-center ">
        <h1 className="text-center">Welcome, Gamer!</h1>
        <h2>Select which set you will be playing today?</h2>
        <CardSet />
        <div>
          {set_images.map((si) => {
            return <p>{si}</p>;
          })}
        </div>
      </section>
    </main>
  );
};

export default Home;
