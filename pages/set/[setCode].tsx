import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";

import FilterSection from "../../components/filterSection";

import { useHasScrolled } from "../../hooks/useHasScrolled";

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
    let imgUrl: string, colors: string[];
    const result = await fetch(
      `https://api.scryfall.com/cards/${setCode}/${num}`
    ).then((res) => res.json());

    if (result.status == 404) return;
    if ("card_faces" in result) {
      imgUrl = result.card_faces[0].image_uris.png;
      colors = result.card_faces[0].colors;
    } else {
      console.log(result.image_uris.png);
      imgUrl = result.image_uris.png;
      colors = result.colors;
    }

    return {
      id: result.id,
      name: result.name,
      manaCost: result.mana_cost != undefined ? result.mana_cost : null,
      cmc: result.cmc,
      colors: colors,
      colorIdentity:
        result.color_identity != undefined ? result.color_identity : null,
      types: result.type_line,
      keywords: result.keywords,
      imgUrl: imgUrl,
    } as Card;
  };

  const getSet = async () => {
    const setResult = await fetch(
      `https://api.scryfall.com/sets/${setCode}`
    ).then((res) => res.json());

    const setLength =
      "printed_size" in setResult
        ? setResult.printed_size
        : setResult.card_count;
    let setCards = [];
    for (let i = 1; i <= setLength; i++) {
      const card = await getCardInfo(i);
      console.log(card);

      if (card !== undefined) {
        setCards.push(card);
        console.log(i);
      }
    }
    return setCards;
  };

  const removeLands = (cards: Card[]) => {
    return cards.filter(({ types }) => !types.includes("Land"));
  };

  const removeCopies = (cards: Card[]) => {
    let reducedNames: string[] = [];
    let reducedIds: string[] = [];
    for (const card of cards) {
      if (!reducedNames.includes(card.name)) {
        reducedNames.push(card.name);
        reducedIds.push(card.id);
      }
    }

    return cards.filter((card) => reducedIds.includes(card.id));
  };

  const fullSetReduced = removeCopies(removeLands(await getSet()));

  return {
    props: {
      cards: fullSetReduced,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = ["mid", "vow", "neo", "snc", "dmu", "bro"].map((s) => ({
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
  const hasScrolled = useHasScrolled();

  return (
    <div className="h-full w-screen ">
      <cardsContext.Provider value={cards}>
        <FilterSection scrolled={hasScrolled} />
      </cardsContext.Provider>
    </div>
  );
};

export default SetPage;
