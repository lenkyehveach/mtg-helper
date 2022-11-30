import Land from "./land";
import CardsList from "./cards";

import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

export type Land = {
  id: string;
  clrs: string[];
  tapped: boolean;
};

const FilterSection = () => {
  const [lands, setLands] = useState<Land[]>([]);
  const formRef = useRef<HTMLSelectElement>(null);

  const addLand = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    const newLand: Land = {
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

  return (
    <>
      <div className="h-96 flex flex-col place-content-center gap-4">
        <form>
          <label className="flex flex-col items-center gap-4">
            Choose what coloured land the oppenent has played:
            <select ref={formRef} className="border-2">
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
            <input
              type="submit"
              className="w-24 bg-slate-200 border border-black rounded cursor-pointer"
              onClick={addLand}
              value="Add Land"
            />
          </label>
        </form>
        <div className="self-center flex flex-col h-32 w-full gap-2 items-center">
          <div className="flex flex-row gap-1">
            {lands.map((land) => {
              return <Land key={land.id} land={land} onClick={tapLand} />;
            })}
          </div>
          {lands.filter((land) => {
            return land.tapped == true;
          }).length > 1 && (
            <button
              className="w-24 bg-slate-200 border border-black rounded"
              onClick={resetLands}
            >
              Untap Lands
            </button>
          )}
          {lands.length > 1 && (
            <button
              className="w-24 bg-slate-200 border border-black rounded"
              onClick={removeAllLands}
            >
              New Game
            </button>
          )}
        </div>
      </div>
      <CardsList mana={untapped} untappedLands={untappedLands} />
    </>
  );
};

export default FilterSection;
