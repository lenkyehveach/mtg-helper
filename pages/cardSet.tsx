import bro from "../public/BRO_mythic_webp.webp";
import neo from "../public/NEO_mythic.png";

import Link from "next/link";
import Image from "next/image";

const CardSet = () => {
  return (
    <nav>
      <ul className="flex flex-col md:flex-row md:h-15 md:w-screen">
        <li>
          <Link href="set/BRO">
            <Image
              src={bro}
              alt="Brother's War set symbol"
              width={300}
              height={300}
            />
          </Link>
        </li>
        <li>
          <Link href="set/NEO">
            <Image
              src={neo}
              alt="Kamigawa: Neon Dynasty set symbol"
              width={400}
              height={300}
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default CardSet;
