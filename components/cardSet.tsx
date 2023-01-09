import Link from "next/link";
import Image from "next/image";

//"mid", "vow", "neo",
const sets = ["snc", "dmu", "bro"];

const CardSet = () => {
  return (
    <ul className="flex flex-row flex-wrap gap-6 place-content-center pt-8 pb-16">
      {sets.map((set, ind) => {
        return (
          <li
            key={ind}
            className="self-center h-20 lg:h-32 w-auto flex flex-row  place-content-center"
          >
            <Link href={`/set/${set}`} passHref legacyBehavior>
              <a className="flex relative w-24 sm:w-48">
                <Image
                  src={`/${set}.svg`}
                  alt={`mtg set ${set} link`}
                  className="self-center"
                  fill
                />
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default CardSet;
