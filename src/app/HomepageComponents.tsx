"use client";

import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import { AnimationWrapper, animations } from "../components";
import { Scroller, MobileScroller } from "../components/elements/home-page/Scrollers";
import { useAnimateScroll } from "../hooks";

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
          <p className="text-4xl font-semibold md:mr-10">Ilusat suve!</p>
          <p className="text-2xl md:mr-10">Avame registreerimise Augusti lõpus!</p>
        </AnimationWrapper>

        <AnimationWrapper
          ref={section1ImageRef}
          animate={section1ImageControl}
          variants={animations.pageItems.fadeInFromRight}
        >
          <Image
            width={1439}
            height={751}
            priority
            className="w-full m-auto md:max-w-lg rounded-xl"
            alt="house"
            src="/general/home/parnu-front.png"
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
            priority
            className="w-full m-auto md:max-w-md rounded-xl"
            alt="house"
            src="/general/home/big-group-janeda.png"
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
  const copyY = useTransform(scrollYProgress, [0, 0.75], ["0%", "7.5%"]);

  return (
    <motion.div
      style={{
        scale: copyScale,
        opacity: copyOpacity,
        y: copyY,
      }}
      className="absolute z-20 flex flex-col items-center justify-center w-full h-screen px-8"
    >
      <p className="text-4xl font-semibold md:mr-10">Ilusat suve!</p>
      <p className="text-2xl md:mr-10">Avame registreerimise Augusti lõpus!</p>
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

const Images = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  const image1Offset = useTransform(scrollYProgress, [0, 1], ["-35%", "0%"]);

  const image2OffsetX = useTransform(scrollYProgress, [0, 1], ["30%", "0%"]);
  const image2OffsetY = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);

  const image3OffsetX = useTransform(scrollYProgress, [0, 1], ["-25%", "0%"]);
  const image3OffsetY = useTransform(scrollYProgress, [0, 1], ["25%", "0%"]);

  const image4OffsetX = useTransform(scrollYProgress, [0, 1], ["25%", "0%"]);
  const image4OffsetY = useTransform(scrollYProgress, [0, 1], ["-145%", "0%"]);

  const image5OffsetX = useTransform(scrollYProgress, [0, 1], ["-25%", "0%"]);
  const image5OffsetY = useTransform(scrollYProgress, [0, 1], ["25%", "0%"]);

  const image6OffsetX = useTransform(scrollYProgress, [0, 1], ["25%", "0%"]);
  const image6OffsetY = useTransform(scrollYProgress, [0, 1], ["25%", "0%"]);

  return (
    <>
      <motion.div
        className="relative z-10 col-span-2"
        style={{
          backgroundImage:
            "url(https://wqdplpmiyvwmetnipmwd.supabase.co/storage/v1/object/sign/images/nuke33.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvbnVrZTMzLnBuZyIsImlhdCI6MTY4OTE4ODUxNSwiZXhwIjoxNzIwNzI0NTE1fQ.yX25ThF5Biq6EQd5VFqFT0JqfOb0hThWCZ4oyScTFv0&t=2023-07-12T19%3A01%3A55.569Z)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          scale,
          x: image1Offset,
          y: image1Offset,
        }}
      />
      <motion.div
        className="relative z-10 row-span-2"
        style={{
          backgroundImage:
            "url(https://wqdplpmiyvwmetnipmwd.supabase.co/storage/v1/object/sign/images/55.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvNTUucG5nIiwiaWF0IjoxNjg5MTg4NDkzLCJleHAiOjE3MjA3MjQ0OTN9.zRwyNc11lFsxvCIs1SwifMFi3xvIyip1qEpDoWyhdbI&t=2023-07-12T19%3A01%3A32.811Z)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          scale,
          x: image2OffsetX,
          y: image2OffsetY,
        }}
      />

      <motion.div
        className="relative z-10 row-span-2"
        style={{
          backgroundImage:
            "url(https://wqdplpmiyvwmetnipmwd.supabase.co/storage/v1/object/sign/images/nuke45.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvbnVrZTQ1LnBuZyIsImlhdCI6MTY4OTE4ODU0NiwiZXhwIjoxNzIwNzI0NTQ2fQ.CDQOkl-CSQyYYcn39zPp1LnGMg9TjLwBDYAAlkZqwMY&t=2023-07-12T19%3A02%3A26.751Z)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          scale,
          x: image3OffsetX,
          y: image3OffsetY,
        }}
      />
      <motion.div
        className="relative z-10"
        style={{
          backgroundImage:
            "url(https://wqdplpmiyvwmetnipmwd.supabase.co/storage/v1/object/sign/images/nuke5.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvbnVrZTUucG5nIiwiaWF0IjoxNjg5MTg4NTUzLCJleHAiOjE3MjA3MjQ1NTN9.JwR77HQcBm7VKE2fNMx5AA-VLTWDBqea8gQvFO4DA78&t=2023-07-12T19%3A02%3A33.025Z)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          scale,
          x: image4OffsetX,
          y: image4OffsetY,
        }}
      />

      <motion.div
        className="relative z-10"
        style={{
          backgroundImage:
            "url(https://wqdplpmiyvwmetnipmwd.supabase.co/storage/v1/object/sign/images/nuke55.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvbnVrZTU1LnBuZyIsImlhdCI6MTY4OTE4ODU1OSwiZXhwIjoxNzIwNzI0NTU5fQ.7MNFQrzP2C2hF91a0sYJIXJUCf9bamY_pA_LNCmdIkM&t=2023-07-12T19%3A02%3A39.361Z)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          scale,
          x: image5OffsetX,
          y: image5OffsetY,
        }}
      />
      <motion.div
        className="relative z-10"
        style={{
          backgroundImage:
            "url(https://wqdplpmiyvwmetnipmwd.supabase.co/storage/v1/object/sign/images/suke54.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvc3VrZTU0LnBuZyIsImlhdCI6MTY4OTE4ODU2NSwiZXhwIjoxNzIwNzI0NTY1fQ.u6lx5LErPoXhFFVIBqHtwTASBBqkIVwyzcMjexNxZDI&t=2023-07-12T19%3A02%3A45.709Z)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          scale,
          x: image6OffsetX,
          y: image6OffsetY,
        }}
      />
    </>
  );
};

const Circles = () => (
  <>
    <div className="w-3/5 max-w-[850px] min-w-[400px] aspect-square border-[8px] border-slate-200 rounded-full absolute z-0 left-0 top-0 -translate-x-[50%] -translate-y-[50%]" />
    <div className="w-1/2 max-w-[600px] min-w-[300px] aspect-square border-[8px] border-slate-200 rounded-full absolute z-0 right-0 bottom-0 translate-x-[50%] translate-y-[50%]" />
  </>
);

export const Section2 = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  return (
    <>
      {/* <Nav scrollYProgress={scrollYProgress} /> */}
      <section ref={targetRef} className="bg-surface-bg h-[350vh] w-full">
        <div className="sticky top-0 z-0 grid h-screen grid-cols-3 grid-rows-3 gap-4 p-4 overflow-hidden">
          <Copy scrollYProgress={scrollYProgress} />
          <Images scrollYProgress={scrollYProgress} />

          {/* <Circles /> */}
        </div>
      </section>

      <div className="flex items-center justify-center h-screen text-white bg-surface-bg">
        <span>Other content here {":)"}</span>
      </div>
    </>
  );
};
