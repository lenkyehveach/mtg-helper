import FilterSection from "./fs";
import { Card } from "../set/[setCode]";

import { createContext } from "react";

export const cardsContext = createContext<Card[]>([]);

const index = () => {
  let emperor = {
    id: "hehe",
    name: "Emperor",
    manaCost: "{W}{W}2",
    cmc: 4,
    colors: ["White"],
    colorIdentity: ["White"],
    types: ["Planeswalker"],
    imageUrl: "hehe.com",
    variations: ["hehe", "he"],
  };

  let BTH = {
    id: "xd",
    name: "Bloodtithe Harvester",
    manaCost: "{B}{R}",
    cmc: 2,
    colors: ["Black", "Red"],
    colorIdentity: ["Black", "Red"],
    types: ["Creature"],
    imageUrl:
      "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=541102&type=card",
    variations: ["L"],
  };
  let data: Card[] = [emperor, BTH];
  return (
    <div>
      <cardsContext.Provider value={data}>
        <FilterSection />
      </cardsContext.Provider>
    </div>
  );
};
export default index;
