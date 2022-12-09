import Land from "./land";
import CardsList from "./cards";

import { FC, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { motion, AnimatePresence } from "framer-motion";

export type LandType = {
  id: string;
  clrs: string[];
  tapped: boolean;
};

interface FS {
  // scrollY: number;
  scrolled: boolean;
}

const FilterSection: FC<FS> = ({ scrolled }) => {
  const [lands, setLands] = useState<LandType[]>([]);
  const [phase, setPhase] = useState<boolean>(true);
  const formRef = useRef<HTMLSelectElement>(null);

  const addLand = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    const newLand: LandType = {
      id: uuidv4(),
      clrs: formRef.current!.value.split("/"),
      tapped: false,
    };

    // let colors = new Set();

    setLands((prev) => [...prev, newLand]);

    // [...lands, newLand].map((land) => {
    //   land.clrs.forEach((clr) => {
    //     colors.add(clr);
    //   });
    // });
  };

  const tapLand = (identifier: string) => {
    const selectedLandIndex = lands.findIndex(({ id }) => id === identifier);
    const selectedLand = lands[selectedLandIndex];
    selectedLand["tapped"] = !selectedLand["tapped"];
    const landsCopy = [...lands];
    landsCopy.splice(selectedLandIndex, 1, selectedLand);

    setLands(() => landsCopy);
  };

  const resetLands = () => {
    const newLands = lands.map((land) => {
      return { ...land, tapped: false };
    });
    setLands(() => newLands);
  };

  const removeAllLands = () => {
    setLands(() => []);
  };

  let untappedLands = lands.filter((land) => {
    return land.tapped == false;
  });

  let untapped = untappedLands.length;

  let colors = new Set<string>();
  untappedLands.map(({ clrs }) => {
    clrs.forEach((clr) => {
      colors.add(clr);
    });
  });
  // bg-gradient-to-t from-neutral-200 to-neutral-100

  const CollapsedFS = () => {
    return (
      <div className=" bg-lavender sticky top-0">
        <div
          className="h-24 w-screen bg-gold border-b border-kobe drop-shadow-lg flex flex-row justify-center items-center "
          style={{
            height: scrolled ? "6rem" : "0",
            opacity: scrolled ? "1" : "0",
          }}
        >
          <button onClick={() => window.scrollTo(0, 0)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="rgb(231, 90, 13)"
              className="w-12 h-12 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  const FullFS = () => {
    return (
      <>
        <form>
          <label className="flex flex-col items-center gap-4 ">
            <span className="text-xl font-bold text-center text-kobe">
              Opponent's Lands:
            </span>
            <div className="flex flex-row flex-wrap h-24 gap-1 place-content-center overflow-hidden">
              {lands.map((land) => {
                return <Land key={land.id} land={land} onClick={tapLand} />;
              })}
            </div>
            <select
              ref={formRef}
              className="border-2 border-persimmon font-semibold w-[90vw] md:w-48 h-10 px-4 text-center bg-lavender focus:bg-persimmon"
            >
              <option className="" value="Green">
                Green
              </option>
              <option value="Blue">Blue</option>
              <option value="Black">Black</option>
              <option value="Red">Red</option>
              <option value="White">White</option>
              <option value="Green/White">Green/White</option>
              <option value="Green/Blue">Green/Blue</option>
              <option value="Green/Black">Green/Black</option>
              <option value="Green/Red">Green/Red</option>
              <option value="Blue/White">Blue/White</option>
              <option value="Blue/Black">Blue/Black</option>
              <option value="Blue/Red">Blue/Red</option>
              <option value="Black/White">Black/White</option>
              <option value="Black/Red">Black/Red</option>
              <option value="Red/White">Red/White</option>
              <option value="Red/Black/Blue">Red/Black/Blue</option>
              <option value="Red/Black/Green">Red/Black/Green</option>
              <option value="White/Black/Blue">White/Black/Blue</option>
              <option value="White/Green/Blue">White/Green/Blue</option>
              <option value="White/Green/Red">White/Green/Red</option>
            </select>
            <div className="flex flex-row gap-x-2">
              <input
                type="submit"
                className="font-semibold border-2 border-kobe bg-persimmon w-28 h-14 rounded cursor-pointer text-lavender"
                onClick={addLand}
                value="Add Land"
              />
              {lands.filter((land) => {
                return land.tapped == true;
              }).length > 1 && (
                <button
                  className="font-semibold border-2 border-kobe bg-persimmon w-28 h-14 rounded cursor-pointer text-lavender"
                  onClick={resetLands}
                >
                  Untap Lands
                </button>
              )}
              {lands.length > 1 && (
                <button
                  className="font-semibold border-2 border-kobe bg-persimmon w-28 h-14 rounded cursor-pointer text-lavender"
                  onClick={removeAllLands}
                >
                  Clear Lands
                </button>
              )}
            </div>
          </label>
        </form>
        <div className="self-center flex flex-col h-48 w-full gap-2 place-content-center text-l font-bold leading-5">
          <div className="self-center flex flex-row gap-x-5 h-14 ">
            <div className="flex flex-row gap-x-2">
              <button
                className="font-semibold border-2 border-kobe bg-persimmon w-28 h-14 rounded cursor-pointer text-lavender"
                style={{
                  backgroundColor: phase ? "#942911" : "#e75a0d",
                }}
                onClick={() => setPhase((prev) => !prev)}
              >
                Main Phase
              </button>
              <button
                className="font-semibold border-2 border-kobe bg-persimmon w-28 h-14 rounded cursor-pointer text-lavender"
                style={{
                  backgroundColor: phase ? "#e75a0d" : "#942911",
                }}
                onClick={() => setPhase((prev) => !prev)}
              >
                Combat/ My Turn
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <main className="relative min-h-screen grid grid-rows-layout">
      <AnimatePresence initial={false}>
        <motion.div
          key={"fs"}
          className="h-96 flex flex-col bg-gold place-content-center border-b border-kobe drop-shadow-xl pt-4 relative"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          // style={{
          //   height: scrolled ? "6rem" : "24rem",
          // }}
        >
          <FullFS />
        </motion.div>
      </AnimatePresence>
      <CollapsedFS />

      {/* {scrollY < 364 ? <FullFS /> : <CollapsedFS />} */}

      <CardsList mana={untapped} untappedLands={untappedLands} phase={phase} />
    </main>
  );
};

export default FilterSection;
