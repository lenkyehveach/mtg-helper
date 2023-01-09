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

const delay = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

export const getStaticProps: GetStaticProps = async (context) => {
  const { setCode } = context.params as IParams;

  const getCardInfo = async (num: number) => {
    let imgUrl: string, colors: string[];
    const result = await fetch(
      `https://api.scryfall.com/cards/${setCode}/${num}`
    )
      .then((res) => res.json())
      .then((res) => {
        if ("status" in res) {
          return 0;
        } else {
          if ("card_faces" in res) {
            console.log(res.card_faces[0].image_uris.png);
            res.imgUrl = res.card_faces[0].image_uris.png;
            res.colors = res.card_faces[0].colors;
            res.mana_cost = res.card_faces[0].mana_cost;
          } else {
            res.imgUrl = res.image_uris.png;
            res.colors = res.colors;
            res.mana_cost = res.mana_cost;
          }
          return res;
        }
      });

    return {
      id: result.id,
      name: result.name,
      manaCost: result.mana_cost != undefined ? result.mana_cost : null,
      cmc: result.cmc,
      colors: result.colors,
      colorIdentity:
        result.color_identity != undefined ? result.color_identity : null,
      types: result.type_line,
      keywords: result.keywords,
      imgUrl: result.imgUrl,
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
    // chnage to set length
    for (let i = 1; i <= setLength; i++) {
      delay(50);
      const card = await getCardInfo(i);

      if (card.id !== undefined) {
        setCards.push(card);
        console.log(card);
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
//
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
