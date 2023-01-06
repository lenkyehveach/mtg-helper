import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <main className="bg-lavender md:h-screen md:flex md:place-content-center">
      <section className="md:h-auto flex flex-col place-content-center bg-gold leading-snug py-4 px-4 md:my-4 md:mx-4 md:text-center md:text-2xl md:border md:border-kobe md:rounded-xl relative text-kobe">
        <h1 className="text-lg md:text-4xl mt-4 font-bold text-center">
          So You&#39;re about to play a game of limited
        </h1>
        <p className="text-center ">
          ...but a new format just dropped (or it&#39;s an old one and you
          can&#39;t be asked to learn all the cards in that set), how will you
          know what to play around?{" "}
        </p>
        <ul className="pt-4">
          <li>
            1. Choose the set you&#39;re about to play as the game starts and
            add lands as the opponent plays them
          </li>

          <li className="flex place-content-center py-2">
            <Image
              src="/LS1.jpg"
              alt="image of the land selection section"
              width={300}
              height={100}
            />
          </li>
          <li>
            2. Choose which phase it currently is (opponent&#39;s main phase,
            combat or your turn)
          </li>
          <li className="flex place-content-center py-2">
            <Image
              src="/PS2.jpg"
              alt="image of the phase selection buttons"
              width={300}
              height={100}
            />
          </li>
          <li>
            {" "}
            we&#39;ll show you what cards the opponent can play (what you should
            play around) with the coloured lands they have
          </li>
          <li className="pt-4">
            3. The game is now underway and the opponent passed turn leaving 2
            mana open, could they have something? Rather than resetting and
            adding the lands all over again, click them to tap them just like in
            the game. The cards they can play will be updated accordingly
          </li>
          <li className="flex place-content-center py-2">
            <Image
              src="/res4.jpg"
              alt="image of the phase selection buttons"
              width={300}
              height={100}
            />
          </li>
          <li className="font-bold text-center">
            Now, good luck, hopefully this tool helps you get that trophy!
          </li>
        </ul>

        <Link href="/" passHref legacyBehavior>
          <a>
            <div className="flex place-content-center pb-4 ">
              <Image
                src="/arrow_left.svg"
                alt="back arrow to navigate to home page"
                width={48}
                height={48}
              />
              <p className="self-center text-lg font-bold">Start</p>
            </div>
          </a>
        </Link>
      </section>
    </main>
  );
};

export default About;
