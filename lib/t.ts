interface Card {
  id: string;
  name: string;
  manaCost: string | null;
  cmc: number;
  colors: Array<string>;
  colorIdentity: Array<string>;
  types: Array<string>;
  imageUrl: string | null;
  variations: Array<string> | null;
}

export const getCards = async (set: string, n: number) => {
  const res = await fetch(
    `https://api.magicthegathering.io/v1/cards?set=${set}&page=${n.toString()}`
  );
  const { cards } = await res.json();
  const data = cards.map((card: Card) => {
    return {
      id: card.id,
      name: card.name,
      manaCost: card.manaCost != undefined ? card.manaCost : null,
      cmc: card.cmc,
      colors: card.colors,
      colorIdentity: card.colorIdentity,
      types: card.types,
      imageUrl: card.imageUrl != undefined ? card.imageUrl : null,
      variations: card.variations != undefined ? card.variations : null,
    };
  });
  return data;
};

export const getFullSet = async () => {
  let fullSet: Array<Card> = [];
  let done = false;
  let i = 0;
  while (!done) {
    let data: Array<Card> = await getCards("NEO", i + 1);
    if (data.length == 0) {
      done = true;
      break;
    }
    fullSet.concat(data);
    i++;
  }
  return fullSet;
};

let fs = await getFullSet();

console.table(fs);
