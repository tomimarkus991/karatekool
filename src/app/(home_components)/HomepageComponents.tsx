"use client";

import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import BigGroupJaneda from "public/general/home/big-group-janeda.png";
import KlubiImage from "public/general/home/club-all.png";
import JohannImage from "public/general/home/johann.png";
import PoisidKata from "public/general/home/kata-competition.png";
import OldNuke from "public/general/home/nuke-old-image.png";
import ParnuImage from "public/general/home/parnu-front.png";

import { AnimationWrapper, animations } from "../../components";
import { Scroller, MobileScroller } from "../../components/elements/home-page/Scrollers";
import { LetterDecryptor } from "../../components/elements/LetterDecryptor";
import { EmailSender } from "../../components/elements/navigation/EmailSender";
import { Footer } from "../../components/elements/navigation/Footer";
import { NavbarTop } from "../../components/elements/navigation/NavbarTop";
import { Sidebar } from "../../components/elements/sidebar/Sidebar";
import { useAnimateScroll } from "../../hooks";

import CherryBranch from "./cherry-branch.png";
import CherryTree from "./cherry-tree.png";
import Crane from "./crane.png";
import KarateDoKanji from "./karate-do-kanji.png";
import Samurai from "./samurai.png";
import Tiger from "./tiger-hero.png";

export const Section1 = () => {
  const scrollToRef = useRef<any>(null);
  const { control: section1ImageControl, ref: section1ImageRef } = useAnimateScroll();
  const { control: section1TextControl, ref: section1TextRef } = useAnimateScroll();

  const { control: section2ImageControl, ref: section2ImageRef } = useAnimateScroll();
  const { control: section2TextControl, ref: section2TextRef } = useAnimateScroll();

  const handleClick = () => {
    scrollToRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="relative flex flex-col overflow-hidden md:mt-12 md:flex-row">
        <AnimationWrapper
          className="self-center mb-3 text-center md:mb-0"
          ref={section1TextRef}
          animate={section1TextControl}
          variants={animations.pageItems.fadeInFromLeft}
        >
          <p className="text-4xl font-semibold">Ilusat suve!</p>
          <p className="text-2xl">Avame registreerimise Augusti lõpus!</p>
        </AnimationWrapper>

        <AnimationWrapper
          ref={section1ImageRef}
          animate={section1ImageControl}
          variants={animations.pageItems.fadeInFromRight}
        >
          <Image
            width={1439}
            height={751}
            className="w-full m-auto md:max-w-lg rounded-xl"
            alt="house"
            src={ParnuImage}
          />
        </AnimationWrapper>

        <Scroller scroll={handleClick} />
        <MobileScroller scroll={handleClick} />
      </div>

      <div ref={scrollToRef} className="mb-[3rem]"></div>
      <div className="flex flex-col md:flex-row mt-[5rem] overflow-hidden">
        <AnimationWrapper
          ref={section2ImageRef}
          animate={section2ImageControl}
          variants={animations.pageItems.fadeInFromLeft}
        >
          <Image
            width={1439}
            height={751}
            className="w-full m-auto md:max-w-md rounded-xl"
            alt="house"
            src={BigGroupJaneda}
          />
        </AnimationWrapper>

        <AnimationWrapper
          className="self-center mt-5 text-center md:ml-4 md:mt-0"
          ref={section2TextRef}
          animate={section2TextControl}
          variants={animations.pageItems.fadeInFromRight}
        >
          <p className="text-3xl font-semibold md:mr-10">Lorem ipsum!</p>
        </AnimationWrapper>
      </div>
    </>
  );
};

// const Nav = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
//   const background = useTransform(scrollYProgress, (i: number) =>
//     i === 1 ? "rgb(13,10,9)" : "transparent",
//   );

//   return (
//     <motion.nav
//       style={{ background }}
//       className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-4 py-2 transition-colors"
//     >
//       <div className="flex items-center gap-2 text-lg text-white">
//         <AiFillFileImage className="text-xl" />
//         <span className="font-bold">PIXII</span>
//       </div>
//       <button className="text-sm bg-white text-black hover:opacity-90 transition-opacity font-semibold flex items-center gap-1.5 px-3 py-1.5">
//         <AiFillApple className="text-lg" />
//         <span>Download</span>
//       </button>
//     </motion.nav>
//   );
// };

const Copy = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  const copyScale = useTransform(scrollYProgress, [0, 0.75], [1, 0.5]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 0.75], ["-10%", "7.5%"]);

  return (
    <motion.div
      style={{
        scale: copyScale,
        opacity: copyOpacity,
        y: copyY,
      }}
      className="absolute z-20 flex flex-col items-center justify-center w-full h-screen px-8"
    >
      <p className="text-4xl font-semibold">Ilusat suve!</p>
      <p className="text-2xl">Avame registreerimise Augusti lõpus!</p>
      <div className="flex items-center gap-4">
        {/* <button className="px-4 py-2 font-medium text-white transition-colors bg-violet-600 hover:bg-violet-600">
          Try for free
        </button>
        <button className="px-4 py-2 font-medium transition-colors bg-transparent hover:bg-stone-200 text-stone-950">
          Learn about us
        </button> */}
      </div>
    </motion.div>
  );
};

export const Images = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  const image2OffsetX = useTransform(scrollYProgress, [0, 1], ["30%", "0%"]);
  const image2OffsetY = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);

  const image6OffsetX = useTransform(scrollYProgress, [0, 1], ["-5%", "0%"]);
  const image6OffsetY = useTransform(scrollYProgress, [0, 1], ["-35%", "0%"]);

  const image4OffsetX = useTransform(scrollYProgress, [0, 1], ["25%", "0%"]);
  const image4OffsetY = useTransform(scrollYProgress, [0, 1], ["-145%", "0%"]);

  const image3OffsetX = useTransform(scrollYProgress, [0, 1], ["-115%", "0%"]);
  const image3OffsetY = useTransform(scrollYProgress, [0, 1], ["25%", "0%"]);

  const image5OffsetX = useTransform(scrollYProgress, [0, 1], ["10%", "0%"]);
  const image5OffsetY = useTransform(scrollYProgress, [0, 1], ["25%", "0%"]);

  const image1OffsetX = useTransform(scrollYProgress, [0, 1], ["-0%", "0%"]);
  const image1OffsetY = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);

  return (
    <>
      <motion.div
        className="relative z-10 h-full col-span-2 overflow-hidden"
        style={{
          // backgroundSize: "cover",
          // backgroundPosition: "center",
          scale,
          x: image2OffsetX,
          y: image2OffsetY,
        }}
      >
        <Image src={BigGroupJaneda} quality={100} alt="jäneda laager" placeholder="blur" />
      </motion.div>
      <motion.div
        className="relative z-10"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          scale,
          x: image6OffsetX,
          y: image6OffsetY,
        }}
      >
        <Image
          src={PoisidKata}
          alt="Kata"
          quality={100}
          className="aspect-[2/1]"
          placeholder="blur"
        />
      </motion.div>
      <motion.div
        className="relative z-10"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          scale,
          x: image4OffsetX,
          y: image4OffsetY,
        }}
      >
        <Image src={JohannImage} alt="johann" width={2000} height={2000} placeholder="blur" />
      </motion.div>
      <motion.div
        className="relative z-10"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          scale,
          x: image3OffsetX,
          y: image3OffsetY,
        }}
      >
        <Image src={ParnuImage} alt="Pärnu" width={2000} height={2000} placeholder="blur" />
      </motion.div>
      <motion.div
        className="relative z-10"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          scale,
          x: image5OffsetX,
          y: image5OffsetY,
        }}
      >
        <Image src={OldNuke} alt="Nüke" width={2000} height={2000} placeholder="blur" />
      </motion.div>
      <motion.div
        className="relative z-10 col-span-3"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          scale,
          x: image1OffsetX,
          y: image1OffsetY,
        }}
      >
        <Image src={KlubiImage} alt="Nüke" width={2000} height={2000} placeholder="blur" />
      </motion.div>
    </>
  );
};

export const Section2 = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  return (
    <>
      {/* <Nav scrollYProgress={scrollYProgress} /> */}
      <section ref={targetRef} className="bg-surface-bg h-[200vh] w-full">
        <div className="sticky top-0 z-0 grid h-screen grid-cols-3 grid-rows-3 gap-4 p-4 overflow-hidden">
          <Copy scrollYProgress={scrollYProgress} />
          {/* <Images scrollYProgress={scrollYProgress} /> */}
          <Scroller />
          <MobileScroller />
          {/* <Circles /> */}
        </div>
      </section>

      {/* <div className="flex items-center justify-center h-screen text-white bg-surface-bg"> */}
      {/* <span>Other content here {":)"}</span> */}
      {/* </div> */}
    </>
  );
};

export const MainComponent = () => {
  // const { control: section1ImageControl, ref: section1ImageRef } = useAnimateScroll();
  const { control: section1TextControl, ref: section1TextRef } = useAnimateScroll();
  const { control: cherryTreeTextControl, ref: cherryTreeTextRef } = useAnimateScroll();
  const { control: cherryBranchTextControl, ref: cherryBranchTextRef } = useAnimateScroll();
  const { control: samuraiTextControl, ref: samuraiTextRef } = useAnimateScroll();
  const { control: craneTextControl, ref: craneTextRef } = useAnimateScroll();

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
            src={Tiger}
            placeholder="blur"
            alt="tiiger"
            className="object-cover lg:ml-28 pointer-events-none md:!object-[88%] object-[75%] 2xl:!scale-[.85] sm:!scale-80 md:!scale-75 lg:!scale-[.84] select-none lg:mt-0 mt-28"
          />

          <div className="flex flex-col justify-start items-start px-6 lg:absolute z-10 lg:left-0 lg:!top-[30%] lg:ml-16 xl:ml-32 2xl:ml-80">
            <AnimationWrapper
              className="mx-auto mb-5 text-center md:mb-0"
              ref={section1TextRef}
              animate={section1TextControl}
              variants={animations.pageItems.fadeInFromLeft}
            >
              <p className="text-4xl font-semibold md:text-5xl lg:text-[6xl]">Ilusat suve!</p>
              <p className="text-xl md:text-2xl lg:text-[3xl]">
                Avame registreerimise Augusti lõpus!
              </p>
            </AnimationWrapper>

            <AnimationWrapper
              className="mx-auto text-center sm:mt-16 lg:mt-28"
              ref={section1TextRef}
              animate={section1TextControl}
              variants={animations.pageItems.fadeInFromLeftDelayed}
            >
              <p className="text-2xl font-semibold sm:text-3xl md:text-4xl">
                <LetterDecryptor delay={1250} time={1000}>
                  Nüke 35-hooaeg, 2023/2024
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
                quality={100}
                alt="cherry tree"
                className="w-[40rem]"
                placeholder="blur"
              />
            </div>
            <div className="flex flex-col-reverse sm2:flex-col">
              <Image
                src={KarateDoKanji}
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
              quality={100}
              alt="cherry branch"
              className="w-[30rem]"
              placeholder="blur"
            />
          </div>

          <div className="flex flex-col-reverse sm2:flex-row items-center justify-around max-w-[90rem] mx-auto mt-32">
            <Image
              src={Samurai}
              quality={100}
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
              quality={100}
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
    // <div className="relative flex flex-col overflow-hidden md:mt-12 md:flex-row">
    //   <AnimationWrapper
    //     className="self-center mb-3 text-center md:mb-0"
    //     ref={section1TextRef}
    //     animate={section1TextControl}
    //     variants={animations.pageItems.fadeInFromLeft}
    //   >
    //     <p className="text-4xl font-semibold">Ilusat suve!</p>
    //     <p className="text-2xl">Avame registreerimise Augusti lõpus!</p>
    //   </AnimationWrapper>

    //   <AnimationWrapper
    //     ref={section1ImageRef}
    //     animate={section1ImageControl}
    //     variants={animations.pageItems.fadeInFromRight}
    //   >
    // <Image
    //   priority
    //   quality={100}
    //   src={Tiger}
    //   placeholder="blur"
    //   alt="tiiger"
    //   className="object-cover rounded-lg pointer-events-none select-none ml-44 w-96"
    //   style={{ objectPosition: "75%" }}
    // />
    //   </AnimationWrapper>

    //   <Scroller />
    //   <MobileScroller />
    // </div>
  );
};

// const Circles = () => (
//   <>
//     <div className="w-3/5 max-w-[850px] min-w-[400px] aspect-square border-[8px] border-slate-200 rounded-full absolute z-0 left-0 top-0 -translate-x-[50%] -translate-y-[50%]" />
//     <div className="w-1/2 max-w-[600px] min-w-[300px] aspect-square border-[8px] border-slate-200 rounded-full absolute z-0 right-0 bottom-0 translate-x-[50%] translate-y-[50%]" />
//   </>
// );
