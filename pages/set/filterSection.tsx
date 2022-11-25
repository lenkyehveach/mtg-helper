import { Card } from "./[setCode]";
import { NextPage } from "next";

import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

interface PageProps {
  data: Card[];
}

type Land = {
  id: string;
  clrs: string[];
  tapped: boolean;
};

interface LandProps {
  land: Land;
  onClick: (id: string) => void;
}

const Land = ({ land, onClick }: LandProps) => {
  const colorCodes: {
    [key: string]: string;
  } = {
    White: "#fffffa",
    Black: "#000000",
    Green: "#009933",
    Blue: "#0099ff",
    Red: "#ff0000",
  };
  // let cn: string;
  // let c1: string;
  // let c2: string;
  // let c3: string;

  // if (land.clrs.length === 1) {
  //   c1 = land.clrs[0];
  //   cn = `bg-${colorCodes[c1]}`;
  // } else if (land.clrs.length === 2) {
  //   c1 = "from-" + colorCodes[land.clrs[0]];
  //   c2 = "to-" + colorCodes[land.clrs[1]];
  //   cn = `bg-gradient-to-r ${c1} ${c2}`;
  // } else {
  //   c1 = land.clrs[0];
  //   c2 = land.clrs[1];
  //   c3 = land.clrs[2];
  //   cn = `bg-gradient-to-r from-${colorCodes[c1]} via-${colorCodes[c2]} to-${colorCodes[c3]}`;
  // }
  let styles;
  if (land.clrs.length === 1) {
    styles = { backgroundColor: colorCodes[land.clrs[0]] };
  } else if (land.clrs.length === 2) {
    styles = {
      backgroundImage: `linear-gradient(to right, ${
        colorCodes[land.clrs[0]]
      } 50%, ${colorCodes[land.clrs[1]]} 50%)`,
    };
  } else {
    styles = {
      backgroundImage: `linear-gradient(to right, ${
        colorCodes[land.clrs[0]]
      } 33%, ${colorCodes[land.clrs[1]]} 33% 66%, ${
        colorCodes[land.clrs[2]]
      } 66%)`,
    };
  }

  return (
    <div className="h-20 w-20 " style={{ opacity: land.tapped ? "0.5" : "1" }}>
      <button
        className={"h-full w-full border border-slate-400 "}
        style={styles}
        onClick={() => onClick(land.id)}
      ></button>
    </div>
  );
};

const FilterSection: NextPage<PageProps> = ({ data }) => {
  const [lands, setLands] = useState<Land[]>([]);
  const formRef = useRef<HTMLSelectElement>(null);

  const addLand = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    const newLand: Land = {
      id: uuidv4(),
      clrs: formRef.current!.value.split("/"),
      tapped: false,
    };
    let colors = new Set();

    setLands((prev) => [...prev, newLand]);

    [...lands, newLand].map((land) => {
      land.clrs.forEach((clr) => {
        colors.add(clr);
      });
    });
    console.log(Array.from(colors).join(" "));
    console.log([...lands, newLand].length);
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

  return (
    <div className="h-80 flex flex-col place-content-center gap-4">
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
            className=" w-24 bg-slate-200 border border-black rounded cursor-pointer"
            onClick={addLand}
            value="Add Land"
          />
        </label>
      </form>
      <div className="flex flex-col md:flex-row h-16 w-full gap-2 place-content-center">
        {lands.map((land) => {
          return <Land key={land.id} land={land} onClick={tapLand} />;
        })}
      </div>
      <button onClick={resetLands}>Untap Lands</button>
      <button onClick={removeAllLands}>New Game</button>
    </div>
  );
};

export default FilterSection;
