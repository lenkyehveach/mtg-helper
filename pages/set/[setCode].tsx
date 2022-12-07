import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";

import FilterSection from "../../components/filterSection";
import { useScrollPos } from "../../hooks/useScrollPos";

import { createContext } from "react";

export type Card = {
  id: string;
  name: string;
  manaCost: string | null;
  cmc: number;
  colors: Array<string> | null;
  colorIdentity: Array<string> | null;
  types: string;
  keywords: string[];
  imgUrl: string;
};

interface IParams extends ParsedUrlQuery {
  setCode: string;
}

interface setPageProps {
  cards: Card[];
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { setCode } = context.params as IParams;

  const getCardInfo = async (num: number) => {
    let imgUrl: string;
    const result = await fetch(
      `https://api.scryfall.com/cards/${setCode}/${num}`
    ).then((res) => res.json());

    if ("card_faces" in result) {
      imgUrl = result.card_faces[0].image_uris.png;
    } else {
      imgUrl = result.image_uris.png;
    }

    return {
      id: result.id,
      name: result.name,
      manaCost: result.manaCost != undefined ? result.manaCost : null,
      cmc: result.cmc,
      colors: result.colors != undefined ? result.colors : null,
      colorIdentity:
        result.colorIdentity != undefined ? result.colorIdentity : null,
      types: result.type_line,
      keywords: result.keywords,
      imgUrl: imgUrl,
    } as Card;
  };

  const getSet = async () => {
    const setResult = await fetch(
      `https://api.scryfall.com/sets/${setCode}`
    ).then((res) => res.json());
    const setLength = setResult.printed_size;
    let setCards = [];
    for (let i = 1; i <= setLength; i++) {
      const card = await getCardInfo(i);
      setCards.push(card);
      console.log(i);
    }
    return setCards;
  };

  const removeLands = (cards: Card[]) => {
    return cards.filter(({ types }) => !types.includes("Land"));
  };

  const fullSetReduced = removeLands(await getSet());

  return {
    props: {
      cards: fullSetReduced,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = ["neo", "bro"].map((s) => ({
    params: {
      setCode: s,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const cardsContext = createContext<Card[]>([]);

const SetPage: NextPage<setPageProps> = ({ cards }) => {
  const router = useRouter();
  const { setCode } = router.query;
  const scrollY = useScrollPos();

  return (
    <cardsContext.Provider value={cards}>
      <FilterSection scrollY={scrollY} />
    </cardsContext.Provider>
  );
};

export default SetPage;
