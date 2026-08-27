"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

// import { Scroller, MobileScroller } from "../../components/elements/home-page/Scrollers";
// import { LetterDecryptor } from "../../components/elements/LetterDecryptor";
// import { EmailSender } from "../../components/elements/navigation/EmailSender";
// import { Footer } from "../../components/elements/navigation/Footer";
// import { Sidebar } from "../../components/elements/sidebar/Sidebar";
// import { NavbarTop } from "../../components/elements/navigation/NavbarTop";
// const AnimationWrapper = dynamic(() =>
//   import("../../components/animations/AnimationWrapper").then(mod => mod.AnimationWrapper),
// );
const Scroller = dynamic(() =>
  import("../../components/elements/home-page/Scrollers").then(mod => mod.Scroller),
);
const MobileScroller = dynamic(() =>
  import("../../components/elements/home-page/Scrollers").then(mod => mod.MobileScroller),
);

const LetterDecryptor = dynamic(() =>
  import("../../components/elements/LetterDecryptor").then(mod => mod.LetterDecryptor),
);

const EmailSender = dynamic(() =>
  import("../../components/elements/navigation/EmailSender").then(mod => mod.EmailSender),
);
const Footer = dynamic(() =>
  import("../../components/elements/navigation/Footer").then(mod => mod.Footer),
);
const NavbarTop = dynamic(() =>
  import("../../components/elements/navigation/NavbarTop").then(mod => mod.NavbarTop),
);

const Sidebar = dynamic(() =>
  import("../../components/elements/sidebar/Sidebar").then(mod => mod.Sidebar),
);

import { AnimationWrapper, animations } from "../../components";
import { CurrentYear, getIfUserCanRegisterToClub } from "../../config";
import { useAnimateScroll } from "../../hooks";
import { cn } from "../../lib";

import CherryBranch from "./cherry-branch.jpg";
import CherryTree from "./cherry-tree.jpg";
import Crane from "./crane.jpg";
import KarateDoKanji from "./karate-do-kanji.png";
import Samurai from "./samurai.jpg";
import Tiger from "./tiger-hero.jpg";

export const MainComponent = () => {
  // const { control: section1ImageControl, ref: section1ImageRef } = useAnimateScroll();
  const { control: section1TextControl, ref: section1TextRef } = useAnimateScroll();
  const { control: cherryTreeTextControl, ref: cherryTreeTextRef } = useAnimateScroll();
  const { control: cherryBranchTextControl, ref: cherryBranchTextRef } = useAnimateScroll();
  const { control: samuraiTextControl, ref: samuraiTextRef } = useAnimateScroll();
  const { control: craneTextControl, ref: craneTextRef } = useAnimateScroll();

  const year = `Nüke ${CurrentYear}-õppeaasta!`;

  // const targetRef = useRef<HTMLDivElement | null>(null);
  // const { scrollYProgress } = useScroll({
  //   target: targetRef,
  // });

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <NavbarTop bg="bg-white" />
      <div className="pt-32 sm2:pt-8">
        <div className="flex flex-col w-full min-h-screen md:min-h-[90vh]">
          <Image
            priority
            fill
            quality={100}
            loading="eager"
            src={Tiger}
            placeholder="blur"
            alt="tiiger"
            className="object-cover lg:ml-28 pointer-events-none md:!object-[88%] object-[75%] 2xl:!scale-[.85] sm:!scale-80 md:!scale-75 lg:!scale-[.84] select-none lg:mt-0 mt-28"
          />

          <div className="flex flex-col justify-start items-start px-6 lg:absolute z-10 md:z-0 lg:left-0 lg:!top-[30%] lg:ml-16 xl:ml-32 2xl:ml-80">
            {getIfUserCanRegisterToClub() ?? (
              <AnimationWrapper
                className="mx-auto mb-5 text-center md:mb-0"
                ref={section1TextRef}
                animate={section1TextControl}
                variants={animations.pageItems.fadeInFromLeft}
              >
                <p className="mb-4 text-2xl font-semibold text-center sm:text-3xl md:text-4xl">
                  Klubisse registreerumine on alanud!
                </p>
                <AnimationWrapper variants={animations.smallScale}>
                  <Link href="/registreerimise-info">
                    <p className="text-xl underline text-secondary md:text-2xl xl:text-3xl">
                      Registreerimise info
                    </p>
                  </Link>
                </AnimationWrapper>
              </AnimationWrapper>
            )}

            <AnimationWrapper
              className="mx-auto text-center sm:mt-8 lg:mt-20"
              ref={section1TextRef}
              animate={section1TextControl}
              variants={animations.pageItems.fadeInFromLeftDelayed}
            >
              <p
                className={cn(
                  "text-3xl font-semibold md:text-4xl xl:text-5xl",
                  "text-transparent bg-clip-text bg-secondary-gradient animate-text",
                )}
              >
                <LetterDecryptor delay={1250} time={1250}>
                  {year}
                </LetterDecryptor>
              </p>
            </AnimationWrapper>
          </div>
          {/* <div className="relative lg:absolute z-10 top-[40%] md:!top-[70%] lg:!top-[50%] lg:ml-112 xl:ml-24 2xl:ml-64">

          </div> */}
          {/* <section ref={targetRef} className="relative h-[200vh] w-full max-w-7xl mx-auto">
            <div className="sticky top-[120%] z-0 grid h-screen grid-cols-3 grid-rows-3 gap-4 p-4">
              <Images scrollYProgress={scrollYProgress} />
            </div>
          </section> */}
          <Scroller />
          <MobileScroller />
        </div>
        <div className="px-2 overflow-hidden">
          <div className="flex flex-col sm2:flex-row items-center justify-around max-w-[90rem] mx-auto">
            <div>
              <Image
                src={CherryTree}
                loading="lazy"
                alt="cherry tree"
                className="w-[40rem]"
                placeholder="blur"
              />
            </div>
            <div className="flex flex-col-reverse sm2:flex-col">
              <Image
                src={KarateDoKanji}
                loading="lazy"
                alt="karate-do kanji"
                className="w-[22rem] self-center sm2:w-[30rem]"
                placeholder="blur"
              />
              <AnimationWrapper
                className="max-w-sm mx-auto mb-20 md:max-w-md sm2:mt-20"
                ref={cherryTreeTextRef}
                animate={cherryTreeTextControl}
                variants={animations.pageItems.fadeInFromRight}
              >
                <p className="text-xl text-center md:text-2xl">
                  Nükes järgitakse karate-do alusväärtusi, mille põhirõhk on asetatud iseloomu- ja
                  väärtuskasvatusele.
                </p>
              </AnimationWrapper>
            </div>
          </div>
          <div className="flex flex-col sm2:flex-row items-center justify-around max-w-[90rem] mx-auto mt-32">
            <AnimationWrapper
              className="max-w-sm mx-auto mb-20 md:max-w-md sm2:mt-20"
              ref={cherryBranchTextRef}
              animate={cherryBranchTextControl}
              variants={animations.pageItems.fadeInFromLeft}
            >
              <p className="text-xl text-center md:text-2xl lg:text-left">
                Klubi Nüke on kõige pikema traditsiooniga karateklubi Eestis. Meil on heade
                kogemuste ja oskustega treenerid, selle tunnistuseks on rahulolevate harjutajate
                suur hulk.
              </p>
            </AnimationWrapper>

            <Image
              src={CherryBranch}
              loading="lazy"
              alt="cherry branch"
              className="w-[30rem]"
              placeholder="blur"
            />
          </div>

          <div className="flex flex-col-reverse sm2:flex-row items-center justify-around max-w-[90rem] mx-auto mt-32">
            <Image
              src={Samurai}
              loading="lazy"
              alt="samurai"
              className="w-[28rem] md:w-[34rem] lg:w-[38rem]"
              placeholder="blur"
            />

            <AnimationWrapper
              className="max-w-sm mx-auto mb-20 md:max-w-md sm2:mt-20"
              ref={samuraiTextRef}
              animate={samuraiTextControl}
              variants={animations.pageItems.fadeInFromRight}
            >
              <p className="text-xl text-center md:text-2xl lg:text-left">
                Karated õppides ja harjutades omandab õpilane enesearendamiseks ja eluks vajalikke
                teadmisi, oskusi ja võimeid.
              </p>
            </AnimationWrapper>
          </div>

          <div className="flex flex-col sm2:flex-row items-center justify-around max-w-[90rem] mx-auto mt-32">
            <AnimationWrapper
              className="max-w-sm mx-auto mb-20 md:max-w-md sm2:mt-20"
              ref={craneTextRef}
              animate={craneTextControl}
              variants={animations.pageItems.fadeInFromLeft}
            >
              <p className="text-xl text-center md:text-2xl lg:text-left">
                Tähtis ei ole mitte õpilase võit ega kaotus, vaid õpilase areng, treeningutel
                rõhutatakse tööpanust ja pingutuse määra.
              </p>
            </AnimationWrapper>

            <Image
              src={Crane}
              loading="lazy"
              alt="crane"
              className="w-[28rem] md:w-[34rem] lg:w-[38rem]"
              placeholder="blur"
            />
          </div>
        </div>
      </div>
      <Sidebar />
      <Footer bg="bg-white" />
      <EmailSender />
    </div>
  );
};
