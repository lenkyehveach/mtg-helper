import { Card } from "../pages/set/[setCode]"; // type
import { LandType } from "./filterSection";

import { cardsContext } from "../pages/set/[setCode]";

import { FC, useContext, useEffect, useState } from "react";
import Image from "next/image";

interface CardProps {
  mana: number;
  untappedLands: LandType[];
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

  useEffect(() => {
    let colorsAv = getColorSet();
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

    let manaQuery = data.filter(({ cmc }) => cmc <= mana);

    if (!phase)
      manaQuery = manaQuery.filter(({ types }) => types.includes("Instant"));

    let colorQuery = manaQuery.filter(({ colors }) => {
      if (!colors) return true;
      return colors.every((color) => colorsAv.includes(color));
    });

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
  }, [mana, phase]);

  return (
    <section className="bg-lavender self-start h-full pb-8">
      <h1 className="text-xl font-bold pt-8 pb-8 pl-8">Results: </h1>
      <div className="px-4 flex flex-wrap flex-col md:flex-row gap-4 justify-center items-center ">
        {results.map(({ id, name, imgUrl }) => (
          // <picture key={id}>
          //   <source srcSet={imgUrl} type="image/webp" />
          //   <img alt={`${name} card`} src={imgUrl} />
          // </picture>
          <div key={id} className="">
            <Image
              alt={`${name} card`}
              src={imgUrl}
              placeholder="blur"
              blurDataURL={imgUrl}
              width={300}
              height={300}
              className="object-contain"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardsList;
