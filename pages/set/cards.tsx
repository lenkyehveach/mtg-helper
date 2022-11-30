import { Card } from "./[setCode]"; // type
import { Land } from "./filterSection";

import { cardsContext } from "./[setCode]";

import { FC, useContext, useEffect, useState } from "react";

interface CardProps {
  mana: number;
  untappedLands: Land[];
  phase: boolean;
}

const getPipFromColor = (color: string) => {
  if (color === "Blue") return "U";
  return color[0];
};

const CardsList: FC<CardProps> = ({ mana, untappedLands, phase }) => {
  const [results, setResults] = useState<Card[]>([]);
  const data = useContext(cardsContext);

  const getColorSet = () => {
    let colorsAv = new Set<string>();
    untappedLands.map(({ clrs }) => {
      clrs.forEach((clr) => {
        colorsAv.add(getPipFromColor(clr));
      });
    });
    return Array.from(colorsAv);
  };

  let colorsAv = getColorSet();
  console.log(colorsAv);
  let availableLands: string[] = [];
  untappedLands.forEach(({ clrs }) => availableLands.push(...clrs));

  let landPipCount: {
    [key: string]: number;
  } = availableLands
    .map((clrs) => getPipFromColor(clrs))
    .reduce((all, land) => {
      const currentLand = all[land] ?? 0;
      return {
        ...all,
        [land]: currentLand + 1,
      };
    }, {} as { [key: string]: number });

  useEffect(() => {
    let manaQuery = data.filter(({ cmc }) => cmc <= mana);
    console.log("manaQuery");
    console.log(manaQuery);

    if (!phase)
      manaQuery = manaQuery.filter(({ types }) => types.includes("Instant"));

    let colorQuery = manaQuery.filter(({ colors }) => {
      if (!colors) return true;
      return colors.every((color) => colorsAv.includes(color));
    });

    console.log("colorQuery");
    console.log(colorQuery);
    let colorCostQuery = colorQuery.filter(({ manaCost }) => {
      if (!manaCost) return false;
      let pips = manaCost!.match(/[WBRUG]/g);
      // check for artifacts (!pips) or single coloured cards
      if (!pips || pips!.length == 1) return true;
      //else check if all pips satisfied
      if (pips.length > 1) {
        const CostPipCount: { [key: string]: number } = pips.reduce(
          (all, pip) => {
            const currentPip = all[pip] ?? 0;
            return {
              ...all,
              [pip]: currentPip + 1,
            };
          },
          {} as any
        );
        let colorMatchRes = 0;
        let pipColors = Array.from(new Set(pips));
        pipColors.forEach((pipColor) => {
          if (landPipCount[pipColor] >= CostPipCount[pipColor]) {
            colorMatchRes = colorMatchRes + 1;
          }
        });
        if (colorMatchRes === pipColors.length) return true;

        return false;
      }
    });

    setResults(() => colorCostQuery);
  }, [untappedLands]);
  return (
    <>
      <h1 className="text-xl font-bold pt-8 pb-4 pl-4">Results: </h1>
      <div className="px-2 flex flex-wrap flex-col md:flex-row gap-4 justify-center items-center ">
        {results.map(({ id, name, imageUrl }) => (
          <div key={id}>
            <img alt={`${name} card`} src={imageUrl} />
          </div>
        ))}
      </div>
    </>
  );
};

export default CardsList;
