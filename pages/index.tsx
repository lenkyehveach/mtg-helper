import CardSet from "./cardSet";

import { GetStaticProps, NextPage } from "next";
import Link from "next/link";

interface SetType {
  name: string;
  img_uri: string;
}
interface homeProps {
  set_imgs_props: SetType[];
}

export const getStaticProps: GetStaticProps = async () => {
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

  const set_imgs_props = await getSetURIs(sets).then((sets) =>
    sets.reduce((acc: any, cur, ind) => {
      let res = { uri: cur, name: sets[ind] };
      return [...acc, res];
    }, [])
  );

  return {
    props: {
      set_imgs_props,
    },
  };
};

const Home: NextPage<homeProps> = ({ set_imgs_props }) => {
  return (
    <main className="flex h-screen w-screen place-content-center">
      <section className="self-center flex flex-col py-10 px-12 border border-kobe rounded-lg text-center ">
        <h1 className="text-center">Welcome, Gamer!</h1>
        <h2>Select which set you will be playing today?</h2>
        <CardSet />
        <ul className="flex flex-col md:flex-row gap-y-4 md:gap-x-4 place-content-center py-8">
          {set_imgs_props.map(({ img_uri, name }, ind) => {
            return (
              <li
                key={ind}
                className="self-center h-16 w-16 flex flex-row  place-content-center"
              >
                <img src={name} alt={`mtg set ${img_uri} link`}></img>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
};

export default Home;
