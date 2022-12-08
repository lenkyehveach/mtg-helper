import Land from "./land";
import CardsList from "./cards";

import { FC, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

export type LandType = {
  id: string;
  clrs: string[];
  tapped: boolean;
};

interface FS {
  scrollY: number;
}

const FilterSection: FC<FS> = ({ scrollY }) => {
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
      <div className="h-24 w-screen bg-slate-300 border-b border-black drop-shadow-lg flex flex-row justify-center items-center sticky top-0">
        <button className="" onClick={() => window.scrollTo(0, 0)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-12 h-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
    );
  };

  const FullFS = () => {
    return (
      <div className="h-96 flex flex-col bg-slate-300 place-content-center gap-4 border-b border-black drop-shadow-lg">
        <form>
          <label className="flex flex-col items-center gap-4 text-l">
            <span className="text-2xl py-4 ">
              Choose new land&quot;s colour(s):
            </span>
            <select
              ref={formRef}
              className="border-2 font-bold w-[90vw] md:w-24 h-10 px-4"
            >
              <option value="Green">Green</option>
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
                className=" text-l font-bold bg-slate-200 border w-28 h-14 border-black rounded cursor-pointer"
                onClick={addLand}
                value="Add Land"
              />
              {lands.filter((land) => {
                return land.tapped == true;
              }).length > 1 && (
                <button
                  className="w-28 bg-slate-200 border border-black rounded text-l font-bold"
                  onClick={resetLands}
                >
                  Untap Lands
                </button>
              )}
            </div>
          </label>
        </form>
        <div className="self-center flex flex-col h-48 w-full gap-2 items-center text-l font-bold leading-5">
          <div className="flex flex-row flex-wrap h-24 gap-1 place-content-center overflow-hidden">
            {lands.map((land) => {
              return <Land key={land.id} land={land} onClick={tapLand} />;
            })}
          </div>
          <div className="flex flex-row gap-x-5 h-14 ">
            {lands.length > 1 && (
              <button
                className="w-24 bg-slate-200 border border-black rounded"
                onClick={removeAllLands}
              >
                Clear Lands
              </button>
            )}
            <div className="flex flex-row gap-x-2">
              <button
                className="w-24 border border-black rounded"
                style={{
                  backgroundColor: phase
                    ? "rgb(100 116 139)"
                    : "rgb(226 232 240)",
                }}
                onClick={() => setPhase((prev) => !prev)}
              >
                Main Phase
              </button>
              <button
                className="w-24 border border-black rounded"
                style={{
                  backgroundColor: phase
                    ? "rgb(226 232 240)"
                    : "rgb(100 116 139)",
                }}
                onClick={() => setPhase((prev) => !prev)}
              >
                Combat/ My Turn
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <main className="relative">
      {scrollY < 364 ? <FullFS /> : <CollapsedFS />}

      <CardsList mana={untapped} untappedLands={untappedLands} phase={phase} />
    </main>
  );
};

export default FilterSection;
