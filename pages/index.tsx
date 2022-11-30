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

// export const getStaticProps = async () => {
//   const res = await fetch(
//     "https://api.magicthegathering.io/v1/cards?set=NEO&pageSize=2"
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
//   return {
//     props: {
//       data,
//     },
//   };
// };

import CardSet from "./cardSet";
import FilterSection from "../components/filterSection";

export default function Home() {
  return (
    <main>
      <h1>Welcome, Gamer!</h1>
      <h2>Select which set you will be playing today</h2>
      <CardSet />
    </main>
  );
}
