// interface Card {
//   id: string;
//   name: string;
//   manaCost: string | null;
//   cmc: number;
//   colors: Array<string>;
//   colorIdentity: Array<string>;
//   types: Array<string>;
//   imageUrl: string | null;
//   variations: Array<string> | null;
// }

// export const getCards = async (set: string, n: number) => {
//   const res = await fetch(
//     `https://api.magicthegathering.io/v1/cards?set=${set}&page=${n.toString()}`
//   );
//   const { cards } = await res.json();
//   const data = cards.map((card: Card) => {
//     return {
//       id: card.id,
//       name: card.name,
//       manaCost: card.manaCost != undefined ? card.manaCost : null,
//       cmc: card.cmc,
//       colors: card.colors,
//       colorIdentity: card.colorIdentity,
//       types: card.types,
//       imageUrl: card.imageUrl != undefined ? card.imageUrl : null,
//       variations: card.variations != undefined ? card.variations : null,
//     };
//   });
//   return data;
// };

// export const getFullSet = async () => {
//   let fullSet: Array<Card> = [];
//   let done = false;
//   let i = 0;
//   while (!done) {
//     let data: Array<Card> = await getCards("NEO", i + 1);
//     if (data.length == 0) {
//       done = true;
//       break;
//     }
//     fullSet.concat(data);
//     i++;
//   }
//   return fullSet;
// };

// let fs = await getFullSet();

// console.table(fs);
// let hehe: {
//   manaCost: string;
//   cmc: number;
// }[] = [
//   { manaCost: "2{W}{W}", cmc: 4 },
//   { manaCost: "1{R}", cmc: 2 },
//   { manaCost: "{W}{B}{U}", cmc: 3 },
//   { manaCost: "2", cmc: 2 },
// ];

const hehe = [
  "2{W}{W}",
  "1{R}",
  "{W}{B}{U}",
  "2",
  "1{W}{W}{R}{R}",
  "{W}{W}{W}{R}{R}{B}{B}{B}",
];

const getPipFromColor = (color) => {
  if (color === "Blue") return "U";
  return color[0];
};

let lands = [
  "White",
  "White",
  "Red",
  "Red",
  "Black",
  "White",
  "Black",
  "Black",
  "Blue",
];

const landPipCount = lands
  .map((l) => getPipFromColor(l))
  .reduce((all, land) => {
    const currentLand = all[land] ?? 0;
    return {
      ...all,
      [land]: currentLand + 1,
    };
  }, {});
console.log(landPipCount);

//loop over all manaCosts
let colorCostQuery = hehe.filter((manaCost) => {
  let pips = manaCost.match(/[WBRUG]/g);

  // check for artifacts or single coloured cards; already passed color query
  if (!pips || pips.length == 1) return true;
  //else check if all pips satisfied
  if (pips.length > 1) {
    const CostPipCount = pips.reduce((all, pip) => {
      const currentPip = all[pip] ?? 0;
      return {
        ...all,
        [pip]: currentPip + 1,
      };
    }, {});
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
console.log(colorCostQuery);

// const getPipFromColor = (color) => {
//   if (color === "Blue") return "U";
//   return color[0];
// };

// const getPipsFromColors = (arr) => {
//   let res = [];
//   arr.forEach((el) => {
//     el.forEach((subEl) => {
//       res.push(getPipFromColor(subEl));
//     });
//   });
//   return res;
// };

// let lands = [["White", "Green"], ["Green"], ["Red", "Black", "Blue"]];

// console.log(getPipsFromColors(lands));
