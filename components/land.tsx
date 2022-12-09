import { LandType } from "./filterSection";

interface LandProps {
  land: LandType;
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
    <div className="h-20 w-12" style={{ opacity: land.tapped ? "0.5" : "1" }}>
      <button
        className={"h-full w-full border border-slate-300 "}
        style={styles}
        onClick={() => onClick(land.id)}
      ></button>
    </div>
  );
};
export default Land;
