"use client";

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
      <div className="flex flex-col md:flex-row mt-14 md:mt-[10rem] relative">
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

      <div ref={scrollToRef} className="flex flex-col md:flex-row mt-[28rem]">
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
