"use client";

import Image from "next/image";
import { useRef } from "react";

import { AnimationWrapper, animations } from "../components";
import { Scroller, MobileScroller } from "../components/elements/home-page/Scrollers";
import { LetterDecryptor } from "../components/elements/LetterDecryptor";
import { useAnimateScroll } from "../hooks";

export const Section1 = () => {
  const scrollToRef = useRef<any>(null);
  const { control: section1ImageControl, ref: section1ImageRef } = useAnimateScroll();
  const { control: section1TextControl, ref: section1TextRef } = useAnimateScroll();

  const handleClick = () => {
    scrollToRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row mt-[10rem] relative">
        <div className="md:min-w-[30rem] self-center">
          <AnimationWrapper
            ref={section1TextRef}
            animate={section1TextControl}
            variants={animations.pageItems.fadeInFromLeft}
          >
            <p className="mr-10 text-3xl font-semibold text-center">
              <LetterDecryptor>Tule õpi karated!</LetterDecryptor>
            </p>
          </AnimationWrapper>
        </div>

        <AnimationWrapper
          ref={section1ImageRef}
          animate={section1ImageControl}
          variants={animations.pageItems.fadeInFromRight}
        >
          <Image
            width={1439}
            height={751}
            priority
            className="w-[60%] m-auto md:max-w-lg rounded-xl"
            alt="house"
            src="/general/home/parnu-front.png"
          />
        </AnimationWrapper>

        <Scroller scroll={handleClick} />
        <MobileScroller scroll={handleClick} />
      </div>

      <div id="second" ref={scrollToRef} className="flex flex-col md:flex-row mt-[30rem]">
        <Image
          width={1439}
          height={751}
          priority
          className="w-[60%] m-auto md:max-w-lg rounded-xl"
          alt="house"
          src="/general/home/big-group-janeda.png"
        />

        <div className="md:min-w-[30rem] self-center">
          <p className="mr-10 text-3xl font-semibold text-center">
            <LetterDecryptor>Tule õpi karated!</LetterDecryptor>
          </p>
        </div>
      </div>
    </>
  );
};
