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
  types: Array<string>;
  imageUrl: string;
  variations: Array<string> | null;
};

interface IParams extends ParsedUrlQuery {
  setCode: string;
}

interface setPageProps {
  cards: Card[];
}

export const getStaticProps: GetStaticProps = async (context) => {
  const getCards = async (set: string, n: number) => {
    const res = await fetch(
      `https://api.magicthegathering.io/v1/cards?set=${set}&page=${n.toString()}`
    );
    const { cards } = await res.json();
    const data = cards.map((card: Card) => {
      return {
        id: card.id,
        name: card.name,
        manaCost: card.manaCost != undefined ? card.manaCost : null,
        cmc: card.cmc,
        colors: card.colors != undefined ? card.colors : null,
        colorIdentity:
          card.colorIdentity != undefined ? card.colorIdentity : null,
        types: card.types,
        imageUrl: card.imageUrl != undefined ? card.imageUrl : "",
        variations: card.variations != undefined ? card.variations : null,
      };
    });

    return data;
  };

  const getFullSet = async () => {
    const { setCode } = context.params as IParams;

    let fullSet: Card[] = [];
    let done = false;
    let i = 0;
    while (!done) {
      let data: Array<Card> = await getCards(setCode, i + 1);

      if (data.length == 0) {
        done = true;
        break;
      }
      fullSet.push(...data);

      i++;
    }
    return fullSet;
  };

  const removeMultipleCards = (cards: Card[]) => {
    let cardVariations = cards.filter((card) => card.variations != null);

    let badIds: string[] = [];

    for (let i = 0; i < cardVariations.length; i++) {
      let currentCard = cardVariations[i];
      if (badIds.includes(currentCard.id)) break;
      currentCard.variations?.forEach((badId) => {
        badIds.push(badId);
      });
    }

    let res = cards.filter((card: Card) => !badIds.includes(card.id));

    return res;
  };
  const removeLands = (cards: Card[]) => {
    return cards.filter(({ types }) => !types.includes("Land"));
  };

  const fs_reduced = removeLands(removeMultipleCards(await getFullSet()));

  return {
    props: {
      cards: fs_reduced,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = ["NEO", "BRO"].map((s) => ({
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
